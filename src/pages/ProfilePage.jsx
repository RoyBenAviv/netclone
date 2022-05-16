import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export const ProfilePage = () => {
    const { user } = useAuth()

    return (
        <section className=''>
            <h1>hi {user.email}</h1>
        </section>

    )
}