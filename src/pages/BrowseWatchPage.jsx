import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { WatchHeader } from '../components/WatchHeader'
import { WatchHero } from '../components/WatchHero'
import { TVCarousel } from '../components/TVCarousel'
import { TopTenTVCarousel } from '../components/TopTenTVCarousel'
import { movieService } from '../services/movies.service'
import { LoadingProfile } from '../components/LoadingProfile'
import { tvShowsService } from '../services/tvshows.service'
import { userService } from '../services/user.service'

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

  const getTopTenTVShows = () => {
    return tvShows.filter((show) => show.isTopTen === true)
  }

  const getDramaTVShows = () => {
    return tvShows.filter((show) => show.genre === 'drama')
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

  const continueToWatch = (mediaId) => {
    const media = tvShows.concat(movies).find(media => media.id === mediaId)
    if (profile.continueToWatch.some(media => media.id === mediaId)) return
    profile.continueToWatch.unshift(media)
    userService.save(null, user)
  }

  const removeFromList = (mediaId) => {
    console.log(mediaId)
  }

  const addToList = (mediaId) => {
    const media = tvShows.concat(movies).find(media => media.id === mediaId)
    if (profile.myList.some(media => media.id === mediaId)) return
    profile.myList.unshift(media)
    userService.save(null, user)
  }

  if (!profile || !movies || !tvShows) return <LoadingProfile profile={profile} />
  return (
    <section className="browse-watch-page">
      <WatchHeader profile={profile} />
      <WatchHero continueToWatch={continueToWatch} media={tvShows[1]}/>
      <TVCarousel profile={profile} addToList={addToList} removeFromList={removeFromList} continueToWatch={continueToWatch} media={getTrendingMovies()} name="Trending Now" />
      {profile.continueToWatch.length ? <TVCarousel profile={profile} addToList={addToList} removeFromList={removeFromList} continueToWatch={continueToWatch} media={profile.continueToWatch} name={`Continue to watch for ${profile.name}`} /> : ''}
      <TVCarousel profile={profile} addToList={addToList} removeFromList={removeFromList} continueToWatch={continueToWatch}  media={getPopularTVShows()} name="Popular TV Shows" />
      <TopTenTVCarousel continueToWatch={continueToWatch} media={getTopTenTVShows()} name="Top 5 TV Shows Today" />
      <TVCarousel profile={profile} addToList={addToList} removeFromList={removeFromList} continueToWatch={continueToWatch}  media={getActionMovies()} name="Action Movies" />
      <TVCarousel profile={profile} addToList={addToList} removeFromList={removeFromList} continueToWatch={continueToWatch} media={getDramaTVShows()} name="Drama TV Shows" />
    </section>
  )
}
