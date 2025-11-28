"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Battery, BatteryCharging, Leaf, Menu, Search, User, Zap, Calendar, Building2, LogOut, Settings, Car } from "lucide-react"
import SearchDialog from "@/components/search-dialog"
import { authService } from "@/app/login/auth.service"
import type { User as UserType } from "@/lib/types/auth.types"

import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check auth immediately on client-side to prevent flash
    if (typeof window !== 'undefined') {
      return authService.isAuthenticated()
    }
    return false
  })
  const [user, setUser] = useState<UserType | null>(() => {
    // Get user data immediately on client-side
    if (typeof window !== 'undefined') {
      return authService.getAuthData().user
    }
    return null
  })
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos

      if (Math.abs(currentScrollPos - prevScrollPos) > 10) {
        setVisible(!isScrollingDown || currentScrollPos < 10)
        setPrevScrollPos(currentScrollPos)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const authData = authService.getAuthData()
      
      setIsAuthenticated(authenticated)
      setUser(authData.user)
      setIsAuthLoading(false)
    }

    // Check on mount (set loading to false after initial check)
    checkAuth()

    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth)
    
    // Listen for custom auth events
    window.addEventListener('auth-change', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth)
      window.removeEventListener('auth-change', checkAuth)
    }
  }, [])

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event('auth-change'))
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
    <header
      className={`sticky ${visible ? "top-0" : "-top-16"} z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300`}
    >
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <Leaf className="h-5 w-5" />
                EV Hub Nepal
              </Link>
              <Link href="/marketplace" className="text-lg font-medium">
                Marketplace
              </Link>
              <Link href="/new-vehicles" className="text-lg font-medium">
                New Vehicles
              </Link>
              <Link href="/companies" className="text-lg font-medium">
                Companies
              </Link>
              <Link href="/rentals" className="text-lg font-medium">
                Rent an EV
              </Link>
              <Link href="/charging-stations" className="text-lg font-medium">
                Charging Stations
              </Link>
              <Link href="/blog" className="text-lg font-medium">
                Blog
              </Link>
              <Link href="/sell" className="text-lg font-medium">
                Sell Your EV
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-lg font-medium">
                Contact
              </Link>
              {!isAuthLoading && (
                isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="text-lg font-medium">
                      Dashboard
                    </Link>
                    <Button variant="outline" onClick={handleLogout} className="justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-lg font-medium">
                      Login
                    </Link>
                    <Link href="/login?tab=register" className="text-lg font-medium">
                      Register
                    </Link>
                  </>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 font-bold text-xl mr-6">
          <Leaf className="h-5 w-5" />
          EV Hub Nepal
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Vehicles</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <Link href="/marketplace" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Marketplace</div>
                          <div className="text-sm text-muted-foreground">Browse all EVs</div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/new-vehicles" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <div>
                          <div className="font-medium">New Vehicles</div>
                          <div className="text-sm text-muted-foreground">Latest releases</div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/rentals" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Rent an EV</div>
                          <div className="text-sm text-muted-foreground">Short-term rentals</div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/sell" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Sell Your EV</div>
                          <div className="text-sm text-muted-foreground">List your vehicle</div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Companies</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <Link href="/companies/tesla" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tesla</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/byd" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>BYD</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/mg" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>MG</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/mahindra" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Mahindra</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/kia" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Kia</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/tata" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tata</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/ather" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ather</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/ola" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ola</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/tvs" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>TVS</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/bajaj" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Bajaj</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/hero" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Hero</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/ford" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ford</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/volkswagen" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Volkswagen</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/audi" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Audi</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/bmw" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>BMW</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/mercedes" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Mercedes</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/porsche" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Porsche</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/rivian" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Rivian</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/lucid" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Lucid</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/nissan" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Nissan</NavigationMenuLink>
                  </Link>
                  <Link href="/companies/hyundai" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Hyundai</NavigationMenuLink>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/rentals" >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Rent an EV</span>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/charging-stations" >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex items-center gap-1">
                    <BatteryCharging className="h-4 w-4" />
                    <span>Charging Stations</span>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <Link href="/charging-guide" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Charging Guide</NavigationMenuLink>
                  </Link>
                  <Link href="/incentives" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tax Incentives</NavigationMenuLink>
                  </Link>
                  <Link href="/maintenance" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Maintenance Tips</NavigationMenuLink>
                  </Link>
                  <Link href="/faq" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>FAQ</NavigationMenuLink>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center ml-auto gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchDialogOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {!isAuthLoading && (
            isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">
                        {user?.firstName && user?.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user?.email}
                      </p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Car className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/login?tab=register">Sign up</Link>
                </Button>
              </div>
            )
          )}
        </div>
      </div>

      <SearchDialog isOpen={isSearchDialogOpen} onClose={() => setIsSearchDialogOpen(false)} />
    </header>
  )
}
