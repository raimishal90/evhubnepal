"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import toast from "react-hot-toast"
import { authService } from "@/app/login/auth.service"
import { isStrongPassword, getPasswordChecklist } from "@/app/login/auth.util"

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  // Track if user has triggered validation for each field
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
    terms: false
  })

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    terms: ""
  })

  const handleRegisterChange = (field: string, value: any) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // If error is already shown, validate in real time
    if (touched[field as keyof typeof touched]) {
      validateField(field, value)
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, registerData[field as keyof typeof registerData])
  }

  function validateField(field: string, value: any) {
    let newErrors = { ...errors }
    if (field === "password") {
      newErrors.password = isStrongPassword(value) ? "" : "Password too weak."
      // Also revalidate confirmPassword if it has value
      if (registerData.confirmPassword) {
        newErrors.confirmPassword = value === registerData.confirmPassword ? "" : "Passwords do not match."
      }
    }
    if (field === "confirmPassword") {
      newErrors.confirmPassword = value === registerData.password ? "" : "Passwords do not match."
    }
    if (field === "agreeTerms") {
      newErrors.terms = value ? "" : "Please accept the terms."
    }
    setErrors(newErrors)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    let hasError = false
    const newErrors = { password: "", confirmPassword: "", terms: "" }

    if (!isStrongPassword(registerData.password)) {
      newErrors.password = "Password too weak."
      hasError = true
      setTouched((prev) => ({ ...prev, password: true }))
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
      hasError = true
      setTouched((prev) => ({ ...prev, confirmPassword: true }))
    }

    if (!registerData.agreeTerms) {
      newErrors.terms = "Please accept the terms."
      hasError = true
      setTouched((prev) => ({ ...prev, terms: true }))
    }

    setErrors(newErrors)
    if (hasError) return

    setIsLoading(true)

    try {
      const { firstName, lastName, email, password } = registerData
      await authService.signup({
        firstName,
        lastName,
        email,
        password
      })
      
      // Show success toast and wait before redirecting so user can see it
      toast.success("Account created successfully! Please log in to continue.")
      
      // Wait 1.5 seconds before redirecting to allow user to see the success message
      setTimeout(() => {
        router.push("/login")
        setIsLoading(false)
      }, 1500)
    } catch (error: any) {
      toast.error(error instanceof Error ? error.message : "Signup failed. An unexpected error occurred.")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={registerData.firstName}
              onChange={(e) => handleRegisterChange("firstName", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={registerData.lastName}
              onChange={(e) => handleRegisterChange("lastName", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={registerData.email}
            onChange={(e) => handleRegisterChange("email", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={registerData.password}
            onChange={(e) => handleRegisterChange("password", e.target.value)}
            required
            disabled={isLoading}
            onBlur={() => handleBlur("password")}
          />
          {touched.password && errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
          {registerData.password && (
            <ul className="text-xs mt-1 ml-1 list-disc pl-4">
              {getPasswordChecklist(registerData.password).map((item) => (
                <li key={item.label} className={item.valid ? "text-green-600" : "text-gray-500"}>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={registerData.confirmPassword}
            onChange={(e) =>
              handleRegisterChange("confirmPassword", e.target.value)
            }
            required
            disabled={isLoading}
            onBlur={() => handleBlur("confirmPassword")}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeTerms"
            checked={registerData.agreeTerms}
            onCheckedChange={(checked) => {
              handleRegisterChange("agreeTerms", checked)
              setTouched((prev) => ({ ...prev, terms: true }))
              validateField("agreeTerms", checked)
            }}
            disabled={isLoading}
          />
          <label
            htmlFor="agreeTerms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              terms and conditions
            </Link>
          </label>
        </div>
        {touched.terms && errors.terms && (
          <p className="text-sm text-red-500 mt-1 ml-6">{errors.terms}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  )
}
