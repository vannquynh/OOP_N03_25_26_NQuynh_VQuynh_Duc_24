import axios from 'axios'
import { API_URL } from '../config/constants'

export const getAllJobs = async (maDoanhNghiep) => {
  return await axios.get(`${API_URL}/vieclam/doanhnghiep/${maDoanhNghiep}`)
}

export const getJobById = async (jobId) => {
  return await axios.get(`${API_URL}/vieclam/${jobId}`)
}

export const createJob = async (jobData) => {
  const formData = new FormData()
  formData.append("ten_viec_lam", jobData.ten_viec_lam)
  formData.append("muc_luong", jobData.muc_luong)
  formData.append("mo_ta", jobData.mo_ta)
  formData.append("yeu_cau_cong_viec", jobData.yeu_cau_cong_viec)
  formData.append("so_luong_tuyen", jobData.so_luong_tuyen)
  formData.append("dia_chi", jobData.dia_chi)
  formData.append("ma_loai_viec", jobData.ma_loai_viec)
  formData.append("ma_doanh_nghiep", jobData.ma_doanh_nghiep)
  formData.append("ma_linh_vuc", jobData.ma_linh_vuc)
  formData.append("createdAt", jobData.created_at)
  if (jobData.avt) {
    formData.append("avt", jobData.avt)
  }
  
  return await axios.post(`${API_URL}/vieclam`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateJob = async (jobId, jobData) => {
  const formData = new FormData()
  formData.append("ten_viec_lam", jobData.ten_viec_lam)
  formData.append("muc_luong", jobData.muc_luong)
  formData.append("mo_ta", jobData.mo_ta)
  formData.append("yeu_cau_cong_viec", jobData.yeu_cau_cong_viec)
  formData.append("so_luong_tuyen", jobData.so_luong_tuyen)
  formData.append("dia_chi", jobData.dia_chi)
 // Kiểm tra xem có thể chuyển đổi thành số nguyên không
if (!isNaN(parseInt(jobData.ma_loai_viec, 10))) {
  formData.append("ma_loai_viec", parseInt(jobData.ma_loai_viec, 10));
}

if (!isNaN(parseInt(jobData.ma_linh_vuc, 10))) {
  formData.append("ma_linh_vuc", parseInt(jobData.ma_linh_vuc, 10));
}

  if (jobData.avt) {
    formData.append("avt", jobData.avt)
  }
  return await axios.put(`${API_URL}/vieclam/${jobId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteJob = async (jobId) => {
  return await axios.delete(`${API_URL}/vieclam/${jobId}`)
}

export const getJobsByCompany = async (companyId) => {
  return await axios.get(`${API_URL}/vieclam/doanhnghiep/${companyId}`)
}

export const searchJobs = async (params) => {
  // params contains keyword, location, jobType, category
  return await axios.get(`${API_URL}/vieclam/search`, { params })
}

export const checkUserApplied = async (jobId, token) => {
  return await axios.get(`${API_URL}/vieclam/${jobId}/check-applied`, {
    params: { token }
  })
}
export const updateJobStatus = async (jobId, status) => {
  return await axios.patch(`${API_URL}/vieclam/${jobId}/status`, null, {
    params: { status }
  })
}