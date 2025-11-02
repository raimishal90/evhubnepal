"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/app/login/auth.service'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const admin = authService.isAdmin()

      setIsAuthenticated(authenticated)
      setIsAdmin(admin)
      setIsLoading(false)

      if (!authenticated) {
        router.push(redirectTo)
        return
      }

      if (requireAdmin && !admin) {
        router.push('/dashboard')
        return
      }
    }

    checkAuth()
  }, [requireAdmin, redirectTo, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return null
  }

  return <>{children}</>
}
