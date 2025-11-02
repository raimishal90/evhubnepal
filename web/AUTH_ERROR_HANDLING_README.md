# Authentication Error Handling Solution

This document explains how authentication errors are now handled properly without causing browser refresh.

## Problem

Previously, when authentication errors occurred (like 401 Unauthorized), the Axios interceptor was using `window.location.href = '/login'` which caused a full page refresh. This was not the standard way to handle authentication in Next.js applications.

## Solution

We've implemented a proper authentication error handling system that:

1. **Uses Custom Events**: Instead of direct redirects, we dispatch custom events
2. **Next.js Router**: Uses `router.push()` instead of `window.location.href`
3. **Global Error Handling**: Centralized error handling in the auth context
4. **No Page Refresh**: Maintains SPA behavior

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Axios Error  │───▶│  Custom Event   │───▶│  Auth Context   │
│   Interceptor  │    │   Dispatcher     │    │   Handler       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       ▼
         │                       │              ┌─────────────────┐
         │                       │              │  Next.js Router │
         │                       │              │   (No Refresh)  │
         │                       │              └─────────────────┘
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  Clear Storage  │    │  Event Listener  │
└─────────────────┘    └──────────────────┘
```

## Implementation Details

### 1. Axios Interceptor (`web/lib/axios.ts`)

```typescript
// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      
      // Dispatch custom event instead of direct redirect
      window.dispatchEvent(
        new CustomEvent('auth-error', {
          detail: { 
            status: 401, 
            message: 'Authentication failed. Please login again.' 
          }
        })
      )
    }
    
    return Promise.reject(error)
  }
)
```

### 2. Custom Hook (`web/hooks/use-auth-error.ts`)

```typescript
export function useAuthError() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthError = (event: CustomEvent) => {
      if (event.detail?.status === 401) {
        // Clear auth data
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        
        // Use Next.js router (no page refresh)
        router.push('/login')
      }
    }

    window.addEventListener('auth-error', handleAuthError as EventListener)
    
    return () => {
      window.removeEventListener('auth-error', handleAuthError as EventListener)
    }
  }, [router])

  return { dispatchAuthError }
}
```

### 3. Global Error Handler (`web/components/auth-error-handler.tsx`)

```typescript
export function AuthErrorHandler() {
  useAuthError()
  return null // Doesn't render anything, just sets up event listener
}
```

### 4. Root Layout Integration

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <AuthErrorHandler /> {/* Global error handler */}
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Benefits

### 1. **No Browser Refresh**
- Uses Next.js router instead of `window.location.href`
- Maintains SPA (Single Page Application) behavior
- Better user experience

### 2. **Proper Error Handling**
- Centralized error handling
- Consistent error responses
- Better debugging capabilities

### 3. **Type Safety**
- Full TypeScript support
- Proper error types
- Better IntelliSense

### 4. **Maintainability**
- Separation of concerns
- Reusable error handling
- Easy to extend

## Usage

### 1. **Automatic Handling**
The system automatically handles 401 errors:
- Clears authentication data
- Redirects to login page
- No manual intervention needed

### 2. **Custom Error Handling**
You can also manually dispatch auth errors:

```typescript
import { useAuthError } from '@/hooks/use-auth-error'

function MyComponent() {
  const { dispatchAuthError } = useAuthError()
  
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    // Dispatch auth error event
    dispatchAuthError(401, 'User logged out')
  }
  
  return <button onClick={handleLogout}>Logout</button>
}
```

### 3. **Listening for Auth Errors**
Components can listen for auth error events:

```typescript
useEffect(() => {
  const handleAuthError = (event: CustomEvent) => {
    console.log('Auth error:', event.detail)
    // Handle auth error in component
  }
  
  window.addEventListener('auth-error', handleAuthError as EventListener)
  
  return () => {
    window.removeEventListener('auth-error', handleAuthError as EventListener)
  }
}, [])
```

## Error Types

### 1. **401 Unauthorized**
- Invalid or expired token
- User not authenticated
- Automatic redirect to login

### 2. **403 Forbidden**
- User authenticated but not authorized
- Insufficient permissions
- Usually handled by components

### 3. **500 Internal Server Error**
- Server-side errors
- Database connection issues
- Usually handled by components

## Testing

### 1. **Test Authentication Errors**
```typescript
// Simulate 401 error
window.dispatchEvent(
  new CustomEvent('auth-error', {
    detail: { status: 401, message: 'Test error' }
  })
)
```

### 2. **Test Token Expiry**
```typescript
// Remove token to simulate expiry
localStorage.removeItem('authToken')
// Make API call that will return 401
```

### 3. **Test Manual Logout**
```typescript
// Test manual logout
const { dispatchAuthError } = useAuthError()
dispatchAuthError(401, 'Manual logout')
```

## Troubleshooting

### 1. **Event Not Firing**
- Check if `AuthErrorHandler` is in the component tree
- Verify event listener is properly set up
- Check browser console for errors

### 2. **Redirect Not Working**
- Ensure Next.js router is available
- Check if component is mounted
- Verify route path is correct

### 3. **Storage Not Clearing**
- Check localStorage permissions
- Verify storage keys are correct
- Check if running in browser context

## Best Practices

### 1. **Always Use the Hook**
- Don't manually redirect on auth errors
- Use the centralized error handling
- Keep error handling consistent

### 2. **Handle Errors Gracefully**
- Provide user-friendly error messages
- Don't crash the application
- Log errors for debugging

### 3. **Test Error Scenarios**
- Test with invalid tokens
- Test with expired tokens
- Test network failures

## Future Enhancements

### 1. **Retry Logic**
- Automatic retry for network errors
- Exponential backoff
- User notification

### 2. **Offline Support**
- Handle offline scenarios
- Queue failed requests
- Sync when online

### 3. **Advanced Error Types**
- More specific error categories
- Better error messages
- Localized error text

This solution provides a robust, maintainable, and user-friendly way to handle authentication errors without causing browser refresh, following Next.js best practices.
