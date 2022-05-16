import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseService } from '../firebase.config'
import { userService } from '../services/user.service'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password, name) {
    const { user } = await createUserWithEmailAndPassword(firebaseService.auth, email, password)
    const userToSave = {
      id: user.uid, 
      email: user.email,
      name
    }
    userService.save(userToSave)
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
