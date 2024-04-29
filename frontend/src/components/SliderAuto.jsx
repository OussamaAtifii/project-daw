// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination } from 'swiper/modules'

export default function SliderAuto () {
  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        modules={[Autoplay, Pagination]}
        className='mySwiper h-[350px] w-[900px] bg-red-700 m-0 rounded-md'
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </>
  )
}
