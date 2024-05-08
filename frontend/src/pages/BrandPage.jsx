import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import { getBrand, getBrandProducts, getCategories } from '../services/api'

export default function BrandPage () {
  const { brandId } = useParams()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brand, setBrand] = useState({})
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    categories: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandData, productsData, categoriesData] = await Promise.all([
          getBrand(brandId),
          getBrandProducts(brandId),
          getCategories()
        ])

        console.log(productsData)
        const maxPrice = Math.max(
          ...productsData.map((product) => product.price)
        )

        setFilters((prevFilters) => ({
          ...prevFilters,
          maxPrice
        }))

        setBrand(brandData)
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [brandId])

  const handleChangeMinPrice = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: e.target.value
    }))
  }

  const handleChangeCategory = (e) => {
    const categoryId = +e.target.value

    // Actualizar el estado de los filtros
    setFilters((prevFilters) => ({
      // Mantener las otras propiedades de los filtros intactas
      ...prevFilters,
      // Verificar si la categoría ya está presente en el array de categorías
      categories: prevFilters.categories.includes(categoryId)
      // Si ya está presente, eliminarla del array utilizando filter
        ? prevFilters.categories.filter((id) => id !== categoryId)
      // Si no está presente, agregarla al array utilizando spread operator
        : [...prevFilters.categories, categoryId]
    }))
    console.log(filters)
  }

  const filteredProducts = products.filter((product) => {
    // Si no hay categorías seleccionadas, mostrar todos los productos
    if (filters.categories.length === 0) {
      return product.price >= filters.minPrice
    }

    // Si hay categorías seleccionadas, aplicar el filtro por categoría
    return (
      product.price >= filters.minPrice &&
      filters.categories.includes(product.categoryId)
    )
  })

  return (
    <>
      <Navbar />
      <div className='max-w-screen-xl mx-auto'>
        <h1 className='font-bold text-3xl'>{brand.name}</h1>
        <p className='mb-9 text-sm'>Aquí irá la descripción de la marca</p>
        <div className='flex gap-20'>
          <div className='divide-y-2 w-[300px]'>
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
                  onChange={handleChangeMinPrice}
                />
                <p className='p-1 border rounded-md'>{filters.minPrice}€</p>
              </div>
            </div>
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
                    onChange={handleChangeCategory}
                  />
                  <label htmlFor={`category-${category.name}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-4 gap-x-10 gap-y-16'>
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
