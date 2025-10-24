import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaHome } from 'react-icons/fa'

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: var(--primary-600);
  margin: 0;
  line-height: 1;
`

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--neutral-800);
`

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: var(--neutral-600);
  max-width: 500px;
`

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-600);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-700);
    color: white;
  }
`

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorMessage>
      <HomeButton to="/">
        <FaHome /> Back to Home
      </HomeButton>
    </NotFoundContainer>
  )
}

export default NotFound