"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Battery, Calendar, Clock, Zap, MapPin, Info } from "lucide-react"
import { type Vehicle, type ComingSoonVehicle, getNewVehicles, getComingSoonVehicles } from "@/lib/vehicles"

export default function NewVehiclesPage() {
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([])
  const [comingSoonVehicles, setComingSoonVehicles] = useState<ComingSoonVehicle[]>([])
  const [activeTab, setActiveTab] = useState("available")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      if (activeTab === "available") {
        const newVehicles = await getNewVehicles()
        setAvailableVehicles(newVehicles)
      } else if (activeTab === "coming-soon") {
        const upcomingVehicles = await getComingSoonVehicles()
        setComingSoonVehicles(upcomingVehicles)
      }

      setLoading(false)
    }

    fetchData()
  }, [activeTab])

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
        <Image
          src="https://images.unsplash.com/photo-1526494631344-8c6fa6462b17?q=80&w=1600&auto=format&fit=crop"
          alt="Kathmandu with Electric Vehicles"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent flex flex-col justify-center p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">New & Upcoming EVs in Nepal</h1>
          <p className="text-white/90 max-w-xl">
            Discover the latest electric vehicles available in Nepal and upcoming models that will soon hit the Nepali
            market
          </p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Nepal has reduced customs duty on electric vehicles to promote clean transportation. EVs now have only
            10-40% customs duty compared to 60-250% for fuel vehicles.
          </p>
        </div>
      </div>

      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full md:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
          <TabsTrigger value="concept">Concept Vehicles</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop"
                    alt="Hyundai Kona Electric"
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2">New</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">Hyundai Kona Electric</h3>
                    <p className="font-bold text-lg">NPR 65,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Range: 484 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap size={16} className="text-primary" />
                      <span>Power: 204 hp</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Year: 2023</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>0-60: 7.9s</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/vehicle/kona-electric">View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=600&auto=format&fit=crop"
                    alt="MG ZS EV"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">MG ZS EV</h3>
                    <p className="font-bold text-lg">NPR 59,90,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Range: 440 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap size={16} className="text-primary" />
                      <span>Power: 174 hp</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Year: 2023</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>0-60: 8.2s</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/vehicle/mg-zs-ev">View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1633509817627-5a29634479bf?q=80&w=600&auto=format&fit=crop"
                    alt="Tata Nexon EV"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">Tata Nexon EV</h3>
                    <p className="font-bold text-lg">NPR 42,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Range: 312 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap size={16} className="text-primary" />
                      <span>Power: 143 hp</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Year: 2023</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>0-60: 9.4s</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/vehicle/tata-nexon-ev">View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1612911912304-22bae7d9df2c?q=80&w=600&auto=format&fit=crop"
                    alt="BYD Atto 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">BYD Atto 3</h3>
                    <p className="font-bold text-lg">NPR 72,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Range: 480 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap size={16} className="text-primary" />
                      <span>Power: 204 hp</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Year: 2023</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>0-60: 7.3s</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/vehicle/byd-atto-3">View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1655412626420-d3a949e65bc9?q=80&w=600&auto=format&fit=crop"
                    alt="Mahindra XUV400"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">Mahindra XUV400</h3>
                    <p className="font-bold text-lg">NPR 48,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Range: 375 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap size={16} className="text-primary" />
                      <span>Power: 150 hp</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Year: 2023</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>0-60: 8.3s</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/vehicle/mahindra-xuv400">View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1623777252508-9a39e42270b3?q=80&w=600&auto=format&fit=crop"
                    alt="Kia EV6"
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2">Premium</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">Kia EV6</h3>
                    <p className="font-bold text-lg">NPR 95,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Range: 528 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap size={16} className="text-primary" />
                      <span>Power: 320 hp</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Year: 2023</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>0-60: 5.2s</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/vehicle/kia-ev6">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="coming-soon" className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1620891549027-942faa56a5d5?q=80&w=600&auto=format&fit=crop"
                    alt="Tata Curvv EV"
                    fill
                    className="object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Coming Soon
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">Tata Curvv EV</h3>
                    <p className="font-bold text-lg">Est. NPR 45,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Est. Range: 500 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Release: Late 2023</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span>Made in India</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="secondary" asChild>
                    <Link href="/coming-soon/tata-curvv">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=600&auto=format&fit=crop"
                    alt="MG Comet EV"
                    fill
                    className="object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Coming Soon
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">MG Comet EV</h3>
                    <p className="font-bold text-lg">Est. NPR 25,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Est. Range: 230 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Release: Early 2024</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span>Compact City Car</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="secondary" asChild>
                    <Link href="/coming-soon/mg-comet">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=600&auto=format&fit=crop"
                    alt="Hyundai IONIQ 5"
                    fill
                    className="object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Coming Soon
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">Hyundai IONIQ 5</h3>
                    <p className="font-bold text-lg">Est. NPR 75,00,000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery size={16} className="text-primary" />
                      <span>Est. Range: 481 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>Release: Mid 2024</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span>Premium Crossover</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="secondary" asChild>
                    <Link href="/coming-soon/ioniq-5">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="concept" className="mt-6">
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              We're working on gathering information about the latest concept vehicles that may eventually come to
              Nepal.
            </p>
            <p className="text-muted-foreground">Check back later for updates!</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Nepal-specific EV Information */}
      <div className="mt-16 bg-[url('https://images.unsplash.com/photo-1526494631344-8c6fa6462b17?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center rounded-xl p-8 relative">
        <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-2xl font-bold mb-4">Electric Vehicles in Nepal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Government Incentives</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Reduced customs duty (10-40% compared to 60-250% for fuel vehicles)</li>
                <li>Lower annual road tax for electric vehicles</li>
                <li>Priority lanes for EV registration at transport offices</li>
                <li>Subsidized electricity rates for EV charging during off-peak hours</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Charging Infrastructure</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Nepal Electricity Authority has installed 50+ charging stations nationwide</li>
                <li>Major cities like Kathmandu, Pokhara, and Biratnagar have public charging networks</li>
                <li>Hotels and shopping malls increasingly offering free charging for customers</li>
                <li>Plans to install charging stations along major highways connecting major cities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dealership Locations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">EV Dealerships in Nepal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="relative h-40">
              <Image
                src="https://images.unsplash.com/photo-1526494631344-8c6fa6462b17?q=80&w=600&auto=format&fit=crop"
                alt="Kathmandu Dealerships"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white">Kathmandu</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>Tata EV - Naxal, Kathmandu</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>MG Nepal - Thapathali, Kathmandu</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>Hyundai Nepal - Babarmahal, Kathmandu</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-40">
              <Image
                src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600&auto=format&fit=crop"
                alt="Pokhara Dealerships"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white">Pokhara</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>BYD Nepal - Lakeside, Pokhara</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>Kia Motors - Prithvi Chowk, Pokhara</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-40">
              <Image
                src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop"
                alt="Biratnagar Dealerships"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white">Biratnagar</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>Mahindra Electric - Main Road, Biratnagar</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>Tata Motors - Bargachhi, Biratnagar</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
