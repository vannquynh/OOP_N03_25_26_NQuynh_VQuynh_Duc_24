import axios from 'axios'
import { API_URL } from '../config/constants'

// // This would be replaced with your actual API endpoint
// export const loginUser = async (credentials) => {
//   // For demo purposes, we'll simulate a login
//   // In a real app, you would call your API
//   if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
//     return {
//       data: {
//         id: '1',
//         username: 'demoCompany',
//         email: 'demo@example.com',
//         role: 'DOANHNGHIEP',
//         token: 'demo-token-123',
//         companyId: 3 
//       }
//     }
//   }
  
//   throw {
//     response: {
//       data: {
//         message: 'Invalid email or password'
//       }
//     }
//   }
  
//   // Real implementation would be:
//   // return axios.post(`${API_URL}/auth/login`, credentials)
// }
export const loginUser = async (credentials) => {
  // Call the login-doanhnghiep API endpoint for doanh nghiệp login
  return axios.post(`${API_URL}/auth/login-doanhnghiep`, credentials)
}

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData)
}

export async function registerCompany(payload) {
  const res = await axios.post(`${API_URL}/auth/register-company`, payload);
  return res.data;
}