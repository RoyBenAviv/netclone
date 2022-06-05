import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseService } from '../services/firebase.service'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(name, email, password, show) {
    const { user } = await createUserWithEmailAndPassword(firebaseService.auth, email, password)
    const userToSave = {
        email: user.email,
        favoriteShow: show,
        profiles: [
          {
            id: utilService.makeId(),
            name,
            image: Math.floor(Math.random() * 6) + 1,
            myList: [],
            continueToWatch: []
          }
        ]
      }
   userService.save(user.uid, userToSave)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(firebaseService.auth, email, password)
  }

  function logout() {
    return firebaseService.auth.signOut()
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
    logout
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
