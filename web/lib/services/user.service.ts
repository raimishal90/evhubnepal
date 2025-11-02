import { api } from '@/lib/api'
import { User, UserProfile, UpdateUserData } from '@/lib/types/auth.types'

class UserService {
  // Get current user profile
  async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await api.get<UserProfile>('/user/profile')
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch user profile:', error)
      throw new Error('Failed to fetch user profile')
    }
  }

  // Update user profile
  async updateProfile(userData: UpdateUserData): Promise<UserProfile> {
    try {
      const response = await api.put<UserProfile>('/user/profile', userData)
      return response.data
    } catch (error: any) {
      console.error('Failed to update user profile:', error)
      throw new Error('Failed to update user profile')
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.post('/user/change-password', {
        currentPassword,
        newPassword,
      })
    } catch (error: any) {
      console.error('Failed to change password:', error)
      throw new Error('Failed to change password')
    }
  }

  // Get user by ID (admin only)
  async getUserById(id: number): Promise<UserProfile> {
    try {
      const response = await api.get<UserProfile>(`/user/${id}`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to fetch user ${id}:`, error)
      throw new Error('Failed to fetch user')
    }
  }

  // Get all users (admin only)
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const response = await api.get<UserProfile[]>('/user')
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch users:', error)
      throw new Error('Failed to fetch users')
    }
  }

  // Update user by ID (admin only)
  async updateUserById(id: number, userData: UpdateUserData): Promise<UserProfile> {
    try {
      const response = await api.put<UserProfile>(`/user/${id}`, userData)
      return response.data
    } catch (error: any) {
      console.error(`Failed to update user ${id}:`, error)
      throw new Error('Failed to update user')
    }
  }

  // Delete user by ID (admin only)
  async deleteUserById(id: number): Promise<void> {
    try {
      await api.delete(`/user/${id}`)
    } catch (error: any) {
      console.error(`Failed to delete user ${id}:`, error)
      throw new Error('Failed to delete user')
    }
  }

  // Upload profile picture
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

  // Get user statistics (admin only)
  async getUserStats(): Promise<{
    totalUsers: number
    activeUsers: number
    newUsersThisMonth: number
    userGrowthRate: number
  }> {
    try {
      const response = await api.get<{
        totalUsers: number
        activeUsers: number
        newUsersThisMonth: number
        userGrowthRate: number
      }>('/user/stats')
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch user statistics:', error)
      throw new Error('Failed to fetch user statistics')
    }
  }
}

// Create and export a singleton instance
export const userService = new UserService()
