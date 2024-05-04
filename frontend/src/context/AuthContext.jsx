import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkUser = () => {
    const user = localStorage.getItem('user')
    return user
  }

  const login = (user) => {
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
  }

  const validateToken = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      logout()
      return false
    }

    try {
      const response = await fetch('http://localhost:3000/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        logout()
        return false
      }

      return true
    } catch (error) {
      console.error('Error validating token:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, validateToken }}>
      {children}
    </AuthContext.Provider>
  )
}
