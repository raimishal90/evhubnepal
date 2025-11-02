import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Star, MapPin, Calendar, Car, Shield } from "lucide-react"

export default function PublicProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Public Profile</h1>
          <p className="text-muted-foreground">This is how others see your profile</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/profile">Edit Profile</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">Rajesh Kumar</h2>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground">Member since January 2023</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-medium">5.0</span>
                <span className="text-muted-foreground">(24 reviews)</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Response time: Within 2 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <span>3 Vehicles Listed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span>Identity Verified</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-muted-foreground">
                  Hi, I'm Rajesh! I'm an EV enthusiast and have been driving electric vehicles for over 3 years. I'm
                  passionate about sustainable transportation and love to share my experience with others. I have
                  several EVs available for rent and am always happy to answer questions about electric vehicles.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">EV Owner</Badge>
                <Badge variant="outline">Renter</Badge>
                <Badge variant="outline">Premium Member</Badge>
                <Badge variant="outline">Charging Station Host</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="listings" className="w-full">
        <TabsList>
          <TabsTrigger value="listings">Vehicle Listings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="listings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>MG ZS EV</CardTitle>
                <CardDescription>Listed on March 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="MG ZS EV"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">Rs. 42,50,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Range:</span>
                    <span>461 km</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ather 450X</CardTitle>
                <CardDescription>Listed on February 28, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Ather 450X"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Rate:</span>
                    <span className="font-medium">Rs. 2,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Range:</span>
                    <span>116 km</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tata Nexon EV</CardTitle>
                <CardDescription>Listed on January 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Tata Nexon EV"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Rate:</span>
                    <span className="font-medium">Rs. 3,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Range:</span>
                    <span>312 km</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>What others are saying about Rajesh</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{review === 1 ? "SP" : review === 2 ? "AM" : "RJ"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {review === 1 ? "Suman Pradhan" : review === 2 ? "Anita Maharjan" : "Ravi Joshi"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review === 1 ? "March 2025" : review === 2 ? "February 2025" : "January 2025"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review === 1
                      ? "Great experience renting the Tata Nexon EV. Rajesh was very helpful and the vehicle was in excellent condition. Would definitely rent again!"
                      : review === 2
                        ? "Rajesh was very responsive and made the rental process smooth. The Ather 450X was perfect for getting around the city."
                        : "Very professional and friendly. The MG ZS EV was clean and well-maintained. Highly recommend!"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
