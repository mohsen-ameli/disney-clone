import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from "./firebase"
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({})

  let signUp = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass)
  }

  let logIn = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass)
  }

  let logOut = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => unsub()
  })

  let value = { user, logOut, signUp, logIn }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function UserAuth() {
  return useContext(AuthContext)
}
