import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import JobList from './pages/JobList'
import CreateJob from './pages/CreateJob'
import ApplicantList from './pages/ApplicantList'
import NotFound from './pages/NotFound'
import JobDetail from './pages/JobDetail'
import './App.css'
import EditJob from './pages/EditJob'
import Profile from './pages/Profile'
import RegisterForm from './pages/RegisterForm'
import RegisterSuccess from './pages/RegisterSuccess'

function App() {
  const { isAuthenticated } = useAuth()

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<JobList />} />
        <Route path="jobs">
          <Route index element={<JobList />} />
          <Route path="create" element={<CreateJob />} />
          <Route path=":id/edit" element={<EditJob />} />
          <Route path=":id" element={<JobDetail />} />
          <Route path=":id/applicants" element={<ApplicantList />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>
    
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default App