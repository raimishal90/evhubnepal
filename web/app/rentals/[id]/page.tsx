import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Battery, Car, Bike, Zap, MapPin, CheckCircle, Shield, CreditCard, User, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"

export default function RentalDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch this data from an API
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
      description:
        "Experience the future of driving with the Hyundai Kona Electric. This compact SUV offers impressive range, power, and features, making it perfect for exploring Kathmandu and beyond.",
      specifications: {
        batteryCapacity: "64 kWh",
        chargingTime: "9 hours (standard) / 54 minutes (fast charging to 80%)",
        acceleration: "7.9 seconds (0-100 km/h)",
        topSpeed: "167 km/h",
        seatingCapacity: 5,
        cargo: "332 liters",
      },
      securityDeposit: 20000,
      pickupLocations: ["Thamel", "Durbar Marg", "Tribhuvan International Airport"],
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
      description:
        "The MG ZS EV combines style, space, and sustainability. This electric SUV offers a comfortable ride with premium features and impressive range, perfect for both city driving and longer journeys.",
      specifications: {
        batteryCapacity: "44.5 kWh",
        chargingTime: "8 hours (standard) / 40 minutes (fast charging to 80%)",
        acceleration: "8.2 seconds (0-100 km/h)",
        topSpeed: "140 km/h",
        seatingCapacity: 5,
        cargo: "448 liters",
      },
      securityDeposit: 18000,
      pickupLocations: ["Thamel", "Durbar Marg", "Tribhuvan International Airport"],
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
      description:
        "The Tata Nexon EV is a compact electric SUV that's perfect for navigating Nepal's diverse terrain. With its robust build and efficient performance, it's an ideal choice for both city commutes and adventures.",
      specifications: {
        batteryCapacity: "30.2 kWh",
        chargingTime: "8 hours (standard) / 60 minutes (fast charging to 80%)",
        acceleration: "9.9 seconds (0-100 km/h)",
        topSpeed: "120 km/h",
        seatingCapacity: 5,
        cargo: "350 liters",
      },
      securityDeposit: 15000,
      pickupLocations: ["Lakeside", "Pokhara Airport", "Damside"],
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
      description:
        "The Ather 450X is a premium electric scooter with smart features and sporty performance. Perfect for zipping through Kathmandu's busy streets with style and zero emissions.",
      specifications: {
        batteryCapacity: "2.9 kWh",
        chargingTime: "4 hours (standard) / 1 hour (fast charging)",
        acceleration: "3.3 seconds (0-40 km/h)",
        topSpeed: "80 km/h",
        seatingCapacity: 2,
        cargo: "Small storage compartment",
      },
      securityDeposit: 8000,
      pickupLocations: ["Thamel", "Durbar Marg", "New Road"],
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
      description:
        "The Ola S1 Pro is a feature-packed electric scooter with impressive range and modern technology. Its sleek design and smooth performance make it a joy to ride around the city.",
      specifications: {
        batteryCapacity: "3.97 kWh",
        chargingTime: "6.5 hours (standard)",
        acceleration: "3 seconds (0-40 km/h)",
        topSpeed: "115 km/h",
        seatingCapacity: 2,
        cargo: "Storage under seat",
      },
      securityDeposit: 7000,
      pickupLocations: ["Thamel", "Durbar Marg", "Boudha"],
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
      description:
        "The TVS iQube is a practical and reliable electric scooter that's perfect for daily commutes. With its comfortable ride and decent range, it's an excellent choice for exploring Pokhara.",
      specifications: {
        batteryCapacity: "2.25 kWh",
        chargingTime: "5 hours (standard)",
        acceleration: "4.2 seconds (0-40 km/h)",
        topSpeed: "78 km/h",
        seatingCapacity: 2,
        cargo: "Under-seat storage",
      },
      securityDeposit: 6000,
      pickupLocations: ["Lakeside", "Pokhara Airport", "Damside"],
    },
  ]

  const vehicle = rentalVehicles.find((v) => v.id === params.id)

  if (!vehicle) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto py-4">
        <Button variant="ghost" asChild className="flex items-center gap-2">
          <Link href="/rentals">
            <ArrowLeft className="h-4 w-4" />
            Back to Rentals
          </Link>
        </Button>
      </div>

      {/* Vehicle Details */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vehicle Images */}
            <div className="lg:col-span-2">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-4">
                <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
                {!vehicle.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge className="bg-red-500 text-white text-lg py-1 px-3">Currently Unavailable</Badge>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="relative h-20 rounded-md overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.name} - Front`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-20 rounded-md overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.name} - Side`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-20 rounded-md overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.name} - Interior`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-20 rounded-md overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.name} - Rear`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{vehicle.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin size={16} className="text-primary" />
                    <span>{vehicle.location}</span>
                    {vehicle.type === "four-wheeler" ? (
                      <Car size={16} className="text-primary ml-2" />
                    ) : (
                      <Bike size={16} className="text-primary ml-2" />
                    )}
                    <span>{vehicle.type === "four-wheeler" ? "Car" : "Scooter"}</span>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rental-duration">Rental Duration</Label>
                      <Select disabled={!vehicle.available}>
                        <SelectTrigger id="rental-duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly - NPR {vehicle.rates.hourly}/hour</SelectItem>
                          <SelectItem value="daily">Daily - NPR {vehicle.rates.daily}/day</SelectItem>
                          <SelectItem value="weekly">Weekly - NPR {vehicle.rates.weekly}/week</SelectItem>
                          <SelectItem value="monthly">Monthly - NPR {vehicle.rates.monthly}/month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickup-date">Pickup Date</Label>
                        <Input type="date" id="pickup-date" disabled={!vehicle.available} />
                      </div>
                      <div>
                        <Label htmlFor="pickup-time">Pickup Time</Label>
                        <Input type="time" id="pickup-time" disabled={!vehicle.available} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="return-date">Return Date</Label>
                        <Input type="date" id="return-date" disabled={!vehicle.available} />
                      </div>
                      <div>
                        <Label htmlFor="return-time">Return Time</Label>
                        <Input type="time" id="return-time" disabled={!vehicle.available} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pickup-location">Pickup Location</Label>
                      <Select disabled={!vehicle.available}>
                        <SelectTrigger id="pickup-location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicle.pickupLocations.map((location, index) => (
                            <SelectItem key={index} value={location.toLowerCase().replace(/\s+/g, "-")}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Rental Rate:</span>
                        <span>NPR {vehicle.rates.daily}/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security Deposit:</span>
                        <span>NPR {vehicle.securityDeposit}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total (estimated):</span>
                        <span>NPR {vehicle.rates.daily + vehicle.securityDeposit}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        *Final price will be calculated based on actual rental duration
                      </p>
                    </div>

                    <Button className="w-full" size="lg" disabled={!vehicle.available}>
                      {vehicle.available ? "Book Now" : "Currently Unavailable"}
                    </Button>

                    {!vehicle.available && (
                      <p className="text-sm text-muted-foreground text-center">
                        This vehicle is currently unavailable. Please check back later or browse other options.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Information Tabs */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="rental-terms">Rental Terms</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    About this {vehicle.type === "four-wheeler" ? "Car" : "Scooter"}
                  </h3>
                  <p className="text-muted-foreground">{vehicle.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Range</p>
                        <p className="text-sm text-muted-foreground">{vehicle.range} km</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Power</p>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.power} {vehicle.power > 10 ? "hp" : "kW"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{vehicle.location}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Battery Capacity</span>
                        <span>{vehicle.specifications.batteryCapacity}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Charging Time</span>
                        <span>{vehicle.specifications.chargingTime}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Range</span>
                        <span>{vehicle.range} km</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Acceleration</span>
                        <span>{vehicle.specifications.acceleration}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Top Speed</span>
                        <span>{vehicle.specifications.topSpeed}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Seating Capacity</span>
                        <span>{vehicle.specifications.seatingCapacity}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rental-terms" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Rental Terms & Conditions</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Security Deposit</h4>
                      <p className="text-muted-foreground">
                        A refundable security deposit of NPR {vehicle.securityDeposit} is required at the time of
                        pickup. The deposit will be refunded upon return of the vehicle in the same condition.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Rental Requirements</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Valid Nepali driving license or International Driving Permit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Minimum age of 21 years (25 years for premium vehicles)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CreditCard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Credit/Debit card for payment and security deposit</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Cancellation Policy</h4>
                      <p className="text-muted-foreground">
                        Free cancellation up to 24 hours before pickup. Cancellations within 24 hours of pickup are
                        subject to a fee of 25% of the rental amount.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Insurance</h4>
                      <p className="text-muted-foreground">
                        Basic insurance is included in the rental price. Premium insurance with reduced deductible is
                        available for an additional fee.
                      </p>
                    </div>

                    <Button variant="outline" asChild>
                      <Link href="/rentals/terms">View Full Rental Terms & Conditions</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Similar Vehicles */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rentalVehicles
              .filter((v) => v.id !== vehicle.id && v.type === vehicle.type)
              .slice(0, 3)
              .map((similarVehicle) => (
                <Card
                  key={similarVehicle.id}
                  className="overflow-hidden border-2 border-muted hover:border-primary/20 transition-colors"
                >
                  <div className="relative h-40">
                    <Image
                      src={similarVehicle.image || "/placeholder.svg"}
                      alt={similarVehicle.name}
                      fill
                      className="object-cover"
                    />
                    {!similarVehicle.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge className="bg-red-500 text-white">Unavailable</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{similarVehicle.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin size={14} className="text-primary" />
                      <span>{similarVehicle.location}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">NPR {similarVehicle.rates.daily}/day</span>
                      <Badge variant={similarVehicle.available ? "outline" : "secondary"} className="ml-2">
                        {similarVehicle.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <Button
                      className="w-full"
                      variant="outline"
                      size="sm"
                      disabled={!similarVehicle.available}
                      asChild={similarVehicle.available ? true : undefined}
                    >
                      {similarVehicle.available ? (
                        <Link href={`/rentals/${similarVehicle.id}`}>View Details</Link>
                      ) : (
                        <span>Unavailable</span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Your Rental?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is available to answer any questions you may have about renting this vehicle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +977 1-4XXXXXX
              </Button>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
