"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SignupForm } from "@/app/login/components/signup-form"
import LoginForm from "@/app/login/components/login-form"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get("tab")
    return tab === "register" ? "register" : "login"
  })

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const newUrl = value === "register" 
      ? "?tab=register"
      : "/login"
    router.push(newUrl, { scroll: false })
  }

  

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-2">Welcome to EV Hub Nepal</h2>
            <p className="text-white/80">Your premier destination for electric vehicles in Nepal</p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">EV Hub Nepal</h1>
              <p className="text-muted-foreground">Your electric vehicle community</p>
            </div>

            <Tabs defaultValue="login" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>


              <TabsContent value="login">
                <LoginForm handleTabChange={handleTabChange} />
              </TabsContent>

              <TabsContent value="register">
                <SignupForm handleTabChange={handleTabChange} />
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
