"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, Battery, Clock, Compass, Filter, Info, Locate, MapPin, Phone, Search, Zap } from "lucide-react"
import { type ChargingStation, getAllChargingStations, findNearestChargingStation } from "@/lib/charging-stations"

// Dynamically import the Map component to avoid SSR issues with Leaflet
const ChargingStationMap = dynamic(() => import("@/components/charging-station-map"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[600px] bg-muted/30 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function ChargingStationsPage() {
  const [stations, setStations] = useState<ChargingStation[]>([])
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestStation, setNearestStation] = useState<ChargingStation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [activeTab, setActiveTab] = useState("map")
  const [filterFunctional, setFilterFunctional] = useState(true)
  const [filterCity, setFilterCity] = useState<string>("all")
  const [filterChargerTypes, setFilterChargerTypes] = useState<string[]>([])
  const [filterAmenities, setFilterAmenities] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const mapRef = useRef(null)

  // Get unique cities, charger types, and amenities
  const [cities, setCities] = useState<string[]>([])
  const [chargerTypes, setChargerTypes] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])

  useEffect(() => {
    // Load all charging stations
    const allStations = getAllChargingStations()
    setStations(allStations)

    // Extract unique cities
    const uniqueCities = Array.from(new Set(allStations.map((station) => station.city)))
    setCities(uniqueCities)

    // Extract unique charger types
    const uniqueChargerTypes = Array.from(new Set(allStations.flatMap((station) => station.chargerTypes)))
    setChargerTypes(uniqueChargerTypes)

    // Extract unique amenities
    const uniqueAmenities = Array.from(new Set(allStations.flatMap((station) => station.amenities)))
    setAmenities(uniqueAmenities)
  }, [])

  // Toggle charger type filter
  const toggleChargerTypeFilter = (type: string) => {
    setFilterChargerTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Toggle amenity filter
  const toggleAmenityFilter = (amenity: string) => {
    setFilterAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  // Filter stations based on all criteria
  const filteredStations = stations.filter((station) => {
    // Filter by functional status
    if (filterFunctional && !station.isFunctional) return false

    // Filter by city
    if (filterCity !== "all" && station.city !== filterCity) return false

    // Filter by charger types
    if (filterChargerTypes.length > 0 && !filterChargerTypes.some((type) => station.chargerTypes.includes(type))) {
      return false
    }

    // Filter by amenities
    if (filterAmenities.length > 0 && !filterAmenities.every((amenity) => station.amenities.includes(amenity))) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        station.name.toLowerCase().includes(query) ||
        station.city.toLowerCase().includes(query) ||
        station.address.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Handle user location detection
  const handleLocateMe = () => {
    setIsLocating(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(userLoc)

          // Find nearest station
          const nearest = findNearestChargingStation(userLoc.lat, userLoc.lng, filterFunctional)
          setNearestStation(nearest)

          // If we have a nearest station, select it
          if (nearest) {
            setSelectedStation(nearest)
          }

          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
          alert("Unable to get your location. Please check your browser permissions.")
        },
      )
    } else {
      setIsLocating(false)
      alert("Geolocation is not supported by your browser")
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setFilterFunctional(true)
    setFilterCity("all")
    setFilterChargerTypes([])
    setFilterAmenities([])
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">EV Charging Stations in Nepal</h1>
        <p className="text-muted-foreground">
          Find and navigate to charging stations across Nepal. Get real-time information about availability and
          amenities.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar - Search and filters */}
        <div className="w-full lg:w-1/4 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or location"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="functional-only"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={filterFunctional}
                  onChange={(e) => setFilterFunctional(e.target.checked)}
                />
                <label htmlFor="functional-only" className="text-sm">
                  Show only functional stations
                </label>
              </div>

              <Button className="w-full flex items-center gap-2 mb-4" onClick={handleLocateMe} disabled={isLocating}>
                {isLocating ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    Locating...
                  </>
                ) : (
                  <>
                    <Locate className="h-4 w-4" />
                    Find Nearest Station
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {isFilterOpen ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              {isFilterOpen && (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">City</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                    >
                      <option value="all">All Cities</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="charger-types">
                      <AccordionTrigger className="text-sm font-medium">Charger Types</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {chargerTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`type-${type}`}
                                className="h-4 w-4 rounded border-gray-300"
                                checked={filterChargerTypes.includes(type)}
                                onChange={() => toggleChargerTypeFilter(type)}
                              />
                              <label htmlFor={`type-${type}`} className="text-sm">
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="amenities">
                      <AccordionTrigger className="text-sm font-medium">Amenities</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {amenities.map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`amenity-${amenity}`}
                                className="h-4 w-4 rounded border-gray-300"
                                checked={filterAmenities.includes(amenity)}
                                onChange={() => toggleAmenityFilter(amenity)}
                              />
                              <label htmlFor={`amenity-${amenity}`} className="text-sm">
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button variant="outline" size="sm" className="w-full" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}

              {nearestStation && (
                <div className="bg-muted/30 p-3 rounded-md">
                  <h3 className="font-medium text-sm flex items-center gap-1 mb-1">
                    <Compass className="h-4 w-4 text-primary" />
                    Nearest Charging Station
                  </h3>
                  <p className="text-sm font-medium">{nearestStation.name}</p>
                  <p className="text-xs text-muted-foreground">{nearestStation.address}</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs text-primary"
                    onClick={() => setSelectedStation(nearestStation)}
                  >
                    View Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="hidden lg:block">
            <h3 className="font-semibold mb-3">Charging Stations</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredStations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No stations found matching your criteria.</p>
              ) : (
                filteredStations.map((station) => (
                  <Card
                    key={station.id}
                    className={`cursor-pointer transition-colors ${selectedStation?.id === station.id ? "border-primary" : ""}`}
                    onClick={() => setSelectedStation(station)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{station.name}</h4>
                        {station.isFunctional ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{station.address}</p>
                      <div className="flex gap-2 mt-1">
                        {station.chargerTypes.map((type, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main content - Map and station details */}
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <div className="h-[600px] rounded-lg overflow-hidden">
                <ChargingStationMap
                  stations={filteredStations}
                  selectedStation={selectedStation}
                  onStationSelect={setSelectedStation}
                  userLocation={userLocation}
                  ref={mapRef}
                />
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {filteredStations.length === 0 ? (
                  <p className="text-center col-span-full py-8 text-muted-foreground">
                    No stations found matching your criteria.
                  </p>
                ) : (
                  filteredStations.map((station) => (
                    <Card
                      key={station.id}
                      className={`cursor-pointer transition-colors ${selectedStation?.id === station.id ? "border-primary" : ""}`}
                      onClick={() => setSelectedStation(station)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{station.name}</h4>
                          {station.isFunctional ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                        <div className="flex gap-2 mb-2">
                          {station.chargerTypes.map((type, index) => (
                            <Badge key={index} variant="secondary">
                              {type}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{station.hours}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStations.length === 0 ? (
                  <p className="text-center col-span-full py-8 text-muted-foreground">
                    No stations found matching your criteria.
                  </p>
                ) : (
                  filteredStations.map((station) => (
                    <Link key={station.id} href={`/charging-stations/${station.id}`} className="block">
                      <Card
                        className={`cursor-pointer transition-colors hover:border-primary ${selectedStation?.id === station.id ? "border-primary" : ""}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedStation(station)
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{station.name}</h4>
                            {station.isFunctional ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700">
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                          <div className="flex gap-2 mb-2">
                            {station.chargerTypes.map((type, index) => (
                              <Badge key={index} variant="secondary">
                                {type}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{station.hours}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Selected Station Details */}
          {selectedStation && (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{selectedStation.name}</h2>
                    <p className="text-muted-foreground">{selectedStation.address}</p>
                  </div>
                  {selectedStation.isFunctional ? (
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  ) : (
                    <Badge variant="destructive">Not Operational</Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Charger Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Battery className="h-5 w-5 text-primary" />
                        <span className="font-medium">Charger Types:</span>
                        <span>{selectedStation.chargerTypes.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="font-medium">Power Output:</span>
                        <span>{selectedStation.powerOutput.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-medium">Hours:</span>
                        <span>{selectedStation.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        <span className="font-medium">Pricing:</span>
                        <span>{selectedStation.pricing}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Station Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-medium">City:</span>
                        <span>{selectedStation.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        <span className="font-medium">Operator:</span>
                        <span>{selectedStation.operator}</span>
                      </div>
                      {selectedStation.contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-primary" />
                          <span className="font-medium">Contact:</span>
                          <span>{selectedStation.contactPhone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium">Last Updated:</span>
                        <span>{selectedStation.lastReported}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStation.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="w-full">Get Directions</Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/charging-stations/${selectedStation.id}`}>View Full Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
