import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is already logged in via localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])
  
  const login = (userData) => {
    // In a real app, this would validate with a backend
    // Here we're just simulating a successful login
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }
  
  const register = (userData) => {
    // In a real app, this would send data to a backend
    // Here we're just simulating a successful registration
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`, // Simulated user ID
      applications: [],
      savedJobs: []
    }
    
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    return true
  }
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }
  
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }
  
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}