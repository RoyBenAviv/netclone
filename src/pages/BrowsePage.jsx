import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { WhosWatching } from '../components/WhosWatching.jsx'

export const BrowsePage = () => {
  const { user } = useAuth()

  if (!user) return
  return ( 
    <section className='browse-page'>
      <WhosWatching user={user}/>
    </section>
  )
}
