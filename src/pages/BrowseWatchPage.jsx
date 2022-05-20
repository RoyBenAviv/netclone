import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { WatchHeader } from '../components/WatchHeader'
import { WatchHero } from '../components/WatchHero'
import { TVCarousel } from '../components/TVCarousel.jsx'
import { movieService } from '../services/movies.service'
import { LoadingProfile } from '../components/LoadingProfile'
import { tvShowsService } from '../services/tvshows.service'

export const BrowseWatchPage = ({ match }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState()
  const [movies, setMovies] = useState()
  const [tvShows, setTvShows] = useState()

  useEffect(() => {
    loadProfile()
    loadMovies()
    loadTvShows()
  }, [])

  const loadMovies = async () => {
    const movies = await movieService.query()
    setMovies(movies)
  }

  const loadTvShows = async () => {
    const shows = await tvShowsService.query()
    setTvShows(shows)
  }

  const getTrendingMovies = () => {
    return movies.filter((movie) => movie.isTranding === true)
  }

  const getActionMovies = () => {
    return movies.filter((movie) => movie.genre === 'action')
  }

  const getPopularTVShows = () => {
    return tvShows.filter((show) => show.isPopular === true)
  }

  const loadProfile = () => {
    const id = match.params.id
    const profile = user.profiles.find((profile) => profile.id === id)
    setProfile(profile)
  }

  if (!profile || !movies || !tvShows) return <LoadingProfile profile={profile} />
  return (
    <section className="browse-watch-page">
      <WatchHeader profile={profile} />
      <WatchHero media={tvShows[0]}/>
      <TVCarousel media={getTrendingMovies()} name="Tranding Now" />
      <TVCarousel media={getActionMovies()} name="Action Movies" />
      <TVCarousel media={getPopularTVShows()} name="Popular TV Shows" />
    </section>
  )
}
