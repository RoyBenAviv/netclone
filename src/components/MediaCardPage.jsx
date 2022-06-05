import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { movieService } from '../services/movies.service'
import { tvShowsService } from '../services/tvshows.service'
import { userService } from '../services/user.service'

export const MediaCardPage = ({ match }) => {
  const [profile, setProfile] = useState()
  const [media, setMedia] = useState()
  const [type, setType] = useState()
  const videoContainer = useRef()
  const video = useRef()
  const history = useHistory()
  const { user } = useAuth()

  useEffect(() => {
    loadMedia()
    loadProfile()
    loadMedias()
  })

  const loadMedias = async () => {
    const movies = await movieService.query()
    const shows = await tvShowsService.query()
    movies.some(movie => movie.id === media?.id) ? setType(movies) : setType(shows)
  }

  const onBack = (event) => {
    event.stopPropagation()
    history.goBack()
  }

  const playMedia = (mediaId) => {
    continueToWatch(mediaId)
    history.push(`/watch/${mediaId}`)
  }

  const continueToWatch = (mediaId) => {
    const currMedia = type.find(media => media.id === mediaId)
    if (profile.continueToWatch.some(media => media.id === mediaId)) return
    profile.continueToWatch.unshift(currMedia)
    userService.save(null, user)
    
  }

  const loadMedia = async () => {
    const movies = await movieService.query()
    const shows = await tvShowsService.query()
    const medias = movies.concat(shows)
    const media = medias.find((media) => media.id === match.params.mediaId)
    setMedia(media)
  }

  const loadProfile = () => {
    const profile = user.profiles.find((profile) => profile.id === match.params.profileId)
    setProfile(profile)
  }

  const toggleMute = (event) => {
    event.stopPropagation()
    video.current.muted = !video.current.muted
    videoContainer.current.classList.toggle('on-sound')
  }



  if (!media && !type) return
  return (
    <section className="media-card">
      <div className="card">
        <div ref={videoContainer} onClick={() => playMedia(media.id)} className="video-container">
          <div className="background"></div>
          <button onClick={(event) => onBack(event)} className="back">
            &#10005;
          </button>
          <button onClick={() => playMedia()} className="play">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
              <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
            </svg>
            Play
          </button>
          <button onClick={(event) => toggleMute(event)} className="mute-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mute">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
                fill="currentColor"
              ></path>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sound">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <img className="media-logo" src={require(`../assets/images/logos/${media.images.logo}.png`)} alt="media-logo" />
          <video ref={video} autoPlay muted loop src={media.url}></video>
        </div>
        <article>
          <div className="bar-info">
              <div>
              <div className="match">99% Match</div>
            <div className="release">{media.information.release}</div>
            <div className="age">{media.age}+</div>
            <div className="hd">HD</div>
              </div>
              <div className='description'>
                {media.information.description}
              </div>
          </div>
          <div className='main-info'>
            <ul className='cast'>
              <span>Cast:</span>
              {media.information.cast.map(((actor, index) => (
                <li key={`${actor}_${index}`}>{actor},</li>
              )))}
              <li>more</li>
            </ul>
            <div className='genre'>
              <span>Genre:</span>{media.genre.charAt(0).toUpperCase() + media.genre.slice(1)}
            </div>
          </div>

        </article>
        <div className='more'>
          <h3>More Like This</h3>
                <ul>
                  {type.map(currMedia => (
                    currMedia.genre === media.genre && currMedia.id !== media.id ? <li onClick={() => playMedia(currMedia.id)}>
                      <img className='media-image' src={require(`../assets/images/media/${currMedia.images.small}.jpg`)} alt="media" />
                      <div className="content">
                        <div className='top'>

                        <span className='age'>{currMedia.age}+</span>
                        <span className='release'>{currMedia.information.release}</span>
                        </div>
                        <div className='description'>
                          {currMedia.information.description}
                        </div>
                      </div>
                    </li> : null
                  ))}
                </ul>
        </div>
      </div>
    </section>
  )
}
