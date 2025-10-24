import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiDollarSign, FiBookmark, FiStar } from 'react-icons/fi'
import { useJob } from '../../hooks/useJob'

const JobCard = ({ job }) => {
  const { toggleSavedJob, isJobSaved } = useJob()
  const [isSaved, setIsSaved] = useState(isJobSaved(job.ma_viec_lam))
  
  const handleSaveJob = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSavedJob(job.ma_viec_lam)
    setIsSaved(!isSaved)
  }
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="job-card card overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <Link to={`/jobs/${job.ma_viec_lam}`} className="block">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              <img 
                src={job.doanhNghiep.avt} 
                alt={`${job.doanhNghiep.ten_doanh_nghiep} logo`} 
                className="h-full w-full object-contain p-1"
              />
            </div>
            
            <div>
              <h3 className="mb-1 font-bold text-gray-900 dark:text-white">{job.title}</h3>
              <Link 
                to={`/companies/${job.doanhNghiep.ma_doanh_nghiep}`}
                onClick={(e) => e.stopPropagation()}
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                {job.doanhNghiep.ten_doanh_nghiep}
              </Link>
            </div>
          </div>
          
          <button
            onClick={handleSaveJob}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              isSaved 
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
            }`}
            aria-label={isSaved ? 'Unsave job' : 'Save job'}
          >
            {isSaved ? <FiStar className="fill-current" /> : <FiBookmark />}
          </button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="badge-blue flex items-center gap-1">
            <FiMapPin size={12} />
            <span>{job.dia_chi}</span>
          </div>
          
          <div className="badge-green flex items-center gap-1">
            <FiClock size={12} />
            <span>{job.loaiViec.ten_loai_viec}</span>
          </div>
          
          {job.muc_luong && (
            <div className="badge-purple flex items-center gap-1">
              <FiDollarSign size={12} />
              <span>{job.muc_luong}</span>
            </div>
          )}
        </div>
        
        <p className="mt-4 line-clamp-2 text-gray-600 dark:text-gray-400">{job.ten_viec_lam}</p>
        
        <div className="mt-4 flex items-center justify-between">
          {/* <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {job.postedDate}
          </span> */}
          
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            View Details →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default JobCard