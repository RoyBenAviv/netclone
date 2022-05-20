import React from 'react'

export const WatchHero = ({media}) => {

   const hero = require('../assets/images/hero/' + media.images.hero + '.webp')

    if(!media) return
    return (
        <section className='watch-hero' style={{ backgroundImage: "url(" + hero + ")" }}>
            <div className='hero-opacity'></div>
            <div className="inner-hero">
            <img src={require(`../assets/images/hero/${media.images.logo}.webp`)} alt="media-logo-image" />
                <p>{media.description}</p>

            </div>

        </section>
    )

}