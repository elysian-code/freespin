"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Coins, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { login, sendMagicLink } from "@/_actions/crud"
import { toast } from "@/components/ui/use-toast"

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  form?: string
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [magicLinkEmail, setMagicLinkEmail] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validate inputs
    const newErrors: FormErrors = {}
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const res = await login(formData)
      
      if (!res.success) {
        const errorMessage = res.error || "Authentication failed. Please check your credentials."
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        })
        setErrors({ form: errorMessage })
        return
      }

      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully",
      })
      
      router.replace("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setErrors({ form: "An unexpected error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!magicLinkEmail) {
      setErrors({ email: "Email is required" })
      return
    }

    if (!validateEmail(magicLinkEmail)) {
      setErrors({ email: "Please enter a valid email address" })
      return
    }

    setIsMagicLinkLoading(true)

    try {
      const res = await sendMagicLink(magicLinkEmail)
      
      if (!res.success) {
        toast({
          title: "Error",
          description: res.error || "Failed to send magic link",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Magic Link Sent",
        description: "Please check your email for the login link",
      })
      
      // Clear the form
      setMagicLinkEmail("")
    } catch (error) {
      console.error("Magic link error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsMagicLinkLoading(false)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Coins className="h-6 w-6" />
            <span>InvestHub</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Choose your preferred way to sign in</CardDescription>
          </CardHeader>

          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <CardContent className="space-y-4">
                  {errors.form && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                      {errors.form}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive" id="email-error">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link 
                        href="/forgot-password" 
                        className="text-sm font-medium text-primary hover:underline"
                        tabIndex={-1}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        className={errors.password ? "border-destructive" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive" id="password-error">{errors.password}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="magic-link">
              <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="magic-link-email">Email</Label>
                    <Input
                      id="magic-link-email"
                      type="email"
                      placeholder="you@example.com"
                      value={magicLinkEmail}
                      onChange={(e) => setMagicLinkEmail(e.target.value)}
                      disabled={isMagicLinkLoading}
                      aria-describedby={errors.email ? "magic-link-email-error" : undefined}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive" id="magic-link-email-error">{errors.email}</p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We'll send you a magic link to your email. Click it to sign in instantly.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isMagicLinkLoading}
                  >
                    {isMagicLinkLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isMagicLinkLoading ? "Sending..." : "Send Magic Link"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>

          <div className="px-6 pb-6 pt-2 text-center text-sm">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </div>
        </Card>
      </main>
      <footer className="border-t py-4">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InvestHub
          </p>
        </div>
      </footer>
    </div>
  )
}

