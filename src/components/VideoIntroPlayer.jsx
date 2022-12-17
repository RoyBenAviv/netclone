import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import introVideo from '../assets/videos/intro.mp4'
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from '../assets/animations/netflix-animation.json'
export const VideoIntroPlayer = () => {
  const videoRef = useRef()
  const animationRef = useRef()
  const history = useHistory()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
      videoRef.current.onended = async () => {
        history.push('/browse')
      }
    } else if(animationRef.current) {
      setTimeout(() => {
        history.push('/browse')
      },5000)
    }
      
  }, [])

  // const getDefaultOptions = () => {
  //   return {
  //     loop: true,
  //     autoplay: true,
  //     animationData    
  //   }
  // }

  return (
    <section className="video-intro-player">
      <div className="video-container">
        {window.matchMedia('(min-width: 800px)').matches ? (
          <video ref={videoRef} playsInline>
            <source src={introVideo} type="video/mp4" />
          </video>
        ) : <Player ref={animationRef} autoplay src={animationData} />}
      </div>
    </section>
  )
}
