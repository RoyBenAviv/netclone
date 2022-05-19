import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useHistory } from 'react-router-dom'
export const TVCarousel = ({ movies, name }) => {

  const history = useHistory()

  return (
    <section className="tv-carousel">
      <h2>{name}</h2>

      <Swiper
        slidesPerView={6}
        spaceBetween={8}
        slidesPerGroup={3}
        breakpoints={{
          400: {
            width: 400,
            slidePerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 4,
          },
          1200: {
            width: 1200,
            slidesPerView: 5,
          }
        }}
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
          <SwiperSlide onClick={() => history.push(`/watch/${movie.id}`)} key={movie.id} >
            <img src={require(`../assets/images/movies/${movie.images.small}.jpg`)} alt="movie-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
