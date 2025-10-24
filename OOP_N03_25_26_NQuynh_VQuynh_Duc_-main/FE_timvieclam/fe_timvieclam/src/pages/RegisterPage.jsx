import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import Button from '../components/common/Button'
import axios from 'axios'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp')
      setLoading(false)
      return
    }
    
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        id: crypto.randomUUID(), // cần tạo id ngẫu nhiên
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'USER', // mặc định role là USER
        createdAt: new Date(),
        updatedAt: new Date(),
        phone: ''
      })

      // Đăng ký thành công -> chuyển trang login
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError('Đăng ký thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
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
            <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Tạo tài khoản</h1>
            <p className="text-gray-600 dark:text-gray-400">Tham gia cộng đồng việc làm</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Họ và tên
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="input pl-10"
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
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
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mật khẩu
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
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Xác nhận mật khẩu
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="input pl-10"
                  placeholder="Xác nhận lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
            )}
            
            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
              >
                Đăng ký
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{' '}
              <Link 
                to="/login" 
                className="font-medium text-primary-600 hover:underline dark:text-primary-400"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
          
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
