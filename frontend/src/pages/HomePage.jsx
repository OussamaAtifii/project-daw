import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import SliderAuto from '../components/SliderAuto'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NoveltiesSlider from '../components/NoveltiesSlider'

import { getCategories } from '../services/api'

import topVentas from '../assets/top-ventas.png'

function HomePage () {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <>
      <Navbar />
      <main className='max-w-screen-xl mx-auto'>
        <section className='flex gap-4 mb-8'>
          <div>
            <SliderAuto />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='h-1/2 border border-gray-300 rounded-lg flex items-center p-4 shadow-md transition-all cursor-pointer max-w-md'>
              <div className='flex flex-col justify-between h-full py-2'>
                <div>
                  <p className='font-bold text-xl mb-1'>TOP VENTAS!</p>
                  <p className='text-sm'>Descubre los productos más vendidos</p>
                </div>
                <Link to='/productos' className='text-main-600 hover:underline flex items-center'>
                  Explorar más
                </Link>
              </div>
              <img src={topVentas} alt='Top Ventas' className='w-2h-28 h-28 ' />
            </div>
            <div className='border border-gray-300 rounded-lg flex gap-4 p-4 items-center shadow-md hover:shadow-lg hover:bg-gray-100 transition-all cursor-pointer h-1/2'>
              {/* TODO */}
              MEJOR VALORADOS!
            </div>
          </div>
        </section>
        <h2 className='text-center text-2xl font-bold mb-8'>Explora nuestras categorías</h2>
        {/* Seccion para mostrar todas las categorias */}
        <section className='grid grid-cols-3 gap-6 mb-14'>
          {categories.map(category => (
            <Link key={category.id} to={`/categories/${category.id}`}>
              <CategoryCard category={category} />
            </Link>
          ))}
        </section>
      </main>
      <section className='h-96 bg-gray-200 w-full p-11 mb-14'>
        <NoveltiesSlider />
      </section>
      <Footer />
    </>
  )
}

export default HomePage
