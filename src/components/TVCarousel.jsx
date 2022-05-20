import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useHistory } from 'react-router-dom'
export const TVCarousel = ({ media, name }) => {

  const history = useHistory()

  return (
    <section className="tv-carousel">
      <h2>{name}</h2>

      <Swiper
        slidesPerView={6}
        spaceBetween={8}
        slidesPerGroup={3}
        allowSlidePrev={false}
        breakpoints={{
          0: {
            width: 1000,
            slidePerView: 3,
          },
          420: {
            width: 800,
            slidePerView: 3,
            spaceBetween: 2
          },
          768: {
            width: 968,
            slidesPerView: 4,
          },
          1200: {
            width: 1800,
            slidesPerView: 6,
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
        {media.map((media) => (
          <SwiperSlide onClick={() => history.push(`/watch/${media.id}`)} key={media.id} >
            <img src={require(`../assets/images/media/${media.images.small}.jpg`)} alt="movie-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
