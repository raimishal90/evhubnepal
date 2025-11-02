# API Integration Setup for EV Hub Nepal Frontend

This document explains how to set up and use the API integration for the EV Hub Nepal frontend application.

## Overview

The frontend now includes a complete authentication system that connects to your NestJS backend API. Users can register, login, and access protected routes.

## Features Implemented

- ✅ **Authentication Service**: Complete auth service with login/signup functionality
- ✅ **Auth Context**: React context for managing authentication state
- ✅ **Protected Routes**: Route protection for authenticated users
- ✅ **Login Form**: Connected to backend API
- ✅ **Signup Form**: Connected to backend API
- ✅ **Dashboard**: Protected dashboard with user information
- ✅ **Navbar**: Dynamic navigation based on auth state
- ✅ **Logout Functionality**: Complete logout with state cleanup

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the `web` directory:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Environment
NODE_ENV=development
```

**Note**: The default API URL is `http://localhost:3001` (as configured in `lib/config.ts`)

### 2. Backend Requirements

Ensure your NestJS backend is running and has the following endpoints:

- `POST /user/login` - User login
- `POST /user` - User registration
- `GET /user` - Get user profile (protected)

### 3. Database Setup

Make sure your PostgreSQL database is running and the user table has the correct schema:

```sql
-- Required fields for authentication
id: number (primary key)
email: string (unique)
password: string (hashed)
firstName: string (optional)
lastName: string (optional)
roleId: number (default: 1 for admin)
```

## API Endpoints

### Authentication Endpoints

#### Login
```typescript
POST /user/login
Body: { email: string, password: string }
Response: { status: boolean, message: string, data: { token: string, user: User } }
```

#### Signup
```typescript
POST /user
Body: { firstName: string, lastName: string, email: string, password: string }
Response: { status: boolean, message: string, data: { token: string, user: User } }
```

### User Interface

```typescript
interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
  roleId: number
  isAdmin: boolean
}
```

## Usage Examples

### Using the Auth Context

```typescript
import { useAuth } from '@/contexts/auth-context'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  if (isAuthenticated) {
    return <div>Welcome, {user?.firstName}!</div>
  }
  
  return <div>Please log in</div>
}
```

### Protected Routes

```typescript
import { ProtectedRoute } from '@/components/auth/protected-route'

function MyPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  )
}
```

### Admin-Only Routes

```typescript
import { ProtectedRoute } from '@/components/auth/protected-route'

function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div>This content is only visible to admin users</div>
    </ProtectedRoute>
  )
}
```

## File Structure

```
web/
├── app/
│   ├── login/
│   │   ├── components/
│   │   │   ├── login-form.tsx      # Login form with API integration
│   │   │   └── signup-form.tsx     # Signup form with API integration
│   │   └── auth.service.ts         # Authentication service
│   └── dashboard/
│       ├── page.tsx                # Protected dashboard page
│       └── dashboard-content.tsx   # Dashboard content component
├── components/
│   └── auth/
│       └── protected-route.tsx     # Route protection component
├── contexts/
│   └── auth-context.tsx            # Authentication context
├── lib/
│   └── config.ts                   # Configuration file
└── API_INTEGRATION_README.md       # This file
```

## Testing the Integration

### 1. Start the Backend

```bash
cd api
npm run start:dev
```

### 2. Start the Frontend

```bash
cd web
npm run dev
```

### 3. Test Authentication

1. Navigate to `/login`
2. Try creating a new account
3. Test login with existing credentials
4. Verify dashboard access
5. Test logout functionality

## Troubleshooting

### Common Issues

#### 1. CORS Errors
If you encounter CORS errors, ensure your backend has proper CORS configuration:

```typescript
// In your NestJS main.ts
app.enableCors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
})
```

#### 2. API Connection Failed
- Verify the backend is running on the correct port
- Check the `NEXT_PUBLIC_API_URL` environment variable
- Ensure the API endpoints match exactly

#### 3. Authentication State Not Persisting
- Check browser localStorage
- Verify the auth context is properly wrapping your app
- Check for JavaScript errors in the console

### Debug Mode

Enable debug logging by setting:

```bash
NODE_ENV=development
```

This will show additional console logs for debugging authentication flows.

## Security Considerations

- **JWT Tokens**: Stored in localStorage (consider httpOnly cookies for production)
- **Password Validation**: Frontend validation + backend validation
- **Route Protection**: Client-side + server-side protection recommended
- **HTTPS**: Use HTTPS in production for secure communication

## Next Steps

1. **Add Password Reset**: Implement forgot password functionality
2. **Email Verification**: Add email verification for new accounts
3. **Social Login**: Integrate Google, Facebook, etc.
4. **Two-Factor Authentication**: Add 2FA for enhanced security
5. **Session Management**: Implement session timeout and refresh tokens

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify backend API responses
3. Check network tab for failed requests
4. Ensure all environment variables are set correctly

## API Response Format

All API responses should follow this format:

```typescript
interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}
```

This ensures consistent error handling and user feedback across the application.

