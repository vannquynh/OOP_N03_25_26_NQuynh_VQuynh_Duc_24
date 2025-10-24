import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { FaBriefcase, FaPlus, FaUsers, FaTimes } from 'react-icons/fa'

const SidebarContainer = styled.aside`
  width: 240px;
  background-color: white;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 60px;
  left: ${props => props.$visible ? '0' : '-240px'};
  bottom: 0;
  transition: left 0.3s ease;
  z-index: 20;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    left: ${props => props.$mobileOpen ? '0' : '-240px'};
    top: 0;
    z-index: 50;
  }
`

const MobileHeader = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--neutral-200);
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--neutral-600);
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: var(--primary-600);
  }
`

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-600);
`

const NavMenu = styled.nav`
  padding: 1rem 0;
`

const NavSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  padding: 0 1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-500);
  margin-bottom: 0.5rem;
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.$active ? 'var(--primary-600)' : 'var(--neutral-700)'};
  background-color: ${props => props.$active ? 'var(--primary-50)' : 'transparent'};
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? '500' : '400'};
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-50)' : 'var(--neutral-100)'};
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
`

const Sidebar = ({ visible, mobileOpen, closeMobileSidebar }) => {
  const location = useLocation()
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/jobs'
    }
    return location.pathname.startsWith(path)
  }
  
  return (
    <SidebarContainer $visible={visible} $mobileOpen={mobileOpen}>
      <MobileHeader>
        <Logo>JobCreator</Logo>
        <CloseButton onClick={closeMobileSidebar}>
          <FaTimes />
        </CloseButton>
      </MobileHeader>
      
      <NavMenu>
        <NavSection>
          <SectionTitle>Job Management</SectionTitle>
          <NavItem to="/jobs" $active={isActive('/')}>
            <IconWrapper><FaBriefcase /></IconWrapper>
            Việc làm của tôi
          </NavItem>
          <NavItem to="/jobs/create" $active={isActive('/jobs/create')}>
            <IconWrapper><FaPlus /></IconWrapper>
            Tạo công việc mới
          </NavItem>
        </NavSection>
        
      </NavMenu>
    </SidebarContainer>
  )
}

export default Sidebar