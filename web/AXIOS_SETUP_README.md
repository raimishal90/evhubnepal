# Axios Setup for EV Hub Nepal Frontend

This document explains the new Axios-based HTTP client setup that provides centralized configuration, automatic authentication, and consistent error handling.

## Overview

The frontend now uses **Axios** instead of the native `fetch` API for all HTTP requests. This provides:

- ✅ **Centralized Base URL**: Configure once, use everywhere
- ✅ **Automatic Authentication**: JWT tokens automatically added to requests
- ✅ **Global Error Handling**: Consistent error handling across the app
- ✅ **Request/Response Interceptors**: Automatic token management and error responses
- ✅ **Type Safety**: Full TypeScript support with generic types
- ✅ **Fallback Support**: Graceful fallback to local data if API fails

## Architecture

```
web/
├── lib/
│   ├── axios.ts              # Axios instance configuration
│   ├── api.ts                # API wrapper with common methods
│   ├── config.ts             # Configuration (base URL, endpoints)
│   └── services/             # Service layer
│       ├── vehicle.service.ts # Vehicle API operations
│       └── user.service.ts   # User API operations
├── app/
│   └── login/
│       └── auth.service.ts   # Authentication service (updated)
└── lib/
    └── vehicles.ts           # Vehicle data functions (updated)
```

## Configuration

### 1. Base URL Configuration

The base URL is configured in `lib/config.ts`:

```typescript
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    // ... other config
  }
}
```

### 2. Environment Variables

Create a `.env.local` file in the `web` directory:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Environment
NODE_ENV=development
```

## Axios Instance Features

### 1. Automatic Authentication

The Axios instance automatically adds JWT tokens to all requests:

```typescript
// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 2. Global Error Handling

Automatic handling of common errors like 401 Unauthorized:

```typescript
// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## API Wrapper

### 1. Common HTTP Methods

The `api` wrapper provides consistent methods for all HTTP operations:

```typescript
import { api } from '@/lib/api'

// GET request
const vehicles = await api.get<Vehicle[]>('/vehicles')

// POST request
const newVehicle = await api.post<Vehicle>('/vehicles', vehicleData)

// PUT request
const updatedVehicle = await api.put<Vehicle>(`/vehicles/${id}`, vehicleData)

// DELETE request
await api.delete(`/vehicles/${id}`)

// File upload
const result = await api.upload<{ imageUrl: string }>('/upload', formData)

// File download
const blob = await api.download('/files/document.pdf')
```

### 2. Type Safety

All methods support TypeScript generics for type safety:

```typescript
// Define the expected response type
interface VehicleResponse {
  id: string
  name: string
  price: number
  // ... other properties
}

// Use with type safety
const vehicle = await api.get<VehicleResponse>(`/vehicles/${id}`)
// vehicle.data is now typed as VehicleResponse
```

## Service Layer

### 1. Vehicle Service Example

```typescript
import { api } from '@/lib/api'

class VehicleService {
  async getAllVehicles(): Promise<Vehicle[]> {
    try {
      const response = await api.get<Vehicle[]>('/vehicles')
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch vehicles:', error)
      throw new Error('Failed to fetch vehicles')
    }
  }

  async createVehicle(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    try {
      const response = await api.post<Vehicle>('/vehicles', vehicleData)
      return response.data
    } catch (error: any) {
      console.error('Failed to create vehicle:', error)
      throw new Error('Failed to create vehicle')
    }
  }
}
```

### 2. User Service Example

```typescript
import { api } from '@/lib/api'

class UserService {
  async updateProfile(userData: UpdateUserData): Promise<UserProfile> {
    try {
      const response = await api.put<UserProfile>('/user/profile', userData)
      return response.data
    } catch (error: any) {
      console.error('Failed to update user profile:', error)
      throw new Error('Failed to update user profile')
    }
  }

