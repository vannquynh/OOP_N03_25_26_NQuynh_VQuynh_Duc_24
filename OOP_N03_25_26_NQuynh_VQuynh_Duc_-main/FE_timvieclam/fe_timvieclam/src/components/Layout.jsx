import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './navigation/Navbar'
import Footer from './navigation/Footer'
import MobileNav from './navigation/MobileNav'

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Listen for scroll events to update the navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar isScrolled={isScrolled} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}

export default Layout