import { getImageUrl } from '../utils/utils'

export default function CategoryCard ({ category }) {
  return (
    <div className='border border-gray-300 rounded-lg flex gap-4 p-4 items-center shadow-md hover:shadow-lg hover:bg-gray-100 transition-all cursor-pointer'>
      <div className='flex-shrink-0'>
        <img
          src={getImageUrl(category.image)}
          className='h-20 w-20 object-cover rounded-md'
          alt={category.name}
        />
      </div>
      <p className='font-bold text-lg text-gray-800'>{category.name}</p>
    </div>
  )
}