  async uploadProfilePicture(file: File): Promise<{ imageUrl: string }> {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await api.upload<{ imageUrl: string }>('/user/profile-picture', formData)
      return response.data
    } catch (error: any) {
      console.error('Failed to upload profile picture:', error)
      throw new Error('Failed to upload profile picture')
    }
  }
}
```

## Usage Examples

### 1. In Components

```typescript
import { vehicleService } from '@/lib/services/vehicle.service'

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAllVehicles()
        setVehicles(data)
      } catch (error) {
        console.error('Failed to fetch vehicles:', error)
        // Handle error (show toast, fallback UI, etc.)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}
```

### 2. In API Routes (if using Next.js API routes)

```typescript
import { apiClient } from '@/lib/api'

export async function GET() {
  try {
    const response = await apiClient.get('/external-api/data')
    return Response.json(response.data)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
```

## Error Handling

### 1. Consistent Error Structure

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}
```

### 2. Error Handling in Services

```typescript
try {
  const response = await api.get<Vehicle[]>('/vehicles')
  return response.data
} catch (error: any) {
  // Log the error for debugging
  console.error('Failed to fetch vehicles:', error)
  
  // Extract user-friendly message if available
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message)
  }
  
  // Fallback error message
  throw new Error('Failed to fetch vehicles')
}
```

### 3. Error Handling in Components

```typescript
const [error, setError] = useState<string | null>(null)

const fetchData = async () => {
  try {
    setError(null)
    const data = await vehicleService.getAllVehicles()
    setVehicles(data)
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An error occurred')
  }
}
```

## Fallback Strategy

The system includes a fallback strategy for offline/API failure scenarios:

```typescript
export async function getAllVehicles(): Promise<Vehicle[]> {
  try {
    // Try API first
    return await vehicleService.getAllVehicles()
  } catch (error) {
    console.error('Failed to fetch vehicles from API, falling back to local data:', error)
    // Fallback to local data if API fails
    return getLocalVehicles()
  }
}
```

## Testing

### 1. Mock API Responses

```typescript
// In your test files
import { apiClient } from '@/lib/api'

// Mock the API client
jest.mock('@/lib/api', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    // ... other methods
  }
}))

// Test your service
test('should fetch vehicles', async () => {
  const mockVehicles = [{ id: '1', name: 'Test Vehicle' }]
  apiClient.get.mockResolvedValue({ data: mockVehicles })
  
  const result = await vehicleService.getAllVehicles()
  expect(result).toEqual(mockVehicles)
})
```

### 2. Test Error Scenarios

```typescript
test('should handle API errors gracefully', async () => {
  apiClient.get.mockRejectedValue(new Error('Network error'))
  
  await expect(vehicleService.getAllVehicles()).rejects.toThrow('Failed to fetch vehicles')
})
```

## Migration from Fetch

### Before (using fetch):

```typescript
const response = await fetch(`${baseUrl}/vehicles`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})

if (!response.ok) {
  throw new Error('Failed to fetch vehicles')
}

const data = await response.json()
return data
```

### After (using Axios):

```typescript
const response = await api.get<Vehicle[]>('/vehicles')
return response.data
```

## Best Practices

### 1. Always Use Services

Don't call the API directly in components. Use service classes:

```typescript
// ❌ Don't do this in components
const response = await api.get('/vehicles')

// ✅ Do this instead
const vehicles = await vehicleService.getAllVehicles()
```

### 2. Handle Errors Gracefully

Always include try-catch blocks and provide fallback data:

```typescript
try {
  const data = await vehicleService.getAllVehicles()
  setVehicles(data)
} catch (error) {
  setError(error instanceof Error ? error.message : 'An error occurred')
  // Show fallback UI or default data
}
```

### 3. Use TypeScript Generics

Leverage TypeScript for better type safety:

```typescript
// ✅ Use generics for type safety
const vehicle = await api.get<Vehicle>(`/vehicles/${id}`)

// ❌ Avoid any types
const vehicle = await api.get(`/vehicles/${id}`)
```

### 4. Consistent Error Messages

Use consistent error messages across your application:

```typescript
// In your services
throw new Error('Failed to fetch vehicles')

// In your components
catch (error) {
  setError(error instanceof Error ? error.message : 'An error occurred')
}
```

## Troubleshooting

### Common Issues

#### 1. CORS Errors
- Ensure your backend has proper CORS configuration
- Check that the base URL is correct

#### 2. Authentication Issues
- Verify JWT tokens are being stored correctly
- Check that the Authorization header is being set

#### 3. Type Errors
- Ensure your interfaces match the API response structure
- Use proper generic types with the API methods

#### 4. Network Errors
- Check your internet connection
- Verify the backend is running and accessible

### Debug Mode

Enable debug logging by setting:

```bash
NODE_ENV=development
```

This will show additional console logs for debugging API calls.

## Next Steps

1. **Add More Services**: Create services for other entities (categories, media, etc.)
2. **Implement Caching**: Add response caching for better performance
3. **Add Retry Logic**: Implement automatic retry for failed requests
4. **Request Queuing**: Add request queuing for better user experience
5. **Offline Support**: Enhance offline fallback capabilities

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify the backend API is running and accessible
3. Check network tab for failed requests
4. Ensure all environment variables are set correctly
5. Verify the API endpoints match your backend exactly

The new Axios setup provides a robust, maintainable, and type-safe way to handle all HTTP requests in your application!
