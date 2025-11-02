import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Car, Bike, Eye } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  // Sample favorite vehicles data
  const favorites = [
    {
      id: "veh-001",
      name: "Tesla Model Y",
      type: "SUV",
      price: "7,500,000",
      image: "/placeholder.svg?height=200&width=300",
      location: "Kathmandu",
      year: 2023,
      range: "525 km",
      listingType: "sale",
    },
    {
      id: "veh-002",
      name: "Ola S1 Pro",
      type: "Scooter",
      price: "1,500/day",
      image: "/placeholder.svg?height=200&width=300",
      location: "Lalitpur",
      year: 2024,
      range: "181 km",
      listingType: "rent",
    },
    {
      id: "veh-003",
      name: "BYD Atto 3",
      type: "SUV",
      price: "5,999,000",
      image: "/placeholder.svg?height=200&width=300",
      location: "Bhaktapur",
      year: 2023,
      range: "480 km",
      listingType: "sale",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
          <p className="text-muted-foreground">Your saved vehicles</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Heart className="mr-2 h-4 w-4 fill-current" />
            Saved Searches
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Favorite Vehicles</CardTitle>
          <CardDescription>Vehicles you've saved for later</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sale">For Sale</TabsTrigger>
              <TabsTrigger value="rent">For Rent</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favorites.map((vehicle) => (
                  <div key={vehicle.id} className="rounded-lg border overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        className="object-cover w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                      <Badge
                        className="absolute top-2 left-2"
                        variant={vehicle.listingType === "sale" ? "default" : "secondary"}
                      >
                        {vehicle.listingType === "sale" ? "For Sale" : "For Rent"}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{vehicle.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        {vehicle.type === "SUV" ? (
                          <Car size={14} className="text-primary" />
                        ) : (
                          <Bike size={14} className="text-primary" />
                        )}
                        <span>
                          {vehicle.year} • {vehicle.location} • {vehicle.range}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="font-medium">
                          {vehicle.listingType === "sale" ? "NPR " : "NPR "}
                          {vehicle.price}
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/vehicle/${vehicle.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sale">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favorites
                  .filter((v) => v.listingType === "sale")
                  .map((vehicle) => (
                    <div key={vehicle.id} className="rounded-lg border overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={vehicle.image || "/placeholder.svg"}
                          alt={vehicle.name}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                        <Badge className="absolute top-2 left-2">For Sale</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Car size={14} className="text-primary" />
                          <span>
                            {vehicle.year} • {vehicle.location} • {vehicle.range}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="font-medium">NPR {vehicle.price}</div>
                          <Button size="sm" asChild>
                            <Link href={`/vehicle/${vehicle.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="rent">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favorites
                  .filter((v) => v.listingType === "rent")
                  .map((vehicle) => (
                    <div key={vehicle.id} className="rounded-lg border overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={vehicle.image || "/placeholder.svg"}
                          alt={vehicle.name}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                        <Badge variant="secondary" className="absolute top-2 left-2">
                          For Rent
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Bike size={14} className="text-primary" />
                          <span>
                            {vehicle.year} • {vehicle.location} • {vehicle.range}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="font-medium">NPR {vehicle.price}</div>
                          <Button size="sm" asChild>
                            <Link href={`/rentals/${vehicle.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
