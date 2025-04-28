'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { signup } from '@/_actions/crud'
import { ArrowLeft, Coins, Eye, EyeOff, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export type Inputs = {
  email: string
  username: string
  phone_no: string
  password: string
}

export default function SignUp() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    getValues 
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      username: '',
      phone_no: '',
      password: '',
    },
  })

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await signup(data)
      
      if (res.success) {
        toast({
          title: "Success!",
          description: 'Account created successfully! Please check your email to verify your account.',
          variant: 'default'
        })
        router.push('/login')
      } else {
        toast({
          title: "Error",
          description: res.error || 'An error occurred during signup',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast({
        title: "Error",
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
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
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className={errors.email ? "border-destructive" : ""}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive" id="email-error">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className={errors.username ? "border-destructive" : ""}
                      aria-describedby={errors.username ? "username-error" : undefined}
                    />
                  )}
                />
                {errors.username && (
                  <p className="text-sm text-destructive" id="username-error">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_no">Phone Number</Label>
                <Controller
                  name="phone_no"
                  control={control}
                  rules={{
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: 'Please enter a valid phone number'
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+1234567890"
                      className={errors.phone_no ? "border-destructive" : ""}
                      aria-describedby={errors.phone_no ? "phone-error" : undefined}
                    />
                  )}
                />
                {errors.phone_no && (
                  <p className="text-sm text-destructive" id="phone-error">{errors.phone_no.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={errors.password ? "border-destructive" : ""}
                        aria-describedby={errors.password ? "password-error" : undefined}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive" id="password-error">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
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