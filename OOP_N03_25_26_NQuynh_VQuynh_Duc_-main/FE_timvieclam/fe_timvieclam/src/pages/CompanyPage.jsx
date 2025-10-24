import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiMapPin, FiUsers, FiBriefcase } from 'react-icons/fi'
import JobCard from '../components/jobs/JobCard'
import Button from '../components/common/Button'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useJob } from '../hooks/useJob'

const CompanyPage = () => {
  const { id } = useParams()
  const { jobs, getJobsByCompany } = useJob()
  const [company, setCompany] = useState(null)
  const [companyJobs, setCompanyJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/doanhnghiep/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch company details')
      }
      const data = await response.json()
      setCompany({
        name: data.ten_doanh_nghiep,
        location: data.tinh,
        employees: data.quy_mo_nhan_su,
        industry: data.dia_chi,
        description: data.gioi_thieu,
        logo: data.avt,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanyDetails()
  }, [id])
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/vieclam/doanhnghiep/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch jobs for the company')
        }
        const data = await response.json()
        setCompanyJobs(data)
      } catch (err) {
        setError('Failed to load jobs for the company')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [id])
  
  if (loading) return <LoadingSpinner />
  
  if (error || !company) {
    return (
      <div className="container mx-auto px-4 py-16 text-center md:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {error || 'Company not found'}
        </h2>
        <Link to="/jobs">
          <Button variant="primary">Back to Jobs</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <div className="mb-8">
        <Link 
          to="/jobs" 
          className="inline-flex items-center gap-2 text-primary-600 hover:underline dark:text-primary-400"
        >
          <FiArrowLeft />
          <span>Back to Jobs</span>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card mb-12"
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-gray-100 p-2 dark:bg-gray-700 sm:h-32 sm:w-32">
            <img 
              src={company.logo} 
              alt={`${company.name} logo`}
              className="h-full w-full object-contain"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
              {company.name}
            </h1>
            
            <div className="mb-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiMapPin />
                <span>{company.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiUsers />
                <span>{company.employees}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiBriefcase />
                <span>{company.industry}</span>
              </div>
            </div>
            
            <div className="text-gray-700 dark:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: company.description }} />
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Các công việc tại {company.name}
        </h2>
        
        {companyJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companyJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              No open positions available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyPage