import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LoadingSpinner from './components/common/LoadingSpinner'
import CompaniesPage from './pages/CompaniesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import JobListByCategoryPage from './pages/JobListByCategoryPage'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const JobListPage = lazy(() => import('./pages/JobListPage'))
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'))
const CompanyPage = lazy(() => import('./pages/CompanyPage'))
const SavedJobsPage = lazy(() => import('./pages/SavedJobsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/jobByCategory" element={<JobListByCategoryPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:id" element={<CompanyPage />} />
            <Route path="/saved-jobs" element={<SavedJobsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App