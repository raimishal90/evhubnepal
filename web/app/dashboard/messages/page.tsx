import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"

export default function MessagesPage() {
  // Sample messages data
  const conversations = [
    {
      id: "conv-1",
      user: {
        name: "Aarav Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AS",
      },
      lastMessage: "Is the Tata Nexon EV still available for rent?",
      time: "10:30 AM",
      unread: true,
      vehicle: "Tata Nexon EV",
    },
    {
      id: "conv-2",
      user: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "PP",
      },
      lastMessage: "I'm interested in buying your MG ZS EV. Can we schedule a test drive?",
      time: "Yesterday",
      unread: false,
      vehicle: "MG ZS EV",
    },
    {
      id: "conv-3",
      user: {
        name: "Rahul Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RG",
      },
      lastMessage: "Thanks for the information about the Ather 450X.",
      time: "Mar 30",
      unread: false,
      vehicle: "Ather 450X",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communicate with buyers and renters</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search messages..." className="w-full md:w-[300px] pl-8" />
        </div>
      </div>

      <Card className="flex flex-col md:flex-row h-[600px]">
        <div className="w-full md:w-1/3 border-r">
          <CardHeader className="px-4 py-3">
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`flex items-start gap-3 p-4 text-left hover:bg-accent transition-colors ${
                    conversation.unread ? "bg-accent/50" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                    <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{conversation.user.name}</span>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-primary mt-1">Re: {conversation.vehicle}</p>
                  </div>
                  {conversation.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
                </button>
              ))}
            </div>
          </CardContent>
        </div>
        <div className="flex-1 flex flex-col">
          <CardHeader className="px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Aarav Sharma" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Aarav Sharma</CardTitle>
                <CardDescription>Re: Tata Nexon EV</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6 overflow-auto">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-accent rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <p className="text-sm">
                    Hello, I'm interested in renting the Tata Nexon EV. Is it still available for the coming weekend?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">10:15 AM</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3 max-w-[80%]">
                  <p className="text-sm">
                    Hi Aarav, yes the Nexon EV is available this weekend. When would you like to pick it up?
                  </p>
                  <span className="text-xs text-primary-foreground/70 mt-1 block">10:20 AM</span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-accent rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <p className="text-sm">Is the Tata Nexon EV still available for rent?</p>
                  <span className="text-xs text-muted-foreground mt-1 block">10:30 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
