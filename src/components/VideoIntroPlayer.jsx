import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import introVideo from '../assets/videos/intro.mp4'

export const VideoIntroPlayer = () => {
    const videoRef = useRef()
    const history = useHistory()

    useEffect(() => {
        videoRef.current.play()
        videoRef.current.onended = async () => {
          history.push('/browse')
        }
    }, [])
    
  return (
    <section className='video-intro-player'>
          <div className="video-container">
      <video ref={videoRef} playsInline>
        <source src={introVideo} type="video/mp4" />
      </video>
    </div>
    </section>
  )
}
