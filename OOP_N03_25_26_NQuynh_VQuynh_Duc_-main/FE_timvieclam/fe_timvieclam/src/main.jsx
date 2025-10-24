import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { JobProvider } from './contexts/JobContext'
import { UserProvider } from './contexts/UserContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <JobProvider>
        <App />
      </JobProvider>
    </UserProvider>
  </React.StrictMode>
)