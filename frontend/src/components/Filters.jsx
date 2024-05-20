/* eslint-disable react/prop-types */
const Filters = ({ filters, onChangeMinPrice, onChangeBrand, onChangeCategory, categories }) => {
  return (
    <>
      <div className='pb-6'>
        <label
          htmlFor='filtro-marca'
          className='block mb-1 text-sm font-medium text-gray-900'
        >
          Precio mínimo
        </label>
        <div className='flex justify-center items-center gap-4'>
          <input
            id='filtro-precio'
            type='range'
            className='w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm'
            min={0}
            max={filters.maxPrice}
            onChange={onChangeMinPrice}
            value={filters.minPrice}
          />
          <p className='p-1 border rounded-md'>{filters.minPrice}€</p>
        </div>
      </div>
      {
        filters.brand && (
          <div className='pt-6'>
            <label
              htmlFor='filtro-marca'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Marca
            </label>
            <select
              id='filtro-marca'
              className='block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50'
              onChange={onChangeBrand}
              value={filters.brand}
            >
              <option value='all'>Todas</option>
              <option value='Intel'>Intel</option>
              <option value='AMD'>AMD</option>
            </select>
          </div>
        )
      }
      {
        filters.categories && (
          <div className='pt-6'>
            <p className='block mb-2 text-sm font-medium text-gray-900'>
              Categoría
            </p>
            {categories.map((category) => (
              <div key={category.id}>
                <input
                  type='checkbox'
                  id={`category-${category.name}`}
                  className='mr-1'
                  value={category.id}
                  onChange={onChangeCategory}
                  checked={filters.categories.includes(category.id)}
                />
                <label htmlFor={`category-${category.name}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )
      }
    </>
  )
}

export default Filters
