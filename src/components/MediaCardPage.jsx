import React, {useEffect, useState} from 'react'
import { movieService } from '../services/movies.service'
import { tvShowsService } from '../services/tvshows.service'


export const MediaCardPage = ({match}) => {

    const [media, setMedia] = useState(null)


    useEffect(() => {
        loadMedia()
    })

    const loadMedia = async () => {
        const movies = await movieService.query()
        const shows = await tvShowsService.query()
        const medias = movies.concat(shows)
        const media = medias.find((media) => media.id === match.params.mediaId)
        setMedia(media)
    }
    if (!media) return
    return (
        <section className='media-card'>
            <div className='card'>
            <div className='video-container'>
                <div className='background'></div>
                <img className='media-logo' src={require(`../assets/images/logos/${media.images.logo}.png`)} alt="media-logo" />
            <video autoPlay muted src={media.url}></video>
            </div>
            </div>
        </section>
    )
}