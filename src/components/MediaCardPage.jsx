import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { movieService } from '../services/movies.service'
import { tvShowsService } from '../services/tvshows.service'
import { userService } from '../services/user.service'

export const MediaCardPage = ({ match }) => {
  const [profile, setProfile] = useState()
  const [media, setMedia] = useState()
  const history = useHistory()
  const { user } = useAuth()

  useEffect(() => {
    loadMedia()
    loadProfile()
  })

  const onBack = (event) => {
    event.stopPropagation()
    history.goBack()
  }

  const playMedia = () => {
    continueToWatch(media)
    history.push(`/watch/${media.id}`)
  }

  const continueToWatch = (media) => {
    if (profile.continueToWatch.some((currMedia) => currMedia.id === media.id)) return
    profile.continueToWatch.unshift(media)
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

  if (!media) return
  return (
      <section className="media-card">
      <div className="card">
        <div onClick={() => playMedia()} className="video-container">
          <div className="background"></div>
          <button onClick={(event) => onBack(event)} className="back">
            &#10005;
          </button>
          <img className="media-logo" src={require(`../assets/images/logos/${media.images.logo}.png`)} alt="media-logo" />
          <video autoPlay muted src={media.url}></video>
        </div>
      </div>
    </section>
  )
}
