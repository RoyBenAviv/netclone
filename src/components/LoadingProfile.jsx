import React from 'react'
import loading from '../assets/images/loading1.svg'

export const LoadingProfile = ({profile}) => {
    return (
        <div className="loading-profile">
        <div className='image-container'>
          <img className="loading-image" src={loading} alt="loading" />
          {profile ?<img className="profile-image-loading" src={require(`../assets/images/profiles/${profile.image}.png`)} alt="profile-image" /> : ''}
        </div>
      </div>
    )

}