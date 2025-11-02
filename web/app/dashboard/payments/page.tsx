import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, Plus, CheckCircle, Clock } from "lucide-react"

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Manage your payment methods and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. 78,500</div>
            <p className="text-xs text-muted-foreground">Lifetime spending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. 0</div>
            <p className="text-xs text-muted-foreground">No pending payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Active payment methods</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
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
            <div className="text-2xl font-bold">Rs. 29,000</div>
            <p className="text-xs text-muted-foreground">Spent in April 2025</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payment-methods" className="w-full">
        <TabsList>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="payment-methods" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Credit Card</CardTitle>
                  <Badge>Default</Badge>
                </div>
                <CardDescription>Ending in 4242</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-4 h-48 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-medium">Visa</div>
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="text-xl tracking-widest">•••• •••• •••• 4242</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-70">Card Holder</div>
                      <div>Rajesh Kumar</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Expires</div>
                      <div>12/26</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Remove</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Debit Card</CardTitle>
                <CardDescription>Ending in 5678</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-4 h-48 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-medium">Mastercard</div>
                  </div>
                  <div className="text-xl tracking-widest">•••• •••• •••• 5678</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-70">Card Holder</div>
                      <div>Rajesh Kumar</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Expires</div>
                      <div>09/25</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit</Button>
                <Button variant="outline">Set as Default</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">TXN-2023-0042</TableCell>
                    <TableCell>Apr 1, 2025</TableCell>
                    <TableCell>Rental payment for Ola S1 Pro</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </div>
                    </TableCell>
                    <TableCell>Rs. 8,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TXN-2023-0039</TableCell>
                    <TableCell>Mar 30, 2025</TableCell>
                    <TableCell>Rental payment for Tata Nexon EV</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </div>
                    </TableCell>
                    <TableCell>Rs. 21,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TXN-2023-0035</TableCell>
                    <TableCell>Mar 25, 2025</TableCell>
                    <TableCell>Rental payment for BYD Atto 3</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </div>
                    </TableCell>
                    <TableCell>Rs. 18,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TXN-2023-0028</TableCell>
                    <TableCell>Mar 10, 2025</TableCell>
                    <TableCell>Rental payment for Ather 450X</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </div>
                    </TableCell>
                    <TableCell>Rs. 10,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-0042</TableCell>
                    <TableCell>Apr 1, 2025</TableCell>
                    <TableCell>Rental invoice for Ola S1 Pro</TableCell>
                    <TableCell>
                      <Badge>Paid</Badge>
                    </TableCell>
                    <TableCell>Rs. 8,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-0039</TableCell>
                    <TableCell>Mar 30, 2025</TableCell>
                    <TableCell>Rental invoice for Tata Nexon EV</TableCell>
                    <TableCell>
                      <Badge>Paid</Badge>
                    </TableCell>
                    <TableCell>Rs. 21,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-0035</TableCell>
                    <TableCell>Mar 25, 2025</TableCell>
                    <TableCell>Rental invoice for BYD Atto 3</TableCell>
                    <TableCell>
                      <Badge>Paid</Badge>
                    </TableCell>
                    <TableCell>Rs. 18,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-0028</TableCell>
                    <TableCell>Mar 10, 2025</TableCell>
                    <TableCell>Rental invoice for Ather 450X</TableCell>
                    <TableCell>
                      <Badge>Paid</Badge>
                    </TableCell>
                    <TableCell>Rs. 10,000</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
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
