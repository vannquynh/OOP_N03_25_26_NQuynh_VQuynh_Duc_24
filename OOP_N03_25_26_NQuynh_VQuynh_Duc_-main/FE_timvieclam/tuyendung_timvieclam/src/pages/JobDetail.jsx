import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaArrowLeft, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaUserFriends, FaCalendarAlt, FaUsers, FaEdit } from 'react-icons/fa'
import { getJobById, updateJobStatus } from '../services/jobService'
import { toast } from 'react-toastify'
import { JOB_STATUS, JOB_TYPES, INDUSTRY_FIELDS } from '../config/constants'

const HeaderContainer = styled.div`
  margin-bottom: 2rem;
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

const JobContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`

const MainContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const JobHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--neutral-200);
`

const JobTitle = styled.h1`
  margin-bottom: 0.5rem;
`

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--neutral-700);
  margin-bottom: 1rem;
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: ${props => {
    switch(props.$status) {
      case 'ACTIVE': return '#d1fae5';
      case 'PENDING': return '#fef3c7';
      case 'CLOSED': return '#e5e7eb';
      case 'REJECTED': return '#fee2e2';
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'ACTIVE': return '#065f46';
      case 'PENDING': return '#92400e';
      case 'CLOSED': return '#374151';
      case 'REJECTED': return '#b91c1c';
      default: return '#374151';
    }
  }};
`

const JobContent = styled.div`
  padding: 1.5rem;
`

const JobSection = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--neutral-800);
    font-weight: 600;
  }
  
  .content {
    color: var(--neutral-700);
  }
`

const Sidebar = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  align-self: start;
  position: sticky;
  top: 80px;
`

const JobMeta = styled.div`
  margin-bottom: 1.5rem;
`

const MetaTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 1rem;
`

const MetaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: var(--primary-500);
    min-width: 16px;
  }
  
  .label {
    color: var(--neutral-600);
    font-size: 0.875rem;
  }
  
  .value {
    color: var(--neutral-800);
    font-weight: 500;
  }
`

const ButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-600);
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 1rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-700);
    color: white;
  }
`

const StatusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => {
    switch(props.$status) {
      case 'ACTIVE': return '#10b981';
      case 'CLOSED': return '#6b7280';
      default: return '#f97316';
    }
  }};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => {
      switch(props.$status) {
        case 'ACTIVE': return '#059669';
        case 'CLOSED': return '#4b5563';
        default: return '#ea580c';
      }
    }};
  }
  
  &:disabled {
    background-color: var(--neutral-400);
    cursor: not-allowed;
  }
`

const JobImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
`

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await getJobById(id)
        setJob(response.data)
      } catch (error) {
        console.error('Error fetching job details:', error)
        setError('Failed to load job details. Please try again.')
        toast.error('Failed to load job details')
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobDetail()
  }, [id])
  
  const handleStatusChange = async (newStatus) => {
    try {
      setUpdatingStatus(true)
      await updateJobStatus(job.ma_viec_lam, newStatus)
      setJob(prev => ({ ...prev, status: newStatus }))
      toast.success(`Job status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating job status:', error)
      toast.error('Failed to update job status')
    } finally {
      setUpdatingStatus(false)
    }
  }
  
  const getJobType = (typeId) => {
    const jobType = JOB_TYPES.find(type => type.id === typeId)
    return jobType ? jobType.label : 'Unknown'
  }
  
  const getIndustryField = (fieldId) => {
    const field = INDUSTRY_FIELDS.find(field => field.id === fieldId)
    return field ? field.label : 'Unknown'
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  if (loading) {
    return <p>Loading job details...</p>
  }
  
  if (error || !job) {
    return (
      <div>
        <HeaderContainer>
          <BackLink to="/jobs">
            <FaArrowLeft /> Back to Jobs
          </BackLink>
        </HeaderContainer>
        <p>{error || 'Job not found'}</p>
      </div>
    )
  }
  
  const toggleStatus = () => {
    const newStatus = job.status === JOB_STATUS.ACTIVE 
      ? JOB_STATUS.CLOSED 
      : JOB_STATUS.ACTIVE
    
    handleStatusChange(newStatus)
  }
  
  return (
    <div>
      <HeaderContainer>
        <BackLink to="/jobs">
          <FaArrowLeft /> Back to Jobs
        </BackLink>
      </HeaderContainer>
      
      <JobContainer>
        <MainContent>
          <JobImage $src={job.avt || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
          
          <JobHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <JobTitle>{job.ten_viec_lam}</JobTitle>
                <CompanyInfo>
                  <FaBriefcase />
                  <span>{job.doanhNghiep ? job.doanhNghiep.ten_doanh_nghiep : 'Your Company'}</span>
                </CompanyInfo>
              </div>
              <StatusBadge $status={job.status}>{job.status}</StatusBadge>
            </div>
          </JobHeader>
          
          <JobContent>
            <JobSection>
              <h2>Job Description</h2>
              <div 
                className="content"
                dangerouslySetInnerHTML={{ __html: job.mo_ta }}
              />
            </JobSection>
            
            <JobSection>
              <h2>Requirements</h2>
              <div 
                className="content"
                dangerouslySetInnerHTML={{ __html: job.yeu_cau_cong_viec }}
              />
            </JobSection>
          </JobContent>
        </MainContent>
        
        <Sidebar>
          <JobMeta>
            <MetaTitle>Job Details</MetaTitle>
            <MetaList>
              <MetaItem>
                <FaMapMarkerAlt />
                <div>
                  <div className="label">Location</div>
                  <div className="value">{job.dia_chi}</div>
                </div>
              </MetaItem>
              
              <MetaItem>
                <FaDollarSign />
                <div>
                  <div className="label">Salary</div>
                  <div className="value">{job.muc_luong}</div>
                </div>
              </MetaItem>
              
              <MetaItem>
                <FaUserFriends />
                <div>
                  <div className="label">Positions</div>
                  <div className="value">{job.so_luong_tuyen}</div>
                </div>
              </MetaItem>
              
              <MetaItem>
                <FaBriefcase />
                <div>
                  <div className="label">Job Type</div>
                  <div className="value">{job.loaiViec.ten_loai_viec}</div>
                </div>
              </MetaItem>
              
              <MetaItem>
                <FaBriefcase />
                <div>
                  <div className="label">Industry</div>
                  <div className="value">{job.linhVuc.ten_linh_vuc}</div>
                </div>
              </MetaItem>
              
              <MetaItem>
                <FaCalendarAlt />
                <div>
                  <div className="label">Posted On</div>
                  <div className="value">{formatDate(job.createdAt)}</div>
                </div>
              </MetaItem>
            </MetaList>
          </JobMeta>
          <ButtonLink to={`/jobs/${job.ma_viec_lam}/edit`} className="secondary">
            <FaEdit /> Edit Job Posting
          </ButtonLink>
          <ButtonLink to={`/jobs/${job.ma_viec_lam}/applicants`}>
            <FaUsers /> View Applicants
          </ButtonLink>
          
          <StatusButton
            $status={job.status}
            onClick={toggleStatus}
            disabled={updatingStatus}
          >
            {updatingStatus ? 'Updating...' : (
              job.status === JOB_STATUS.ACTIVE 
                ? 'Close Job Posting' 
                : 'Activate Job Posting'
            )}
          </StatusButton>
        </Sidebar>
      </JobContainer>
    </div>
  )
}

export default JobDetail