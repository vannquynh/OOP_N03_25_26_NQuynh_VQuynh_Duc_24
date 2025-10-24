import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock } from 'react-icons/fi'
import Button from '../components/common/Button'
import { useUser } from '../hooks/useUser'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')  // Reset lỗi khi người dùng thay đổi giá trị input
  }

  const login = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Invalid email or password')  // Lỗi nếu email hoặc mật khẩu sai
      }

      const data = await response.json()
      sessionStorage.setItem('token', data.token)  // Lưu token vào sessionStorage
      sessionStorage.setItem('email', formData.email) 
      return true
    } catch (error) {
      console.error(error)
      return false  // Trả về false nếu có lỗi xảy ra
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')  // Reset lỗi khi người dùng nhấn nút submit

    try {
      const success = await login(formData)  // Gọi API login và chờ kết quả
      if (success) {
        navigate('/profile')  // Nếu login thành công, chuyển hướng tới trang profile
      } else {
        setError('Invalid email or password')  // Nếu login thất bại, hiển thị thông báo lỗi
      }
    } catch (err) {
      setError('An error occurred. Please try again.')  // Xử lý lỗi ngoài ý muốn
    } finally {
      setLoading(false)  // Đảm bảo rằng trạng thái loading được cập nhật sau khi hoàn thành
    }
  }
  
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="input pl-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-error-600 dark:text-error-400">{error}</p>  // Hiển thị thông báo lỗi nếu có
            )}
            
            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}  // Hiển thị trạng thái loading khi đang gửi request
              >
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-medium text-primary-600 hover:underline dark:text-primary-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
