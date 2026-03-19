import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

//Public instance — NO token attached (login, register)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

//Private instance (all protected routes)
export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})