"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { notFound, useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getCompanyBySlug, type Company, type Vehicle, getCategoryLabel, type VehicleCategory } from "@/lib/companies"
import { TestDriveModal } from "@/components/test-drive-modal"
import { ContactSalesModal } from "@/components/contact-sales-modal"
import { Battery, Zap, ArrowRight, Tag, ChevronUp, Calendar, Phone, Heart, Share2, Info, Home } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CompanyPage() {
  const params = useParams()
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined)
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false)
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)
  const [categories, setCategories] = useState<VehicleCategory[]>([])
  const [showBackToTop, setShowBackToTop] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const allVehiclesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      if (typeof params.companySlug !== "string") {
        notFound()
        return
      }

      try {
        const companyData = await getCompanyBySlug(params.companySlug)
        if (!companyData) {
          notFound()
          return
        }

        setCompany(companyData)

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(companyData.vehicles.map((vehicle) => vehicle.category)),
        ) as VehicleCategory[]

        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching company:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()

    // Add scroll listener for back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [params.companySlug])

  const openTestDriveModal = (vehicle?: Vehicle) => {
    setSelectedVehicle(vehicle)
    setIsTestDriveModalOpen(true)
  }

  const closeTestDriveModal = () => {
    setIsTestDriveModalOpen(false)
  }

  const openContactSalesModal = () => {
    setIsContactSalesModalOpen(true)
  }

  const closeContactSalesModal = () => {
    setIsContactSalesModalOpen(false)
  }

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAllVehicles = () => {
    allVehiclesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return <CompanyPageSkeleton />
  }

  if (!company) {
    return notFound()
  }

  const topSellingVehicles = company.vehicles.filter((vehicle) => vehicle.isTopSelling)

  return (
    <div className="flex flex-col min-h-screen" ref={topRef}>
      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-2 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="flex items-center hover:text-foreground transition-colors">
              <Home className="h-3.5 w-3.5 mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 mx-2" />
            <Link href="/companies" className="hover:text-foreground transition-colors">
              Companies
            </Link>
            <ChevronRight className="h-3.5 w-3.5 mx-2" />
            <span className="font-medium text-foreground">{company.name}</span>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <section className="relative w-full h-[60vh]">
        {company.bannerVideo ? (
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            <video
              className="absolute min-w-full min-h-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            >
              <source src={company.bannerVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : company.bannerImage ? (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={company.bannerImage || "/placeholder.svg"}
              alt={`${company.name} Banner`}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
          <Image
            src={company.logo || "/placeholder.svg"}
            alt={`${company.name} Logo`}
            width={240}
            height={120}
            className="mb-6 bg-white/90 p-4 rounded-lg shadow-lg"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{company.name}</h1>
          <p className="text-xl text-white mb-8 max-w-2xl drop-shadow-md">{company.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => openTestDriveModal()}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Test Drive
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={scrollToAllVehicles}
            >
              Explore Vehicles
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        {/* Company Quick Info */}
        <div className="bg-muted/30 rounded-lg p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Founded</h3>
              <p className="text-lg font-semibold">{company.foundedYear || "N/A"}</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Headquarters</h3>
              <p className="text-lg font-semibold">{company.headquarters || "N/A"}</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Models Available</h3>
              <p className="text-lg font-semibold">{company.vehicles.length}</p>
            </div>
          </div>
        </div>

        {/* Top Selling Vehicles Section */}
        {topSellingVehicles.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Top Selling Vehicles</h2>
                <p className="text-muted-foreground mt-1">Our most popular models</p>
              </div>
              <Button variant="ghost" onClick={scrollToAllVehicles} className="flex items-center gap-2 group">
                View all
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSellingVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onTestDrive={() => openTestDriveModal(vehicle)}
                  companyName={company.name}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Vehicles Section */}
        <section id="all-vehicles" className="mb-16 scroll-mt-20" ref={allVehiclesRef}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">All Vehicles</h2>
              <p className="text-muted-foreground mt-1">Explore our complete lineup</p>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="border-b mb-8">
              <TabsList className="w-full justify-start overflow-x-auto pb-px">
                <TabsTrigger
                  value="all"
                  className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  All
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    {getCategoryLabel(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {company.vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onTestDrive={() => openTestDriveModal(vehicle)}
                    companyName={company.name}
                  />
                ))}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {company.vehicles
                    .filter((vehicle) => vehicle.category === category)
                    .map((vehicle) => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onTestDrive={() => openTestDriveModal(vehicle)}
                        companyName={company.name}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Call to Action */}
        <div className="bg-muted/30 rounded-lg p-8 text-center shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Interested in learning more?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is ready to assist you with any questions about {company.name} vehicles, financing options, or to
            schedule a personalized test drive experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-sm transition-all duration-300 transform hover:scale-105"
              onClick={() => openTestDriveModal()}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Test Drive
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="shadow-sm transition-all duration-300 transform hover:scale-105"
              onClick={openContactSalesModal}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Modals */}
      <TestDriveModal
        isOpen={isTestDriveModalOpen}
        onClose={closeTestDriveModal}
        vehicle={selectedVehicle}
        companyName={company.name}
      />

      <ContactSalesModal isOpen={isContactSalesModalOpen} onClose={closeContactSalesModal} companyName={company.name} />
    </div>
  )
}

function VehicleCard({
  vehicle,
  onTestDrive,
  companyName,
}: {
  vehicle: Vehicle
  onTestDrive: () => void
  companyName: string
}) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group hover:border-primary/30 flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={vehicle.image || "/placeholder.svg"}
          alt={`${companyName} ${vehicle.name} - ${vehicle.description}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {vehicle.isTopSelling && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
            Top Seller
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-1 shadow-sm">
            <Tag size={12} />
            {getCategoryLabel(vehicle.category)}
          </Badge>
          {vehicle.isNew && (
            <Badge variant="default" className="bg-blue-500 shadow-sm">
              New
            </Badge>
          )}
        </div>
        <div className="absolute top-2 left-2 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this vehicle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{vehicle.name}</h3>
        <p className="text-muted-foreground mb-3 text-sm line-clamp-2">{vehicle.description}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-1 text-sm bg-muted/30 p-2 rounded-md">
            <Battery size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">{vehicle.range} km range</span>
          </div>
          <div className="flex items-center gap-1 text-sm bg-muted/30 p-2 rounded-md">
            <Zap size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">{vehicle.power} hp</span>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-lg">NPR {vehicle.price.toLocaleString()}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View financing options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onTestDrive}
              className="flex-1 transition-colors hover:border-primary"
            >
              <Calendar className="mr-1 h-4 w-4" />
              Test Drive
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1" asChild>
              <Link href={`/vehicle/${vehicle.id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function CompanyPageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs Skeleton */}
      <div className="bg-muted/30 py-2 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Skeleton className="h-4 w-20 mr-2" />
            <Skeleton className="h-4 w-4 mx-2 rounded-full" />
            <Skeleton className="h-4 w-24 mr-2" />
            <Skeleton className="h-4 w-4 mx-2 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* Banner Skeleton */}
      <div className="relative w-full h-[60vh] bg-muted/50">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <Skeleton className="h-24 w-48 mb-6" />
          <Skeleton className="h-12 w-3/4 max-w-lg mb-4" />
          <Skeleton className="h-6 w-2/3 max-w-md mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        {/* Company Info Skeleton */}
        <div className="bg-muted/30 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center md:items-start">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Vehicles Skeleton */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-1/2" />
                    <Skeleton className="h-9 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Vehicles Skeleton */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Skeleton className="h-8 w-36 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-10 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-1/2" />
                    <Skeleton className="h-9 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Skeleton */}
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-48 mx-auto sm:mx-0" />
            <Skeleton className="h-12 w-48 mx-auto sm:mx-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
