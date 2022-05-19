import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
export const TVCarousel = ({ movies, name }) => {
  return (
    <section className="tv-carousel">
      <h2>{name}</h2>
      <Swiper
        slidesPerView={6}
        spaceBetween={8}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img src={require(`../assets/images/movies/${movie.images.small}.jpg`)} alt="movie-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
