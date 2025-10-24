import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import HeroSection from '../components/home/HeroSection'
import PopularCategories from '../components/home/PopularCategories'
import JobCard from '../components/jobs/JobCard'
import Button from '../components/common/Button'
import axios from 'axios'

const HomePage = () => {
  const [jobs, setJobs] = useState([])
  const [featuredJobs, setFeaturedJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vieclam')
        
        setJobs(response.data)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách công việc:', error)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    if (jobs.length > 0) {
      setFeaturedJobs(jobs.slice(0, 4))
    }
  }, [jobs])
  
  return (
    <div>
      <HeroSection />
      
      {/* Popular Categories Section */}
      <PopularCategories 
        fetchCategories={() => axios.get('http://localhost:8080/api/linhvuc')
          .then(response => response.data)
          .catch(error => {
            console.error('Lỗi khi lấy danh sách lĩnh vực:', error);
            return [];
          })
        }
      />
      
      {/* Featured Jobs Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Featured Jobs
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore our handpicked selection of top opportunities
              </p>
            </div>
            <Link to="/jobs">
              <Button 
                variant="outline"
                className="flex items-center gap-1"
              >
                <span>View All Jobs</span>
                <FiArrowRight />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              How JobHub Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Find your dream job in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StepCard 
              number={1}
              title="Create Your Profile"
              description="Sign up and build your professional profile to showcase your skills and experience."
            />
            <StepCard 
              number={2}
              title="Explore Opportunities"
              description="Search and filter through thousands of jobs that match your skills and preferences."
            />
            <StepCard 
              number={3}
              title="Apply with Ease"
              description="Submit applications with just a few clicks and track your application status."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16 text-white dark:bg-primary-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Find Your Next Career Opportunity?
            </h2>
            <p className="mb-8 text-xl text-primary-100">
              Join thousands of professionals who have found their dream jobs through JobHub.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/jobs">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full border-white bg-transparent text-white hover:bg-white hover:text-primary-600 sm:w-auto"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const StepCard = ({ number, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card relative flex flex-col items-center border border-gray-200 p-8 text-center dark:border-gray-700"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
        {number}
      </div>
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}

export default HomePage