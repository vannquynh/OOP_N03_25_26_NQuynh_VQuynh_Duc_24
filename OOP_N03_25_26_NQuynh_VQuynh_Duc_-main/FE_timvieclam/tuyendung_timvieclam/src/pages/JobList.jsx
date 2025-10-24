import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaPlus, FaSearch } from 'react-icons/fa'
import JobCard from '../components/JobCard'
import { getAllJobs, updateJobStatus, deleteJob } from '../services/jobService'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const Title = styled.h1`
  margin: 0;
`

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`

const SearchInput = styled.input`
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid var(--neutral-300);
  border-radius: 0.375rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-100);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--neutral-500);
`

const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-600);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-700);
    color: white;
  }
`

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-top: 2rem;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`

const FilterButton = styled.button`
  background-color: ${props => props.$active ? 'var(--primary-600)' : 'white'};
  color: ${props => props.$active ? 'white' : 'var(--neutral-700)'};
  border: 1px solid ${props => props.$active ? 'var(--primary-600)' : 'var(--neutral-300)'};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-700)' : 'var(--neutral-100)'};
  }
`

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const { currentUser } = useAuth()
  
  useEffect(() => {
    fetchJobs()
  }, [currentUser])
  
  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // In a real app, we would pass the company ID from the currentUser
      const companyId = currentUser?.companyId || 3
      const response = await getAllJobs(companyId)
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setError('Failed to load job postings. Please try again.')
      toast.error('Failed to load job postings')
    } finally {
      setLoading(false)
    }
  }
  
  const handleStatusChange = async (jobId, status) => {
    try {
      await updateJobStatus(jobId, status)
      setJobs(prevJobs => prevJobs.map(job => 
        job.ma_viec_lam === jobId ? { ...job, status } : job
      ))
      toast.success(`Job status updated to ${status}`)
    } catch (error) {
      console.error('Error updating job status:', error)
      toast.error('Failed to update job status')
    }
  }
  
  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId)
      setJobs(prevJobs => prevJobs.filter(job => job.ma_viec_lam !== jobId))
      toast.success('Job posting deleted successfully')
    } catch (error) {
      console.error('Error deleting job:', error)
      toast.error('Failed to delete job posting')
    }
  }
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.ten_viec_lam.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })
  
  return (
    <div>
      <PageHeader>
        <div>
          <Title>Việc làm của tôi</Title>
          
        </div>
       
      </PageHeader>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <FilterContainer>
          <FilterButton 
            $active={statusFilter === 'ALL'} 
            onClick={() => setStatusFilter('ALL')}
          >
            All
          </FilterButton>
          <FilterButton 
            $active={statusFilter === 'ACTIVE'} 
            onClick={() => setStatusFilter('ACTIVE')}
          >
            Active
          </FilterButton>
          <FilterButton 
            $active={statusFilter === 'PENDING'} 
            onClick={() => setStatusFilter('PENDING')}
          >
            Pending
          </FilterButton>
          <FilterButton 
            $active={statusFilter === 'CLOSED'} 
            onClick={() => setStatusFilter('CLOSED')}
          >
            Closed
          </FilterButton>
        </FilterContainer>
        
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </div>
      
      {loading ? (
        <p>Loading job postings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredJobs.length > 0 ? (
        <JobGrid>
          {filteredJobs.map(job => (
            <JobCard 
              key={job.ma_viec_lam} 
              job={job} 
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </JobGrid>
      ) : (
        <EmptyState>
          <h3>No job postings found</h3>
          <p style={{ color: 'var(--neutral-600)', marginBottom: '1rem' }}>
            {searchTerm ? 'Try a different search term' : 'Create your first job posting to get started'}
          </p>
          {!searchTerm && (
            <CreateButton to="/jobs/create">
              <FaPlus /> Tạo công việc mới
            </CreateButton>
          )}
        </EmptyState>
      )}
    </div>
  )
}

export default JobList