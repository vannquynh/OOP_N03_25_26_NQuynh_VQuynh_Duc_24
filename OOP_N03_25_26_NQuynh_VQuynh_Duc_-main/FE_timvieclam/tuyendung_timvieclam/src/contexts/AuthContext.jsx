import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (user && token) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    } else if (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/register-success') {
      // Allow access to login and register pages even if not authenticated.
      navigate('/login')
    }
    setLoading(false)
  }, [navigate, location.pathname])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const response = await loginUser(credentials)
      const userData = response.data
      setCurrentUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', userData.token)
      toast.success('Login successful')
      navigate('/')
      return true
    } catch (error) {
      // alert('Login error:', error)
      alert('Đăng nhập thất bại: ' + error.response?.data?.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    toast.info('Logged out successfully')
    navigate('/login')
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}