import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useHistory } from 'react-router-dom'
export const TopTenTVCarousel = ({ continueToWatch, media, name }) => {
  const history = useHistory()
  const playMedia = (mediaId) => {
    continueToWatch(mediaId)
    history.push(`/watch/${mediaId}`)
  }
  return (
    <section className="tv-carousel top-ten">
      <h2>{name}</h2>

      <Swiper
        slidesPerView={6}
        spaceBetween={100}
        slidesPerGroup={1}
        allowSlidePrev={true}
        loop={window.matchMedia('(max-width: 1200px)').matches ? true : false }
        loopFillGroupWithBlank={true}
        breakpoints={{
          0: {
            width: 1000,
            slidePerView: 6,
          },
          800: {
            width: 1300,
            slidePerView: 5,
            spaceBetween: 70
          },
          1200: {
            width: 1500,
            slidesPerView: 6,
          },
          1600: {
            width: 1800,
            slidesPerView: 6,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {media.map((media, idx) => (
          <SwiperSlide onClick={() => playMedia(media.id)} key={media.id}>
            <div className="top-ten-slider">
              <img className="number" src={require(`../assets/images/top/${idx + 1}.png`)} alt="top-ten-number-image" />
              <img className="media-image" src={require(`../assets/images/top/${media.images.medium}.jpg`)} alt="top-ten-image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
