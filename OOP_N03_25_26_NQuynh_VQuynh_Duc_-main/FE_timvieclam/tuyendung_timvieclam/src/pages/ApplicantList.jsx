import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaArrowLeft, FaFilter, FaSearch } from 'react-icons/fa'
import { getJobById } from '../services/jobService'
import { getApplicantsByJobId, updateApplicantStatus } from '../services/applicantService'
import { toast } from 'react-toastify'
import ApplicantCard from '../components/ApplicantCard'
import { APPLICATION_STATUS } from '../config/constants'

const HeaderContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--neutral-600);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-600);
  }
`

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

const JobTitle = styled.div`
  font-size: 1.25rem;
  color: var(--primary-600);
  margin-bottom: 0.5rem;
`

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
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

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 0.5rem;
`

const ApplicantList = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch job details
        const jobResponse = await getJobById(id)
        setJob(jobResponse.data)
        
        // Fetch applicants for this job
        const applicantsResponse = await getApplicantsByJobId(id)
        setApplicants(applicantsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load applicants data. Please try again.')
        toast.error('Failed to load applicants')
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobAndApplicants()
  }, [id])
  
  const handleStatusChange = async (applicantId, status) => {
    try {
      await updateApplicantStatus(applicantId, status)
      setApplicants(prevApplicants => prevApplicants.map(applicant => 
        applicant.ma_ung_tuyen === applicantId 
          ? { ...applicant, status } 
          : applicant
      ))
      toast.success(`Application status updated to ${status}`)
    } catch (error) {
      console.error('Error updating application status:', error)
      toast.error('Failed to update application status')
    }
  }
  
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || applicant.status === statusFilter
    return matchesSearch && matchesStatus
  })
  
  return (
    <div>
      <HeaderContainer>
        <BackLink to={`/jobs/${id}`}>
          <FaArrowLeft /> Back to Job Details
        </BackLink>
      </HeaderContainer>
      
      {loading ? (
        <p>Loading applicants...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <PageHeader>
            <div>
              <Title>Applicants</Title>
              {job && (
                <JobTitle>
                  {job.ten_viec_lam}
                </JobTitle>
              )}
              <p style={{ color: 'var(--neutral-600)' }}>
                {filteredApplicants.length} {filteredApplicants.length === 1 ? 'candidate' : 'candidates'}
              </p>
            </div>
          </PageHeader>
          
          <ControlsContainer>
            <FilterContainer>
              <FilterButton 
                $active={statusFilter === 'ALL'} 
                onClick={() => setStatusFilter('ALL')}
              >
                All
              </FilterButton>
              <FilterButton 
                $active={statusFilter === APPLICATION_STATUS.PENDING} 
                onClick={() => setStatusFilter(APPLICATION_STATUS.PENDING)}
              >
                Pending
              </FilterButton>
              <FilterButton 
                $active={statusFilter === APPLICATION_STATUS.REVIEWING} 
                onClick={() => setStatusFilter(APPLICATION_STATUS.REVIEWING)}
              >
                Reviewing
              </FilterButton>
              <FilterButton 
                $active={statusFilter === APPLICATION_STATUS.INTERVIEWED} 
                onClick={() => setStatusFilter(APPLICATION_STATUS.INTERVIEWED)}
              >
                Interviewed
              </FilterButton>
              <FilterButton 
                $active={statusFilter === APPLICATION_STATUS.HIRED} 
                onClick={() => setStatusFilter(APPLICATION_STATUS.HIRED)}
              >
                Hired
              </FilterButton>
              <FilterButton 
                $active={statusFilter === APPLICATION_STATUS.REJECTED} 
                onClick={() => setStatusFilter(APPLICATION_STATUS.REJECTED)}
              >
                Rejected
              </FilterButton>
            </FilterContainer>
            
            <SearchContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
          </ControlsContainer>
          
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map(applicant => (
              <ApplicantCard
                key={applicant.ma_ung_tuyen}
                applicant={applicant}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <EmptyState>
              <h3>No applicants found</h3>
              <p style={{ color: 'var(--neutral-600)' }}>
                {searchTerm || statusFilter !== 'ALL' 
                  ? 'Try changing your search or filter criteria' 
                  : 'No one has applied to this job yet'}
              </p>
            </EmptyState>
          )}
        </>
      )}
    </div>
  )
}

export default ApplicantList