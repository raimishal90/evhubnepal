export interface ChargingStation {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  address: string
  city: string
  chargerTypes: string[]
  powerOutput: string[]
  pricing: string
  hours: string
  amenities: string[]
  isFunctional: boolean
  lastReported: string
  operator: string
  contactPhone?: string
  photos: string[]
}

// Sample data for charging stations in Nepal
export const chargingStations: ChargingStation[] = [
  {
    id: "cs-001",
    name: "NEA Charging Station - Ratnapark",
    location: {
      lat: 27.7041,
      lng: 85.3131,
    },
    address: "Ratnapark, Kathmandu Metropolitan City",
    city: "Kathmandu",
    chargerTypes: ["CCS", "CHAdeMO", "Type 2"],
    powerOutput: ["50kW DC", "22kW AC"],
    pricing: "NPR 15 per kWh",
    hours: "24/7",
    amenities: ["Restrooms", "Convenience Store", "WiFi"],
    isFunctional: true,
    lastReported: "2023-12-15",
    operator: "Nepal Electricity Authority",
    contactPhone: "+977-1-4153051",
    photos: ["/images/charging-stations/nea-ratnapark.jpg"],
  },
  {
    id: "cs-002",
    name: "Tata Power Station - Naxal",
    location: {
      lat: 27.7192,
      lng: 85.3265,
    },
    address: "Naxal, Kathmandu Metropolitan City",
    city: "Kathmandu",
    chargerTypes: ["CCS", "Type 2"],
    powerOutput: ["60kW DC", "22kW AC"],
    pricing: "NPR 18 per kWh",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Restrooms", "Cafe", "WiFi", "Waiting Area"],
    isFunctional: true,
    lastReported: "2023-12-20",
    operator: "Tata Power",
    contactPhone: "+977-1-4416789",
    photos: ["/images/charging-stations/tata-naxal.jpg"],
  },
  {
    id: "cs-003",
    name: "Sundar Charging Hub - Lalitpur",
    location: {
      lat: 27.6588,
      lng: 85.3247,
    },
    address: "Pulchowk, Lalitpur Metropolitan City",
    city: "Lalitpur",
    chargerTypes: ["CCS", "CHAdeMO", "Type 2"],
    powerOutput: ["50kW DC", "22kW AC", "7kW AC"],
    pricing: "NPR 16 per kWh",
    hours: "24/7",
    amenities: ["Restrooms", "Cafe", "WiFi", "Shopping"],
    isFunctional: true,
    lastReported: "2023-12-18",
    operator: "Sundar Yatayat",
    contactPhone: "+977-1-5553421",
    photos: ["/images/charging-stations/sundar-lalitpur.jpg"],
  },
  {
    id: "cs-004",
    name: "Hotel Annapurna Charging Point",
    location: {
      lat: 27.7107,
      lng: 85.3159,
    },
    address: "Durbar Marg, Kathmandu",
    city: "Kathmandu",
    chargerTypes: ["Type 2"],
    powerOutput: ["22kW AC", "11kW AC"],
    pricing: "Free for hotel guests, NPR 20 per kWh for others",
    hours: "6:00 AM - 11:00 PM",
    amenities: ["Restrooms", "Restaurant", "WiFi", "Parking"],
    isFunctional: true,
    lastReported: "2023-12-10",
    operator: "Hotel Annapurna",
    contactPhone: "+977-1-4221711",
    photos: ["/images/charging-stations/annapurna-hotel.jpg"],
  },
  {
    id: "cs-005",
    name: "Pokhara Lakeside Charging Station",
    location: {
      lat: 28.2096,
      lng: 83.9856,
    },
    address: "Lakeside, Pokhara",
    city: "Pokhara",
    chargerTypes: ["CCS", "Type 2"],
    powerOutput: ["50kW DC", "22kW AC"],
    pricing: "NPR 17 per kWh",
    hours: "24/7",
    amenities: ["Restrooms", "Cafe", "WiFi", "Tourist Information"],
    isFunctional: true,
    lastReported: "2023-12-05",
    operator: "Nepal Electricity Authority",
    contactPhone: "+977-61-465767",
    photos: ["/images/charging-stations/pokhara-lakeside.jpg"],
  },
  {
    id: "cs-006",
    name: "Biratnagar City Center EV Station",
    location: {
      lat: 26.4525,
      lng: 87.2718,
    },
    address: "Main Road, Biratnagar",
    city: "Biratnagar",
    chargerTypes: ["CCS", "Type 2"],
    powerOutput: ["50kW DC", "22kW AC"],
    pricing: "NPR 15 per kWh",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Restrooms", "Convenience Store"],
    isFunctional: true,
    lastReported: "2023-12-12",
    operator: "Nepal Electricity Authority",
    contactPhone: "+977-21-435678",
    photos: ["/images/charging-stations/biratnagar-city.jpg"],
  },
  {
    id: "cs-007",
    name: "Chitwan EV Charging Point",
    location: {
      lat: 27.5291,
      lng: 84.3542,
    },
    address: "Bharatpur, Chitwan",
    city: "Chitwan",
    chargerTypes: ["CCS", "Type 2"],
    powerOutput: ["50kW DC", "11kW AC"],
    pricing: "NPR 16 per kWh",
    hours: "7:00 AM - 9:00 PM",
    amenities: ["Restrooms", "Restaurant"],
    isFunctional: false, // Currently under maintenance
    lastReported: "2023-12-01",
    operator: "Nepal Electricity Authority",
    contactPhone: "+977-56-520134",
    photos: ["/images/charging-stations/chitwan-ev.jpg"],
  },
  {
    id: "cs-008",
    name: "Bhaktapur Durbar Square Charging Point",
    location: {
      lat: 27.671,
      lng: 85.4298,
    },
    address: "Durbar Square Area, Bhaktapur",
    city: "Bhaktapur",
    chargerTypes: ["Type 2"],
    powerOutput: ["22kW AC", "11kW AC"],
    pricing: "NPR 18 per kWh",
    hours: "8:00 AM - 8:00 PM",
    amenities: ["Restrooms", "Tourist Information"],
    isFunctional: true,
    lastReported: "2023-12-08",
    operator: "Bhaktapur Municipality",
    contactPhone: "+977-1-6610778",
    photos: ["/images/charging-stations/bhaktapur-durbar.jpg"],
  },
  {
    id: "cs-009",
    name: "Butwal Highway Charging Hub",
    location: {
      lat: 27.6866,
      lng: 83.4323,
    },
    address: "Butwal Highway, Rupandehi",
    city: "Butwal",
    chargerTypes: ["CCS", "CHAdeMO"],
    powerOutput: ["100kW DC", "50kW DC"],
    pricing: "NPR 20 per kWh",
    hours: "24/7",
    amenities: ["Restrooms", "Convenience Store", "Restaurant", "WiFi"],
    isFunctional: true,
    lastReported: "2023-12-17",
    operator: "Nepal Oil Corporation",
    contactPhone: "+977-71-438976",
    photos: ["/images/charging-stations/butwal-highway.jpg"],
  },
  {
    id: "cs-010",
    name: "Nagarkot View Point Charging Station",
    location: {
      lat: 27.7289,
      lng: 85.5252,
    },
    address: "Nagarkot View Point, Bhaktapur",
    city: "Nagarkot",
    chargerTypes: ["Type 2"],
    powerOutput: ["11kW AC"],
    pricing: "NPR 20 per kWh",
    hours: "7:00 AM - 7:00 PM",
    amenities: ["Restrooms", "Restaurant", "Scenic View"],
    isFunctional: false, // Temporarily out of service
    lastReported: "2023-11-30",
    operator: "Nagarkot Tourism Development Committee",
    contactPhone: "+977-1-6680127",
    photos: ["/images/charging-stations/nagarkot-view.jpg"],
  },
]

