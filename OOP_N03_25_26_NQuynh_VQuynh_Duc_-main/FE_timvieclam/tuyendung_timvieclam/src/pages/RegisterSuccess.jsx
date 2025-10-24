import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const SuccessContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-color: var(--neutral-50);
`

const SuccessMessage = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary-600);
  margin: 0;
  line-height: 1;
`

const SuccessTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--neutral-800);
`

const SuccessDescription = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: var(--neutral-600);
  max-width: 500px;
`

const HomeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-600);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-700);
  }
`

const RegisterSuccess = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <SuccessContainer>
      <SuccessMessage>✔️</SuccessMessage>
      <SuccessTitle>Registration Successful</SuccessTitle>
      <SuccessDescription>
        Bạn đã tạo tài khoản doanh nghiệp thành công. Vui lòng liên hệ admin để khai báo thông tin doanh nghiệp và cấp quyền doanh nghiệp.
      </SuccessDescription>
      <HomeButton onClick={handleLogin}>
        <FaHome /> Proceed to Login
      </HomeButton>
    </SuccessContainer>
  )
}

export default RegisterSuccess
