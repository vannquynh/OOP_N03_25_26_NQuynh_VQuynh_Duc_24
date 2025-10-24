import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiBriefcase, FiUser, FiBookmark, FiMenu, FiX } from 'react-icons/fi'
import Logo from '../common/Logo'

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [sessionStorage.getItem('token')])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    sessionStorage.clear() 
    setIsLoggedIn(false)
    navigate('/login') 
  }

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md dark:bg-gray-800' 
          : 'bg-white/80 backdrop-blur-sm dark:bg-gray-800/80'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-gray-900 dark:text-white">JobHub</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            <NavItem to="/jobs" icon={<FiSearch />} label="Find Jobs" />
            <NavItem to="/companies" icon={<FiBriefcase />} label="Companies" />
            {isLoggedIn ? (
              <>
                <NavItem to="/profile" icon={<FiUser />} label="Profile" />
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="btn-primary ml-2"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className="btn-primary ml-2"
                  onClick={() => sessionStorage.clear()} 
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="flex items-center justify-center rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="absolute top-16 left-0 z-40 w-full bg-white shadow-lg dark:bg-gray-800 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="container mx-auto py-4 px-4">
            <ul className="flex flex-col gap-4">
              <MobileNavItem to="/jobs" icon={<FiSearch />} label="Find Jobs" onClick={toggleMenu} />
              <MobileNavItem to="/companies" icon={<FiBriefcase />} label="Companies" onClick={toggleMenu} />
              <MobileNavItem to="/saved-jobs" icon={<FiBookmark />} label="Saved Jobs" onClick={toggleMenu} />
              {isLoggedIn ? (
                <>
                  <MobileNavItem to="/profile" icon={<FiUser />} label="Profile" onClick={toggleMenu} />
                  <li className="border-t border-gray-100 pt-4 dark:border-gray-700">
                    <button 
                      onClick={() => {
                        handleLogout()
                        toggleMenu()
                        }} 
                        className="btn-primary block w-full text-center"
                      >
                        Log out
                      </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <MobileNavItem to="/profile" icon={<FiUser />} label="Profile" onClick={toggleMenu} />
                      <li className="border-t border-gray-100 pt-4 dark:border-gray-700">
                        <Link 
                          to="/login" 
                          className="btn-primary block w-full text-center"
                          onClick={() => {
                            sessionStorage.clear()
                            toggleMenu()
                          }}
                        >
                          Log In
                        </Link>
                      </li>
                    </>
                  )}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

const NavItem = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink 
        to={to}
        className={({ isActive }) => 
          `flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors ${
            isActive 
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30'
          }`
        }
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    </li>
  )
}

const MobileNavItem = ({ to, icon, label, onClick }) => {
  return (
    <li>
      <NavLink 
        to={to}
        className={({ isActive }) => 
          `flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
            isActive 
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30'
          }`
        }
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    </li>
  )
}

export default Navbar