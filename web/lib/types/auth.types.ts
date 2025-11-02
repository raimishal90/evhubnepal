// Authentication related interfaces and types

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  user?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    roleId: number;
    isAdmin: boolean;
  };
}

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  roleId: number;
  isAdmin: boolean;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data: AuthData;
}

// Extended user profile interface for more detailed user information
export interface UserProfile extends User {
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// User update interface for profile updates
export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

// Password change interface
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Forgot password interface
export interface ForgotPasswordData {
  email: string;
}

// Reset password interface
export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Session management interfaces
export interface SessionData {
  token: string;
  user: User;
  expiresAt: string;
  refreshToken?: string;
}

// Authentication state interface for context
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  token: string | null;
}

// Login response interface
export interface LoginResponse {
  success: boolean;
  message: string;
  data?: AuthData;
  error?: string;
}

// Signup response interface
export interface SignupResponse {
  success: boolean;
  message: string;
  data?: AuthData;
  error?: string;
  validationErrors?: Record<string, string[]>;
}
