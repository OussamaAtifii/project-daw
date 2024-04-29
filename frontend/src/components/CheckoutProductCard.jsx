import { getImageUrl } from '../utils/utils'

import { CheckIcon } from './Icons'

export default function CheckoutProductCard ({ product }) {
  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white'>
      <div className='flex items-center p-4'>
        <div className='w-24 h-24 mr-4 overflow-hidden'>
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col flex-grow'>
          <p className='font-semibold text-lg mb-2'>{product.name}</p>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <CheckIcon />
            <span>Envío gratis</span>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center px-4 py-2 border-t border-gray-200'>
        <div className='flex items-center space-x-4'>
          <span className='text-gray-600'>Cantidad:</span>
          <div className='flex rounded-md border divide-x-2'>
            <button className='px-2 py-1 bg-main-50 hover:bg-main-100'>+</button>
            <p className=' px-2 py-1'>{product.quantity}</p>
            <button className='px-2 py-1'>-</button>
          </div>
          <p className='font-medium'>{product.price}€</p>
        </div>
      </div>
    </div>
  )
}
