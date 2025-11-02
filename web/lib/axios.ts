import axios from 'axios'
import { config } from './config'

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and dispatch event
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        
        // Dispatch custom event for components to handle
        // window.dispatchEvent(
        //   new CustomEvent('auth-error', {
        //     detail: { 
        //       status: 401, 
        //       message: 'Authentication failed. Please login again.' 
        //     }
        //   })
        // )
      }
    }
    
    return Promise.reject(error)
  }
)

// Export default instance
export default apiClient
