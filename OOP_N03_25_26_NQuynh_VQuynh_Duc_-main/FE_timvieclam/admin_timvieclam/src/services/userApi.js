import axios from "axios";


export async function fetchUsers({ page = 0, size = 10, sort = 'createdAt,desc', kw = '' } = {}) {
  const res = await axios.get('http://localhost:8080/api/users', { params: { page, size, sort, kw } });
  return res.data; 
}

export async function getUser(id) {
  const res = await axios.get(`http://localhost:8080/api/users/${id}`);
  return res.data;
}

export async function createUser(payload) {
  const res = await axios.post('http://localhost:8080/api/users', payload);
  return res.data;
}

export async function updateUser(id, payload) {
  const res = await axios.put(`http://localhost:8080/api/users/${id}`, payload);
  return res.data;
}

export async function deleteUser(id) {
  return axios.delete(`http://localhost:8080/api/users/${id}`);
}
