import type React from "react"
import Link from "next/link"
import {
  Home,
  Calendar,
  Car,
  Heart,
  MessageSquare,
  Bell,
  CreditCard,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background hidden md:block">
        <div className="h-full py-6 px-4">
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/rentals"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <Calendar className="h-5 w-5" />
              <span>My Rentals</span>
            </Link>
            <Link
              href="/dashboard/vehicles"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <Car className="h-5 w-5" />
              <span>My Vehicles</span>
            </Link>
            <Link
              href="/dashboard/favorites"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            <Link
              href="/dashboard/messages"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
            <Link
              href="/dashboard/payments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            <Link
              href="/dashboard/documents"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <FileText className="h-5 w-5" />
              <span>Documents</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4">{children}</div>
      </div>
    </div>
  )
}
