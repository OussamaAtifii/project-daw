/* eslint-disable react/prop-types */
import { useCart } from '../hooks/useCart'
import { getImageUrl } from '../utils/utils'
import { CheckIcon, TrashIcon } from './Icons'

export default function CheckoutProductCard ({ product }) {
  const { addToCart, removePartial, removeFromCart } = useCart()

  return (
    <div className='border relative border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white'>
      <div className='flex items-center p-4'>
        <div className='absolute top-1 right-1 py-1 px-2 rounded-md hover:bg-gray-200 cursor-pointer' onClick={() => removeFromCart(product)}>
          <TrashIcon />
        </div>
        <div className='w-24 h-24 mr-4 overflow-hidden'>
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col flex-grow'>
          <p className='font-semibold sm:text-lg text-base mb-2'>{product.name}</p>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <CheckIcon />
            <span>Envío gratis</span>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center px-4 py-2 border-t border-gray-200'>
        <div>
          <div className='flex items-center space-x-4'>
            <span className='text-gray-600 hidden sm:block'>Cantidad:</span>
            <div className='flex rounded-md border divide-x-2'>
              <button className='px-2 py-1 hover:bg-gray-100' onClick={() => removePartial(product)}>-</button>
              <p className=' px-2 py-1'>{product.quantity}</p>
              <button className='px-2 py-1 hover:bg-gray-100' onClick={() => addToCart(product)}>+</button>
            </div>
            <p className='font-medium text-base hidden sm:block'>{product.price.toFixed(2)}€/ud</p>
          </div>
        </div>
        <p className='font-semibold'>Total: {(product.price * product.quantity).toFixed(2)}€</p>
      </div>
    </div>
  )
}
