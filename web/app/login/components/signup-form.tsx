"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import toast from "react-hot-toast" 
import { authService } from "../auth.service"
import { isStrongPassword, getPasswordChecklist } from "../auth.util"

interface SignupFormProps {
  handleTabChange?: (tab: string) => void
}

export function SignupForm({ handleTabChange }: SignupFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
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

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
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
    validateField(field, formData[field as keyof typeof formData])
  }

  function validateField(field: string, value: any) {
    let newErrors = { ...errors }
    if (field === "password") {
      newErrors.password = isStrongPassword(value) ? "" : "Password too weak."
      // Also revalidate confirmPassword if it has value
      if (formData.confirmPassword) {
        newErrors.confirmPassword = value === formData.confirmPassword ? "" : "Passwords do not match."
      }
    }
    if (field === "confirmPassword") {
      newErrors.confirmPassword = value === formData.password ? "" : "Passwords do not match."
    }
    if (field === "agreeTerms") {
      newErrors.terms = value ? "" : "Please accept the terms."
    }
    setErrors(newErrors)
  }


  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    terms: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let hasError = false
    const newErrors = { password: "", confirmPassword: "", terms: "" }


    if (!isStrongPassword(formData.password)) {
      newErrors.password = "Password too weak."
      hasError = true
      setTouched((prev) => ({ ...prev, password: true }))
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
      hasError = true
      setTouched((prev) => ({ ...prev, confirmPassword: true }))
    }

    if (!formData.agreeTerms) {
      newErrors.terms = "Please accept the terms."
      hasError = true
      setTouched((prev) => ({ ...prev, terms: true }))
    }

    setErrors(newErrors)
    if (hasError) return

    setIsLoading(true)

    try {
      const { firstName, lastName, email, password } = formData
      const authData = await authService.signup({
          firstName,
          lastName,
          email,
          password
      })
        
        // Store authentication data
        if (authData.token && authData.user) {
          authService.setAuthData(authData.token, authData.user)
        }
        
        toast.success("Account created successfully! Please log in.")
        if (handleTabChange) {
          handleTabChange("login")
        } else {
          router.push("/login")
        }
     
    } catch (error: any) {
        toast.error(error instanceof Error ? error.message : "Signup failed. An unexpected error occurred.")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
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
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signupEmail">Email</Label>
        <Input
          id="signupEmail"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          disabled={isLoading}
        />
      </div>


      <div className="space-y-2">
        <Label htmlFor="signupPassword">Password</Label>
        <Input
          id="signupPassword"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          disabled={isLoading}
          onBlur={() => handleBlur("password")}
        />
        {touched.password && errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
        {formData.password && (
          <ul className="text-xs mt-1 ml-1 list-disc pl-4">
            {getPasswordChecklist(formData.password).map((item) => (
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
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
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
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => {
            handleChange("agreeTerms", checked)
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
    </form>
  )
}
