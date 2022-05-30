import React, { useEffect, useRef, useState } from 'react'

export const WatchHeader = ({profile}) => {

  const headerRef = useRef()
  const [isOptionsShown, setIsOptionsShown] = useState(false)
  useEffect(() => {
    window.onscroll = () => {
      if(window.scrollY > 10) {
        headerRef.current.style.backgroundColor = 'black'
      } else {
        headerRef.current.style.backgroundColor = 'transparent'
      }
    }

  })

  return (
    <header ref={headerRef} className='watch-header'>
      <div className="left-header">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="92.5" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 138">
            <path
              fill="#DB202C"
              d="M340.657 0v100.203c12.36.575 24.687 1.27 36.98 2.09v21.245a1822.444 1822.444 0 0 0-58.542-2.959V0h21.562ZM512 .012l-28.077 65.094l28.07 72.438l-.031.013a1789.409 1789.409 0 0 0-24.576-3.323l-15.763-40.656l-15.913 36.882a1815.88 1815.88 0 0 0-22.662-2.36l27.371-63.43L435.352.013h23.325l14.035 36.184L488.318.012H512ZM245.093 119.526V.011h60.19v21.436h-38.628v27.78h29.227v21.245h-29.227v49.05l-21.562.004ZM164.58 21.448V.01h66.69v21.437h-22.565v98.66c-7.197.19-14.386.412-21.56.683V21.448H164.58ZM90.868 126.966V.014h59.89v21.435h-38.331v29.036c8.806-.113 21.327-.24 29.117-.222V71.51c-9.751-.12-20.758.134-29.117.217v32.164a1848.195 1848.195 0 0 1 38.331-2.62v21.247a1815.638 1815.638 0 0 0-59.89 4.45ZM48.571 77.854L48.57.01h21.562v128.96c-7.882.81-15.75 1.673-23.603 2.584L21.56 59.824v74.802a1834.87 1834.87 0 0 0-21.561 2.936V.012H20.49l28.08 77.842Zm346.854 46.965V.012h21.563V126.6c-7.179-.64-14.364-1.23-21.563-1.78Z"
            />
          </svg>
        </div>
        <nav>
            <a>Home</a>
            <a>My List</a>
        </nav>
      </div>
      <div className='right-header'>
          <button  className="search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon"><path fillRule="evenodd" clipRule="evenodd" d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 18.7028L22.7468 21.2972L14.0425 16.2431Z" fill="currentColor"></path></svg></button>
          <div onMouseLeave={() => setIsOptionsShown(false)} onMouseOver={() => setIsOptionsShown(true)} className='profile-container'>
          <img    className="profile-image" src={require(`../assets/images/profiles/${profile.image}.png`)} alt="profile-image" />
            {isOptionsShown ? <div onMouseOver={() => setIsOptionsShown(true)} className='options'>asdasdasdasd</div> : null}
          </div>
      </div>
    </header>
  )
}
