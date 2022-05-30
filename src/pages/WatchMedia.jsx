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
  const muteBtn = useRef()
  const volumeRange = useRef()
  const [volume, setVolume] = useState(1)
  const [currentVolume, setCurrentVolume] = useState('high')

  const handleChange = (e) => {
    setVolume(e.target.value)
    video.current.volume = volume
    video.current.muted = volume === 0
    getCurrentVolume()
  }

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

  const getCurrentVolume = () => {
    if (volumeRange.current.value <= 0.25 && volumeRange.current.value > 0) setCurrentVolume('low')
    else if (volumeRange.current.value > 0.25 && volumeRange.current.value <= 0.75) setCurrentVolume('medium')
    else if (volumeRange.current.value > 0.75) setCurrentVolume('high')
    else setCurrentVolume('mute')
  }

  const toggleFullScreenMode = () => {
    videoContainer.current.classList.toggle('full-screen')
    !document.fullscreenElement ? videoContainer.current.requestFullscreen() : document.exitFullscreen()
  }

  const toggleMute = () => {
    video.current.muted = !video.current.muted
    video.current.muted ? (volumeRange.current.value = 0) : (volumeRange.current.value = video.current.volume)
    getCurrentVolume()
  }

  const changeSpeed = (speed) => {
    video.current.playbackRate = speed
  }

  if (!media) return <LoadingProfile />
  return (
    <section className="watch-media">
      <div ref={videoContainer} className={'video-container ' + currentVolume}>
        <div className="video-controls">
          <div className="timeline"></div>
          <div className="controls">
            <div className="left-side">
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
              <div className="volume-container">
                <button onClick={() => toggleMute()} ref={muteBtn} className="mute-btn">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="volume-high">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="volume-medium">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM17.0709 4.92897C18.9462 6.80433 19.9998 9.34787 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87831 17.157 7.84347 15.6567 6.34318L17.0709 4.92897ZM14.2428 7.7574C15.368 8.88262 16.0001 10.4087 16.0001 12C16.0001 13.5913 15.368 15.1175 14.2428 16.2427L12.8285 14.8285C13.5787 14.0783 14.0001 13.0609 14.0001 12C14.0001 10.9392 13.5787 9.92176 12.8285 9.17161L14.2428 7.7574Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="volume-low">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 4C11 3.59554 10.7564 3.2309 10.3827 3.07612C10.009 2.92134 9.57889 3.00689 9.29289 3.29289L4.58579 8H1C0.447715 8 0 8.44771 0 9V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4ZM5.70711 9.70711L9 6.41421V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70711ZM16.0001 12C16.0001 10.4087 15.368 8.88259 14.2428 7.75737L12.8285 9.17158C13.5787 9.92173 14.0001 10.9391 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8284L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="volume-mute">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <div className="input-container">
                  <input ref={volumeRange} onChange={handleChange} type="range" min="0" max="1" step="any" value={volume} />
                </div>
              </div>
            </div>
            <div className="right-side">
              <div className="playback-container">
                <div className="playback-options">
                  <h3>Playback Speed</h3>
                  <div className="line">
                    <span onClick={() => changeSpeed(0.5)}></span>
                    <span onClick={() => changeSpeed(0.75)}></span>
                    <span className='active' onClick={() => changeSpeed(1)}></span>
                    <span onClick={() => changeSpeed(1.25)}></span>
                    <span onClick={() => changeSpeed(1.5)}></span>
                  </div>
                  <div className="options">
                    <span>0.5x</span>
                    <span>0.75x</span>
                    <span>1x (Normal)</span>
                    <span>1.25x</span>
                    <span>1.5x</span>
                  </div>
                </div>
                <button className="playback-speed-btn">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="playback">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.6427 7.43779C14.5215 4.1874 9.47851 4.1874 6.35734 7.43779C3.21422 10.711 3.21422 16.0341 6.35734 19.3074L4.91474 20.6926C1.02842 16.6454 1.02842 10.0997 4.91474 6.05254C8.823 1.98249 15.177 1.98249 19.0853 6.05254C22.9716 10.0997 22.9716 16.6454 19.0853 20.6926L17.6427 19.3074C20.7858 16.0341 20.7858 10.711 17.6427 7.43779ZM14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C12.1792 12 12.3528 12.0236 12.518 12.0677L15.7929 8.79289L17.2071 10.2071L13.9323 13.482C13.9764 13.6472 14 13.8208 14 14Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
              <button onClick={() => toggleFullScreenMode()} ref={fullScreenBtn} className="full-screen-btn">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="open" data-uia="control-fullscreen-exit">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 8H19V3H17V9V10H18H24V8ZM0 16H5V21H7V15V14H6H0V16ZM7 10H6H0V8H5V3H7V9V10ZM19 21V16H24V14H18H17V15V21H19Z" fill="currentColor"></path>
                </svg>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="close" data-uia="control-fullscreen-enter">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <video onClick={() => togglePlay()} autoPlay ref={video} playsInline loop src={media.url}></video>
      </div>
    </section>
  )
}
