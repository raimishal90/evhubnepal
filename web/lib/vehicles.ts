import { vehicleService, Vehicle, VehicleFilters } from './services/vehicle.service'

// Re-export types for backward compatibility
export type { Vehicle, VehicleFilters }

// Get data from API instead of JSON file
export async function getAllVehicles(): Promise<Vehicle[]> {
  try {
    return await vehicleService.getAllVehicles()
  } catch (error) {
    console.error('Failed to fetch vehicles from API, falling back to local data:', error)
    // Fallback to local data if API fails
    return getLocalVehicles()
  }
}

export async function getFeaturedVehicles(limit = 3): Promise<Vehicle[]> {
  try {
    return await vehicleService.getFeaturedVehicles(limit)
  } catch (error) {
    console.error('Failed to fetch featured vehicles from API, falling back to local data:', error)
    // Fallback to local data if API fails
    const localVehicles = getLocalVehicles()
    return localVehicles.filter((vehicle) => vehicle.isFeatured).slice(0, limit)
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    return await vehicleService.getVehicleById(id)
  } catch (error) {
    console.error(`Failed to fetch vehicle ${id} from API, falling back to local data:`, error)
    // Fallback to local data if API fails
    const localVehicles = getLocalVehicles()
    return localVehicles.find((vehicle) => vehicle.id === id) || null
  }
}

export async function getVehiclesByFilter(filters: VehicleFilters): Promise<Vehicle[]> {
  try {
    return await vehicleService.searchVehicles(filters)
  } catch (error) {
    console.error('Failed to search vehicles from API, falling back to local data:', error)
    // Fallback to local data if API fails
    return filterLocalVehicles(filters)
  }
}

export async function getNewVehicles(): Promise<Vehicle[]> {
  try {
    return await vehicleService.searchVehicles({ condition: 'New' })
  } catch (error) {
    console.error('Failed to fetch new vehicles from API, falling back to local data:', error)
    // Fallback to local data if API fails
    const localVehicles = getLocalVehicles()
    return localVehicles.filter((vehicle) => vehicle.condition === 'New')
  }
}

export async function getVehicleBrands(): Promise<string[]> {
  try {
    return await vehicleService.getVehicleBrands()
  } catch (error) {
    console.error('Failed to fetch vehicle brands from API, falling back to local data:', error)
    // Fallback to local data if API fails
    const localVehicles = getLocalVehicles()
    const brands = new Set(localVehicles.map((v) => v.brand).filter(Boolean) as string[])
    return Array.from(brands)
  }
}

export async function getVehicleTypes(): Promise<string[]> {
  try {
    return await vehicleService.getVehicleTypes()
  } catch (error) {
    console.error('Failed to fetch vehicle types from API, falling back to local data:', error)
    // Fallback to local data if API fails
    const localVehicles = getLocalVehicles()
    const types = new Set(localVehicles.map((v) => v.type).filter(Boolean) as string[])
    return Array.from(types)
  }
}

// Fallback functions using local data
function getLocalVehicles(): Vehicle[] {
  // Import local data as fallback
  const localData = require('@/data/vehicles.json')
  return localData.vehicles || []
}

function filterLocalVehicles(filters: VehicleFilters): Vehicle[] {
  let filtered = getLocalVehicles()

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (v) =>
        v.name.toLowerCase().includes(searchLower) ||
        v.description?.toLowerCase().includes(searchLower) ||
        v.brand?.toLowerCase().includes(searchLower),
    )
  }

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter((v) => v.type === filters.type)
  }

  if (filters.brand && filters.brand !== 'all') {
    filtered = filtered.filter((v) => v.brand === filters.brand)
  }

  if (filters.minPrice) {
    filtered = filtered.filter((v) => v.price >= filters.minPrice!)
  }

  if (filters.maxPrice) {
    filtered = filtered.filter((v) => v.price <= filters.maxPrice!)
  }

  if (filters.minRange) {
    filtered = filtered.filter((v) => v.range >= filters.minRange!)
  }

  if (filters.maxRange) {
    filtered = filtered.filter((v) => v.range <= filters.maxRange!)
  }

  if (filters.condition && filters.condition !== 'all') {
    filtered = filtered.filter((v) => v.condition === filters.condition)
  }

  return filtered
}

// Keep the coming soon vehicles function as is for now
export async function getComingSoonVehicles(): Promise<any[]> {
  const localData = require('@/data/vehicles.json')
  return localData.comingSoonVehicles || []
}
