import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaBars, FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

const NavContainer = styled.nav`
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-600);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: var(--neutral-600);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--primary-600);
    background: none;
  }
  
  &:focus {
    outline: none;
  }
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--neutral-600);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:hover {
    color: var(--primary-600);
    background: none;
  }
  
  &:focus {
    outline: none;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--error-500);
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  padding: 0.5rem 0;
  z-index: 10;
`

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--neutral-700);
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`

const ProfileContainer = styled.div`
  position: relative;
`

const CompanyName = styled.span`
  font-weight: 500;
  color: var(--neutral-700);
  margin-right: 8px;

  @media (max-width: 640px) {
    display: none;
  }
`

const Navbar = ({ toggleSidebar, toggleMobileSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { currentUser, logout } = useAuth()
  
  return (
    <NavContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      
        <MenuToggle onClick={toggleSidebar} className="md-up-only">
          <FaBars />
        </MenuToggle>
        <Logo to="/">
          Doanh nghiệp
        </Logo>
      </div>
      
      <NavActions>
        <IconButton>
          <FaBell />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>
        
        <ProfileContainer>
          <IconButton onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <CompanyName>
              {currentUser?.username || 'Company'}
            </CompanyName>
            <FaUserCircle />
          </IconButton>
          
          {showProfileMenu && (
            <ProfileDropdown>
              <DropdownItem as={Link} to="/profile">
                <FaUserCircle /> My Profile
              </DropdownItem>
              <DropdownItem onClick={logout}>
                <FaSignOutAlt /> Logout
              </DropdownItem>
            </ProfileDropdown>
          )}
        </ProfileContainer>
      </NavActions>
    </NavContainer>
  )
}

export default Navbar