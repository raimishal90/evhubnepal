import { useCallback, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LoginCredentials } from "@/lib/types/auth.types"
import toast from "react-hot-toast"
import { isValidEmail } from "../auth.util"
import { authService } from "../auth.service"
import { Eye, EyeOff } from "lucide-react"

export default function LoginForm({ handleTabChange }: { handleTabChange: (tab: string) => void }) {
    const router = useRouter()

    const initialLoginData: LoginCredentials = { email: "", password: "" }
    const initialErrors = { email: "", password: "" }
    const initialTouched = { email: false, password: false }

    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState(initialTouched)
    const [isLoading, setIsLoading] = useState(false)
    const [loginData, setLoginData] = useState<LoginCredentials>(initialLoginData)
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleLoginChange = useCallback((field: keyof LoginCredentials, value: string) => {
        setLoginData((prev) => ({ ...prev, [field]: value }))
    }, [])

    const handleBlur = useCallback((field: keyof LoginCredentials) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
    }, [])

    const validate = useCallback((data: LoginCredentials) => {
        const nextErrors = { email: "", password: "" }
        if (!data.email || data.email.trim() === "") {
            nextErrors.email = "Email is required."
        } else if (!isValidEmail(data.email)) {
            nextErrors.email = "Invalid email address."
        }

        if (!data.password || data.password.trim() === "") {
            nextErrors.password = "Password is required."
        }

        const hasError = Boolean(nextErrors.email || nextErrors.password)
        return { nextErrors, hasError }
    }, [])

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()

        const { nextErrors, hasError } = validate(loginData)
        // mark all fields that have errors as touched so error messages show
        const touchedUpdate = {
            email: Boolean(nextErrors.email) || touched.email,
            password: Boolean(nextErrors.password) || touched.password,
        }
        setTouched((prev) => ({ ...prev, ...touchedUpdate }))
        setErrors(nextErrors)
        if (hasError) return

        setIsLoading(true)
        try {
            const { email, password } = loginData
            const response = await authService.login({ email, password }, rememberMe)
            if (response) {
                // Dispatch auth change event to update navbar
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('auth-change'))
                }
                router.push("/dashboard")
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Login failed. An unexpected error occurred.")
        } finally {
            setIsLoading(false)
        }
    }, [loginData, validate, router, touched, rememberMe])

    return (
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    // type="email"
                    placeholder="name@example.com"
                    value={loginData.email}
                    onChange={(e) => handleLoginChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                    disabled={isLoading}
                />
                {touched.email && errors.email && (
                    <p id="email-error" className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => handleLoginChange("password", e.target.value)}
                        onBlur={() => handleBlur("password")}
                        aria-invalid={Boolean(touched.password && errors.password)}
                        aria-describedby={touched.password && errors.password ? "password-error" : undefined}
                        // required (validated in JS)
                        disabled={isLoading}
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={isLoading}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                {touched.password && errors.password && (
                    <p id="password-error" className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading}
                />
                <Label htmlFor="remember-me" className="text-sm">
                    Remember me
                </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => { handleTabChange("register") }}
                    disabled={isLoading}
                >
                    Register
                </button>
            </div>
        </form>
    );
};
