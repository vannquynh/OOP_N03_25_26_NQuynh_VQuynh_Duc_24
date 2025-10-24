import { useState } from 'react'
import styled from 'styled-components'
import { FaUser, FaEnvelope, FaPhone, FaFileAlt, FaEllipsisV } from 'react-icons/fa'
import { APPLICATION_STATUS } from '../config/constants'

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  margin-bottom: 1rem;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ApplicantName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--neutral-800);
  margin: 0;
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: ${props => {
    switch(props.$status) {
      case 'HIRED': return '#d1fae5';
      case 'INTERVIEWED': return '#dbeafe';
      case 'REVIEWING': return '#fef3c7';
      case 'PENDING': return '#e5e7eb';
      case 'REJECTED': return '#fee2e2';
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'HIRED': return '#065f46';
      case 'INTERVIEWED': return '#1e40af';
      case 'REVIEWING': return '#92400e';
      case 'PENDING': return '#374151';
      case 'REJECTED': return '#b91c1c';
      default: return '#374151';
    }
  }};
`

const CardBody = styled.div`
  padding: 1rem;
`

const InfoList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--neutral-700);
  font-size: 0.875rem;
  
  svg {
    color: var(--neutral-500);
    min-width: 16px;
  }
`

const Skills = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Skill = styled.span`
  background-color: var(--primary-50);
  color: var(--primary-700);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`

const CardFooter = styled.div`
  padding: 1rem;
  background-color: var(--neutral-50);
  border-top: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const QuestionBox = styled.div`
  background-color: var(--neutral-50);
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-top: 1rem;
  
  p:first-child {
    font-weight: 500;
    color: var(--neutral-800);
    margin-bottom: 0.25rem;
  }
  
  p:last-child {
    font-size: 0.875rem;
    color: var(--neutral-700);
  }
`

const ResumeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-600);
  text-decoration: none;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const DateInfo = styled.div`
  font-size: 0.75rem;
  color: var(--neutral-500);
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

const ApplicantCard = ({ applicant, onStatusChange }) => {
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
    onStatusChange(applicant.ma_ung_tuyen, status)
    setShowActions(false)
  }
  
  const skillsList = applicant.profile?.skills ? applicant.profile.skills.split(',').map(skill => skill.trim()) : []
  
  return (
    <CardContainer>
      <CardHeader>
        <div>
          <ApplicantName>{applicant.full_name}</ApplicantName>
          {applicant.profile?.professional_title && (
            <div style={{ color: 'var(--neutral-600)', fontSize: '0.875rem' }}>
              {applicant.profile.professional_title}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StatusBadge $status={applicant.status}>{applicant.status}</StatusBadge>
          <div style={{ position: 'relative' }}>
            <ActionsButton onClick={handleActionClick}>
              <FaEllipsisV />
            </ActionsButton>
            
            {showActions && (
              <ActionsMenu>
                <ActionItem onClick={() => handleStatusChange(APPLICATION_STATUS.REVIEWING)}>
                  Mark as Reviewing
                </ActionItem>
                <ActionItem onClick={() => handleStatusChange(APPLICATION_STATUS.INTERVIEWED)}>
                  Mark as Interviewed
                </ActionItem>
                <ActionItem onClick={() => handleStatusChange(APPLICATION_STATUS.HIRED)}>
                  Mark as Hired
                </ActionItem>
                <ActionItem $danger onClick={() => handleStatusChange(APPLICATION_STATUS.REJECTED)}>
                  Reject Application
                </ActionItem>
              </ActionsMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <InfoList>
          <InfoItem>
            <FaEnvelope />
            <span>{applicant.email}</span>
          </InfoItem>
          {applicant.profile?.phone && (
            <InfoItem>
              <FaPhone />
              <span>{applicant.profile.phone}</span>
            </InfoItem>
          )}
        </InfoList>
        
        {skillsList.length > 0 && (
          <Skills>
            {skillsList.map((skill, index) => (
              <Skill key={index}>{skill}</Skill>
            ))}
          </Skills>
        )}
        
        {applicant.cau_hoi && (
          <QuestionBox>
            <p>Applicant Question:</p>
            <p>{applicant.cau_hoi}</p>
          </QuestionBox>
        )}
        
        {applicant.ghi_chu && (
          <QuestionBox>
            <p>Notes:</p>
            <p>{applicant.ghi_chu}</p>
          </QuestionBox>
        )}
      </CardBody>
      
      <CardFooter>
        <DateInfo>
          Applied on {formatDate(applicant.createAt)}
        </DateInfo>
        
        {applicant.tep_dinh_kem && (
          <ResumeLink href={applicant.tep_dinh_kem} target="_blank" rel="noopener noreferrer">
            <FaFileAlt /> View Resume
          </ResumeLink>
        )}
      </CardFooter>
    </CardContainer>
  )
}

export default ApplicantCard