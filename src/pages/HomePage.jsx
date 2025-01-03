import React, { useRef, useState } from 'react'
import { HomeHeader } from '../components/HomeHeader'
import { VideoIntroPlayer } from '../components/VideoIntroPlayer'
import tvImg from '../assets/images/tv.png'
import deviceImg from '../assets/images/device-pile.png'
import mobileImg from '../assets/images/mobile.jpg'
import downloadIcon from '../assets/images/download-icon.gif'
import loadingButtonImg from '../assets/images/loading.svg'
import { useAuth } from '../contexts/AuthContext.jsx'

export const HomePage = () => {
  const { login } = useAuth()
  const mainRef = useRef()
  const [isLoading, setisLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const guestLogin = async () => {
    setisLoading(true) 
    try {
      await login(process.env.REACT_APP_USER_EMAIL, process.env.REACT_APP_USER_PASSWORD)
      setIsLoggedIn(true)
    } catch (err) {
      console.error(err)
    } finally {
      setisLoading(false)
    }
  }

  if (isLoggedIn) return <VideoIntroPlayer />
  return (
    <main ref={mainRef} className="home-page">
      <section className="hero">
        <HomeHeader />
        <div className="hero-inside">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>Ready to watch? You can start as a guest without signing up.</h3>
          <button style={{ backgroundColor: isLoading ? '#e509146c' : '' }} onClick={() => guestLogin()}>
            {isLoading ? (
              <img src={loadingButtonImg} alt="loading" />
            ) : (
              <>
                Start as a guest
                <svg width="25" height="25" viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z" fill="#ffffff" fillRule="evenodd"></path>
                </svg>
              </>
            )}
          </button>
        </div>
      </section>
      <section className="home-page-content">
        <div className="content-wrapper">
          <div className="content">
            <div className="text">
              <h1>Enjoy on your TV.</h1>
              <h3>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h3>
            </div>
            <div className="content-img-wrapper">
              <div className="content-img">
                <img className="main-img" src={tvImg} alt="homepage-video" />
                <div className="video-container">
                  <video autoPlay playsInline muted loop>
                    <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content mobile">
            <div className="content-img-wrapper ">
              <div className="content-img">
                <img className="main-img" src={mobileImg} alt="mobile-img" />
                <div className="download-animation">
                  <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="stranger-things" />
                  <p>Downloading...</p>
                  <img src={downloadIcon} alt="download" />
                </div>
              </div>
            </div>
            <div className="text">
              <h1>Download your shows to watch offline.</h1>
              <h3>Save your favorites easily and always have something to watch.</h3>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content">
            <div className="text">
              <h1>Watch everywhere.</h1>
              <h3>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</h3>
            </div>
            <div className="content-img-wrapper">
              <div className="content-img">
                <img className="main-img" src={deviceImg} alt="homepage" />
                <div className="second-video-container">
                  <video autoPlay playsInline muted loop>
                    <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
