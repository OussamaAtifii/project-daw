import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getImageUrl } from '../utils/utils'
import Navbar from '../components/Navbar'
import { useCart } from '../hooks/useCart'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import Breadcrumbs from '../components/Breadcrumbs'

export default function ProductPage () {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const { addToCart, checkProductInCart, removeFromCart } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch(`http://localhost:3000/products/${productId}`)
        if (!productResponse.ok) {
          throw new Error('Failed to fetch product')
        }
        const productData = await productResponse.json()
        setProduct(productData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await fetch(`http://localhost:3000/reviews/${productId}`)
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const reviewsData = await reviewsResponse.json()
        setReviews(reviewsData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    fetchReviews()
  }, [productId])

  const handleReview = async (reviewData) => {
    const body = {
      review: reviewData.review,
      userId: user.userId,
      productId: +productId,
      stars: +reviewData.stars
    }

    try {
      const res = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        throw new Error('Failed to add review')
      }

      const newReview = await res.json()
      setReviews([...reviews, newReview])
    } catch (error) {
      setError(error.message)
    }
  }

  const userReview = reviews.find((review) => review.userId === user.userId)

  const generateStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'text-[#a18f34]' : 'text-gray-400'}>
          &#9733;
        </span>
      )
    }
    return stars
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className='container max-w-screen-xl mx-auto p-4'>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        {product && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className='rounded-md w-full md:w-96 mx-auto'
            />
            <div className='flex flex-col gap-20'>
              <div>
                <h1 className='text-3xl font-bold pb-4 mt-10'>{product.name}</h1>
                <p className='text-lg text-gray-600 pb-4'>{product.description}</p>
                <p className='text-xl font-semibold pb-4'>${product.price.toFixed(2)}</p>
                <Link to={`/brand/${product.brandId}`} className='underline'>
                  {product.brand.name}
                </Link>
              </div>
              <div className='flex justify-center md:justify-start'>
                <button
                  className='bg-main-500 text-white px-6 py-3 rounded-md mt-4 mr-4'
                  onClick={() =>
                    checkProductInCart(product) ? removeFromCart(product) : addToCart(product)}
                >
                  {checkProductInCart(product) ? 'Eliminar del carrito' : 'Añadido al carrito'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='container max-w-screen-xl mx-auto p-4'>
        <h4 className='text-2xl font-semibold mb-4'>Reviews</h4>
        {!userReview
          ? (
            <form onSubmit={handleSubmit(handleReview)} className='mb-4'>
              <div className='flex flex-col'>
                <textarea
                  {...register('review', {
                    minLength: {
                      value: 3,
                      message: 'La reseña debe tener al menos 3 caracteres'
                    }
                  })}
                  name='review'
                  placeholder='Escribe tu reseña'
                  className={`border rounded px-3 py-2 w-full ${
                  errors.review ? 'bg-red-100 border-red-500' : 'border-gray-300'
                }`}
                  rows={4}
                  required
                />
                {errors.review?.type === 'minLength' && (
                  <span className='text-red-500 text-sm'>{errors.review.message}</span>
                )}
              </div>
              <div className='flex items-center mt-2'>
                <label htmlFor='stars' className='mr-2'>
                  Calificación:
                </label>
                <input
                  {...register('stars', { required: true })}
                  type='number'
                  id='stars'
                  name='stars'
                  min='1'
                  max='5'
                  className='border rounded px-3 py-2 w-20 border-gray-300'
                  required
                />
              </div>
              <button className='bg-main-500 text-white px-6 py-3 rounded-md mt-2'>
                Enviar reseña
              </button>
            </form>
            )
          : (
            <div className='mb-4'>
              <p className='text-lg font-semibold'>TU REVIEW:</p>
              <div className='border rounded-md p-4'>
                <p className='text-gray-600'>{userReview.review}</p>
                <p className='text-gray-600 mt-2'>Stars: {generateStars(userReview.stars)}</p>
              </div>
            </div>
            )}

        {reviews.map((review) => (
          <div key={review.id} className='mb-4'>
            <p className='text-lg font-semibold'>{review.user.name}</p>
            <div className='border rounded-md p-4'>
              <p className='text-gray-600'>{review.review}</p>
              <p className='text-gray-600 mt-2'>Stars: {generateStars(review.stars)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
