import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';

import LoaiViecList from './pages/loaiviec/LoaiViecList';
import LoaiViecForm from './pages/loaiviec/LoaiViecForm';
import NotFound from './pages/NotFound';
import ViecLamForm from './pages/vieclam/ViecLamForm';
import ViecLamList from './pages/vieclam/ViecLamList';
import DoanhNghiepList from './pages/doanhnghiep/DoanhNghiepList';
import DoanhNghiepForm from './pages/doanhnghiep/DoanhNghiepForm';
import UngTuyenList from './pages/ungtuyen/UngTuyenList';
import UserList from './pages/users/UserList';



function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
      
          <Route path="loaiviec" element={<LoaiViecList />} />
          <Route path="loaiviec/create" element={<LoaiViecForm />} />
          <Route path="loaiviec/edit/:id" element={<LoaiViecForm />} />
          <Route path="vieclam" element={<ViecLamList />} />
          <Route path="vieclam/create" element={<ViecLamForm />} />
          <Route path="vieclam/edit/:id" element={<ViecLamForm />} />
          <Route path="doanhnghiep" element={<DoanhNghiepList />} />
          <Route path="doanhnghiep/create" element={<DoanhNghiepForm />} />
          <Route path="doanhnghiep/edit/:id" element={<DoanhNghiepForm />} />
          <Route path="ungtuyen" element={<UngTuyenList />} />
          <Route path="user" element={<UserList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;