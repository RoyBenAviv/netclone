import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { WatchHeader } from '../components/WatchHeader'
import { WatchHero } from '../components/WatchHero'

export const BrowseWatchPage = (props) => {
    const { user } = useAuth();
    const [profile, setProfile] = useState()

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        const id = props.match.params.id
        const profile = user.profiles.find(profile => profile.id === id)
        setProfile(profile)
    }
    if(!profile) return
    return (
        <section className="browse-watch-page">
            <WatchHeader profile={profile}/>
            <WatchHero />
        </section>
    )
}