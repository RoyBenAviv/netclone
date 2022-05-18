import React, { useState } from 'react'
import { userService } from '../services/user.service'

export const EditProfile = ({ user, profile, setEditProfile }) => {
  const [currProfile, setCurrProfile] = useState(profile)

  const deleteProfile = () => {
    const filteredProfiles = user.profiles.filter((userProfile) => userProfile !== profile)
    user.profiles = filteredProfiles
    userService.save(null, user)
    setEditProfile(null)
  }

  const onSaveProfile = () => {
    const profileIdx = user.profiles.findIndex((userProfile) => userProfile === profile)
    user.profiles[profileIdx] = currProfile
    userService.save(null, user)
    setEditProfile(null)
  }

  const handleChange = (e) => {
    setCurrProfile({ ...currProfile, [e.target.name]: e.target.value })
  }
  return (
    <section className="edit-profile">
      <header>
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="92.5" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 138">
            <path
              fill="#DB202C"
              d="M340.657 0v100.203c12.36.575 24.687 1.27 36.98 2.09v21.245a1822.444 1822.444 0 0 0-58.542-2.959V0h21.562ZM512 .012l-28.077 65.094l28.07 72.438l-.031.013a1789.409 1789.409 0 0 0-24.576-3.323l-15.763-40.656l-15.913 36.882a1815.88 1815.88 0 0 0-22.662-2.36l27.371-63.43L435.352.013h23.325l14.035 36.184L488.318.012H512ZM245.093 119.526V.011h60.19v21.436h-38.628v27.78h29.227v21.245h-29.227v49.05l-21.562.004ZM164.58 21.448V.01h66.69v21.437h-22.565v98.66c-7.197.19-14.386.412-21.56.683V21.448H164.58ZM90.868 126.966V.014h59.89v21.435h-38.331v29.036c8.806-.113 21.327-.24 29.117-.222V71.51c-9.751-.12-20.758.134-29.117.217v32.164a1848.195 1848.195 0 0 1 38.331-2.62v21.247a1815.638 1815.638 0 0 0-59.89 4.45ZM48.571 77.854L48.57.01h21.562v128.96c-7.882.81-15.75 1.673-23.603 2.584L21.56 59.824v74.802a1834.87 1834.87 0 0 0-21.561 2.936V.012H20.49l28.08 77.842Zm346.854 46.965V.012h21.563V126.6c-7.179-.64-14.364-1.23-21.563-1.78Z"
            />
          </svg>
        </div>
      </header>
      <div className="edit-profile-wrapper">
        <div className="edit-profile-container">
          <h2>Edit Profile</h2>
          <div className="profile">
            <div className='image-wrapper'>
            <img className="profile-image" src={require(`../assets/images/profiles/${profile.image}.png`)} alt="edit-profile-image" />
            {/* <button> */}
              <span>
              <svg width="24%" height="24%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon-edit"><path fillRule="evenodd" clipRule="evenodd" d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z" fill="currentColor"></path></svg>
              </span>

            {/* </button> */}
            </div>
            <div className="input-container">
              <input onChange={handleChange} name="name" type="text" placeholder="Name" value={currProfile.name} />
            </div>
          </div>
          <div className="actions">
            <button onClick={() => onSaveProfile()}>Save</button> <button onClick={() => setEditProfile(null)}>Cancel</button> <button onClick={() => deleteProfile()}>Delete Profile</button>
          </div>
        </div>
      </div>
    </section>
  )
}
