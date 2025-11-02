// Export all types from a single location for cleaner imports

// Auth types
export * from './auth.types'

// Vehicle types
export * from './vehicle.types'

// Common types that might be used across the application
export interface ApiResponse<T = any> {
  status: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SearchFilters {
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FileUploadResponse {
  success: boolean
  message: string
  data?: {
    url: string
    filename: string
    size: number
    mimeType: string
  }
  error?: string
}
