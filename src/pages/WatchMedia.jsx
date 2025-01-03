import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
  const timeLineContainer = useRef()
  const timeLeft = useRef()
  const [duration, setDuration] = useState(null)
  const [volume, setVolume] = useState(1)
  const [active, setActive] = useState('3')
  const [currentVolume, setCurrentVolume] = useState('high')
  const [isScrubbing, setIsScrubbing] = useState(false)
  const history = useHistory()

  const handleChange = (e) => {
    setVolume(e.target.value)
    video.current.volume = volume
    video.current.muted = volume === 0
    getCurrentVolume()
  }

  useEffect(() => {
    const loadMedia = async () => {
      const movies = await movieService.query()
      const shows = await tvShowsService.query()
      const medias = movies.concat(shows)
      const media = medias.find((media) => media.id === match.params.id)
      setMedia(media)
    }
    loadMedia()
  }, [match.params.id])

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

  const changeSpeed = (event, speed) => {
    video.current.playbackRate = speed
    setActive(event.target.id)
  }

  const getCurrTime = () => {
    timeLeft.current.textContent = formatDuration(duration - video.current.currentTime)
    const percent = video.current.currentTime / duration
    timeLineContainer.current.style.setProperty('--progress-position', percent)
  }
  const getDuration = () => {
    setDuration(video.current.duration)
  }
  const formatDuration = (time) => {
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 })

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor((time % 60) / 60) % 60
    const hours = Math.floor(time / 3600)

    return !hours ? `${minutes}:${leadingZeroFormatter.format(seconds)}` : `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
  }

  const handleTimeLine = (event) => {
    const rect = timeLineContainer.current.getBoundingClientRect()
    const percent = Math.min(Math.max(0, event.clientX - rect.x), rect.width) / rect.width
    timeLineContainer.current.style.setProperty('--preview-position', percent)

    if (isScrubbing) {
      event.preventDefault()
      timeLineContainer.current.style.setProperty('--progress-position', percent)
    }
  }

  const skipTime = (duration) => {
    video.current.currentTime += duration
  }

  const toggleScrubbing = (event) => {
    const rect = timeLineContainer.current.getBoundingClientRect()
    const percent = Math.min(Math.max(0, event.clientX - rect.x), rect.width) / rect.width
    video.current.currentTime = percent * duration
    handleTimeLine(event)
  }

  const startScrubbing = (event) => {
    setIsScrubbing(true)
    handleTimeLine(event)
  }

  const handleScrubbingMove = (event) => {
    if (isScrubbing) {
      video.current.pause()
    }
      handleTimeLine(event)
  }

  const stopScrubbing = (event) => {
    if(isScrubbing) {
      toggleScrubbing(event)
      video.current.play()
    }
    setIsScrubbing(false)
  }

  if (!media) return <LoadingProfile />
  return (
    <section className="watch-media">
      <div onMouseUp={stopScrubbing} ref={videoContainer} onDoubleClick={() => toggleFullScreenMode()} className={'video-container ' + currentVolume}>
        <div className="video-controls">
          <div className="timeline-wrapper">
            <div className="timeline-container">
              <div onClick={toggleScrubbing} onMouseMove={handleScrubbingMove} onMouseDown={startScrubbing} ref={timeLineContainer} className="timeline">
                <div className="timeline-indicator"></div>
              </div>
              <span ref={timeLeft}>0:00</span>
            </div>
          </div>
          <div className="controls">
            <button onClick={() => history.goBack()} className="back">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 11.0001L3.41421 11.0001L8.70711 5.70718L7.29289 4.29297L0.292892 11.293C0.105356 11.4805 0 11.7349 0 12.0001C0 12.2653 0.105356 12.5196 0.292892 12.7072L7.29289 19.7072L8.70711 18.293L3.41421 13.0001H24V11.0001Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
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
              <button onClick={() => skipTime(-10)}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97067 20.8978 6.88324 21.5694 9.09718C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479975 13.5867 -0.214319 10.8238 0.057802C8.71195 0.2658 6.70517 1.02859 5 2.2532V1H3V5C3 5.55229 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55229 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1759 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43389C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43389C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1759 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01929V15.8554H8.60395Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <button onClick={() => skipTime(10)}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.4443 3.68532C8.36794 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55228 21 5V1H19V2.2532C17.2948 1.02858 15.288 0.265799 13.1762 0.0578004C10.4133 -0.214321 7.64153 0.479973 5.33315 2.02238C3.02478 3.56479 1.32262 5.85989 0.516716 8.51661C-0.28919 11.1733 -0.148983 14.0273 0.913448 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09717C3.10218 6.88324 4.52065 4.97066 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55228 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2077 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1758 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43388C15.2077 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43388C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1758 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.4289 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.4289 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01928L7 9.81956V11.1405L8.60395 10.7163Z"
                    fill="currentColor"
                  ></path>
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
            <div className="middle">
              <h4>{media.name}</h4>
            </div>
            <div className="right-side">
              <div className="playback-container">
                <div className="playback-options">
                  <h3>Playback Speed</h3>
                  <div className="line">
                    <span id={'1'} className={active === '1' ? 'active' : null} onClick={(event) => changeSpeed(event, 0.5)}></span>
                    <span id={'2'} className={active === '2' ? 'active' : null} onClick={(event) => changeSpeed(event, 0.75)}></span>
                    <span id={'3'} className={active === '3' ? 'active' : null} onClick={(event) => changeSpeed(event, 1)}></span>
                    <span id={'4'} className={active === '4' ? 'active' : null} onClick={(event) => changeSpeed(event, 1.25)}></span>
                    <span id={'5'} className={active === '5' ? 'active' : null} onClick={(event) => changeSpeed(event, 1.5)}></span>
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
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z" fill="currentColor"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <video onClick={() => togglePlay()} onLoadedData={() => getDuration()} onTimeUpdate={() => getCurrTime()} ref={video} autoPlay src={media.url}></video>
      </div>
    </section>
  )
}
