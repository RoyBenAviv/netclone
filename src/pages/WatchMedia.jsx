import React, { useEffect, useRef, useState } from 'react'
import { LoadingProfile } from '../components/LoadingProfile'
import { movieService } from '../services/movies.service'
import { tvShowsService } from '../services/tvshows.service'

export const WatchMedia = ({ match }) => {
  const [media, setMedia] = useState()
  const videoContainer = useRef()
  const playPauseBtn = useRef()
  const video = useRef()
  const fullScreenBtn = useRef()

  useEffect(() => {
    loadMedia()
  }, [])

  const loadMedia = async () => {
    const movies = await movieService.query()
    const shows = await tvShowsService.query()
    const medias = movies.concat(shows)
    const media = medias.find((media) => media.id === match.params.id)
    setMedia(media)
  }

  const togglePlay = () => {
    video.current.paused ? video.current.play() : video.current.pause()

    video.current.addEventListener('play', () => {
      videoContainer.current.classList.remove('paused')
    })
  
    video.current.addEventListener('pause', () => {
      videoContainer.current.classList.add('paused')
    })
  }

  const toggleFullScreenMode = () => {
    videoContainer.current.classList.toggle('full-screen')
    !document.fullscreenElement ? videoContainer.current.requestFullscreen() : document.exitFullscreen()
  }


  if (!media) return <LoadingProfile />
  return (
    <section className="watch-media">
      <div ref={videoContainer} className="video-container">
        <div className="video-controls">
          <div className="timeline"></div>
          <div className="controls">
            <button onClick={() => togglePlay()} ref={playPauseBtn} className="play-pause">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pause">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="play">
                <path d="M4 2.69127C4 1.93067 4.81547 1.144851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
              </svg>
            </button>
            <button onClick={() => toggleFullScreenMode()} ref={fullScreenBtn} className='full-screen-btn'>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="open" data-uia="control-fullscreen-exit"><path fillRule="evenodd" clipRule="evenodd" d="M24 8H19V3H17V9V10H18H24V8ZM0 16H5V21H7V15V14H6H0V16ZM7 10H6H0V8H5V3H7V9V10ZM19 21V16H24V14H18H17V15V21H19Z" fill="currentColor"></path></svg>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="close" data-uia="control-fullscreen-enter"><path fillRule="evenodd" clipRule="evenodd" d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z" fill="currentColor"></path></svg>
            </button>
            <div className='volume-container'>

            <button className='mute-btn'>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="volume-high"><path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM17.0709 4.92897C18.9462 6.80433 19.9998 9.34787 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87831 17.157 7.84347 15.6567 6.34318L17.0709 4.92897ZM14.2428 7.7574C15.368 8.88262 16.0001 10.4087 16.0001 12C16.0001 13.5913 15.368 15.1175 14.2428 16.2427L12.8285 14.8285C13.5787 14.0783 14.0001 13.0609 14.0001 12C14.0001 10.9392 13.5787 9.92176 12.8285 9.17161L14.2428 7.7574Z" fill="currentColor"></path></svg>
            </button>
            <div className="input-container">
            <input type='range' />
            </div>
            </div>
          </div>
        </div>
        <video autoPlay ref={video} playsInline loop src={media.url}></video>
      </div>
    </section>
  )
}
