import { api } from '@/lib/api'
import { Vehicle, VehicleFilters } from '@/lib/types'

class VehicleService {
  // Get all vehicles
  async getAllVehicles(): Promise<Vehicle[]> {
    try {
      const response = await api.get<Vehicle[]>('/vehicles')
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch vehicles:', error)
      throw new Error('Failed to fetch vehicles')
    }
  }

  // Get vehicle by ID
  async getVehicleById(id: string): Promise<Vehicle> {
    try {
      const response = await api.get<Vehicle>(`/vehicles/${id}`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to fetch vehicle ${id}:`, error)
      throw new Error('Failed to fetch vehicle')
    }
  }

  // Get featured vehicles
  async getFeaturedVehicles(limit: number = 6): Promise<Vehicle[]> {
    try {
      const response = await api.get<Vehicle[]>(`/vehicles/featured?limit=${limit}`)
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch featured vehicles:', error)
      throw new Error('Failed to fetch featured vehicles')
    }
  }

  // Search vehicles with filters
  async searchVehicles(filters: VehicleFilters): Promise<Vehicle[]> {
    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString())
        }
      })

      const response = await api.get<Vehicle[]>(`/vehicles/search?${queryParams.toString()}`)
      return response.data
    } catch (error: any) {
      console.error('Failed to search vehicles:', error)
      throw new Error('Failed to search vehicles')
    }
  }

  // Create new vehicle (requires authentication)
  async createVehicle(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    try {
      const response = await api.post<Vehicle>('/vehicles', vehicleData)
      return response.data
    } catch (error: any) {
      console.error('Failed to create vehicle:', error)
      throw new Error('Failed to create vehicle')
    }
  }

  // Update vehicle (requires authentication)
  async updateVehicle(id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    try {
      const response = await api.put<Vehicle>(`/vehicles/${id}`, vehicleData)
      return response.data
    } catch (error: any) {
      console.error(`Failed to update vehicle ${id}:`, error)
      throw new Error('Failed to update vehicle')
    }
  }

  // Delete vehicle (requires authentication)
  async deleteVehicle(id: string): Promise<void> {
    try {
      await api.delete(`/vehicles/${id}`)
    } catch (error: any) {
      console.error(`Failed to delete vehicle ${id}:`, error)
      throw new Error('Failed to delete vehicle')
    }
  }

  // Get vehicle brands
  async getVehicleBrands(): Promise<string[]> {
    try {
      const response = await api.get<string[]>('/vehicles/brands')
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch vehicle brands:', error)
      throw new Error('Failed to fetch vehicle brands')
    }
  }

  // Get vehicle types
  async getVehicleTypes(): Promise<string[]> {
    try {
      const response = await api.get<string[]>('/vehicles/types')
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch vehicle types:', error)
      throw new Error('Failed to fetch vehicle types')
    }
  }
}

// Create and export a singleton instance
export const vehicleService = new VehicleService()
