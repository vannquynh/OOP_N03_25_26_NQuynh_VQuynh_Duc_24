import axios from 'axios'
import { API_URL } from '../config/constants'

// This would be replaced with your actual API endpoints
// For demo purposes, we'll use mocked data

// Removed mock data and utilize real API endpoints

export const getCompanyProfile = async (companyId) => {
    return axios.get(`${API_URL}/doanhnghiep/${companyId}`);
}

export const updateCompanyProfile = async (companyId, data) => {
    const formData = new FormData();
    formData.append('ten_doanh_nghiep', data.ten_doanh_nghiep);
    formData.append('tinh', data.tinh);
    formData.append('dia_chi', data.dia_chi);
    formData.append('website', data.website);
    formData.append('quy_mo_nhan_su', data.quy_mo_nhan_su);
    formData.append('gioi_thieu', data.gioi_thieu);

   
    if (data.avt) {
        formData.append('avt', data.avt);
    }

    return axios.put(`${API_URL}/doanhnghiep/${companyId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}


// export const getCompanyProfile = async (companyId) => {
//   // return axios.get(`${API_URL}/companies/${companyId}`)
//   return {
//     data: mockCompany
//   }
// }

// export const updateCompanyProfile = async (companyId, data) => {
//   // return axios.put(`${API_URL}/companies/${companyId}`, data)
//   return {
//     data: {
//       ...mockCompany,
//       ...data,
//       updated_at: new Date().toISOString()
//     }
//   }
// }