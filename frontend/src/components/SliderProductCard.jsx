/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { getImageUrl } from '../utils/utils'
import { AddCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

export default function SliderProductCard ({ product }) {
  const { addToCart } = useCart()

  return (
    <div className='flex flex-col rounded-md justify-between p-4 shadow-md bg-white h-full'>
      <Link to={`/product/${product.id}`} className='flex flex-col h-full justify-between'>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className='w-36 h-36 mx-auto mb-2'
        />
        <div className='flex flex-col'>
          <Link to={`/product/${product.id}`}>
            <p className='text-sm text-gray-500 hover:underline'>
              {product.category.name}
            </p>
          </Link>
          <h3 className='font-medium text-gray-800 truncate mb-4'>{product.name}</h3>
          <div className='flex items-center justify-between'>
            <p className='font-bold text-xl'>{product.price}€</p>
            <button
              className='bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors '
              onClick={() =>
                addToCart(product)}
            >
              <AddCartIcon />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
