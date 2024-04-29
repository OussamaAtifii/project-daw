import { getImageUrl } from '../utils/utils'

export default function CategoryCard ({ category }) {
  return (
    <div className='border border-gray-300 rounded-lg flex text-black hover:text-main-900 gap-4 pl-3 items-center shadow-md hover:shadow-lg hover:bg-gray-100 transition-all cursor-pointer'>
      <div className='flex-shrink-0'>
        <img
          src={getImageUrl(category.image)}
          className='h-24 w-24 object-cover rounded-md'
          alt={category.name}
        />
      </div>
      <p className='font-bold text-lg'>{category.name}</p>
    </div>
  )
}
