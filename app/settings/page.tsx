"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Building,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  Menu,
  Moon,
  PaintBucket,
  PieChart,
  SettingsIcon,
  Shield,
  Sun,
  User,
  Wallet,
  Coins,
  LayoutDashboard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SettingsPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [theme, setTheme] = useState("system")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState({
    accountUpdates: true,
    marketingEmails: false,
    investmentUpdates: true,
    securityAlerts: true,
  })
  const [pushNotifications, setPushNotifications] = useState({
    accountUpdates: false,
    investmentUpdates: true,
    securityAlerts: true,
  })
  const [language, setLanguage] = useState("english")
  const [currency, setCurrency] = useState("usd")
  const [timeZone, setTimeZone] = useState("utc-8")
  const [showTwoFactorSuccess, setShowTwoFactorSuccess] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleEmailNotificationChange = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key],
    })
  }

  const handlePushNotificationChange = (key: keyof typeof pushNotifications) => {
    setPushNotifications({
      ...pushNotifications,
      [key]: !pushNotifications[key],
    })
  }

  const handleTwoFactorToggle = () => {
    if (!twoFactorEnabled) {
      // In a real app, this would trigger the 2FA setup flow
      setShowTwoFactorSuccess(true)
    } else {
      setTwoFactorEnabled(false)
    }
  }

  const handleVerifyTwoFactor = () => {
    // In a real app, this would verify the code with the server
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true)
      setShowTwoFactorSuccess(false)
      setVerificationCode("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex items-center gap-2 font-bold text-xl mb-8">
                  <Coins className="h-6 w-6 text-emerald-500" />
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    InvestHub
                  </span>
                </div>
                <nav className="grid gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/wallet"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <Wallet className="h-4 w-4" />
                    Wallet
                  </Link>
                  <Link
                    href="/investments"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <PieChart className="h-4 w-4" />
                    Investments
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 px-3 py-2 text-emerald-600 dark:text-emerald-400 transition-all hover:text-emerald-700 dark:hover:text-emerald-300"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Coins className="h-6 w-6 text-emerald-500" />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                InvestHub
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/wallet" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Wallet
            </Link>
            <Link href="/investments" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Investments
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Profile
            </Link>
            <Link href="/settings" className="text-sm font-medium text-emerald-500">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
              <Card className="md:row-span-2 h-fit">
                <CardContent className="p-4">
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="#account"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 font-medium"
                    >
                      <User className="h-4 w-4" />
                      Account
                    </Link>
                    <Link
                      href="#security"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <Shield className="h-4 w-4" />
                      Security
                    </Link>
                    <Link
                      href="#appearance"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <PaintBucket className="h-4 w-4" />
                      Appearance
                    </Link>
                    <Link
                      href="#notifications"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <Bell className="h-4 w-4" />
                      Notifications
                    </Link>
                    <Link
                      href="#payment"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <CreditCard className="h-4 w-4" />
                      Payment Methods
                    </Link>
                    <Link
                      href="#bank"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <Building className="h-4 w-4" />
                      Bank Accounts
                    </Link>
                  </nav>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card id="account">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                          <SelectItem value="cad">CAD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select value={timeZone} onValueChange={setTimeZone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-12">UTC-12:00</SelectItem>
                          <SelectItem value="utc-11">UTC-11:00</SelectItem>
                          <SelectItem value="utc-10">UTC-10:00</SelectItem>
                          <SelectItem value="utc-9">UTC-09:00</SelectItem>
                          <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                          <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                          <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                          <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                          <SelectItem value="utc-4">UTC-04:00</SelectItem>
                          <SelectItem value="utc-3">UTC-03:00</SelectItem>
                          <SelectItem value="utc-2">UTC-02:00</SelectItem>
                          <SelectItem value="utc-1">UTC-01:00</SelectItem>
                          <SelectItem value="utc">UTC+00:00</SelectItem>
                          <SelectItem value="utc+1">UTC+01:00</SelectItem>
                          <SelectItem value="utc+2">UTC+02:00</SelectItem>
                          <SelectItem value="utc+3">UTC+03:00</SelectItem>
                          <SelectItem value="utc+4">UTC+04:00</SelectItem>
                          <SelectItem value="utc+5">UTC+05:00</SelectItem>
                          <SelectItem value="utc+6">UTC+06:00</SelectItem>
                          <SelectItem value="utc+7">UTC+07:00</SelectItem>
                          <SelectItem value="utc+8">UTC+08:00</SelectItem>
                          <SelectItem value="utc+9">UTC+09:00</SelectItem>
                          <SelectItem value="utc+10">UTC+10:00</SelectItem>
                          <SelectItem value="utc+11">UTC+11:00</SelectItem>
                          <SelectItem value="utc+12">UTC+12:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card id="security">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and authentication methods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Password</Label>
                          <p className="text-sm text-muted-foreground">Change your account password</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Label className="text-base">Two-Factor Authentication</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add an extra layer of security to your account</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Protect your account with two-factor authentication
                          </p>
                        </div>
                        <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
                      </div>
                      {showTwoFactorSuccess && (
                        <div className="rounded-lg border p-4 bg-emerald-50 dark:bg-emerald-950/20">
                          <h3 className="font-medium text-emerald-700 dark:text-emerald-400 mb-2">
                            Set Up Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-emerald-600 dark:text-emerald-500 mb-4">
                            Scan the QR code below with your authenticator app, then enter the verification code.
                          </p>
                          <div className="flex justify-center mb-4">
                            <div className="bg-white p-4 rounded-lg">
                              <div className="w-40 h-40 bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">QR Code Placeholder</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="verification-code">Verification Code</Label>
                            <Input
                              id="verification-code"
                              placeholder="Enter 6-digit code"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              maxLength={6}
                            />
                          </div>
                          <Button
                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                            onClick={handleVerifyTwoFactor}
                            disabled={verificationCode.length !== 6}
                          >
                            Verify and Enable
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Login Sessions</Label>
                          <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                        </div>
                        <Button variant="outline">Manage Sessions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="appearance">
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how InvestHub looks on your device</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                          <div
                            className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer ${theme === "light" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                          >
                            <RadioGroupItem value="light" id="light" className="sr-only" />
                            <Sun className="h-6 w-6" />
                            <Label htmlFor="light" className="cursor-pointer">
                              Light
                            </Label>
                          </div>
                          <div
                            className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer ${theme === "dark" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                          >
                            <RadioGroupItem value="dark" id="dark" className="sr-only" />
                            <Moon className="h-6 w-6" />
                            <Label htmlFor="dark" className="cursor-pointer">
                              Dark
                            </Label>
                          </div>
                          <div
                            className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer ${theme === "system" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                          >
                            <RadioGroupItem value="system" id="system" className="sr-only" />
                            <Globe className="h-6 w-6" />
                            <Label htmlFor="system" className="cursor-pointer">
                              System
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Preferences</Button>
                  </CardFooter>
                </Card>

                <Card id="notifications">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="account-updates-email" className="flex-1">
                            Account Updates
                          </Label>
                          <Switch
                            id="account-updates-email"
                            checked={emailNotifications.accountUpdates}
                            onCheckedChange={() => handleEmailNotificationChange("accountUpdates")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing-emails" className="flex-1">
                            Marketing Emails
                          </Label>
                          <Switch
                            id="marketing-emails"
                            checked={emailNotifications.marketingEmails}
                            onCheckedChange={() => handleEmailNotificationChange("marketingEmails")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="investment-updates-email" className="flex-1">
                            Investment Updates
                          </Label>
                          <Switch
                            id="investment-updates-email"
                            checked={emailNotifications.investmentUpdates}
                            onCheckedChange={() => handleEmailNotificationChange("investmentUpdates")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="security-alerts-email" className="flex-1">
                            Security Alerts
                          </Label>
                          <Switch
                            id="security-alerts-email"
                            checked={emailNotifications.securityAlerts}
                            onCheckedChange={() => handleEmailNotificationChange("securityAlerts")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="account-updates-push" className="flex-1">
                            Account Updates
                          </Label>
                          <Switch
                            id="account-updates-push"
                            checked={pushNotifications.accountUpdates}
                            onCheckedChange={() => handlePushNotificationChange("accountUpdates")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="investment-updates-push" className="flex-1">
                            Investment Updates
                          </Label>
                          <Switch
                            id="investment-updates-push"
                            checked={pushNotifications.investmentUpdates}
                            onCheckedChange={() => handlePushNotificationChange("investmentUpdates")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="security-alerts-push" className="flex-1">
                            Security Alerts
                          </Label>
                          <Switch
                            id="security-alerts-push"
                            checked={pushNotifications.securityAlerts}
                            onCheckedChange={() => handlePushNotificationChange("securityAlerts")}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Notification Settings</Button>
                  </CardFooter>
                </Card>

                <Card id="payment">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods for funding your wallet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4 hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-muted p-2">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">Visa ending in 4242</h3>
                              <p className="text-sm text-muted-foreground">Expires 04/2028</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-muted p-2">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">Mastercard ending in 8888</h3>
                              <p className="text-sm text-muted-foreground">Expires 09/2026</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full gap-1 bg-emerald-600 hover:bg-emerald-700">
                        <CreditCard className="h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card id="bank">
                  <CardHeader>
                    <CardTitle>Bank Accounts</CardTitle>
                    <CardDescription>Manage your linked bank accounts for withdrawals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4 hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-muted p-2">
                              <Building className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">Chase Bank</h3>
                              <p className="text-sm text-muted-foreground">**** 1234 - Checking</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-muted p-2">
                              <Building className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">Bank of America</h3>
                              <p className="text-sm text-muted-foreground">**** 5678 - Savings</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full gap-1 bg-emerald-600 hover:bg-emerald-700">
                        <Building className="h-4 w-4" />
                        Add Bank Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 bg-gradient-to-b from-white to-emerald-50 dark:from-background dark:to-emerald-950/10">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} InvestHub</p>
          <nav className="flex gap-4">
            <Link href="/help" className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
              Help
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

