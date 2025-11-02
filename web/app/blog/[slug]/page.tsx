import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { getBlogPostBySlug, getLatestPosts } from "@/lib/blog"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getLatestPosts(3)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <Badge variant="outline" className="mb-4">
          {post.category}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Featured Image */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>Content not available for this article.</p>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
            <div className="space-y-6">
              {relatedPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <div key={relatedPost.id} className="flex flex-col gap-2">
                    <div className="relative w-full h-32 rounded-md overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {relatedPost.category}
                    </Badge>
                    <h4 className="font-medium">{relatedPost.title}</h4>
                    <Link href={`/blog/${relatedPost.slug}`} className="text-primary hover:underline text-sm">
                      Read article
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
