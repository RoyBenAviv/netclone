import React, { useEffect, useState } from 'react'
import { LoadingProfile } from '../components/LoadingProfile'
import { movieService } from '../services/movies.service'


export const WatchMedia = ({ match }) => {
  const [movie, setMovie] = useState()

  useEffect(() => {
    loadMovie()
  }, [])

  const loadMovie = async () => {
    const movies = await movieService.query()
    const movie = movies.find((movie) => movie.id === match.params.id)
    setMovie(movie)
  }

  if (!movie) return <LoadingProfile />
  return (
    <section className='watch-media'>
      <div className='video-container'>
      <div className='video-controls'>
        <div className="timeline">
        </div>
        <div className='controls'>
          {/* <button className='play-pause'>Play</button> */}
          
        </div>
      </div>
      <video autoPlay playsInline loop src={movie.url}></video>
      </div>
    </section>
  )
}
