import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from "./firebase"
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore"

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({})

  let signUp = (email, pass) => {
    createUserWithEmailAndPassword(auth, email, pass)
    setDoc(doc(db, 'users', email), {
      watchlist: []
    })
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