// Function to get all charging stations
export function getAllChargingStations(): ChargingStation[] {
  return chargingStations
}

// Function to get a charging station by ID
export function getChargingStationById(id: string): ChargingStation | undefined {
  return chargingStations.find((station) => station.id === id)
}

// Function to get functional charging stations
export function getFunctionalChargingStations(): ChargingStation[] {
  return chargingStations.filter((station) => station.isFunctional)
}

// Function to get charging stations by city
export function getChargingStationsByCity(city: string): ChargingStation[] {
  return chargingStations.filter((station) => station.city.toLowerCase() === city.toLowerCase())
}

// Function to find the nearest charging station to a given location
export function findNearestChargingStation(lat: number, lng: number, onlyFunctional = true): ChargingStation | null {
  const stations = onlyFunctional ? getFunctionalChargingStations() : chargingStations

  if (stations.length === 0) return null

  let nearestStation = stations[0]
  let shortestDistance = calculateDistance(lat, lng, stations[0].location.lat, stations[0].location.lng)

  for (let i = 1; i < stations.length; i++) {
    const distance = calculateDistance(lat, lng, stations[i].location.lat, stations[i].location.lng)
    if (distance < shortestDistance) {
      shortestDistance = distance
      nearestStation = stations[i]
    }
  }

  return nearestStation
}

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}
