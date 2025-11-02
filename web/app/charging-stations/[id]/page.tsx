import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  ArrowLeft,
  Battery,
  Calendar,
  Clock,
  ExternalLink,
  Flag,
  Info,
  MapPin,
  Phone,
  Share2,
  Star,
  ThumbsUp,
  Zap,
} from "lucide-react"
import { getChargingStationById } from "@/lib/charging-stations"
import StationMap from "@/components/station-map"

interface ChargingStationPageProps {
  params: {
    id: string
  }
}

export default function ChargingStationPage({ params }: ChargingStationPageProps) {
  const station = getChargingStationById(params.id)

  if (!station) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/charging-stations" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Charging Stations
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Station Hero */}
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6">
            <Image
              src={station.photos[0] || "/placeholder.svg?height=600&width=1200"}
              alt={station.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-white">{station.name}</h1>
                {station.isFunctional ? (
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                ) : (
                  <Badge variant="destructive">Not Operational</Badge>
                )}
              </div>
              <p className="text-white/90">{station.address}</p>
            </div>
          </div>

          {/* Station Details */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Charger Information</h2>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      <span className="font-medium">Charger Types:</span>
                      <div className="flex flex-wrap gap-1">
                        {station.chargerTypes.map((type, index) => (
                          <Badge key={index} variant="outline">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="font-medium">Power Output:</span>
                      <div className="flex flex-wrap gap-1">
                        {station.powerOutput.map((output, index) => (
                          <Badge key={index} variant="outline">
                            {output}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Hours:</span>
                      <span>{station.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      <span className="font-medium">Pricing:</span>
                      <span>{station.pricing}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Station Details</h2>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">City:</span>
                      <span>{station.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      <span className="font-medium">Operator:</span>
                      <span>{station.operator}</span>
                    </div>
                    {station.contactPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="font-medium">Contact:</span>
                        <a href={`tel:${station.contactPhone}`} className="text-primary hover:underline">
                          {station.contactPhone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">Last Updated:</span>
                      <span>{station.lastReported}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {station.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="h-[400px] rounded-lg overflow-hidden mb-6">
              <StationMap station={station} />
            </div>
          </div>

          {/* Reviews and Ratings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
            <Tabs defaultValue="reviews">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="reviews">User Reviews</TabsTrigger>
                <TabsTrigger value="add-review">Add Review</TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Star className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">4.2 out of 5</h3>
                          <p className="text-sm text-muted-foreground">Based on 15 reviews</p>
                        </div>
                      </div>
                      <Button>Write a Review</Button>
                    </div>

                    <div className="space-y-6">
                      {/* Sample reviews - in a real app, these would come from a database */}
                      <div className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <span className="font-medium">RK</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Rajesh Kumar</h4>
                              <div className="flex items-center">
                                {[1, 2, 3, 4].map((star) => (
                                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                                {[5].map((star) => (
                                  <Star key={star} className="h-4 w-4 text-muted" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-sm">
                          Great charging station with fast chargers. The staff was helpful and the location is
                          convenient. There's a nice cafe nearby where you can wait while your car charges.
                        </p>
                      </div>

                      <div className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <span className="font-medium">SP</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Sita Poudel</h4>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">1 month ago</span>
                        </div>
                        <p className="text-sm">
                          Excellent charging station! All chargers were working and I didn't have to wait. The location
                          is easy to find and there are good amenities nearby.
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <span className="font-medium">AB</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Anish Bhattarai</h4>
                              <div className="flex items-center">
                                {[1, 2, 3].map((star) => (
                                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                                {[4, 5].map((star) => (
                                  <Star key={star} className="h-4 w-4 text-muted" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">2 months ago</span>
                        </div>
                        <p className="text-sm">
                          The charging speed was slower than advertised, but the location is convenient. One of the
                          chargers was out of service when I visited.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-review" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Share Your Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Your Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="focus:outline-none">
                              <Star className="h-6 w-6 text-muted hover:text-primary hover:fill-primary transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Review Title</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Summarize your experience"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Your Review</label>
                        <textarea
                          className="w-full p-2 border rounded-md h-32"
                          placeholder="Share details of your experience at this charging station"
                        ></textarea>
                      </div>

                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="working-status" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="working-status" className="text-sm">
                          All chargers were working during my visit
                        </label>
                      </div>

                      <Button className="w-full">Submit Review</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <Button className="w-full flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </Button>

                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Location
                </Button>

                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Report an Issue
                </Button>
              </CardContent>
            </Card>

            {/* Status Information */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Current Status</h3>
                {station.isFunctional ? (
                  <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-start gap-2">
                    <ThumbsUp className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">All Systems Operational</p>
                      <p className="text-sm">Last verified: {station.lastReported}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Currently Not Operational</p>
                      <p className="text-sm">Reported issue: Maintenance in progress</p>
                      <p className="text-sm">Expected to be fixed by: 2023-12-25</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nearby Amenities */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Nearby Amenities</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Himalayan Java Coffee</p>
                      <p className="text-xs text-muted-foreground">150m away</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Bhatbhateni Supermarket</p>
                      <p className="text-xs text-muted-foreground">300m away</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Civil Mall</p>
                      <p className="text-xs text-muted-foreground">450m away</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatible Vehicles */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Compatible Vehicles</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This charging station is compatible with the following connector types:
                </p>
                <div className="space-y-2">
                  {station.chargerTypes.map((type, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-primary" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/charging-guide" className="flex items-center gap-1">
                      <Info className="h-4 w-4" />
                      <span>Charging Compatibility Guide</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* External Resources */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">External Resources</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>Nepal Electricity Authority</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>EV Association of Nepal</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="/charging-guide" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>EV Charging Guide</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
