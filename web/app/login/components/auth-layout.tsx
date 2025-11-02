import { Card, CardContent } from "@/components/ui/card"
import { Leaf } from "lucide-react"
import Image from "next/image"

interface AuthLayoutProps {
  title: string
  children: React.ReactNode
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8 px-4">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="hidden md:block relative rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=800&auto=format&fit=crop"
            alt="Electric Vehicle in Nepal"
            fill
            className="object-cover"
          />
        </div>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-5 w-5 text-green-600" />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <CardContent className="p-0">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
