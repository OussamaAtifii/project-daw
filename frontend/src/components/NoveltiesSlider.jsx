import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import SliderProductCard from './SliderProductCard'

import { ArrowLeftIcon, ArrowRightIcon } from './Icons'

export default function NoveltiesSlider () {
  const [swiper, setSwiper] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/products/novelties/5')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setProducts(data)
      })
  }, [])

  const goNext = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev()
    }
  }

  return (
    <div className='flex gap-32 max-w-screen-xl mx-auto h-full'>
      <div className='flex flex-col gap-4 justify-between h-full'>
        <p className='text-center text-xl font-semibold mb-8'>Novedades!</p>
        <div className='flex gap-3'>
          <button
            className='bg-white shadow-md rounded-full w-11 h-11 border-none cursor-pointer flex justify-center items-center hover:bg-gray-100'
            onClick={goPrev}
            aria-label='Anterior'
          >
            <ArrowLeftIcon />
          </button>
          <button
            className='bg-white shadow-md rounded-full w-11 h-11 border-none cursor-pointer flex justify-center items-center hover:bg-gray-100'
            onClick={goNext}
            aria-label='Siguiente'
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* !TODO Tener cuidado con el slidesPerView y la cantidad de productos en novedades   */}
      <Swiper onSwiper={setSwiper} spaceBetween={30} slidesPerView={4} rewind>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <SliderProductCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
