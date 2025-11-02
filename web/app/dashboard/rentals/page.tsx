import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, ArrowRight, Clock, CheckCircle } from "lucide-react"

export default function RentalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Rentals</h1>
          <p className="text-muted-foreground">Manage your vehicle rentals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Book New Rental</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Lifetime rentals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently ongoing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Scheduled for future</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
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
            <div className="text-2xl font-bold">Rs. 78,500</div>
            <p className="text-xs text-muted-foreground">On all rentals</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Rentals</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              </svg>
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Rentals</CardTitle>
              <CardDescription>View all your rental history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rental ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">RNT-2023-0042</TableCell>
                    <TableCell>Ola S1 Pro</TableCell>
                    <TableCell>Apr 1 - Apr 5, 2025</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>Rs. 8,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/rentals/RNT-2023-0042">View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RNT-2023-0039</TableCell>
                    <TableCell>Tata Nexon EV</TableCell>
                    <TableCell>Mar 30 - Apr 6, 2025</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>Rs. 21,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/rentals/RNT-2023-0039">View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RNT-2023-0035</TableCell>
                    <TableCell>BYD Atto 3</TableCell>
                    <TableCell>Apr 10 - Apr 15, 2025</TableCell>
                    <TableCell>
                      <Badge variant="outline">Upcoming</Badge>
                    </TableCell>
                    <TableCell>Rs. 18,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/rentals/RNT-2023-0035">View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RNT-2023-0028</TableCell>
                    <TableCell>Ather 450X</TableCell>
                    <TableCell>Mar 10 - Mar 15, 2025</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                    <TableCell>Rs. 10,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/rentals/RNT-2023-0028">View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
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
                <div className="space-y-4">
                  <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="Ola S1 Pro"
                      className="object-cover w-full h-full"
                    />
                  </div>
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
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Rental Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="h-1 flex-1 bg-green-100"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="h-1 flex-1 bg-green-100"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="h-1 flex-1 bg-muted"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                          <Clock className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Booked</span>
                        <span>Paid</span>
                        <span>Picked Up</span>
                        <span>Returned</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <Link href="/dashboard/rentals/RNT-2023-0042">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
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
                <div className="space-y-4">
                  <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="Tata Nexon EV"
                      className="object-cover w-full h-full"
                    />
                  </div>
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
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Rental Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="h-1 flex-1 bg-green-100"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="h-1 flex-1 bg-green-100"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="h-1 flex-1 bg-muted"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                          <Clock className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Booked</span>
                        <span>Paid</span>
                        <span>Picked Up</span>
                        <span>Returned</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <Link href="/dashboard/rentals/RNT-2023-0039">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle>BYD Atto 3</CardTitle>
                <Badge variant="outline">Upcoming</Badge>
              </div>
              <CardDescription>Rental #RNT-2023-0035</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video relative rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="BYD Atto 3"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pickup Date:</span>
                      <span>April 10, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Return Date:</span>
                      <span>April 15, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pickup Location:</span>
                      <span>Thamel, Kathmandu</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">Rs. 18,000</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Rental Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="h-1 flex-1 bg-green-100"></div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="h-1 flex-1 bg-muted"></div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="h-1 flex-1 bg-muted"></div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                        <Clock className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Booked</span>
                      <span>Paid</span>
                      <span>Pickup</span>
                      <span>Return</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Modify
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href="/dashboard/rentals/RNT-2023-0035">View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Rentals</CardTitle>
              <CardDescription>View your rental history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rental ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">RNT-2023-0028</TableCell>
                    <TableCell>Ather 450X</TableCell>
                    <TableCell>Mar 10 - Mar 15, 2025</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                    <TableCell>Rs. 10,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/rentals/RNT-2023-0028">View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RNT-2023-0022</TableCell>
                    <TableCell>MG ZS EV</TableCell>
                    <TableCell>Feb 20 - Feb 25, 2025</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                    <TableCell>Rs. 15,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/rentals/RNT-2023-0022">View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RNT-2023-0018</TableCell>
                    <TableCell>Tata Nexon EV</TableCell>
                    <TableCell>Feb 5 - Feb 10, 2025</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                    <TableCell>Rs. 14,500</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/rentals/RNT-2023-0018">View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
