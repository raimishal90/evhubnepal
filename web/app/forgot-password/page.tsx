"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await api.post('/user/forgot-password', { email })
      
      if (response.data.status) {
        setIsSubmitted(true)
      } else {
        setError("An error occurred. Please try again.")
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8 px-4">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="hidden md:block relative rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1593941707882-a5bfb1060f0d?q=80&w=800&auto=format&fit=crop"
            alt="Electric Vehicle in Nepal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-2">EV Hub Nepal</h2>
            <p className="text-white/80">Your premier destination for electric vehicles in Nepal</p>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                <p>
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Please check your email and follow the instructions to reset your password. If you don't see the
                  email, check your spam folder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
