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
    <section>
      <video autoPlay playsInline muted loop>
        <source src={movie.url} type="video/mp4" />
      </video>
    </section>
  )
}
