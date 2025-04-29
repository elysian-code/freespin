"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, Coins, CreditCard, Download, LayoutDashboard, LogOut, Menu, PieChart, Search, Settings, SlidersHorizontal, Upload, User, Wallet, Plus } from "lucide-react"
import { getUserTransactions } from "@/_actions/crud"
import type { Transaction } from "@/utils/database/types"

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
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const transactionsData = await getUserTransactions()
        setTransactions(transactionsData || [])
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

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
                <Link href="/wallet">
                  <Button className="gap-1 bg-emerald-600 hover:bg-emerald-700">
                    <Upload className="h-4 w-4" />
                    Fund Wallet
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button variant="outline" className="gap-1">
                    <Download className="h-4 w-4" />
                    Withdraw
                  </Button>
                </Link>
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
                <CardDescription>A detailed list of all your wallet transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No transactions found</p>
                    <Button className="mt-4 gap-1" asChild>
                      <Link href="/wallet">
                        <Plus className="h-4 w-4" />
                        Make Your First Transaction
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.filter(t => t !== null).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors"
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className={`rounded-full p-2 ${
                              transaction.transaction_type === 'deposit' 
                                ? 'bg-green-500/20' 
                                : 'bg-emerald-500/20'
                            }`}>
                              {transaction.transaction_type === 'deposit' ? (
                                <ArrowDown className="h-4 w-4 text-green-500" />
                              ) : (
                                <ArrowUp className="h-4 w-4 text-emerald-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {transaction.transaction_type === 'deposit' ? 'Wallet Funding' : 'Withdrawal'}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(transaction.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${
                              transaction.transaction_type === 'deposit'
                                ? 'text-green-600'
                                : 'text-emerald-600'
                            }`}>
                              {transaction.transaction_type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">{transaction.status}</p>
                          </div>
                        </div>
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

