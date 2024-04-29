/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { getImageUrl } from '../utils/utils'
import { useCart } from '../hooks/useCart'
import { AddCartIcon, RemoveCartIcon } from './Icons'

export default function ProductCard ({ product, category }) {
  const { addToCart, cart, removeFromCart } = useCart()

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id)
  }

  return (
    <Link className='product-card flex flex-col rounded-md justify-between p-3 shadow-md hover:scale-105 transition-all'>
      <div>
        <img
          src={getImageUrl(product.image)}
          className='w-[150px] h-[150px] mx-auto mb-2'
        />
        <div>
          <Link to='/login'>
            <p className='text-sm text-gray-500 mb-1 hover:underline'>
              {/* {category.name ?? 'no existe'} */}
            </p>
          </Link>
          <Link className='hover:underline'>
            <h3 className='mb-2 text-sm'>{product.name}</h3>
          </Link>
        </div>
      </div>
      <div className=''>
        <div className='flex items-center justify-between'>
          <p className='font-bold text-xl'>{product.price}€</p>
          <button
            className='bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors '
            onClick={() =>
              checkProductInCart(product)
                ? removeFromCart(product)
                : addToCart(product)}
          >
            {checkProductInCart(product) ? <RemoveCartIcon /> : <AddCartIcon />}
          </button>
        </div>
      </div>
    </Link>
  )
}
