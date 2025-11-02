import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Battery,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Zap,
  Bike,
  AlertCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { notFound } from "next/navigation"

export default function RentalDetailPage({ params }: { params: { id: string } }) {
  // Sample rental data - in a real app, this would be fetched from an API
  const rentals = [
    {
      id: "rent-001",
      vehicleName: "Hyundai Kona Electric",
      vehicleImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
      startDate: "2023-06-15",
      endDate: "2023-06-20",
      status: "active",
      location: "Kathmandu",
      type: "four-wheeler",
      dailyRate: 5000,
      totalAmount: 25000,
      paymentStatus: "paid",
      progress: 60,
      pickupLocation: "Thamel, Kathmandu",
      returnLocation: "Thamel, Kathmandu",
      pickupTime: "10:00 AM",
      returnTime: "10:00 AM",
      securityDeposit: 20000,
      bookingDate: "2023-06-01",
      bookingReference: "EV-KTM-123456",
      paymentMethod: "Credit Card",
      paymentDate: "2023-06-01",
      transactionId: "TXN-987654321",
      vehicleDetails: {
        range: 484,
        power: 204,
        batteryCapacity: "64 kWh",
        features: ["GPS Navigation", "Bluetooth", "Backup Camera", "Fast Charging"],
      },
      rentalCompany: {
        name: "EV Hub Rentals",
        phone: "+977 9801234567",
        email: "rentals@evhubnepal.com",
      },
      timeRemaining: "3 days",
      daysCompleted: 2,
      totalDays: 5,
    },
  ]

  const rental = rentals.find((r) => r.id === params.id)

  if (!rental) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/rentals" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Rentals
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Invoice
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 space-y-6">
          {/* Rental Overview */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>Rental Details</CardTitle>
                <Badge
                  className={
                    rental.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : rental.status === "upcoming"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }
                >
                  {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-48 rounded-md overflow-hidden">
                  <Image
                    src={rental.vehicleImage || "/placeholder.svg"}
                    alt={rental.vehicleName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{rental.vehicleName}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin size={16} className="text-primary" />
                    <span>{rental.location}</span>
                    {rental.type === "four-wheeler" ? (
                      <Car size={16} className="text-primary ml-2" />
                    ) : (
                      <Bike size={16} className="text-primary ml-2" />
                    )}
                    <span>{rental.type === "four-wheeler" ? "Car" : "Scooter"}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Rental Period</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="font-medium">
                          {new Date(rental.startDate).toLocaleDateString()} -{" "}
                          {new Date(rental.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Booking Reference</p>
                      <p className="font-medium">{rental.bookingReference}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup Location</p>
                      <p className="font-medium">{rental.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return Location</p>
                      <p className="font-medium">{rental.returnLocation}</p>
                    </div>
                  </div>

                  {rental.status === "active" && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>Rental Progress</span>
                        <span>
                          {rental.progress}% ({rental.daysCompleted}/{rental.totalDays} days)
                        </span>
                      </div>
                      <Progress value={rental.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">Time remaining: {rental.timeRemaining}</p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    {rental.status === "active" && (
                      <>
                        <Button className="flex-1">Extend Rental</Button>
                        <Button variant="outline" className="flex-1">
                          Report Issue
                        </Button>
                      </>
                    )}
                    {rental.status === "upcoming" && (
                      <>
                        <Button className="flex-1">Modify Booking</Button>
                        <Button variant="outline" className="flex-1">
                          Cancel Booking
                        </Button>
                      </>
                    )}
                    {rental.status === "completed" && !rental.rating && (
                      <Button className="flex-1">
                        <Star className="h-4 w-4 mr-2" />
                        Rate Your Experience
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Rental Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-medium">Booking Confirmed</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(rental.bookingDate).toLocaleDateString()} at{" "}
                      {new Date(rental.bookingDate).toLocaleTimeString()}
                    </p>
                    <p className="text-sm mt-1">Your booking for {rental.vehicleName} has been confirmed.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-medium">Payment Completed</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(rental.paymentDate).toLocaleDateString()} at{" "}
                      {new Date(rental.paymentDate).toLocaleTimeString()}
                    </p>
                    <p className="text-sm mt-1">
                      Payment of NPR {rental.totalAmount.toLocaleString()} has been processed successfully.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-medium">Vehicle Pickup</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(rental.startDate).toLocaleDateString()} at {rental.pickupTime}
                    </p>
                    <p className="text-sm mt-1">Vehicle picked up from {rental.pickupLocation}.</p>
                  </div>
                </div>

                {rental.status === "active" && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="font-medium">Rental In Progress</h3>
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="text-sm mt-1">
                        Your rental is currently active. Return scheduled for{" "}
                        {new Date(rental.endDate).toLocaleDateString()} at {rental.returnTime}.
                      </p>
                    </div>
                  </div>
                )}

                {rental.status === "completed" && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Vehicle Returned</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(rental.endDate).toLocaleDateString()} at {rental.returnTime}
                      </p>
                      <p className="text-sm mt-1">
                        Vehicle returned to {rental.returnLocation}. Rental completed successfully.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Battery className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Range</span>
                  <span className="font-semibold">{rental.vehicleDetails.range} km</span>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Zap className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Power</span>
                  <span className="font-semibold">{rental.vehicleDetails.power} hp</span>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Battery className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Battery</span>
                  <span className="font-semibold">{rental.vehicleDetails.batteryCapacity}</span>
                </div>
              </div>

              <h3 className="font-medium mb-2">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {rental.vehicleDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/3 space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Daily Rate</span>
                  <span>NPR {rental.dailyRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Number of Days</span>
                  <span>{rental.totalDays} days</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>NPR {rental.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Security Deposit</span>
                  <span>NPR {rental.securityDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 font-bold">
                  <span>Total Paid</span>
                  <span>NPR {(rental.totalAmount + rental.securityDeposit).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">Payment Completed</p>
                  <p className="text-sm">Transaction ID: {rental.transactionId}</p>
                  <p className="text-sm">Method: {rental.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Company */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Rental Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{rental.rentalCompany.name}</h3>
                  <p className="text-sm text-muted-foreground">Verified Provider</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{rental.rentalCompany.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span>{rental.rentalCompany.email}</span>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Provider
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Return Policy</p>
                    <p className="text-sm text-muted-foreground">
                      Please return the vehicle with the same charge level as received. Late returns will incur
                      additional charges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Security Deposit</p>
                    <p className="text-sm text-muted-foreground">
                      Your security deposit of NPR {rental.securityDeposit.toLocaleString()} will be refunded within 3-5
                      business days after return, subject to vehicle condition.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">
                      For roadside assistance or emergencies, please call: +977 9801234567
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
