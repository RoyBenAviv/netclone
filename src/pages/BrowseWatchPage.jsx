import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { WatchHeader } from '../components/WatchHeader'
import { WatchHero } from '../components/WatchHero'
import { TVCarousel } from '../components/TVCarousel.jsx'
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

  if (!profile || !movies || !tvShows) return <LoadingProfile profile={profile} />
  return (
    <section className="browse-watch-page">
      <WatchHeader profile={profile} />
      <WatchHero continueToWatch={continueToWatch} media={tvShows[1]}/>
      <TVCarousel continueToWatch={continueToWatch} media={getTrendingMovies()} name="Tranding Now" />
      {profile.continueToWatch.length ? <TVCarousel continueToWatch={continueToWatch} media={profile.continueToWatch} name={`Continue to watch for ${profile.name}`} /> : ''}
      <TVCarousel continueToWatch={continueToWatch} media={getActionMovies()} name="Action Movies" />
      <TVCarousel continueToWatch={continueToWatch} media={getPopularTVShows()} name="Popular TV Shows" />
      {/* <svg id="rank-1" width="100%" height="100%" viewBox="-20 0 70 154" class="svg-icon svg-icon-rank-1 top-10-rank"><path stroke="#595959" stroke-LineJoin="square" strokeWidth="4" d="M35.377 152H72V2.538L2 19.362v30.341l33.377-8.459V152z"></path></svg> */}
    </section>
  )
}
