// Vehicle related interfaces and types

export interface Vehicle {
  id: string
  name: string
  price: number
  range: number
  power: number
  image: string
  isNew: boolean
  isFeatured?: boolean
  year?: number
  acceleration?: number
  description?: string
  brand?: string
  type?: string
  condition?: string
  features?: string[]
  specifications?: VehicleSpecifications
  safety?: VehicleSafety
  warranty?: VehicleWarranty
}

export interface VehicleSpecifications {
  batteryCapacity?: string
  motorType?: string
  drivetrain?: string
  topSpeed?: string
  chargingTime?: string
  fastChargingTime?: string
  seatingCapacity?: number
  cargoSpace?: string
  weight?: string
  length?: string
  width?: string
  height?: string
  wheelbase?: string
  groundClearance?: string
  towingCapacity?: string
  wadingDepth?: string
}

export interface VehicleSafety {
  rating?: string
  features?: string[]
}

export interface VehicleWarranty {
  basic?: string
  battery?: string
  drivetrain?: string
}

export interface VehicleFilters {
  search?: string
  type?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  minRange?: number
  maxRange?: number
  condition?: string
  year?: number
  features?: string[]
}

export interface VehicleCategory {
  id: string
  name: string
  type: 'brand' | 'tag' | 'type'
  description?: string
  imageUrl?: string
  parentId?: string
  children?: VehicleCategory[]
}

export interface VehicleComparison {
  id: string
  name: string
  vehicles: Vehicle[]
  createdAt: string
  updatedAt: string
}

export interface VehicleReview {
  id: string
  vehicleId: string
  userId: string
  rating: number
  title: string
  comment: string
  pros?: string[]
  cons?: string[]
  createdAt: string
  updatedAt: string
}

export interface VehicleImage {
  id: string
  vehicleId: string
  url: string
  altText?: string
  caption?: string
  isPrimary: boolean
  order: number
  createdAt: string
}

export interface VehicleDocument {
  id: string
  vehicleId: string
  name: string
  type: 'manual' | 'warranty' | 'service' | 'other'
  url: string
  size: number
  mimeType: string
  createdAt: string
}

export interface VehicleAvailability {
  id: string
  vehicleId: string
  isAvailable: boolean
  availableFrom?: string
  availableUntil?: string
  location?: string
  notes?: string
}

export interface VehiclePricing {
  id: string
  vehicleId: string
  basePrice: number
  salePrice?: number
  rentalPrice?: number
  rentalPeriod?: 'hourly' | 'daily' | 'weekly' | 'monthly'
  currency: string
  validFrom: string
  validUntil?: string
  conditions?: string[]
}
