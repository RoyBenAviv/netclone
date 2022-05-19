import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { WatchHeader } from '../components/WatchHeader'
import { WatchHero } from '../components/WatchHero'
import { TVCarousel } from '../components/TVCarousel.jsx'
import { movieService } from '../services/movies.service'
import { LoadingProfile } from '../components/LoadingProfile'

export const BrowseWatchPage = ({match}) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState()
  const [movies, setMovies] = useState()

  useEffect(() => {
    loadProfile()
    loadMovies()
  }, [])

  const loadMovies = async () => {
    const movies = await movieService.query()
    setMovies(movies)
  }

  const getTrendingMovies = () => {
        return movies.filter(movie => movie.isTranding === true)
  }

  const getActionMovies = () => {
    return movies.filter(movie => movie.genre === 'action')
  }

  const loadProfile = () => {
    const id = match.params.id
    const profile = user.profiles.find((profile) => profile.id === id)
    setProfile(profile)
  }

  if (!profile || !movies) return <LoadingProfile profile={profile} />  
  return (
    <section className="browse-watch-page">
      <WatchHeader profile={profile} />
      <WatchHero />
      <TVCarousel movies={getTrendingMovies()} name="Tranding Now" />
      <TVCarousel movies={getActionMovies()} name="Action Movies" />
    </section>
  )
}
