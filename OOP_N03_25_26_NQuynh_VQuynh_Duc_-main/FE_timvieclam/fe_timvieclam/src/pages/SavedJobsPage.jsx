import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JobCard from '../components/jobs/JobCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useJob } from '../hooks/useJob'

const SavedJobsPage = () => {
  const { loading, getSavedJobs } = useJob()
  const [savedJobs, setSavedJobs] = useState([])
  
  useEffect(() => {
    setSavedJobs(getSavedJobs())
  }, [getSavedJobs])
  
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        Saved Jobs
      </h1>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {savedJobs.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {savedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </motion.div>
          ) : (
            <div className="rounded-lg bg-white p-12 text-center shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                No saved jobs yet
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                As you browse jobs, click the bookmark icon to save jobs you're interested in.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a 
                  href="/jobs" 
                  className="btn-primary inline-block"
                >
                  Browse Jobs
                </a>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SavedJobsPage