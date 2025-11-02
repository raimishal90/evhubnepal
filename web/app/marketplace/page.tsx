"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Battery, Filter, Zap } from "lucide-react"
import { type Vehicle, getVehiclesByFilter, getVehicleBrands, getVehicleTypes } from "@/lib/vehicles"

export default function MarketplacePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 150000])
  const [rangeValues, setRangeValues] = useState([0, 500])
  const [selectedCondition, setSelectedCondition] = useState("all")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 18

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch filter options
      const brandsData = await getVehicleBrands()
      const typesData = await getVehicleTypes()
      setBrands(brandsData)
      setTypes(typesData)

      // Apply filters
      const filteredVehicles = await getVehiclesByFilter({
        search: searchQuery || undefined,
        type: selectedType !== "all" ? selectedType : undefined,
        brand: selectedBrand !== "all" ? selectedBrand : undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minRange: rangeValues[0],
        maxRange: rangeValues[1],
        condition: selectedCondition !== "all" ? selectedCondition : undefined,
      })

      setVehicles(filteredVehicles)
      setLoading(false)
    }

    fetchData()
  }, [searchQuery, selectedType, selectedBrand, priceRange, rangeValues, selectedCondition])

  const applyFilters = () => {
    setCurrentPage(1)
    // The useEffect will handle the actual filtering
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedType("all")
    setSelectedBrand("all")
    setPriceRange([0, 150000])
    setRangeValues([0, 500])
    setSelectedCondition("all")
    setCurrentPage(1)
  }

  // Calculate pagination
  const totalPages = Math.ceil(vehicles.length / itemsPerPage)
  const paginatedVehicles = vehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">EV Marketplace</h1>
          <p className="text-muted-foreground">Find new and used electric vehicles from various brands</p>
        </div>
        <Button asChild>
          <Link href="/sell">Sell Your EV</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Search</label>
                <Input
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Vehicle Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Brand</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Price Range</label>
                <div className="pt-4 pb-2">
                  <Slider value={priceRange} min={0} max={150000} step={1000} onValueChange={setPriceRange} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Range (miles)</label>
                <div className="pt-4 pb-2">
                  <Slider value={rangeValues} min={0} max={500} step={10} onValueChange={setRangeValues} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{rangeValues[0]} mi</span>
                  <span>{rangeValues[1]} mi</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified">Certified Pre-Owned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={applyFilters}>
                <Filter className="h-4 w-4 mr-2" /> Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Vehicle Listings */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{paginatedVehicles.length}</span> of{" "}
              <span className="font-medium">{vehicles.length}</span> vehicles
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="range">Range: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : paginatedVehicles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
                    {vehicle.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
                    {vehicle.isFeatured && (
                      <Badge variant="secondary" className="absolute top-2 left-2">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                      <p className="font-bold text-lg">${vehicle.price.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Battery size={16} />
                        <span>{vehicle.range} mi</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Zap size={16} />
                        <span>{vehicle.power} hp</span>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/vehicle/${vehicle.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="outline"
                    size="sm"
                    className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
