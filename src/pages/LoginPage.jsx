import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import backgroundImg from '../assets/images/homepage-background.jpg'
import loadingButtonImg from '../assets/images/loading.svg'
import { VideoIntroPlayer } from '../components/VideoIntroPlayer'

export const LoginPage = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [passwordType, setPasswordType] = useState('password')
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setisLoading(true)
    try {
      setError('')
      await login(emailRef.current.value, passwordRef.current.value)
      setIsLoggedIn(true)
    } catch {
      setError('Sorry, we failed to login. Please try again.')
    } finally {
      setisLoading(false)
    }
  }

  const revealPassword = async () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }

  if(isLoggedIn) return <VideoIntroPlayer />
  return (
    <section className="login-page">
      <img className="background-img" src={backgroundImg} alt="background" />
      <header>
        <Link to="/">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="167" height="45" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 138">
              <path
                fill="#DB202C"
                d="M340.657 0v100.203c12.36.575 24.687 1.27 36.98 2.09v21.245a1822.444 1822.444 0 0 0-58.542-2.959V0h21.562ZM512 .012l-28.077 65.094l28.07 72.438l-.031.013a1789.409 1789.409 0 0 0-24.576-3.323l-15.763-40.656l-15.913 36.882a1815.88 1815.88 0 0 0-22.662-2.36l27.371-63.43L435.352.013h23.325l14.035 36.184L488.318.012H512ZM245.093 119.526V.011h60.19v21.436h-38.628v27.78h29.227v21.245h-29.227v49.05l-21.562.004ZM164.58 21.448V.01h66.69v21.437h-22.565v98.66c-7.197.19-14.386.412-21.56.683V21.448H164.58ZM90.868 126.966V.014h59.89v21.435h-38.331v29.036c8.806-.113 21.327-.24 29.117-.222V71.51c-9.751-.12-20.758.134-29.117.217v32.164a1848.195 1848.195 0 0 1 38.331-2.62v21.247a1815.638 1815.638 0 0 0-59.89 4.45ZM48.571 77.854L48.57.01h21.562v128.96c-7.882.81-15.75 1.673-23.603 2.584L21.56 59.824v74.802a1834.87 1834.87 0 0 0-21.561 2.936V.012H20.49l28.08 77.842Zm346.854 46.965V.012h21.563V126.6c-7.179-.64-14.364-1.23-21.563-1.78Z"
              />
            </svg>
          </div>
        </Link>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          {error && <div className='error'>{error}</div>}
          <label>
            Email
            <input ref={emailRef} type="email" />
          </label>
          <label>
            Password
            <input ref={passwordRef} type={passwordType} />
            <span onClick={() => revealPassword()}>{passwordType === 'password' ? 'show' : 'hide'}</span>
          </label>

          <button style={{ backgroundColor: isLoading ? '#e509146c' : '' }}>{isLoading ? <img src={loadingButtonImg} alt="loading" /> : 'Sign In'}</button>
          <p>
            New to Netflix? <Link to="/signup">Sign up now</Link>.
          </p>
        </form>
      </div>
      <footer>
        <div>
          <p>Netflix clone made by Roy Ben Aviv</p>
        </div>
      </footer>
    </section>
  )
}
