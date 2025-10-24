import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--neutral-500);
  border-top: 1px solid var(--neutral-200);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} JobCreator Portal. All rights reserved.</p>
    </FooterContainer>
  )
}

export default Footer