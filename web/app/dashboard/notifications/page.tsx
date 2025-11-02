import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Car, Calendar, MessageSquare, CreditCard, CheckCircle2 } from "lucide-react"

export default function NotificationsPage() {
  // Sample notifications data
  const notifications = [
    {
      id: "notif-1",
      title: "New rental inquiry",
      description: "Aarav Sharma is interested in renting your Tata Nexon EV",
      time: "10 minutes ago",
      type: "inquiry",
      read: false,
    },
    {
      id: "notif-2",
      title: "Rental confirmed",
      description: "Your rental of the Ather 450X has been confirmed for April 15-17",
      time: "2 hours ago",
      type: "rental",
      read: false,
    },
    {
      id: "notif-3",
      title: "New message",
      description: "Priya Patel sent you a message about MG ZS EV",
      time: "Yesterday",
      type: "message",
      read: true,
    },
    {
      id: "notif-4",
      title: "Payment received",
      description: "You received a payment of Rs. 7,000 for Ather 450X rental",
      time: "2 days ago",
      type: "payment",
      read: true,
    },
    {
      id: "notif-5",
      title: "Listing approved",
      description: "Your listing for MG ZS EV has been approved",
      time: "1 week ago",
      type: "listing",
      read: true,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "inquiry":
        return <Car className="h-5 w-5 text-blue-500" />
      case "rental":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "payment":
        return <CreditCard className="h-5 w-5 text-yellow-500" />
      case "listing":
        return <CheckCircle2 className="h-5 w-5 text-teal-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your account activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Mark All as Read</Button>
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Notification Settings
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Notifications</CardTitle>
            <Badge>{notifications.filter((n) => !n.read).length} Unread</Badge>
          </div>
          <CardDescription>Your latest updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="rentals">Rentals</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg ${
                      !notification.read ? "bg-accent" : "hover:bg-muted"
                    }`}
                  >
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unread">
              <div className="space-y-1">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg bg-accent">
                      <div className="mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="rentals">
              <div className="space-y-1">
                {notifications
                  .filter((n) => n.type === "rental" || n.type === "inquiry")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-lg ${
                        !notification.read ? "bg-accent" : "hover:bg-muted"
                      }`}
                    >
                      <div className="mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="space-y-1">
                {notifications
                  .filter((n) => n.type === "message")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-lg ${
                        !notification.read ? "bg-accent" : "hover:bg-muted"
                      }`}
                    >
                      <div className="mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="payments">
              <div className="space-y-1">
                {notifications
                  .filter((n) => n.type === "payment")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-lg ${
                        !notification.read ? "bg-accent" : "hover:bg-muted"
                      }`}
                    >
                      <div className="mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
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
