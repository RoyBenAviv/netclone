import React from 'react'
import { useHistory } from 'react-router-dom'

export const WatchHero = ({ continueToWatch, media }) => {
  const history = useHistory()
  const hero = require('../assets/images/hero/' + media.images.hero + '.webp')
  const playMedia = (mediaId) => {
    continueToWatch(mediaId)
    history.push(`/watch/${mediaId}`)
  }

  if (!media) return
  return (
    <section className="watch-hero" style={{ backgroundImage: 'url(' + hero + ')' }}>
      <div className="hero-opacity"></div>
      <div className="inner-hero">
        <img src={require(`../assets/images/logos/${media.images.logo}.png`)} alt="media-logo" />
        <p>{media.information.description}</p>
        <button onClick={() => playMedia(media.id)}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
            <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
          </svg>
          Play
        </button>
      </div>
    </section>
  )
}
