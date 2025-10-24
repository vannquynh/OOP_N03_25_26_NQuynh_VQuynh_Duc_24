import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useState } from 'react'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  margin-left: ${props => props.$sidebarVisible ? '240px' : '0'};
  transition: margin-left 0.3s ease;
  background-color: var(--neutral-50);
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 60px;
  }
`

const MobileSidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: ${props => props.$show ? 'block' : 'none'};
`

const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }
  
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <LayoutContainer>
      <Navbar 
        toggleSidebar={toggleSidebar} 
        toggleMobileSidebar={toggleMobileSidebar}
      />
      <Sidebar 
        visible={sidebarVisible} 
        mobileOpen={mobileSidebarOpen}
        closeMobileSidebar={() => setMobileSidebarOpen(false)}
      />
      {mobileSidebarOpen && (
        <MobileSidebarOverlay 
          $show={mobileSidebarOpen} 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <MainContent $sidebarVisible={sidebarVisible}>
        <div className="container">
          <Outlet />
        </div>
      </MainContent>
    
    </LayoutContainer>
  )
}

export default Layout