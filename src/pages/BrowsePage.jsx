import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { userService } from '../services/user.service'
import { WhosWatching } from '../components/WhosWatching.jsx'

export const BrowsePage = () => {
  const { user } = useAuth()
  const [currUser, setCurrUser] = useState('')

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const currUser = await userService.getById(user.uid)
    setCurrUser(currUser)
  }

  if (!currUser) return
  return ( 
    <section className='browse-page'>
      <WhosWatching currUser={currUser}/>
    </section>
  )
}
