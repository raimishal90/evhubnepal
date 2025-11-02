import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Battery,
  Car,
  Check,
  Clock,
  Gauge,
  Mail,
  MapPin,
  Phone,
  Share2,
  Zap,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { getVehicleById, getFeaturedVehicles } from "@/lib/vehicles"
import { Card } from "@/components/ui/card"

interface VehiclePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const vehicle = await getVehicleById(params.id)

  if (!vehicle) {
    return {
      title: "Vehicle Not Found",
      description: "The requested vehicle could not be found",
    }
  }

  return {
    title: `${vehicle.name} | EV Hub Nepal`,
    description: vehicle.description || `View details and specifications for the ${vehicle.name} in Nepal`,
  }
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  try {
    const vehicle = await getVehicleById(params.id)

    if (!vehicle) {
      notFound()
    }

    const similarVehicles = await getFeaturedVehicles(3)

    return (
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/new-vehicles" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Vehicles
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Vehicle Images */}
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-6">
              <Image
                src={vehicle.image || "/placeholder.svg?height=400&width=600"}
                alt={vehicle.name}
                fill
                className="object-cover"
              />
              {vehicle.isNew && <Badge className="absolute top-4 right-4 bg-primary text-white">New</Badge>}
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative aspect-video rounded-md overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg?height=300&width=400"}
                    alt={`${vehicle.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Vehicle Details */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold">{vehicle.name}</h1>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <Badge variant="outline" className="text-sm">
                  {vehicle.brand}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {vehicle.type}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {vehicle.condition}
                </Badge>
                {vehicle.year && (
                  <Badge variant="outline" className="text-sm">
                    {vehicle.year}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground mb-6">
                {vehicle.description || "No description available for this vehicle."}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Battery className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Range</span>
                  <span className="font-semibold">{vehicle.range} km</span>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Zap className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Power</span>
                  <span className="font-semibold">{vehicle.power} hp</span>
                </div>
                {vehicle.acceleration && (
                  <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                    <Clock className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">0-60 mph</span>
                    <span className="font-semibold">{vehicle.acceleration} sec</span>
                  </div>
                )}
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Car className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="font-semibold">{vehicle.type}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Features Tabs */}
            <Tabs defaultValue="features" className="mb-8">
              <TabsList className="w-full grid grid-cols-4 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger
                  value="features"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="charging"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
                >
                  Charging
                </TabsTrigger>
                <TabsTrigger
                  value="safety"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
                >
                  Safety
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="pt-6">
                {vehicle.features && vehicle.features.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicle.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No feature information available for this vehicle.</p>
                )}
              </TabsContent>

              <TabsContent value="specs" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Performance</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Power</span>
                        <span className="font-medium">{vehicle.power} hp</span>
                      </li>
                      {vehicle.acceleration && (
                        <li className="flex justify-between pb-2 border-b">
                          <span className="text-muted-foreground">0-60 mph</span>
                          <span className="font-medium">{vehicle.acceleration} sec</span>
                        </li>
                      )}
                      <li className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Range</span>
                        <span className="font-medium">{vehicle.range} km</span>
                      </li>
                      {vehicle.specifications?.topSpeed && (
                        <li className="flex justify-between pb-2 border-b">
                          <span className="text-muted-foreground">Top Speed</span>
                          <span className="font-medium">{vehicle.specifications.topSpeed}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Battery & Drivetrain</h3>
                    <ul className="space-y-3">
                      {vehicle.specifications?.batteryCapacity && (
                        <li className="flex justify-between pb-2 border-b">
                          <span className="text-muted-foreground">Battery Capacity</span>
                          <span className="font-medium">{vehicle.specifications.batteryCapacity}</span>
                        </li>
                      )}
                      {vehicle.specifications?.drivetrain && (
                        <li className="flex justify-between pb-2 border-b">
                          <span className="text-muted-foreground">Drivetrain</span>
                          <span className="font-medium">{vehicle.specifications.drivetrain}</span>
                        </li>
                      )}
                      {vehicle.specifications?.motorType && (
                        <li className="flex justify-between pb-2 border-b">
                          <span className="text-muted-foreground">Motor Type</span>
                          <span className="font-medium">{vehicle.specifications.motorType}</span>
                        </li>
                      )}
                      {vehicle.specifications?.seatingCapacity && (
                        <li className="flex justify-between pb-2 border-b">
                          <span className="text-muted-foreground">Seating</span>
                          <span className="font-medium">{vehicle.specifications.seatingCapacity} seats</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="charging" className="pt-6">
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">DC Fast Charging</h3>
                    <p className="text-muted-foreground mb-2">
                      {vehicle.specifications?.fastChargingTime
                        ? `10% to 80% in approximately ${vehicle.specifications.fastChargingTime}`
                        : "10% to 80% in approximately 30 minutes at up to 150 kW"}
                    </p>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span>Maximum charging rate: 150 kW</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Level 2 Charging (240V)</h3>
                    <p className="text-muted-foreground mb-2">
                      {vehicle.specifications?.chargingTime
                        ? `Full charge in approximately ${vehicle.specifications.chargingTime}`
                        : "Full charge in approximately 8 hours"}
                    </p>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span>Maximum charging rate: 11 kW</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Level 1 Charging (120V)</h3>
                    <p className="text-muted-foreground mb-2">Approximately 3-5 miles of range per hour</p>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span>Maximum charging rate: 1.4 kW</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="safety" className="pt-6">
                <div className="space-y-6">
                  {vehicle.safety?.rating && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Safety Rating</h3>
                      <p className="text-lg font-medium text-primary">{vehicle.safety.rating}</p>
                    </div>
                  )}

                  {vehicle.safety?.features && vehicle.safety.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4">Safety Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vehicle.safety.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {vehicle.warranty && (
                    <div>
                      <h3 className="font-semibold mb-4">Warranty Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {vehicle.warranty.basic && (
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-1">Basic Warranty</h4>
                            <p className="text-sm text-muted-foreground">{vehicle.warranty.basic}</p>
                          </div>
                        )}
                        {vehicle.warranty.battery && (
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-1">Battery Warranty</h4>
                            <p className="text-sm text-muted-foreground">{vehicle.warranty.battery}</p>
                          </div>
                        )}
                        {vehicle.warranty.drivetrain && (
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-1">Drivetrain Warranty</h4>
                            <p className="text-sm text-muted-foreground">{vehicle.warranty.drivetrain}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Rest of the component remains the same... */}
            {/* Rental Options */}
            <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/30 rounded-lg">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8">Rent This Vehicle</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="overflow-hidden">
                    <div className="bg-primary/10 p-6">
                      <h3 className="text-xl font-semibold mb-2">Daily Rental</h3>
                      <p className="text-muted-foreground mb-4">Perfect for short trips and weekend getaways</p>
                      <div className="text-3xl font-bold mb-4">
                        NPR 5,000 <span className="text-base font-normal text-muted-foreground">/day</span>
                      </div>

                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Unlimited kilometers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Insurance included</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>24/7 roadside assistance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Charging cable included</span>
                        </li>
                      </ul>

                      <Button className="w-full" asChild>
                        <Link href={`/rentals/${vehicle.id}`} className="flex items-center justify-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Rent Now
                        </Link>
                      </Button>
                    </div>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="bg-primary/10 p-6">
                      <h3 className="text-xl font-semibold mb-2">Weekly Rental</h3>
                      <p className="text-muted-foreground mb-4">Ideal for longer trips and vacations</p>
                      <div className="text-3xl font-bold mb-4">
                        NPR 30,000 <span className="text-base font-normal text-muted-foreground">/week</span>
                      </div>

                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Unlimited kilometers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Insurance included</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>24/7 roadside assistance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Charging cable included</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>15% discount compared to daily rate</span>
                        </li>
                      </ul>

                      <Button className="w-full" asChild>
                        <Link href={`/rentals/${vehicle.id}`} className="flex items-center justify-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Rent Now
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/rentals" className="flex items-center gap-2">
                      View All Rental Options <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Nepal-specific Information */}
            <div className="bg-muted/30 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Availability in Nepal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Dealerships</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Kathmandu - Naxal Showroom</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Pokhara - Lakeside Branch</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Biratnagar - Main Road</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Import & Tax Information</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span>Reduced customs duty of 10% (compared to 60-250% for fuel vehicles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span>Annual road tax is 50% lower than equivalent fuel vehicles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span>Free vehicle registration at Transport Office</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Price Card */}
              <div className="bg-card rounded-lg border-2 border-primary/20 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">NPR {(vehicle.price * 133).toLocaleString()}</h2>
                  {vehicle.condition === "Used" && <Badge>Used</Badge>}
                </div>

                <div className="space-y-4 mb-6">
                  <Button className="w-full bg-primary hover:bg-primary/90">Contact Seller</Button>
                  <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                    <Phone className="h-4 w-4 mr-2" /> Call Seller
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Listed by EV Hub Nepal Verified Dealer</p>
                  <p>Vehicle ID: {vehicle.id}</p>
                </div>
              </div>

              {/* Financing Options */}
              <div className="bg-card rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Financing Options</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Down Payment (20%)</span>
                    <span className="font-medium">NPR {Math.round(vehicle.price * 133 * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Monthly Payment (5 years)</span>
                    <span className="font-medium">
                      NPR {Math.round((vehicle.price * 133 * 0.8) / 60).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Interest Rate</span>
                    <span className="font-medium">10.5%</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Calculate EMI
                  </Button>
                </div>
              </div>

              {/* Similar Vehicles */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Similar Vehicles</h3>
                <div className="space-y-4">
                  {similarVehicles
                    .filter((v) => v.id !== vehicle.id)
                    .slice(0, 2)
                    .map((similarVehicle) => (
                      <div key={similarVehicle.id} className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={similarVehicle.image || "/placeholder.svg?height=80&width=80"}
                            alt={similarVehicle.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-medium">{similarVehicle.name}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            NPR {(similarVehicle.price * 133).toLocaleString()}
                          </p>
                          <Link href={`/vehicle/${similarVehicle.id}`} className="text-primary hover:underline text-sm">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading vehicle:", error)
    notFound()
  }
}
