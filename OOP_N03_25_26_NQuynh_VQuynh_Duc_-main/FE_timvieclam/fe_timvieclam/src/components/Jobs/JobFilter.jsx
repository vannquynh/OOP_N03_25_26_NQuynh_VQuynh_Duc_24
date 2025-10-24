import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiFilter, FiX } from 'react-icons/fi'
import Button from '../common/Button'
import axios from 'axios'

const JobFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: [],
    experience: [],
    salary: ''
  })
  const [jobTypes, setJobTypes] = useState([])

  useEffect(() => {
    // Fetch job types from API
    const fetchJobTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/loaiviec')
        setJobTypes(response.data.map(item => item.ten_loai_viec))
      } catch (error) {
        console.error('Failed to fetch job types:', error)
      }
    }
    fetchJobTypes()
  }, [])

  useEffect(() => {
    // Debounce to avoid too many filter changes
    const timer = setTimeout(() => {
      onFilterChange(filters)
    }, 300)

    return () => clearTimeout(timer)
  }, [filters, onFilterChange])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const updated = [...prev[category]]

      if (updated.includes(value)) {
        return { ...prev, [category]: updated.filter(item => item !== value) }
      } else {
        return { ...prev, [category]: [...updated, value] }
      }
    })
  }

  const handleClearAll = () => {
    setFilters({
      search: '',
      location: '',
      jobType: [],
      experience: [],
      salary: ''
    })
  }

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mb-8 rounded-xl bg-white shadow-md dark:bg-gray-800">
      <div className="p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-8">
          {/* Search Field */}
          <div className="relative md:col-span-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Job title, keyword, or company"
              className="input pl-10"
              value={filters.search}
              onChange={handleInputChange}
            />
          </div>

          {/* Location Field */}
          <div className="relative md:col-span-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiMapPin className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              placeholder="City, state, or remote"
              className="input pl-10"
              value={filters.location}
              onChange={handleInputChange}
            />
          </div>

          {/* Filter Button */}
          <div className="md:col-span-1">
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2"
              onClick={toggleFilters}
            >
              <FiFilter />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Advanced Filters</h3>
              <Button
                variant="text"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleClearAll}
              >
                <FiX size={14} />
                <span>Clear All</span>
              </Button>
            </div>

            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {/* Job Types */}
              <div>
                <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">Job Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                        checked={filters.jobType.includes(type)}
                        onChange={() => handleCheckboxChange('jobType', type)}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default JobFilter
