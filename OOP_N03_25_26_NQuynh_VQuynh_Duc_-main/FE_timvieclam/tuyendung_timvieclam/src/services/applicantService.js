// import axios from 'axios'
// import { API_URL } from '../config/constants'

// // This would be replaced with your actual API endpoints
// // For demo purposes, we'll use mocked data

// const mockApplicants = [
//   {
//     ma_ung_tuyen: 1,
//     full_name: 'Hoang Van Quynh',
//     email: 'hvq@gmail.com',
//     cau_hoi: 'What is the expected start date?',
//     ghi_chu: 'Looks promising',
//     tep_dinh_kem: 'http://res.cloudinary.com/dvofrxuqe/raw/upload/v1745678246/xm3wlntsqp7mhw2vz91z',
//     status: 'PENDING',
//     ma_viec_lam: 1,
//     user_id: '476b733e-b5d3-46ba-938e-dc1fda99b993',
//     create_at: '2025-04-26T15:11:25.000Z',
//     update_at: '2025-04-26T15:11:25.000Z',
//     profile: {
//       full_name: 'Hoàng Vân Quỳnh',
//       professional_title: 'ABC',
//       phone: '09782827634',
//       skills: 'Java, C#'
//     }
//   },
//   {
//     ma_ung_tuyen: 2,
//     full_name: 'Dinh Thi Nhu Quynh',
//     email: 'dtnq@gmail.com',
//     cau_hoi: 'Bạn là ai?',
//     ghi_chu: 'oke',
//     tep_dinh_kem: 'http://res.cloudinary.com/dvofrxuqe/raw/upload/v1745682192/eel41bbx3b5klivnsdjs',
//     status: 'PENDING',
//     ma_viec_lam: 1,
//     user_id: '5764ad6c-def4-4b73-bd17-cec5d5eb242b',
//     create_at: '2025-04-25T10:15:00.000Z',
//     update_at: '2025-04-25T10:15:00.000Z',
//     profile: {
//       full_name: 'Đinh Thị Như Quỳnh',
//       professional_title: 'Hello',
//       phone: '0886718203',
//       skills: 'Java, C#, Python, Go, Lang'
//     }
//   }
// ]

// export const getApplicantsByJobId = async (jobId) => {
//   // return axios.get(`${API_URL}/jobs/${jobId}/applicants`)
  
//   // Filter applicants by job ID
//   const applicants = mockApplicants.filter(app => app.ma_viec_lam === parseInt(jobId))
  
//   return {
//     data: applicants
//   }
// }

// export const updateApplicantStatus = async (applicantId, status) => {
//   // return axios.patch(`${API_URL}/applicants/${applicantId}`, { status })
  
//   return {
//     data: {
//       ma_ung_tuyen: applicantId,
//       status
//     }
//   }
// }

// export const getApplicantDetails = async (applicantId) => {
//   // return axios.get(`${API_URL}/applicants/${applicantId}`)
  
//   const applicant = mockApplicants.find(app => app.ma_ung_tuyen === parseInt(applicantId))
  
//   if (!applicant) {
//     throw new Error('Applicant not found')
//   }
  
//   return {
//     data: applicant
//   }
// }

import axios from 'axios'
import { API_URL } from '../config/constants'

export const getAllUngTuyen = async () => {
  return await axios.get(`${API_URL}/ungtuyen`)
}

export const getUngTuyenByUser = async (token) => {
  return await axios.get(`${API_URL}/ungtuyen/getByUser`, { params: { token } })
}

export const getUngTuyenById = async (id) => {
  return await axios.get(`${API_URL}/ungtuyen/${id}`)
}

export const createUngTuyen = async (data) => {
  const formData = new FormData()
  formData.append('full_name', data.full_name)
  formData.append('email', data.email)
  formData.append('cau_hoi', data.cau_hoi)
  if (data.ghi_chu) {
    formData.append('ghi_chu', data.ghi_chu)
  }
  if (data.tep_dinh_kem) {
    formData.append('tep_dinh_kem', data.tep_dinh_kem)
  }
  formData.append('status', data.status)
  formData.append('ma_viec_lam', data.ma_viec_lam)
  formData.append('emailUser', data.emailUser)
  
  return await axios.post(`${API_URL}/ungtuyen`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateUngTuyen = async (id, data) => {
  const formData = new FormData()
  formData.append('full_name', data.full_name)
  formData.append('email', data.email)
  formData.append('cau_hoi', data.cau_hoi)
  if (data.ghi_chu) {
    formData.append('ghi_chu', data.ghi_chu)
  }
  if (data.tep_dinh_kem) {
    formData.append('tep_dinh_kem', data.tep_dinh_kem)
  }
  formData.append('status', data.status)
  formData.append('ma_viec_lam', data.ma_viec_lam)
  formData.append('user_id', data.user_id)
  
  return await axios.put(`${API_URL}/ungtuyen/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteUngTuyen = async (id) => {
  return await axios.delete(`${API_URL}/ungtuyen/${id}`)
}

export const getApplicantsByJobId = async (ma_viec_lam) => {
  return await axios.get(`${API_URL}/ungtuyen/by-viec-lam/${ma_viec_lam}`)
}
export const updateApplicantStatus = async (id, status) => {
  return await axios.patch(`${API_URL}/ungtuyen/${id}/status`, null, {
    params: { status }
  })
}