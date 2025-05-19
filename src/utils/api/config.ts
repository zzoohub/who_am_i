import axios from 'axios'
import { isExist } from '../helpers/general'

// Constants
export const SERVER_URL = process.env.REACT_APP_SERVER_URL
export const AUTH_TOKEN = localStorage.getItem('auth')

// API Paths
export const API_PATHS = {
  USER: 'user',
  USER_LOGIN: 'user/login',
  USER_CHECK: 'user/check',
  JAR: 'jar',
}

// Axios instance
export const httpClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    ...(isExist(AUTH_TOKEN) && { Authorization: `Bearer ${AUTH_TOKEN}` }),
  },
})

// Error handler
export const handleApiError = (error: Error): never => {
  console.error('API Error:', error)
  throw error
}
