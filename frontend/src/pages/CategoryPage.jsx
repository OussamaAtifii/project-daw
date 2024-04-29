import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import { getCategory, getCategoryProducts } from '../services/api'

export default function CategoryPage () {
  const { categoryId } = useParams()

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState({})
  const [filters, setFilters] = useState({
    minPrice: 0,
    brand: 'all'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productsData] = await Promise.all([
          getCategory(categoryId),
          getCategoryProducts(categoryId)
        ])

        setCategory(categoryData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [categoryId])

  const handleChangeMinPrice = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: e.target.value
    }))
  }

  const handleChangeBrand = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: e.target.value
    }))
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.price >= filters.minPrice &&
      (filters.brand === 'all' || filters.brand === product.brand.name)
    )
  })

  return (
    <>
      <Navbar />
      <div className='max-w-screen-xl mx-auto'>
        <h1 className='font-bold text-3xl'>{category.name}</h1>
        <p className='mb-9 text-sm'>Aquí irá la descripción de la categoría</p>
        <div className='flex gap-20'>
          <div className='divide-y-2 w-[250px] '>
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
                  max={1000}
                  onChange={handleChangeMinPrice}
                />
                <p className='p-1 border rounded-md'>{filters.minPrice}€</p>
              </div>
            </div>
            <div className='pt-6'>
              <label
                htmlFor='filtro-marca'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Marca
              </label>
              <select
                id='filtro-marca'
                className='block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 '
                onChange={handleChangeBrand}
              >
                <option selected value='all'>
                  Todas
                </option>
                <option value='Intel'>Intel</option>
                <option value='AMD'>AMD</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-x-10 gap-y-16'>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
