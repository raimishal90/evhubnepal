"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, FileText, Search, X } from "lucide-react"
import Image from "next/image"
import type { Vehicle } from "@/lib/vehicles"
import type { BlogPost } from "@/lib/blog"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Search function
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)

    try {
      // In a real app, these would be API calls to your backend
      // For now, we'll simulate with the mock data

      // Search vehicles
      const vehicleResults = await searchVehicles(searchQuery)
      setVehicles(vehicleResults)

      // Search blog posts
      const blogResults = await searchBlogPosts(searchQuery)
      setBlogPosts(blogResults)

      // Save to recent searches
      saveRecentSearch(searchQuery)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock search functions
  const searchVehicles = async (query: string): Promise<Vehicle[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data - in a real app, this would come from your API
    return [
      {
        id: "1",
        name: "Tesla Model 3",
        price: 42990,
        range: 358,
        power: 283,
        image: "/placeholder.svg?height=400&width=600",
        isNew: false,
        year: 2023,
      },
      {
        id: "2",
        name: "Ford Mustang Mach-E",
        price: 45995,
        range: 314,
        power: 346,
        image: "/placeholder.svg?height=400&width=600",
        isNew: false,
        year: 2023,
      },
    ].filter((v) => v.name.toLowerCase().includes(query.toLowerCase()))
  }

  const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data - in a real app, this would come from your API
    return [
      {
        id: "1",
        title: "The Future of EV Charging Infrastructure",
        slug: "future-of-ev-charging",
        excerpt:
          "How the charging network is expanding to support the growing number of electric vehicles on the road.",
        category: "Infrastructure",
        date: "May 15, 2023",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: "2",
        title: "Comparing the Top 5 Electric SUVs of 2023",
        slug: "top-5-electric-suvs",
        excerpt: "A detailed comparison of range, performance, features, and value among the leading electric SUVs.",
        category: "Reviews",
        date: "June 2, 2023",
        image: "/placeholder.svg?height=400&width=600",
      },
    ].filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Save recent search
  const saveRecentSearch = (query: string) => {
    const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5) // Keep only the 5 most recent searches

    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  // Handle clicking on a search result
  const handleResultClick = (url: string) => {
    router.push(url)
    onClose()
  }

  // Handle pressing Enter in search input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search EV Hub</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for vehicles, articles, guides..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {searchQuery ? (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {vehicles.length === 0 && blogPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <>
                      {vehicles.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2 flex items-center">
                            <Car className="h-4 w-4 mr-2" /> Vehicles
                          </h3>
                          <div className="space-y-3">
                            {vehicles.slice(0, 3).map((vehicle) => (
                              <div
                                key={vehicle.id}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => handleResultClick(`/vehicle/${vehicle.id}`)}
                              >
                                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={vehicle.image || "/placeholder.svg"}
                                    alt={vehicle.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm">{vehicle.name}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    ${vehicle.price.toLocaleString()} • {vehicle.range} mi range
                                  </p>
                                </div>
                              </div>
                            ))}
                            {vehicles.length > 3 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => setActiveTab("vehicles")}
                              >
                                View all {vehicles.length} vehicles
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {blogPosts.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2 flex items-center">
                            <FileText className="h-4 w-4 mr-2" /> Blog Posts
                          </h3>
                          <div className="space-y-3">
                            {blogPosts.slice(0, 3).map((post) => (
                              <div
                                key={post.id}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => handleResultClick(`/blog/${post.slug}`)}
                              >
                                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm">{post.title}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    {post.category} • {post.date}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {blogPosts.length > 3 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => setActiveTab("blog")}
                              >
                                View all {blogPosts.length} blog posts
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-4 mt-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {vehicles.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No vehicles found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {vehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                          onClick={() => handleResultClick(`/vehicle/${vehicle.id}`)}
                        >
                          <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={vehicle.image || "/placeholder.svg"}
                              alt={vehicle.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{vehicle.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              ${vehicle.price.toLocaleString()} • {vehicle.range} mi range
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {vehicle.year} • {vehicle.power} hp
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="blog" className="space-y-4 mt-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {blogPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No blog posts found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {blogPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                          onClick={() => handleResultClick(`/blog/${post.slug}`)}
                        >
                          <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {post.category} • {post.date}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="mt-4">
            {recentSearches.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Recent Searches</h3>
                  <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                    Clear
                  </Button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                      onClick={() => {
                        setSearchQuery(search)
                        handleSearch()
                      }}
                    >
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{search}</span>
                      </div>
                      <X
                        className="h-4 w-4 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          setRecentSearches(recentSearches.filter((_, i) => i !== index))
                          localStorage.setItem(
                            "recentSearches",
                            JSON.stringify(recentSearches.filter((_, i) => i !== index)),
                          )
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Type to search for vehicles, blog posts, and more</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
