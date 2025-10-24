import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JobCard from '../components/jobs/JobCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useSearchParams } from 'react-router-dom'

const JobListByCategoryPage = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
 const categoryName = searchParams.get('name') || ''
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobsByCategory = async () => {
      try {
        setLoading(true)
        const url = `http://localhost:8080/api/vieclam/search?category=${category}`
        const response = await fetch(url)
        const data = await response.json()
        setJobs(data)
      } catch (error) {
        console.error('Error fetching jobs by category:', error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchJobsByCategory()
    }
  }, [category])

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        Danh sách công việc trong lĩnh vực {categoryName}
      </h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{jobs.length}</span> jobs found
            </p>
          </div>

          {jobs.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {jobs.map(job => (
                <JobCard key={job.ma_viec_lam} job={job} />
              ))}
            </motion.div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                No jobs found in this category
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please check back later for new opportunities.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default JobListByCategoryPage
