import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
})

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginHandler = (email, password) => {
    // Mock auth
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem('isLoggedIn')

    if (isLoggedInStorage === '1') {
      setIsLoggedIn(true)
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {children}
    </AuthContext.Provider>
  )
}
