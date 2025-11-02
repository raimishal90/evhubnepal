import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Battery, Calendar, Car, Bike, Zap, MapPin, CheckCircle, AlertCircle, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RentalsPage() {
  // Sample rental vehicle data
  const rentalVehicles = [
    {
      id: "kona-electric",
      name: "Hyundai Kona Electric",
      type: "four-wheeler",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
      location: "Kathmandu",
      range: 484,
      power: 204,
      rates: {
        hourly: 800,
        daily: 5000,
        weekly: 30000,
        monthly: 100000,
      },
      available: true,
      features: ["GPS Navigation", "Bluetooth", "Backup Camera", "Fast Charging"],
    },
    {
      id: "mg-zs-ev",
      name: "MG ZS EV",
      type: "four-wheeler",
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=600&auto=format&fit=crop",
      location: "Kathmandu",
      range: 440,
      power: 174,
      rates: {
        hourly: 700,
        daily: 4500,
        weekly: 27000,
        monthly: 90000,
      },
      available: true,
      features: ["Panoramic Sunroof", "Heated Seats", "Backup Camera", "Fast Charging"],
    },
    {
      id: "tata-nexon-ev",
      name: "Tata Nexon EV",
      type: "four-wheeler",
      image: "https://images.unsplash.com/photo-1633509817627-5a29634479bf?q=80&w=600&auto=format&fit=crop",
      location: "Pokhara",
      range: 312,
      power: 143,
      rates: {
        hourly: 600,
        daily: 4000,
        weekly: 24000,
        monthly: 80000,
      },
      available: true,
      features: ["Bluetooth", "Backup Camera", "Climate Control"],
    },
    {
      id: "ather-450x",
      name: "Ather 450X",
      type: "two-wheeler",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop",
      location: "Kathmandu",
      range: 116,
      power: 6.2,
      rates: {
        hourly: 200,
        daily: 1200,
        weekly: 7000,
        monthly: 25000,
      },
      available: true,
      features: ["Digital Dashboard", "Navigation", "Bluetooth Connectivity"],
    },
    {
      id: "ola-s1-pro",
      name: "Ola S1 Pro",
      type: "two-wheeler",
      image: "https://images.unsplash.com/photo-1558979159-2b18a4070a87?q=80&w=600&auto=format&fit=crop",
      location: "Kathmandu",
      range: 181,
      power: 5.5,
      rates: {
        hourly: 180,
        daily: 1000,
        weekly: 6000,
        monthly: 22000,
      },
      available: false,
      features: ["Digital Dashboard", "Navigation", "Bluetooth Connectivity"],
    },
    {
      id: "tvs-iqube",
      name: "TVS iQube",
      type: "two-wheeler",
      image: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?q=80&w=600&auto=format&fit=crop",
      location: "Pokhara",
      range: 100,
      power: 4.4,
      rates: {
        hourly: 150,
        daily: 900,
        weekly: 5500,
        monthly: 20000,
      },
      available: true,
      features: ["Digital Dashboard", "USB Charging", "LED Lights"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop"
            alt="EV Rentals in Nepal"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Rent an Electric Vehicle in Nepal</h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Experience the future of transportation with our premium EV rental service
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-background p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Filter className="h-5 w-5" />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Vehicle Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="all-vehicles" defaultChecked />
                        <Label htmlFor="all-vehicles">All Vehicles</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="four-wheeler" />
                        <Label htmlFor="four-wheeler">Four Wheelers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="two-wheeler" />
                        <Label htmlFor="two-wheeler">Two Wheelers</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Location</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="kathmandu">Kathmandu</SelectItem>
                        <SelectItem value="pokhara">Pokhara</SelectItem>
                        <SelectItem value="chitwan">Chitwan</SelectItem>
                        <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
                        <SelectItem value="lalitpur">Lalitpur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Rental Duration</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Duration</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Price Range (Daily)</h3>
                      <span className="text-sm text-muted-foreground">NPR 500 - 5,000</span>
                    </div>
                    <Slider defaultValue={[500, 5000]} min={100} max={10000} step={100} />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Features</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gps" />
                        <Label htmlFor="gps">GPS Navigation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bluetooth" />
                        <Label htmlFor="bluetooth">Bluetooth</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fast-charging" />
                        <Label htmlFor="fast-charging">Fast Charging</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="backup-camera" />
                        <Label htmlFor="backup-camera">Backup Camera</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available-now" defaultChecked />
                        <Label htmlFor="available-now">Available Now</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="show-all" />
                        <Label htmlFor="show-all">Show All</Label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>

            {/* Rental Vehicles */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold">EV Rentals</h2>
                    <p className="text-muted-foreground mt-2">
                      Rent electric vehicles for hours, days, weeks, or months
                    </p>
                  </div>
                  <TabsList>
                    <TabsTrigger value="all">All Vehicles</TabsTrigger>
                    <TabsTrigger value="cars">
                      <Car className="h-4 w-4 mr-2" />
                      Cars
                    </TabsTrigger>
                    <TabsTrigger value="scooters">
                      <Bike className="h-4 w-4 mr-2" />
                      Scooters
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rentalVehicles.map((vehicle) => (
                      <RentalVehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cars" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rentalVehicles
                      .filter((vehicle) => vehicle.type === "four-wheeler")
                      .map((vehicle) => (
                        <RentalVehicleCard key={vehicle.id} vehicle={vehicle} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="scooters" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rentalVehicles
                      .filter((vehicle) => vehicle.type === "two-wheeler")
                      .map((vehicle) => (
                        <RentalVehicleCard key={vehicle.id} vehicle={vehicle} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* How Rentals Work */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50 nepali-pattern">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How EV Rentals Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your EV</h3>
              <p className="text-muted-foreground">
                Browse our selection of electric vehicles and choose the one that fits your needs. Filter by type,
                location, and features.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Pay</h3>
              <p className="text-muted-foreground">
                Select your rental dates and duration. Complete the booking process with our secure payment system.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Ride</h3>
              <p className="text-muted-foreground">
                Pick up your EV at the designated location or opt for delivery. Return it at the end of your rental
                period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Policies */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Rental Policies & Requirements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Rental Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Valid Nepali driving license or International Driving Permit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Minimum age of 21 years (25 years for premium vehicles)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Valid identification (Citizenship/Passport)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Security deposit (refundable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Credit/Debit card for payment</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Rental Policies</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Late returns incur additional charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Cancellations within 24 hours of booking are subject to a fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Vehicles must be returned with the same charge level as received</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Renter is responsible for any traffic violations or fines</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Basic insurance is included; premium insurance available</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/rentals/terms">View Full Rental Terms & Conditions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Rental Vehicle Card Component
function RentalVehicleCard({ vehicle }: { vehicle: any }) {
  return (
    <Card className="overflow-hidden border-2 border-muted hover:border-primary/20 transition-colors">
      <div className="relative h-48">
        <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
        {!vehicle.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge className="bg-red-500 text-white text-lg py-1 px-3">Currently Unavailable</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{vehicle.name}</h3>
          <Badge variant={vehicle.available ? "outline" : "secondary"} className="ml-2">
            {vehicle.available ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin size={16} className="text-primary" />
          <span>{vehicle.location}</span>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm">
            <Battery size={16} className="text-primary" />
            <span>{vehicle.range} km</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Zap size={16} className="text-primary" />
            <span>
              {vehicle.power} {vehicle.power > 10 ? "hp" : "kW"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {vehicle.type === "four-wheeler" ? (
              <Car size={16} className="text-primary" />
            ) : (
              <Bike size={16} className="text-primary" />
            )}
            <span>{vehicle.type === "four-wheeler" ? "Car" : "Scooter"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-muted/50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">Hourly</p>
            <p className="font-semibold">NPR {vehicle.rates.hourly}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">Daily</p>
            <p className="font-semibold">NPR {vehicle.rates.daily}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">Weekly</p>
            <p className="font-semibold">NPR {vehicle.rates.weekly}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">Monthly</p>
            <p className="font-semibold">NPR {vehicle.rates.monthly}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {vehicle.features.map((feature: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-primary/5">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={!vehicle.available}
            asChild={vehicle.available ? true : undefined}
          >
            {vehicle.available ? (
              <Link href={`/rentals/${vehicle.id}`} className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Book Now
              </Link>
            ) : (
              <span>Currently Unavailable</span>
            )}
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/vehicle/${vehicle.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
