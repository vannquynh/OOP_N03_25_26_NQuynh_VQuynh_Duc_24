import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaMapMarkerAlt, FaDollarSign, FaUserFriends, FaEllipsisV } from 'react-icons/fa'
import { useState } from 'react'
import { JOB_STATUS } from '../config/constants'

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--neutral-200);
`

const JobTitle = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 0.25rem;
  
  &:hover {
    color: var(--primary-600);
  }
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

const CardBody = styled.div`
  padding: 1rem;
  flex: 1;
`

const CardFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--neutral-600);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  
  svg {
    min-width: 16px;
  }
`

const JobImage = styled.div`
  width: 100%;
  height: 120px;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  background-color: var(--neutral-100);
`

const ActionsButton = styled.button`
  background: none;
  border: none;
  color: var(--neutral-600);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:hover {
    color: var(--primary-600);
    background: none;
  }
`

const ActionsMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 10;
`

const ActionItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${props => props.$danger ? 'var(--error-500)' : 'var(--neutral-700)'};
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`

const DateInfo = styled.div`
  font-size: 0.75rem;
  color: var(--neutral-500);
`

const ViewApplicantsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--primary-600);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

const JobCard = ({ job, onStatusChange, onDelete }) => {
  const [showActions, setShowActions] = useState(false)
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  const handleActionClick = (e) => {
    e.stopPropagation()
    setShowActions(!showActions)
  }

  const handleStatusChange = (status) => {
    onStatusChange(job.ma_viec_lam, status)
    setShowActions(false)
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      onDelete(job.ma_viec_lam)
    }
    setShowActions(false)
  }
  
  return (
    <CardContainer>
      <JobImage $src={job.avt || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
      
      <CardHeader>
        <div>
          <JobTitle to={`/jobs/${job.ma_viec_lam}`}>{job.ten_viec_lam}</JobTitle>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StatusBadge $status={job.status}>{job.status}</StatusBadge>
          <div style={{ position: 'relative' }}>
            <ActionsButton onClick={handleActionClick}>
              <FaEllipsisV />
            </ActionsButton>
            
            {showActions && (
              <ActionsMenu>
                {job.status !== JOB_STATUS.ACTIVE && (
                  <ActionItem onClick={() => handleStatusChange(JOB_STATUS.ACTIVE)}>
                    Activate
                  </ActionItem>
                )}
                {job.status !== JOB_STATUS.CLOSED && (
                  <ActionItem onClick={() => handleStatusChange(JOB_STATUS.CLOSED)}>
                    Close
                  </ActionItem>
                )}
                <ActionItem $danger onClick={handleDelete}>
                  Delete
                </ActionItem>
              </ActionsMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <InfoItem>
          <FaMapMarkerAlt />
          <span>{job.dia_chi}</span>
        </InfoItem>
        <InfoItem>
          <FaDollarSign />
          <span>{job.muc_luong}</span>
        </InfoItem>
        <InfoItem>
          <FaUserFriends />
          <span>{job.so_luong_tuyen} positions</span>
        </InfoItem>
      </CardBody>
      
      <CardFooter>
        <DateInfo>
          Posted on {formatDate(job.createdAt)}
        </DateInfo>
        <ViewApplicantsLink to={`/jobs/${job.ma_viec_lam}/applicants`}>
          View Applicants
        </ViewApplicantsLink>
      </CardFooter>
    </CardContainer>
  )
}

export default JobCard 