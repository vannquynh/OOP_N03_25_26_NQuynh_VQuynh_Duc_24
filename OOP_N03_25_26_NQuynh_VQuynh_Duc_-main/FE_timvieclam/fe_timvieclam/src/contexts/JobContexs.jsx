import { createContext, useState, useEffect } from 'react'
import { mockJobs } from '../data/mockJobs'

export const JobContext = createContext()

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // Simulate API fetch
    const fetchJobs = async () => {
      try {
        // In a real app, this would be an API call
        setJobs(mockJobs)
        
        // Load saved jobs from localStorage
        const savedFromStorage = localStorage.getItem('savedJobs')
        if (savedFromStorage) {
          setSavedJobs(JSON.parse(savedFromStorage))
        }
        
        setLoading(false)
      } catch (err) {
        setError('Failed to load jobs. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchJobs()
  }, [])
  
  const getJobById = (id) => {
    return jobs.find(job => job.id === id)
  }
  
  const getJobsByCompany = (companyId) => {
    return jobs.filter(job => job.company.id === companyId)
  }
  
  const getFilteredJobs = (filters) => {
    return jobs.filter(job => {
      // Search by title or company
      if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !job.company.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      
      // Filter by location
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      
      // Filter by job type
      if (filters.jobType.length > 0 && !filters.jobType.includes(job.type)) {
        return false
      }
      
      // Filter by experience
      if (filters.experience.length > 0 && !filters.experience.includes(job.experience)) {
        return false
      }
      
      // Filter by salary range
      if (filters.salary && job.salaryNumeric) {
        const [min, max] = filters.salary.split('-').map(Number)
        if (job.salaryNumeric < min || job.salaryNumeric > max) {
          return false
        }
      }
      
      return true
    })
  }
  
  const toggleSavedJob = (jobId) => {
    setSavedJobs(prev => {
      let updated
      if (prev.includes(jobId)) {
        updated = prev.filter(id => id !== jobId)
      } else {
        updated = [...prev, jobId]
      }
      
      // Save to localStorage
      localStorage.setItem('savedJobs', JSON.stringify(updated))
      return updated
    })
  }
  
  const isJobSaved = (jobId) => {
    return savedJobs.includes(jobId)
  }
  
  const getSavedJobs = () => {
    return jobs.filter(job => savedJobs.includes(job.id))
  }
  
  const value = {
    jobs,
    loading,
    error,
    getJobById,
    getJobsByCompany,
    getFilteredJobs,
    toggleSavedJob,
    isJobSaved,
    getSavedJobs
  }
  
  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
} 