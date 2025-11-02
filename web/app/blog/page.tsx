"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Search } from "lucide-react"
import {
  type BlogPost,
  getAllBlogPosts,
  getFeaturedPost,
  getBlogCategories,
  getBlogPostsByCategory,
  searchBlogPosts,
} from "@/lib/blog"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch categories and featured post
      const categoriesData = await getBlogCategories()
      const featured = await getFeaturedPost()

      setCategories(categoriesData)
      setFeaturedPost(featured)

      // Fetch posts based on active category and search
      let postsData: BlogPost[] = []

      if (searchQuery) {
        postsData = await searchBlogPosts(searchQuery)
      } else if (activeCategory !== "all") {
        postsData = await getBlogPostsByCategory(activeCategory)
      } else {
        postsData = await getAllBlogPosts()
      }

      // Sort posts
      if (sortBy === "newest") {
        postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      } else if (sortBy === "oldest") {
        postsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      }

      setPosts(postsData)
      setLoading(false)
    }

    fetchData()
  }, [activeCategory, searchQuery, sortBy])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The useEffect will handle the search
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">EV Blog</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest news, reviews, and insights about electric vehicles
          </p>
        </div>
        <form onSubmit={handleSearch} className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Featured Article */}
      {featuredPost && (
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
          <Image
            src={featuredPost.image || "/placeholder.svg"}
            alt={featuredPost.title}
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <Badge className="mb-2 w-fit">Featured</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{featuredPost.title}</h2>
            <p className="text-white/90 mb-4 max-w-2xl">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href={`/blog/${featuredPost.slug}`}>Read Article</Link>
              </Button>
              <div className="text-white/90 text-sm">
                {featuredPost.date} • {featuredPost.readTime}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="w-full md:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeCategory} className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : activeCategory !== "all"
                  ? `${activeCategory} Articles`
                  : "Latest Articles"}
            </h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term." : "There are no articles in this category yet."}
              </p>
              {searchQuery && <Button onClick={() => setSearchQuery("")}>Clear Search</Button>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                        <Link href={`/blog/${post.slug}`}>
                          Read more <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
