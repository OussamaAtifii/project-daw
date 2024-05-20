import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import { getBrand, getBrandProducts, getCategories } from '../services/api'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductGrid from '../components/ProductGrid'
import { FilterIcon, RemoveCartIcon } from '../components/Icons'
import Filters from '../components/Filters'
import FiltersResponsive from '../components/FiltersResponsive'

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
    console.log(e.target.value)
    const categoryId = +e.target.value

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
      <Breadcrumbs name={brand ? brand.name : ''} />
      {products.length > 0
        ? (
          <>
            <FiltersResponsive
              filters={filters}
              onChangeMinPrice={handleChangeMinPrice}
              onChangeCategory={handleChangeCategory}
              categories={categories}
            />
            <div className='max-w-screen-xl mx-auto'>
              <>
                <div className='mx-2 xl:mx-0'>
                  <h1 className='font-bold text-3xl'>{brand.name}</h1>
                  <p className='mb-9 text-sm'>
                    Aquí irá la descripción de la marca
                  </p>
                </div>
                <div className='flex gap-20'>
                  <div className='divide-y-2 w-[300px] hidden md:block ml-2 xl:ml-0'>
                    <Filters
                      filters={filters}
                      onChangeMinPrice={handleChangeMinPrice}
                      onChangeCategory={handleChangeCategory}
                      categories={categories}
                    />
                  </div>
                  {filteredProducts.length > 0
                    ? (
                      <ProductGrid products={filteredProducts} />
                      )
                    : (
                      <div className='flex flex-col items-center text-center gap-4 w-full'>
                        <div className='bg-main-200 rounded-full p-4'>
                          <FilterIcon />
                        </div>
                        <p className='text-lg font-medium'>
                          No disponemos de productos con los filtros seleccionados.
                        </p>
                      </div>
                      )}
                </div>
              </>
            </div>
          </>
          )
        : (
          <div className='flex flex-col items-center text-center gap-4'>
            <div className='bg-main-200 rounded-full p-4'>
              <RemoveCartIcon />
            </div>
            <p>
              No disponemos de productos en la categoria{' '}
              <span className='font-semibold'>{brand.name}</span>
              <Link to='/' className='text-main-600 italic hover:underline'>
                <p>¡Explora otros productos!</p>
              </Link>
            </p>
          </div>
          )}
      {/* <div className='max-w-screen-xl mx-auto'>
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
          <ProductGrid products={filteredProducts} />
        </div>
      </div> */}
    </>
  )
}
