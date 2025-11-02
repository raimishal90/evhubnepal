import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Battery, Leaf, Zap, Car, Bike, Calendar, Clock } from "lucide-react"
import { getFeaturedVehicles } from "@/lib/vehicles"
import { getLatestPosts } from "@/lib/blog"

export default async function Home() {
  const featuredVehicles = await getFeaturedVehicles(6)
  const latestPosts = await getLatestPosts()

  // Sample vehicle data for the explore section
  const fourWheelers = [
    {
      id: "kona-electric",
      name: "Hyundai Kona Electric",
      price: 6500000,
      range: 484,
      power: 204,
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: true,
      rentalRate: 5000,
      type: "four-wheeler",
    },
    {
      id: "mg-zs-ev",
      name: "MG ZS EV",
      price: 5990000,
      range: 440,
      power: 174,
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: true,
      rentalRate: 4500,
      type: "four-wheeler",
    },
    {
      id: "tata-nexon-ev",
      name: "Tata Nexon EV",
      price: 4200000,
      range: 312,
      power: 143,
      image: "https://images.unsplash.com/photo-1633509817627-5a29634479bf?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: true,
      rentalRate: 4000,
      type: "four-wheeler",
    },
    {
      id: "byd-atto-3",
      name: "BYD Atto 3",
      price: 7200000,
      range: 480,
      power: 204,
      image: "https://images.unsplash.com/photo-1612911912304-22bae7d9df2c?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: false,
      type: "four-wheeler",
    },
    {
      id: "mahindra-xuv400",
      name: "Mahindra XUV400",
      price: 4800000,
      range: 375,
      power: 150,
      image: "https://images.unsplash.com/photo-1655412626420-d3a949e65bc9?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: false,
      type: "four-wheeler",
    },
    {
      id: "kia-ev6",
      name: "Kia EV6",
      price: 9500000,
      range: 528,
      power: 320,
      image: "https://images.unsplash.com/photo-1623777252508-9a39e42270b3?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: false,
      type: "four-wheeler",
    },
  ]

  const twoWheelers = [
    {
      id: "ather-450x",
      name: "Ather 450X",
      price: 350000,
      range: 116,
      power: 6.2,
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: true,
      rentalRate: 1200,
      type: "two-wheeler",
    },
    {
      id: "ola-s1-pro",
      name: "Ola S1 Pro",
      price: 280000,
      range: 181,
      power: 5.5,
      image: "https://images.unsplash.com/photo-1558979159-2b18a4070a87?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: true,
      rentalRate: 1000,
      type: "two-wheeler",
    },
    {
      id: "tvs-iqube",
      name: "TVS iQube",
      price: 250000,
      range: 100,
      power: 4.4,
      image: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: true,
      rentalRate: 900,
      type: "two-wheeler",
    },
    {
      id: "niu-nqi-gts",
      name: "NIU NQi GTS",
      price: 295000,
      range: 100,
      power: 3.5,
      image: "https://images.unsplash.com/photo-1597766325363-8c55243c3c09?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: false,
      type: "two-wheeler",
    },
    {
      id: "bajaj-chetak",
      name: "Bajaj Chetak",
      price: 225000,
      range: 95,
      power: 4,
      image: "https://images.unsplash.com/photo-1581026927481-8a1656bd2dac?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: false,
      type: "two-wheeler",
    },
    {
      id: "super-soco-tc-max",
      name: "Super Soco TC Max",
      price: 420000,
      range: 110,
      power: 5,
      image: "https://images.unsplash.com/photo-1611429532458-f8bf8f6121fe?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: false,
      type: "two-wheeler",
    },
  ]

  // Recent posts data (last 6 vehicles with timestamps)
  const recentPosts = [
    {
      id: "tesla-model-y",
      name: "Tesla Model Y",
      price: 12500000,
      range: 525,
      power: 384,
      image: "https://images.unsplash.com/photo-1619317594067-3c1a2932de97?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: false,
      postedDate: "2025-04-01T14:30:00Z",
      seller: "Tesla Nepal",
      location: "Kathmandu",
      type: "four-wheeler",
    },
    {
      id: "rivian-r1t",
      name: "Rivian R1T",
      price: 15000000,
      range: 505,
      power: 420,
      image: "https://images.unsplash.com/photo-1655410298642-4a5a120cdb45?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: false,
      postedDate: "2025-03-30T09:15:00Z",
      seller: "EV Imports",
      location: "Pokhara",
      type: "four-wheeler",
    },
    {
      id: "hero-vida-v1",
      name: "Hero Vida V1",
      price: 275000,
      range: 110,
      power: 6,
      image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: true,
      rentalRate: 1100,
      postedDate: "2025-03-29T16:45:00Z",
      seller: "Hero Electric",
      location: "Lalitpur",
      type: "two-wheeler",
    },
    {
      id: "bmw-i4",
      name: "BMW i4",
      price: 13500000,
      range: 484,
      power: 340,
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: false,
      postedDate: "2025-03-28T11:20:00Z",
      seller: "Paramount Motors",
      location: "Kathmandu",
      type: "four-wheeler",
    },
    {
      id: "simple-one",
      name: "Simple One",
      price: 310000,
      range: 212,
      power: 4.5,
      image: "https://images.unsplash.com/photo-1558980394-dbb977039a2e?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      forSale: true,
      forRent: true,
      rentalRate: 950,
      postedDate: "2025-03-27T13:10:00Z",
      seller: "Simple Energy",
      location: "Bhaktapur",
      type: "two-wheeler",
    },
    {
      id: "audi-e-tron",
      name: "Audi e-tron",
      price: 14000000,
      range: 436,
      power: 355,
      image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=600&auto=format&fit=crop",
      isNew: false,
      forSale: true,
      forRent: false,
      postedDate: "2025-03-26T15:30:00Z",
      seller: "Audi Nepal",
      location: "Kathmandu",
      type: "four-wheeler",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Video */}
      <section className="relative w-full h-[70vh]">
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
          <video className="absolute min-w-full min-h-full object-cover object-center" autoPlay muted loop playsInline>
            <source
              src="/videos/vecteezy_technology-electric-car-transportation-futuristic_40459657.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Nepal's Premier Electric Vehicle Marketplace
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Discover, buy, and sell electric vehicles in Nepal. Join the eco-friendly transportation revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/marketplace">Browse Vehicles</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white"
              asChild
            >
              <Link href="/sell">Sell Your EV</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Electric Vehicles Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <Tabs defaultValue="recent" className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold">Explore Electric Vehicles</h2>
                <p className="text-muted-foreground mt-2">
                  Discover the latest and most popular electric vehicles available in Nepal
                </p>
              </div>
              <TabsList>
                <TabsTrigger value="recent">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Posts
                </TabsTrigger>
                <TabsTrigger value="four-wheeler">
                  <Car className="h-4 w-4 mr-2" />
                  Four Wheelers
                </TabsTrigger>
                <TabsTrigger value="two-wheeler">
                  <Bike className="h-4 w-4 mr-2" />
                  Two Wheelers
                </TabsTrigger>
                <TabsTrigger value="rental">
                  <Calendar className="h-4 w-4 mr-2" />
                  For Rent
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((vehicle) => (
                  <RecentPostCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/marketplace" className="flex items-center gap-2">
                    View All Vehicles <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="four-wheeler" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fourWheelers.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/new-vehicles?type=four-wheeler" className="flex items-center gap-2">
                    View All Four Wheelers <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="two-wheeler" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {twoWheelers.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/new-vehicles?type=two-wheeler" className="flex items-center gap-2">
                    View All Two Wheelers <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="rental" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...fourWheelers, ...twoWheelers]
                  .filter((v) => v.forRent)
                  .map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} showRental />
                  ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/rentals" className="flex items-center gap-2">
                    View All Rental Vehicles <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Popular in Nepal */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular in Nepal</h2>
            <Button variant="ghost" asChild>
              <Link href="/new-vehicles" className="flex items-center gap-2">
                View all <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
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
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Battery size={16} className="text-primary" />
                    <span>480 km</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Zap size={16} className="text-primary" />
                    <span>204 hp</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/vehicle/byd-atto-3">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
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
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Battery size={16} className="text-primary" />
                    <span>375 km</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Zap size={16} className="text-primary" />
                    <span>150 hp</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/vehicle/mahindra-xuv400">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1623777252508-9a39e42270b3?q=80&w=600&auto=format&fit=crop"
                  alt="Kia EV6"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Kia EV6</h3>
                  <p className="font-bold text-lg">NPR 95,00,000</p>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Battery size={16} className="text-primary" />
                    <span>528 km</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Zap size={16} className="text-primary" />
                    <span>320 hp</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/vehicle/kia-ev6">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1597766325363-8c55243c3c09?q=80&w=600&auto=format&fit=crop"
                  alt="NIU NQi GTS"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">NIU NQi GTS</h3>
                  <p className="font-bold text-lg">NPR 2,95,000</p>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Battery size={16} className="text-primary" />
                    <span>100 km</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Zap size={16} className="text-primary" />
                    <span>3.5 kW</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/vehicle/niu-nqi-gts">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1558979158-65a1eaa08691?q=80&w=600&auto=format&fit=crop"
                  alt="TVS iQube"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">TVS iQube</h3>
                  <p className="font-bold text-lg">NPR 2,50,000</p>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Battery size={16} className="text-primary" />
                    <span>100 km</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Zap size={16} className="text-primary" />
                    <span>4.4 kW</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/vehicle/tvs-iqube">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1581026927481-8a1656bd2dac?q=80&w=600&auto=format&fit=crop"
                  alt="Bajaj Chetak"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Bajaj Chetak</h3>
                  <p className="font-bold text-lg">NPR 2,25,000</p>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Battery size={16} className="text-primary" />
                    <span>95 km</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Zap size={16} className="text-primary" />
                    <span>4 kW</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/vehicle/bajaj-chetak">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* EV News in Nepal */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">EV News in Nepal</h2>
            <Button variant="ghost" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                All articles <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1593941707882-a5bfb1060f0d?q=80&w=600&auto=format&fit=crop"
                  alt="Nepal's EV Market Growth"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 border-primary/20 text-primary">
                  Market Trends
                </Badge>
                <h3 className="text-xl font-semibold mb-2">Nepal's EV Market Sees 200% Growth in 2023</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Electric vehicle sales in Nepal have tripled in the past year as government incentives and lower
                  import duties drive adoption.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">May 15, 2023</span>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <Link href="/blog/nepal-ev-market-growth">Read more</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1593941707216-203bea592e5a?q=80&w=600&auto=format&fit=crop"
                  alt="Charging Infrastructure in Nepal"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 border-primary/20 text-primary">
                  Infrastructure
                </Badge>
                <h3 className="text-xl font-semibold mb-2">New Charging Stations Across Kathmandu Valley</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  The Nepal Electricity Authority has installed 50 new fast-charging stations across Kathmandu,
                  Lalitpur, and Bhaktapur.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">June 2, 2023</span>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <Link href="/blog/charging-stations-kathmandu">Read more</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?q=80&w=600&auto=format&fit=crop"
                  alt="EV Tax Incentives in Nepal"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 border-primary/20 text-primary">
                  Policy
                </Badge>
                <h3 className="text-xl font-semibold mb-2">Nepal Extends EV Tax Incentives Through 2025</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  The government has extended reduced customs duties and road taxes for electric vehicles to promote
                  clean transportation.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">June 10, 2023</span>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <Link href="/blog/nepal-ev-tax-incentives">Read more</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Go Electric in Nepal - Simplified */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Go Electric in Nepal?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-muted-foreground">
                Help reduce air pollution in Kathmandu Valley and other urban areas with zero-emission vehicles.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Battery className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lower Running Costs</h3>
              <p className="text-muted-foreground">
                Save money with reduced fuel costs and lower maintenance expenses compared to petrol vehicles.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Government Incentives</h3>
              <p className="text-muted-foreground">
                Benefit from reduced import duties and tax incentives for electric vehicles in Nepal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Vehicle Card Component - Simplified
function VehicleCard({ vehicle, showRental = false }: { vehicle: any; showRental?: boolean }) {
  return (
    <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
      <div className="relative h-48">
        <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
        {vehicle.isNew && <Badge className="absolute top-2 right-2 bg-primary text-white">New</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{vehicle.name}</h3>
          <div className="text-right">
            {showRental && vehicle.forRent ? (
              <>
                <p className="font-bold text-lg">NPR {vehicle.rentalRate.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per day</p>
              </>
            ) : (
              <p className="font-bold text-lg">NPR {vehicle.price.toLocaleString()}</p>
            )}
          </div>
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
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90" asChild>
          <Link href={`/vehicle/${vehicle.id}`}>View Details</Link>
        </Button>
        {vehicle.forRent && (
          <Button className="w-full mt-2" variant="outline" asChild>
            <Link href={`/rentals/${vehicle.id}`}>
              <Calendar className="h-4 w-4 mr-2" />
              Rent
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Recent Post Card Component - Simplified
function RecentPostCard({ vehicle }: { vehicle: any }) {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="overflow-hidden border border-muted hover:border-primary/20 transition-colors">
      <div className="relative h-48">
        <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
        {vehicle.isNew && <Badge className="absolute top-2 right-2 bg-primary text-white">New</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{vehicle.name}</h3>
          <div className="text-right">
            {vehicle.forRent ? (
              <>
                <p className="font-bold text-lg">NPR {vehicle.rentalRate?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per day</p>
              </>
            ) : (
              <p className="font-bold text-lg">NPR {vehicle.price.toLocaleString()}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {vehicle.location}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {formatDate(vehicle.postedDate)}
          </Badge>
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
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90" asChild>
          <Link href={`/vehicle/${vehicle.id}`}>View Details</Link>
        </Button>
        {vehicle.forRent && (
          <Button className="w-full mt-2" variant="outline" asChild>
            <Link href={`/rentals/${vehicle.id}`}>
              <Calendar className="h-4 w-4 mr-2" />
              Rent
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
