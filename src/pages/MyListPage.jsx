import React, { useEffect, useState } from 'react'
import { LoadingProfile } from '../components/LoadingProfile'
import { WatchHeader } from '../components/WatchHeader'
import { useAuth } from '../contexts/AuthContext'
import plusIcon from '../assets/images/plus.png'
import chevronIcon from '../assets/images/chevron.png'
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
              <div className="content">
                <div className="actions">
                  <div className="left">
                    <button onClick={() => playMedia(media.id)} className="play">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
                        <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                      </svg>
                    </button>
                    <div className="add-container">
                      <span className='tooltip'>Add to My List</span>
                      <button className="add">
                        <img src={plusIcon} alt="plus" />
                      </button>
                    </div>
                  </div>
                  <div className="right">
                    <div className='info-container'>
                    <span className='tooltip'>{'Episodes & info'}</span>
                    <button className="info-btn">
                      <img src={chevronIcon} alt="chevron" />
                    </button>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  <div className="genre">{media.genre.charAt(0).toUpperCase() + media.genre.slice(1)}</div>
                  <div className="age">{media.age}+</div>
                  <div className="match">99% Match</div>
                  <div className="hd">HD</div>
                </div>
              </div>
            </div>
))}
</div>
</div>
  </section>
}
