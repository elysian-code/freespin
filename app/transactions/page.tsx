"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  Coins,
  CreditCard,
  Download,
  LayoutDashboard,
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function TransactionsPage() {
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
                    href="/transactions"
                    className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
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
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <p className="text-muted-foreground">View and manage your transaction history</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
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
                        <p className="text-sm font-medium">Transaction Type</p>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="deposit">Deposits</SelectItem>
                            <SelectItem value="withdrawal">Withdrawals</SelectItem>
                            <SelectItem value="investment">Investments</SelectItem>
                            <SelectItem value="return">Returns</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Date Range</p>
                        <Select defaultValue="all-time">
                          <SelectTrigger>
                            <SelectValue placeholder="All Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-time">All Time</SelectItem>
                            <SelectItem value="last-7">Last 7 Days</SelectItem>
                            <SelectItem value="last-30">Last 30 Days</SelectItem>
                            <SelectItem value="last-90">Last 90 Days</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Amount</p>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Any Amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Amount</SelectItem>
                            <SelectItem value="under-1000">Under $1,000</SelectItem>
                            <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="over-10000">Over $10,000</SelectItem>
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
                <Input placeholder="Search transactions..." className="pl-10" />
              </div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="amount-high">Highest Amount</SelectItem>
                  <SelectItem value="amount-low">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>A record of all your deposits, withdrawals, and investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-500/20 p-2">
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Wallet Funding</h3>
                          <p className="text-sm text-muted-foreground">Apr 3, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+$10,000.00</p>
                        <p className="text-sm text-muted-foreground">Credit Card</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/20 p-2">
                          <ArrowUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Investment Purchase</h3>
                          <p className="text-sm text-muted-foreground">Apr 2, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">-$5,000.00</p>
                        <p className="text-sm text-muted-foreground">Farm Stock</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-500/20 p-2">
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Wallet Funding</h3>
                          <p className="text-sm text-muted-foreground">Mar 28, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+$25,000.00</p>
                        <p className="text-sm text-muted-foreground">Bank Transfer</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/20 p-2">
                          <ArrowUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Investment Purchase</h3>
                          <p className="text-sm text-muted-foreground">Mar 25, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">-$10,000.00</p>
                        <p className="text-sm text-muted-foreground">Real Estate</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/20 p-2">
                          <ArrowUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Investment Purchase</h3>
                          <p className="text-sm text-muted-foreground">Mar 20, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">-$3,000.00</p>
                        <p className="text-sm text-muted-foreground">Cryptocurrency</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-500/20 p-2">
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Investment Return</h3>
                          <p className="text-sm text-muted-foreground">Mar 15, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+$750.00</p>
                        <p className="text-sm text-muted-foreground">Farm Stock Dividend</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-500/20 p-2">
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Investment Return</h3>
                          <p className="text-sm text-muted-foreground">Mar 10, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+$400.00</p>
                        <p className="text-sm text-muted-foreground">Real Estate Rental Income</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-500/20 p-2">
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Wallet Funding</h3>
                          <p className="text-sm text-muted-foreground">Mar 5, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+$15,000.00</p>
                        <p className="text-sm text-muted-foreground">Bank Transfer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

