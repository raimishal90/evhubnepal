// Auth service for connecting to the backend API
import { api } from '@/lib/api'
import { 
  LoginCredentials, 
  SignupData, 
  AuthData, 
  User 
} from '@/lib/types/auth.types'

class AuthService {
  // Accept an optional `rememberMe` flag so the caller can request a longer-lived cookie.
  async login(credentials: LoginCredentials, rememberMe: boolean = false): Promise<AuthData> {
    try {
      const response = await api.post<AuthData>('/user/login', credentials)
      // Persist token + user to localStorage and cookie for middleware to read
      if (response.data?.token && response.data?.user) {
        this.setAuthData(response.data.token, response.data.user, rememberMe)
      }
      return response.data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Login failed')
    }
  }

  async signup(userData: SignupData): Promise<AuthData> {
    try {
      const response = await api.post<AuthData>('/user', userData)
      return response.data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Signup failed')
    }
  }

  async logout(): Promise<void> {
    // Clear local storage and any stored tokens
    try {
      if (typeof window !== 'undefined') {
        // Remove saved user (token is cookie-only now)
        localStorage.removeItem('user');
        // Clear the auth cookie
        document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  // Store authentication data in localStorage and cookies
  setAuthData(token: string, user: User, rememberMe: boolean = false): void {
    try {
      if (typeof window !== 'undefined') {
        // Only persist token in cookie (do not store token in localStorage)
        localStorage.setItem('user', JSON.stringify(user));

        // Set cookie for middleware to read. If rememberMe is true, set a longer expiration time
        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
        document.cookie = `authToken=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; secure=${location.protocol === 'https:'}; samesite=strict`;
      }
    } catch (error) {
      console.error('Failed to store auth data:', error);
    }
  }

  // Get stored authentication data
  getAuthData(): { token: string | null; user: User | null; isExpired: boolean } {
    try {
      if (typeof window === 'undefined') {
        return { token: null, user: null, isExpired: false };
      }
      // Read token from cookie (token is stored cookie-only)
      let token: string | null = null
      try {
        const name = `authToken=`
        const parts = document.cookie.split('; ').find((p) => p.startsWith(name))
        token = parts ? decodeURIComponent(parts.split('=')[1]) : null
      } catch (e) {
        token = null
      }

      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      return { token, user, isExpired: false };
    } catch (error) {
      // Handle any localStorage errors gracefully
      return { token: null, user: null, isExpired: false };
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const { token } = this.getAuthData();
    return !!token;
  }

  // Check if user is admin
  isAdmin(): boolean {
    const { user } = this.getAuthData();
    return user?.isAdmin || false;
  }

  // Get auth headers for API requests
  getAuthHeaders(): Record<string, string> {
    const { token } = this.getAuthData();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
}

// Create and export a singleton instance
export const authService = new AuthService();