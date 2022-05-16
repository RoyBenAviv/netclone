import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    console.log(unsubscribe)
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
  }

  return (<AuthContext.Provider value={value}>
      {children}
      </AuthContext.Provider>)
}
