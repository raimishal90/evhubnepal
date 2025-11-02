import { apiClient } from './axios'
import { ApiResponse } from './types'

// HTTP methods wrapper
export const api = {
  // GET request
  get: async <T>(url: string, config?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.get(url, config)
    return response.data
  },

  // POST request
  post: async <T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.post(url, data, config)
    return response.data
  },

  // PUT request
  put: async <T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.put(url, data, config)
    return response.data
  },

  // PATCH request
  patch: async <T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.patch(url, data, config)
    return response.data
  },

  // DELETE request
  delete: async <T>(url: string, config?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete(url, config)
    return response.data
  },

  // Upload file
  upload: async <T>(url: string, formData: FormData, config?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
    return response.data
  },

  // Download file
  download: async (url: string, config?: any): Promise<Blob> => {
    const response = await apiClient.get(url, {
      ...config,
      responseType: 'blob',
    })
    return response.data
  },
}

// Export the apiClient for direct use when needed
export { apiClient }
