"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Calendar, Car, MessageSquare, Clock, ArrowRight, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardContent() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    if (firstName) {
      return firstName[0].toUpperCase()
    }
    if (lastName) {
      return lastName[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName || user?.email}!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/public-profile">View Public Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/sell">Add New Vehicle</Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Listed Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+3 new since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. 45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 items-start">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
              <AvatarFallback>{getInitials(user?.firstName, user?.lastName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-xl">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user?.email}
                </h3>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground">+977 9801234567</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">EV Owner</Badge>
                <Badge variant="outline">Renter</Badge>
                {user?.isAdmin && <Badge variant="outline">Admin</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Email Verified</span>
                </div>
                <Badge>Complete</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Phone Verified</span>
                </div>
                <Badge>Complete</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>KYC Documents</span>
                </div>
                <Badge>Complete</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span>Payment Method</span>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rentals" className="w-full">
        <TabsList>
          <TabsTrigger value="rentals">Active Rentals</TabsTrigger>
          <TabsTrigger value="vehicles">Your Vehicles</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="rentals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>Ola S1 Pro</CardTitle>
                  <Badge>Active</Badge>
                </div>
                <CardDescription>Rental #RNT-2023-0042</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pickup Date:</span>
                    <span>April 1, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Return Date:</span>
                    <span>April 5, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">Rs. 8,000</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>Tata Nexon EV</CardTitle>
                  <Badge>Active</Badge>
                </div>
                <CardDescription>Rental #RNT-2023-0039</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pickup Date:</span>
                    <span>March 30, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Return Date:</span>
                    <span>April 6, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">Rs. 21,000</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Button variant="link" asChild>
              <Link href="/dashboard/rentals">View All Rentals</Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="vehicles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>MG ZS EV</CardTitle>
                  <Badge variant="outline">For Sale</Badge>
                </div>
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
                    <span className="text-muted-foreground">Views:</span>
                    <span>124</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Inquiries:</span>
                    <span>8</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Manage Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>Ather 450X</CardTitle>
                  <Badge variant="outline">For Rent</Badge>
                </div>
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
                    <span className="text-muted-foreground">Views:</span>
                    <span>87</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bookings:</span>
                    <span>5</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Manage Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Button variant="link" asChild>
              <Link href="/dashboard/vehicles">View All Vehicles</Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">New Rental Booked</h4>
                      <Badge variant="outline" className="text-xs">
                        1 hour ago
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      You booked a Tata Nexon EV from March 30 to April 6, 2025.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">New Message</h4>
                      <Badge variant="outline" className="text-xs">
                        3 hours ago
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sanjay sent you a message about your MG ZS EV listing.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">Vehicle Listed</h4>
                      <Badge variant="outline" className="text-xs">
                        1 day ago
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      You listed your Ather 450X for rent at Rs. 2,000 per day.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
