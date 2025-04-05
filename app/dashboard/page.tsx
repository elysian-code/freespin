"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Building,
  Coins,
  CreditCard,
  DollarSign,
  LandPlot,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Settings,
  User,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
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
                  <Coins className="h-6 w-6" />
                  <span>InvestHub</span>
                </div>
                <nav className="grid gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
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
                    href="/transactions"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <CreditCard className="h-4 w-4" />
                    Transactions
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
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Coins className="h-6 w-6" />
              <span>InvestHub</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/wallet" className="text-sm font-medium hover:underline underline-offset-4">
              Wallet
            </Link>
            <Link href="/investments" className="text-sm font-medium hover:underline underline-offset-4">
              Investments
            </Link>
            <Link href="/transactions" className="text-sm font-medium hover:underline underline-offset-4">
              Transactions
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
                    <Settings className="mr-2 h-4 w-4" />
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Investments</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,234.59</div>
                  <p className="text-xs text-muted-foreground">+4.3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Funds</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$32,997.30</div>
                  <p className="text-xs text-muted-foreground">+10.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Portfolio Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Portfolio Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Investment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="h-4 w-4 rounded-full bg-primary"></div>
                        <div>Farm Stocks</div>
                      </div>
                      <div className="font-medium">35%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        <div>Real Estate</div>
                      </div>
                      <div className="font-medium">40%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                        <div>Cryptocurrency</div>
                      </div>
                      <div className="font-medium">25%</div>
                    </div>
                    <div className="h-[150px] w-full bg-muted rounded-md flex items-center justify-center mt-4">
                      <p className="text-muted-foreground">Distribution Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Investments</TabsTrigger>
                  <TabsTrigger value="farm">Farm Stocks</TabsTrigger>
                  <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                  <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
                </TabsList>
                <Button>
                  <Link href="/investments">View All</Link>
                </Button>
              </div>
              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Investments</CardTitle>
                    <CardDescription>You have 7 active investments across all categories.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-primary/20 p-2">
                              <LandPlot className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Organic Farm Co-op</h3>
                              <p className="text-sm text-muted-foreground">Farm Stock</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Invested</span>
                              <span>$5,000.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Current Value</span>
                              <span className="text-green-600">$5,750.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Return</span>
                              <span className="text-green-600">+15%</span>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-blue-500/20 p-2">
                              <Building className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Urban Apartments</h3>
                              <p className="text-sm text-muted-foreground">Real Estate</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Invested</span>
                              <span>$10,000.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Current Value</span>
                              <span className="text-green-600">$10,800.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Return</span>
                              <span className="text-green-600">+8%</span>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-500/20 p-2">
                              <Coins className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Ethereum</h3>
                              <p className="text-sm text-muted-foreground">Cryptocurrency</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Invested</span>
                              <span>$3,000.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Current Value</span>
                              <span className="text-green-600">$4,200.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Return</span>
                              <span className="text-green-600">+40%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="farm" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Stock Investments</CardTitle>
                    <CardDescription>You have 3 active farm stock investments.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Farm stock investments would be listed here */}
                      <p className="text-muted-foreground">Farm stock investments content placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="real-estate" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Real Estate Investments</CardTitle>
                    <CardDescription>You have 2 active real estate investments.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Real estate investments would be listed here */}
                      <p className="text-muted-foreground">Real estate investments content placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="crypto" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cryptocurrency Investments</CardTitle>
                    <CardDescription>You have 2 active cryptocurrency investments.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Cryptocurrency investments would be listed here */}
                      <p className="text-muted-foreground">Cryptocurrency investments content placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} InvestHub</p>
          <nav className="flex gap-4">
            <Link href="/help" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Help
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

