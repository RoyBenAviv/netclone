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
    const userToSave = {
        email: user.email,
        profiles: [
          {
            name,
            image: Math.floor(Math.random() * 5) + 1  
          }
        ]
      }
    userService.save(user.uid, userToSave)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(firebaseService.auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseService.auth, (user) => {
      setUser(user)
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
