import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiArrowRight } from 'react-icons/fi'
import Button from '../common/Button'

const HeroSection = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (location) params.append('location', location)
    
    navigate({
      pathname: '/jobs',
      search: params.toString()
    })
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white pb-16 pt-24 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1 
            variants={fadeInUp}
            className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            Find Your <span className="text-primary-600 dark:text-primary-400">Dream Job</span> Today
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="mb-8 text-xl text-gray-600 dark:text-gray-300"
          >
            Thousands of jobs from top companies are waiting for you. Start your job search with us today.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Job title, keyword, or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMapPin className="text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                variant="primary"
                className="flex items-center justify-center gap-2"
              >
                <span>Search Jobs</span>
                <FiArrowRight />
              </Button>
            </form>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp} 
            className="mt-6 text-sm text-gray-600 dark:text-gray-400"
          >
            <p>
              Popular searches: Remote, Developer, Marketing, Design, Sales
            </p>
          </motion.div>
        </motion.div>
      </div>
      
     
    </section>
  )
}

export default HeroSection