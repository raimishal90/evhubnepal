import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Custom hook to handle authentication errors
export function useAuthError() {
  const router = useRouter()

  useEffect(() => {
    // Listen for custom auth error events
    const handleAuthError = (event: CustomEvent) => {
      if (event.detail?.status === 401) {
        // Clear auth data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
        }
        
        // Redirect to login using Next.js router (no page refresh)
        router.push('/login')
      }
    }

    // Add event listener
    window.addEventListener('auth-error', handleAuthError as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener('auth-error', handleAuthError as EventListener)
    }
  }, [router])

  // Function to dispatch auth error events
  const dispatchAuthError = (status: number, message?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('auth-error', {
          detail: { status, message }
        })
      )
    }
  }

  return { dispatchAuthError }
}
