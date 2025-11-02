import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Car, Plus, Eye, Edit, Trash2 } from "lucide-react"

export default function VehiclesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Vehicles</h1>
          <p className="text-muted-foreground">Manage your vehicle listings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/sell">
              <Plus className="mr-2 h-4 w-4" />
              Add New Vehicle
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Vehicles</p>
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-xs text-muted-foreground mt-1">Listed on platform</p>
              </div>
              <Car className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">For Sale</p>
                <h3 className="text-2xl font-bold">1</h3>
                <p className="text-xs text-muted-foreground mt-1">Available for purchase</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">For Rent</p>
                <h3 className="text-2xl font-bold">2</h3>
                <p className="text-xs text-muted-foreground mt-1">Available for rental</p>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Views</p>
                <h3 className="text-2xl font-bold">342</h3>
                <p className="text-xs text-muted-foreground mt-1">Across all listings</p>
              </div>
              <Eye className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Vehicles</TabsTrigger>
            <TabsTrigger value="sale">For Sale</TabsTrigger>
            <TabsTrigger value="rent">For Rent</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
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
              <CardTitle>All Vehicles</CardTitle>
              <CardDescription>Manage all your vehicle listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price/Rate</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">MG ZS EV</TableCell>
                    <TableCell>SUV</TableCell>
                    <TableCell>
                      <Badge variant="outline">For Sale</Badge>
                    </TableCell>
                    <TableCell>Rs. 42,50,000</TableCell>
                    <TableCell>124</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ather 450X</TableCell>
                    <TableCell>Scooter</TableCell>
                    <TableCell>
                      <Badge variant="outline">For Rent</Badge>
                    </TableCell>
                    <TableCell>Rs. 2,000/day</TableCell>
                    <TableCell>87</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tata Nexon EV</TableCell>
                    <TableCell>SUV</TableCell>
                    <TableCell>
                      <Badge variant="outline">For Rent</Badge>
                    </TableCell>
                    <TableCell>Rs. 3,500/day</TableCell>
                    <TableCell>131</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sale">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>MG ZS EV</CardTitle>
                  <Badge variant="outline">For Sale</Badge>
                </div>
                <CardDescription>Listed on March 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video relative rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="MG ZS EV"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">Rs. 42,50,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Year:</span>
                        <span>2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Battery:</span>
                        <span>50.3 kWh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Range:</span>
                        <span>461 km</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Views:</span>
                        <span>124</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Inquiries:</span>
                        <span>8</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rent">
          <div className="grid gap-4 md:grid-cols-2">
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
                    <span className="text-muted-foreground">Weekly Rate:</span>
                    <span>Rs. 12,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Views:</span>
                    <span>87</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bookings:</span>
                    <span>5</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>Tata Nexon EV</CardTitle>
                  <Badge variant="outline">For Rent</Badge>
                </div>
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
                    <span className="text-muted-foreground">Weekly Rate:</span>
                    <span>Rs. 21,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Views:</span>
                    <span>131</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bookings:</span>
                    <span>7</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
