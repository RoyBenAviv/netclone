import React, { useEffect, useState } from 'react'
import { LoadingProfile } from '../components/LoadingProfile'
import { WatchHeader } from '../components/WatchHeader'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export const MyListPage = ({ match }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState()

  const history = useHistory()
  const playMedia = (mediaId) => {
    history.push(`/watch/${mediaId}`)
  }
  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = () => {
    const id = match.params.id
    const profile = user.profiles.find((profile) => profile.id === id)
    setProfile(profile)
  }

  if (!profile) return <LoadingProfile profile={profile} />
  return <section className='my-list-page'>
      <WatchHeader profile={profile} />
      <div className='my-list-wrapper'>

      
      <h3>My List</h3>
      <div className='my-list-container'>
      {profile.myList.map((media) => (
        <div key={media.id} className="media-container">
              <img onClick={() => playMedia(media.id)} className='media-image' src={require(`../assets/images/media/${media.images.small}.jpg`)} alt="movie" />
              </div>
))}
</div>
</div>
  </section>
}
