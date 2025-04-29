"use client"

import { useEffect, useState } from "react"
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
  Building,
  DollarSign,
  Plus
} from "lucide-react"
import { getBalance, getInvestment } from "@/_actions/crud"
import type { Investment, AccountBalance } from "@/utils/database/types"

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
import { Progress } from "@/components/ui/progress"

export default function InvestmentsPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [balance, setBalance] = useState<AccountBalance | null>(null)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [balanceData, investmentsData] = await Promise.all([
          getBalance(),
          getInvestment()
        ])
        setBalance(balanceData)
        setInvestments(investmentsData || [])
      } catch (error) {
        console.error('Error fetching investment data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const calculateInvestmentStats = () => {
    if (!investments.length) return { totalInvested: 0, totalReturns: 0, activeCount: 0, returnRate: 0 }
    
    const activeInvestments = investments.filter(inv => inv?.status === 'active' && inv !== null)
    const totalInvested = activeInvestments.reduce((sum, inv) => sum + (inv?.amount ?? 0), 0)
    const totalReturns = activeInvestments.reduce((sum, inv) => {
      const returns = (inv?.amount ?? 0) * 0.15 // Example: 15% return rate
      return sum + returns
    }, 0)
    
    return {
      totalInvested,
      totalReturns,
      activeCount: activeInvestments.length,
      returnRate: totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0
    }
  }

  const stats = calculateInvestmentStats()

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
                <p className="text-muted-foreground">Manage your investment portfolio</p>
              </div>
              <Button className="gap-1 bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4" />
                New Investment
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-7 w-24 bg-muted rounded"></div>
                      <div className="h-4 w-32 bg-muted rounded mt-2"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">
                        ${stats.totalInvested.toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Across {stats.activeCount} active investments
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-7 w-24 bg-muted rounded"></div>
                      <div className="h-4 w-32 bg-muted rounded mt-2"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">
                        ${stats.totalReturns.toFixed(2)}
                      </div>
                      <p className="text-xs text-emerald-600">
                        +{stats.returnRate.toFixed(2)}% return rate
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available to Invest</CardTitle>
                  <Wallet className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-7 w-24 bg-muted rounded"></div>
                      <div className="h-4 w-32 bg-muted rounded mt-2"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">
                        ${balance?.available_balance?.toFixed(2) || '0.00'}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Available in your wallet
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
                  <PieChart className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-7 w-24 bg-muted rounded"></div>
                      <div className="h-4 w-32 bg-muted rounded mt-2"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{stats.activeCount}</div>
                      <p className="text-xs text-muted-foreground">
                        Currently active plans
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Your active and past investments</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
                  </div>
                ) : investments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No investments found</p>
                    <Button className="mt-4 gap-1">
                      <Plus className="h-4 w-4" />
                      Make Your First Investment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {investments.map((investment) => investment && (
                      <div
                        key={investment.id}
                        className="rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors"
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-emerald-500/20 p-2">
                              {investment.investment_type === 'real_estate' ? (
                                <Building className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <Coins className="h-4 w-4 text-emerald-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {investment.investment_type.charAt(0).toUpperCase() + 
                                 investment.investment_type.slice(1).replace('_', ' ')}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Invested on {new Date(investment.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${investment.amount.toFixed(2)}
                            </p>
                            <p className={`text-sm ${
                              investment.status === 'active' 
                                ? 'text-emerald-600' 
                                : 'text-muted-foreground'
                            }`}>
                              {investment.status}
                            </p>
                          </div>
                        </div>
                        {investment.status === 'active' && (
                          <div className="px-4 pb-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Returns</span>
                                <span className="text-emerald-600">
                                  +${(investment.amount * 0.15).toFixed(2)} (15%)
                                </span>
                              </div>
                              <Progress
                                value={15}
                                className="h-2"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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

