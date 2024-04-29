import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import SliderAuto from '../components/SliderAuto'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NoveltiesSlider from '../components/NoveltiesSlider'

import { getCategories } from '../services/api'

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
            <div className='border border-gray-300 rounded-lg flex gap-4 p-4 items-center shadow-md hover:shadow-lg hover:bg-gray-100 transition-all cursor-pointer h-1/2'>
              {/* TODO */}
            </div>
            <div className='border border-gray-300 rounded-lg flex gap-4 p-4 items-center shadow-md hover:shadow-lg hover:bg-gray-100 transition-all cursor-pointer h-1/2'>
              {/* TODO */}
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
      <section className='h-96 bg-gray-200 w-full p-11'>
        <NoveltiesSlider />
      </section>
      <Footer />
    </>
  )
}

export default HomePage
