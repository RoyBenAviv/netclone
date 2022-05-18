import React from 'react'
import vikingsLogo from '../assets/images/hero/vikings-logo.webp'
export const WatchHero = () => {

    return (
        <section className='watch-hero'>
            <div className='hero-opacity'></div>
            <div className="inner-hero">
                <img src={vikingsLogo} alt="vikings-logo" />
                <p>In this sequel to "Vikings," a hundred years have passed and a new generation of legendary heroes arises to forge its own destiny — and make history.</p>

            </div>

        </section>
    )

}