import React, { useEffect, useState } from 'react'
import { LoadingProfile } from '../components/LoadingProfile'
import { movieService } from '../services/movies.service'
import { tvShowsService } from '../services/tvshows.service'


export const WatchMedia = ({ match }) => {
  const [media, setMedia] = useState()

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

  if (!media) return <LoadingProfile />
  return (
    <section className='watch-media'>
      <div className='video-container'>
        <div className="video-controls">
          <div className="timeline">

          </div>
          <div className="controls">
            <button className="play-pause">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pause"><path fillRule="evenodd" clipRule="evenodd" d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" fill="currentColor"></path></svg>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="play"><path d="M4 2.69127C4 1.93067 4.81547 1.144851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
            </button>
            <button className="back">
              B
            </button>
          </div>
        </div>
      <video playsInline loop src={media.url}></video>
      </div>
    </section>
  )
}
