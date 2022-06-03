import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import plusIcon from '../assets/images/plus.png'
import chevronIcon from '../assets/images/chevron.png'
import doneIcon from '../assets/images/v.png'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useHistory } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { MediaCardPage } from './MediaCardPage'

export const TVCarousel = ({ profile, addToList, removeFromList, continueToWatch, media, name }) => {
  const history = useHistory()
  // const [openCard, setOpenCard] = useState(null)

  const playMedia = (mediaId) => {
    continueToWatch(mediaId)
    history.push(`/watch/${mediaId}`)
  }

  const onAddToList = (event, mediaId) => {
    event.stopPropagation()
    addToList(mediaId)
  }

  const onRemoveFromList = (event, mediaId) => {
    event.stopPropagation()
    removeFromList(mediaId)
  }

  const openCard = (event, mediaId) => {
        event.stopPropagation()
        history.push(`/browse/${profile.id}/${mediaId}`)
  }


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
            width: 520,
            slidePerView: 2,
            spaceBetween: 2,
          },
          768: {
            width: 968,
            slidesPerView: 4,
          },
          1200: {
            width: 1800,
            slidesPerView: 6,
          },
        }}
        loop={media.length < 5 ? false : true}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {media.map((media) => (
          <SwiperSlide onClick={() => playMedia(media.id)} key={media.id}>
            <div className="media-container">
              <img className='media-image' src={require(`../assets/images/media/${media.images.small}.jpg`)} alt="movie" />
              <div className="content">
                <div className="actions">
                  <div className="left">
                    <button onClick={() => playMedia(media.id)} className="play">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
                        <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                      </svg>
                    </button>
                    <div onClick={profile.myList.some((currMedia) => currMedia.id === media.id) ? (event) => onRemoveFromList(event, media.id) : (event) => onAddToList(event, media.id)} className="add-container">
                      <span className="tooltip">{profile.myList.some((currMedia) => currMedia.id === media.id) ? 'Remove from List' : 'Add to My List'}</span>
                      <button className="add">{profile.myList.some((currMedia) => currMedia.id === media.id) ? <img className="done" src={doneIcon} alt="done" /> : <img src={plusIcon} alt="plus" />}</button>
                    </div>
                  </div>
                  <div className="right">
                    <div className="info-container">
                      <span className="tooltip">{'Episodes & info'}</span>
                      <button onClick={(event) => openCard(event, media.id)} className="info-btn">
              
                        <img src={chevronIcon} alt="chevron" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  <div className="genre">{media.genre.charAt(0).toUpperCase() + media.genre.slice(1)}</div>
                  <div className="age">{media.age}+</div>
                  <div className="match">99% Match</div>
                  <div className="hd">HD</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        <Route path="/browse/:profileId/:mediaId" component={MediaCardPage} />

        
    </section>
  )
}
