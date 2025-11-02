"use client"

import { useAuthError } from '@/hooks/use-auth-error'

// This component handles authentication errors globally
// It uses the useAuthError hook to listen for auth error events
export function AuthErrorHandler() {
  useAuthError()
  
  // This component doesn't render anything, it just sets up the event listener
  return null
}
