import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JobFilter from '../components/jobs/JobFilter'
import JobCard from '../components/jobs/JobCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useSearchParams } from 'react-router-dom'

const JobListPage = () => {
  const [searchParams] = useSearchParams()
  
  // Khởi tạo state filters dựa trên URL params ngay khi component render
  const [filters, setFilters] = useState(() => ({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    jobType: [],  
    experience: [] // (Các bộ lọc khác nếu có)
  }))
  
  const [filteredJobs, setFilteredJobs] = useState([])

  // Nếu bạn cần cập nhật state filters khi URL params thay đổi, 
  // chỉ cần so sánh và cập nhật lại (tránh setFilters ngay lập tức nếu không có thay đổi)
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const category = searchParams.get('category') || '';
  
    // So sánh với filters hiện tại, nếu khác mới set
    if (
      search !== filters.search ||
      location !== filters.location ||
      category !== filters.category
    ) {
      setFilters(prev => ({
        ...prev,
        search,
        location,
        category,
      }));
    }
  }, [searchParams]); 
  
  
  // useEffect duy nhất để gọi API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Luôn sử dụng endpoint search
        let url = 'http://localhost:8080/api/vieclam/search'
        const params = new URLSearchParams()
  
        // Nếu có category, ưu tiên truyền category thay vì keyword
        if (filters.category) {
          params.append('category', filters.category)
        } else if (filters.search) {
          params.append('keyword', filters.search)
        }
  
        if (filters.location) {
          params.append('location', filters.location)
        }
        if (filters.jobType && filters.jobType.length > 0) {
          // Nối các jobType thành chuỗi, cách nhau bởi dấu phẩy
          params.append('jobType', filters.jobType.join(','))
        }
  
        // Nếu có tham số tìm kiếm, thêm query string vào URL
        if (params.toString()) {
          url = `${url}?${params.toString()}`
        }
  
        const response = await fetch(url)
        const data = await response.json()
        setFilteredJobs(data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
  
    fetchJobs()
  }, [filters])
  
  // Callback nhận bộ lọc từ JobFilter
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }
  
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        Find Your Perfect Job
      </h1>

      <JobFilter onFilterChange={handleFilterChange} />

      {false ? ( 
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{filteredJobs.length}</span> jobs found
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-gray-700 dark:text-gray-300">
                Sort by:
              </label>
              <select id="sortBy" className="select max-w-xs" defaultValue="relevance">
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredJobs.map(job => (
                <JobCard key={job.ma_viec_lam} job={job} />
              ))}
            </motion.div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                No jobs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search filters or check back later for new opportunities.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default JobListPage
