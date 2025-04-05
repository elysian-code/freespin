"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Coins,
  CreditCard,
  Grid3X3,
  LayoutDashboard,
  LayoutList,
  LogOut,
  Menu,
  PieChart,
  Search,
  Settings,
  SlidersHorizontal,
  User,
  Wallet,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InvestmentsPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
                    className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Investments</h1>
                <p className="text-muted-foreground">Browse and manage your investment opportunities</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? <LayoutList className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
                  <span className="sr-only">Toggle view</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Category</p>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="farm">Farm Stocks</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Min. Investment</p>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Any Amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Amount</SelectItem>
                            <SelectItem value="1000">$1,000+</SelectItem>
                            <SelectItem value="5000">$5,000+</SelectItem>
                            <SelectItem value="10000">$10,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Expected Return</p>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Any Return" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Return</SelectItem>
                            <SelectItem value="5">5%+</SelectItem>
                            <SelectItem value="10">10%+</SelectItem>
                            <SelectItem value="15">15%+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full mt-4">Apply Filters</Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search investments..." className="pl-10" />
              </div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="return-high">Highest Return</SelectItem>
                  <SelectItem value="return-low">Lowest Return</SelectItem>
                  <SelectItem value="amount-high">Highest Amount</SelectItem>
                  <SelectItem value="amount-low">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="farm">Farm Stocks</TabsTrigger>
                <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Organic Farm Co-op"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                          Farm Stock
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Organic Farm Co-op</CardTitle>
                        <CardDescription>
                          Invest in sustainable organic farming with high yield potential
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Min. Investment</span>
                            <span className="font-medium">$1,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Expected Return</span>
                            <span className="font-medium text-green-600">12-15% Annually</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Term Length</span>
                            <span className="font-medium">36 Months</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Funding Progress</span>
                              <span className="font-medium">65%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[65%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Invest Now</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Urban Apartments"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                          Real Estate
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Urban Apartments</CardTitle>
                        <CardDescription>Premium real estate investment in high-demand urban areas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Min. Investment</span>
                            <span className="font-medium">$5,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Expected Return</span>
                            <span className="font-medium text-green-600">8-10% Annually</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Term Length</span>
                            <span className="font-medium">60 Months</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Funding Progress</span>
                              <span className="font-medium">78%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[78%] rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Invest Now</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Ethereum Investment"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                          Cryptocurrency
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Ethereum Investment</CardTitle>
                        <CardDescription>
                          Diversify your portfolio with managed cryptocurrency investments
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Min. Investment</span>
                            <span className="font-medium">$500</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Expected Return</span>
                            <span className="font-medium text-green-600">15-25% Annually</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Term Length</span>
                            <span className="font-medium">Flexible</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Funding Progress</span>
                              <span className="font-medium">42%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[42%] rounded-full bg-green-500"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Invest Now</Button>
                      </CardFooter>
                    </Card>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-64 overflow-hidden">
                          <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Organic Farm Co-op"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                            Farm Stock
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold">Organic Farm Co-op</h3>
                              <p className="text-muted-foreground">
                                Invest in sustainable organic farming with high yield potential
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Expected Return: </span>
                                <span className="font-medium text-green-600">12-15% Annually</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Min. Investment: </span>
                                <span className="font-medium">$1,000</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Funding Progress</span>
                              <span className="font-medium">65%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[65%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button>Invest Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-64 overflow-hidden">
                          <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Urban Apartments"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                            Real Estate
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold">Urban Apartments</h3>
                              <p className="text-muted-foreground">
                                Premium real estate investment in high-demand urban areas
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Expected Return: </span>
                                <span className="font-medium text-green-600">8-10% Annually</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Min. Investment: </span>
                                <span className="font-medium">$5,000</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Funding Progress</span>
                              <span className="font-medium">78%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[78%] rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button>Invest Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-64 overflow-hidden">
                          <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Ethereum Investment"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                            Cryptocurrency
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold">Ethereum Investment</h3>
                              <p className="text-muted-foreground">
                                Diversify your portfolio with managed cryptocurrency investments
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Expected Return: </span>
                                <span className="font-medium text-green-600">15-25% Annually</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Min. Investment: </span>
                                <span className="font-medium">$500</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Funding Progress</span>
                              <span className="font-medium">42%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[42%] rounded-full bg-green-500"></div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button>Invest Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="farm" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Organic Farm Co-op"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                        Farm Stock
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>Organic Farm Co-op</CardTitle>
                      <CardDescription>Invest in sustainable organic farming with high yield potential</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Min. Investment</span>
                          <span className="font-medium">$1,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Return</span>
                          <span className="font-medium text-green-600">12-15% Annually</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Term Length</span>
                          <span className="font-medium">36 Months</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Funding Progress</span>
                            <span className="font-medium">65%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[65%] rounded-full bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Invest Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="real-estate" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Urban Apartments"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Real Estate
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>Urban Apartments</CardTitle>
                      <CardDescription>Premium real estate investment in high-demand urban areas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Min. Investment</span>
                          <span className="font-medium">$5,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Return</span>
                          <span className="font-medium text-green-600">8-10% Annually</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Term Length</span>
                          <span className="font-medium">60 Months</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Funding Progress</span>
                            <span className="font-medium">78%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[78%] rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Invest Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="crypto" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Ethereum Investment"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Cryptocurrency
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>Ethereum Investment</CardTitle>
                      <CardDescription>
                        Diversify your portfolio with managed cryptocurrency investments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Min. Investment</span>
                          <span className="font-medium">$500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Return</span>
                          <span className="font-medium text-green-600">15-25% Annually</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Term Length</span>
                          <span className="font-medium">Flexible</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Funding Progress</span>
                            <span className="font-medium">42%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[42%] rounded-full bg-green-500"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Invest Now</Button>
                    </CardFooter>
                  </Card>
                </div>
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

