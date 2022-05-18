import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseService } from '../services/firebase.service'
import { userService } from '../services/user.service'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(name, email, password) {
    const { user } = await createUserWithEmailAndPassword(firebaseService.auth, email, password)
    console.log('user',user);
    const userToSave = {
        email: user.email,
        profiles: [
          {
            name,
            image: Math.floor(Math.random() * 6) + 1  
          }
        ]
      }
   userService.save(user.uid, userToSave)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(firebaseService.auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged (firebaseService.auth, async (user) => {
      if(user) {
        const currUser = await userService.getById(user.uid)
        setUser(currUser)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    user,
    signup,
    login,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
