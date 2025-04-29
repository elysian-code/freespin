"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  Building,
  Check,
  CreditCard,
  DollarSign,
  Download,
  HelpCircle,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Plus,
  Settings,
  Upload,
  User,
  Wallet,
  Coins,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { getBalance, getInvestment, getWithdrawals, updateAccountBalance } from "@/_actions/crud"
import type { AccountBalance, Investment } from "@/utils/database/types"

export default function WalletPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [balance, setBalance] = useState<AccountBalance | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fundAmount, setFundAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("")
  const [fundingStep, setFundingStep] = useState(1)
  const [withdrawStep, setWithdrawStep] = useState(1)
  const [showFundingSuccess, setShowFundingSuccess] = useState(false)
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [savePaymentMethod, setSavePaymentMethod] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const balanceData = await getBalance()
        setBalance(balanceData)
      } catch (error) {
        console.error('Error fetching wallet data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFundWallet = async () => {
    if (fundingStep < 3) {
      setFundingStep(fundingStep + 1)
    } else {
      try {
        // In a real app, you would call an API to process the payment
        console.log("Funding wallet with:", fundAmount, "using", paymentMethod)
        const numAmount = Number.parseFloat(fundAmount)
        if (balance && !isNaN(numAmount)) {
          const newBalance = {
            ...balance,
            main_balance: (balance.main_balance || 0) + numAmount,
            available_balance: (balance.available_balance || 0) + numAmount
          }
          await updateAccountBalance(balance.user_id, newBalance)
          setBalance(newBalance)
        }
        setShowFundingSuccess(true)
      } catch (error) {
        console.error('Error funding wallet:', error)
      }
    }
  }

  const handleWithdraw = async () => {
    if (withdrawStep < 3) {
      setWithdrawStep(withdrawStep + 1)
    } else {
      try {
        const numAmount = Number.parseFloat(withdrawAmount)
        if (balance && !isNaN(numAmount)) {
          const newBalance = {
            ...balance,
            main_balance: (balance.main_balance || 0) - numAmount,
            available_balance: (balance.available_balance || 0) - numAmount
          }
          await updateAccountBalance(balance.user_id, newBalance)
          setBalance(newBalance)
        }
        setShowWithdrawSuccess(true)
      } catch (error) {
        console.error('Error processing withdrawal:', error)
      }
    }
  }

  const resetFundingFlow = () => {
    setFundingStep(1)
    setFundAmount("")
    setPaymentMethod("")
    setSelectedCard(null)
    setSavePaymentMethod(false)
    setCardDetails({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    })
  }

  const resetWithdrawFlow = () => {
    setWithdrawStep(1)
    setWithdrawAmount("")
    setWithdrawMethod("")
    setSelectedBank(null)
  }

  const handleCloseFundingSuccess = () => {
    setShowFundingSuccess(false)
    resetFundingFlow()
  }

  const handleCloseWithdrawSuccess = () => {
    setShowWithdrawSuccess(false)
    resetWithdrawFlow()
  }

  const calculateFee = (amount: string) => {
    const numAmount = Number.parseFloat(amount) || 0
    return (numAmount * 0.015).toFixed(2) // 1.5% fee
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
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 px-3 py-2 text-emerald-600 dark:text-emerald-400 transition-all hover:text-emerald-700 dark:hover:text-emerald-300"
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
            <Link href="/wallet" className="text-sm font-medium text-emerald-500">
              Wallet
            </Link>
            <Link href="/investments" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Investments
            </Link>
            <Link href="/transactions" className="text-sm font-medium hover:text-emerald-500 transition-colors">
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
                <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
                <p className="text-muted-foreground">Manage your funds and transactions</p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-1 bg-emerald-600 hover:bg-emerald-700">
                      <Upload className="h-4 w-4" />
                      Fund Wallet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    {!showFundingSuccess ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>Fund Your Wallet</DialogTitle>
                          <DialogDescription>Add funds to your wallet to start investing</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 mb-6">
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Step {fundingStep} of 3</div>
                            <div className="text-sm text-muted-foreground">
                              {fundingStep === 1 ? "Amount" : fundingStep === 2 ? "Payment Method" : "Confirm"}
                            </div>
                          </div>
                          <Progress 
                            value={fundingStep * 33.33} 
                            className="h-2"
                          />
                        </div>

                        {fundingStep === 1 && (
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="amount">Amount to Fund</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  id="amount"
                                  type="number"
                                  placeholder="0.00"
                                  className="pl-10"
                                  value={fundAmount}
                                  onChange={(e) => setFundAmount(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <Button variant="outline" onClick={() => setFundAmount("100")}>
                                $100
                              </Button>
                              <Button variant="outline" onClick={() => setFundAmount("500")}>
                                $500
                              </Button>
                              <Button variant="outline" onClick={() => setFundAmount("1000")}>
                                $1,000
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm">
                              <Info className="h-4 w-4 text-emerald-500" />
                              <span>A 1.5% processing fee will be applied to your deposit.</span>
                            </div>
                          </div>
                        )}

                        {fundingStep === 2 && (
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Select Payment Method</Label>
                              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-4">
                                <div
                                  className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${paymentMethod === "credit-card" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <RadioGroupItem value="credit-card" id="credit-card" />
                                    <Label htmlFor="credit-card" className="cursor-pointer">
                                      Credit Card
                                    </Label>
                                  </div>
                                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div
                                  className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${paymentMethod === "bank-transfer" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                                    <Label htmlFor="bank-transfer" className="cursor-pointer">
                                      Bank Transfer
                                    </Label>
                                  </div>
                                  <Building className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </RadioGroup>
                            </div>

                            {paymentMethod === "credit-card" && (
                              <div className="space-y-4 mt-2">
                                <div className="grid gap-2">
                                  <div className="flex justify-between">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <div className="flex gap-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-muted-foreground"
                                      >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                      </svg>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-muted-foreground"
                                      >
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="4" />
                                      </svg>
                                    </div>
                                  </div>
                                  <Input
                                    id="card-number"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardDetails.cardNumber}
                                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="card-name">Cardholder Name</Label>
                                  <Input
                                    id="card-name"
                                    placeholder="John Doe"
                                    value={cardDetails.cardName}
                                    onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input
                                      id="expiry"
                                      placeholder="MM/YY"
                                      value={cardDetails.expiryDate}
                                      onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                      <Label htmlFor="cvv">CVV</Label>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>The 3-digit security code on the back of your card</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                    <Input
                                      id="cvv"
                                      placeholder="123"
                                      value={cardDetails.cvv}
                                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="save-card"
                                    className="rounded border-gray-300"
                                    checked={savePaymentMethod}
                                    onChange={(e) => setSavePaymentMethod(e.target.checked)}
                                  />
                                  <Label
                                    htmlFor="save-card"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Save card for future payments
                                  </Label>
                                </div>
                              </div>
                            )}

                            {paymentMethod === "bank-transfer" && (
                              <div className="space-y-4 mt-2">
                                <div className="rounded-md bg-muted p-4">
                                  <div className="text-sm font-medium mb-2">Bank Transfer Instructions</div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Please transfer the funds to the following account:
                                  </p>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-muted-foreground">Bank Name:</div>
                                    <div>InvestHub Financial</div>
                                    <div className="text-muted-foreground">Account Name:</div>
                                    <div>InvestHub Holdings LLC</div>
                                    <div className="text-muted-foreground">Account Number:</div>
                                    <div>1234567890</div>
                                    <div className="text-muted-foreground">Routing Number:</div>
                                    <div>987654321</div>
                                    <div className="text-muted-foreground">Reference:</div>
                                    <div>Your InvestHub ID</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 rounded-md bg-yellow-50 dark:bg-yellow-950/20 p-3 text-sm">
                                  <Info className="h-4 w-4 text-yellow-500" />
                                  <span className="text-yellow-700 dark:text-yellow-400">
                                    Bank transfers typically take 1-3 business days to process.
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {fundingStep === 3 && (
                          <div className="grid gap-4 py-4">
                            <div className="rounded-md bg-muted p-4">
                              <div className="text-sm font-medium mb-2">Transaction Summary</div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-muted-foreground">Amount:</div>
                                <div>${fundAmount}</div>
                                <div className="text-muted-foreground">Processing Fee (1.5%):</div>
                                <div>${calculateFee(fundAmount)}</div>
                                <div className="text-muted-foreground">Payment Method:</div>
                                <div>{paymentMethod === "credit-card" ? "Credit Card" : "Bank Transfer"}</div>
                                <div className="text-muted-foreground border-t pt-2 mt-2">Total:</div>
                                <div className="font-medium border-t pt-2 mt-2">
                                  $
                                  {(
                                    Number.parseFloat(fundAmount) + Number.parseFloat(calculateFee(fundAmount))
                                  ).toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm">
                              <Info className="h-4 w-4 text-emerald-500" />
                              <span>By proceeding, you agree to our terms and conditions for wallet funding.</span>
                            </div>
                          </div>
                        )}

                        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                          {fundingStep > 1 ? (
                            <Button variant="outline" onClick={() => setFundingStep(fundingStep - 1)}>
                              Back
                            </Button>
                          ) : (
                            <Button variant="outline" onClick={resetFundingFlow}>
                              Cancel
                            </Button>
                          )}
                          <Button
                            onClick={handleFundWallet}
                            disabled={
                              (fundingStep === 1 && (!fundAmount || Number.parseFloat(fundAmount) <= 0)) ||
                              (fundingStep === 2 && !paymentMethod) ||
                              (fundingStep === 2 &&
                                paymentMethod === "credit-card" &&
                                (!cardDetails.cardNumber ||
                                  !cardDetails.cardName ||
                                  !cardDetails.expiryDate ||
                                  !cardDetails.cvv))
                            }
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            {fundingStep < 3 ? "Continue" : "Confirm Payment"}
                          </Button>
                        </DialogFooter>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6">
                        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 mb-4">
                          <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                        <p className="text-center text-muted-foreground mb-6">
                          Your wallet has been funded with ${fundAmount}. The funds are now available for investing.
                        </p>
                        <div className="rounded-md bg-muted p-4 w-full mb-6">
                          <div className="text-sm font-medium mb-2">Transaction Details</div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Transaction ID:</div>
                            <div>TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                            <div className="text-muted-foreground">Date:</div>
                            <div>{new Date().toLocaleString()}</div>
                            <div className="text-muted-foreground">Amount:</div>
                            <div>${fundAmount}</div>
                            <div className="text-muted-foreground">Payment Method:</div>
                            <div>{paymentMethod === "credit-card" ? "Credit Card" : "Bank Transfer"}</div>
                            <div className="text-muted-foreground">Status:</div>
                            <div className="text-emerald-600">Completed</div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button variant="outline" onClick={handleCloseFundingSuccess}>
                            Close
                          </Button>
                          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                            <Link href="/investments">Explore Investments</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Withdraw
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    {!showWithdrawSuccess ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>Withdraw Funds</DialogTitle>
                          <DialogDescription>Withdraw funds from your wallet to your bank account</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 mb-6">
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Step {withdrawStep} of 3</div>
                            <div className="text-sm text-muted-foreground">
                              {withdrawStep === 1 ? "Amount" : withdrawStep === 2 ? "Withdrawal Method" : "Confirm"}
                            </div>
                          </div>
                          <Progress 
                            value={withdrawStep * 33.33}
                            className="h-2"
                          />
                        </div>

                        {withdrawStep === 1 && (
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="withdraw-amount">Amount to Withdraw</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  id="withdraw-amount"
                                  type="number"
                                  placeholder="0.00"
                                  className="pl-10"
                                  value={withdrawAmount}
                                  onChange={(e) => setWithdrawAmount(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <Button variant="outline" onClick={() => setWithdrawAmount("100")}>
                                $100
                              </Button>
                              <Button variant="outline" onClick={() => setWithdrawAmount("500")}>
                                $500
                              </Button>
                              <Button variant="outline" onClick={() => setWithdrawAmount("1000")}>
                                $1,000
                              </Button>
                            </div>
                            <div className="rounded-md bg-muted p-4">
                              <div className="flex justify-between mb-2">
                                <div className="text-sm font-medium">Available Balance</div>
                                <div className="text-sm font-medium">$32,997.30</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-sm text-muted-foreground">Maximum Withdrawal</div>
                                <div className="text-sm">$25,000.00</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm">
                              <Info className="h-4 w-4 text-emerald-500" />
                              <span>Withdrawals typically take 1-3 business days to process.</span>
                            </div>
                          </div>
                        )}

                        {withdrawStep === 2 && (
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Select Withdrawal Method</Label>
                              <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod} className="gap-4">
                                <div
                                  className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${withdrawMethod === "bank-account" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <RadioGroupItem value="bank-account" id="bank-account" />
                                    <Label htmlFor="bank-account" className="cursor-pointer">
                                      Bank Account
                                    </Label>
                                  </div>
                                  <Building className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </RadioGroup>
                            </div>

                            {withdrawMethod === "bank-account" && (
                              <div className="space-y-4 mt-2">
                                <div className="grid gap-2">
                                  <Label>Select Bank Account</Label>
                                  <div className="space-y-2">
                                    <div
                                      className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedBank === "account-1" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                                      onClick={() => setSelectedBank("account-1")}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-muted p-2">
                                          <Building className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <h3 className="font-medium">Chase Bank</h3>
                                          <p className="text-sm text-muted-foreground">**** 1234 - Checking</p>
                                        </div>
                                      </div>
                                      <div className="h-4 w-4 rounded-full border flex items-center justify-center">
                                        {selectedBank === "account-1" && (
                                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedBank === "account-2" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                                      onClick={() => setSelectedBank("account-2")}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-muted p-2">
                                          <Building className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <h3 className="font-medium">Bank of America</h3>
                                          <p className="text-sm text-muted-foreground">**** 5678 - Savings</p>
                                        </div>
                                      </div>
                                      <div className="h-4 w-4 rounded-full border flex items-center justify-center">
                                        {selectedBank === "account-2" && (
                                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Button variant="outline" className="w-full gap-1">
                                  <Plus className="h-4 w-4" />
                                  Add New Bank Account
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {withdrawStep === 3 && (
                          <div className="grid gap-4 py-4">
                            <div className="rounded-md bg-muted p-4">
                              <div className="text-sm font-medium mb-2">Withdrawal Summary</div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-muted-foreground">Amount:</div>
                                <div>${withdrawAmount}</div>
                                <div className="text-muted-foreground">Withdrawal Method:</div>
                                <div>Bank Account</div>
                                <div className="text-muted-foreground">Bank Account:</div>
                                <div>
                                  {selectedBank === "account-1"
                                    ? "Chase Bank (**** 1234)"
                                    : "Bank of America (**** 5678)"}
                                </div>
                                <div className="text-muted-foreground">Estimated Arrival:</div>
                                <div>1-3 Business Days</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 rounded-md bg-yellow-50 dark:bg-yellow-950/20 p-3 text-sm">
                              <Info className="h-4 w-4 text-yellow-500" />
                              <span className="text-yellow-700 dark:text-yellow-400">
                                For security reasons, withdrawals over $10,000 may require additional verification.
                              </span>
                            </div>
                          </div>
                        )}

                        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                          {withdrawStep > 1 ? (
                            <Button variant="outline" onClick={() => setWithdrawStep(withdrawStep - 1)}>
                              Back
                            </Button>
                          ) : (
                            <Button variant="outline" onClick={resetWithdrawFlow}>
                              Cancel
                            </Button>
                          )}
                          <Button
                            onClick={handleWithdraw}
                            disabled={
                              (withdrawStep === 1 &&
                                (!withdrawAmount ||
                                  Number.parseFloat(withdrawAmount) <= 0 ||
                                  Number.parseFloat(withdrawAmount) > 32997.3)) ||
                              (withdrawStep === 2 && (!withdrawMethod || !selectedBank))
                            }
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            {withdrawStep < 3 ? "Continue" : "Confirm Withdrawal"}
                          </Button>
                        </DialogFooter>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6">
                        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 mb-4">
                          <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Withdrawal Initiated!</h3>
                        <p className="text-center text-muted-foreground mb-6">
                          Your withdrawal request for ${withdrawAmount} has been initiated. The funds will be
                          transferred to your bank account within 1-3 business days.
                        </p>
                        <div className="rounded-md bg-muted p-4 w-full mb-6">
                          <div className="text-sm font-medium mb-2">Transaction Details</div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Transaction ID:</div>
                            <div>WTH-{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                            <div className="text-muted-foreground">Date:</div>
                            <div>{new Date().toLocaleString()}</div>
                            <div className="text-muted-foreground">Amount:</div>
                            <div>${withdrawAmount}</div>
                            <div className="text-muted-foreground">Destination:</div>
                            <div>
                              {selectedBank === "account-1" ? "Chase Bank (**** 1234)" : "Bank of America (**** 5678)"}
                            </div>
                            <div className="text-muted-foreground">Status:</div>
                            <div className="text-amber-600">Processing</div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button variant="outline" onClick={handleCloseWithdrawSuccess}>
                            Close
                          </Button>
                          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                            <Link href="/transactions">View Transactions</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-emerald-100 dark:border-emerald-800/20 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border-emerald-100 dark:border-emerald-800/20 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Funds</CardTitle>
                  <Wallet className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$32,997.30</div>
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    +10.2% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border-emerald-100 dark:border-emerald-800/20 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Invested Funds</CardTitle>
                  <PieChart className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,234.59</div>
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    +4.3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border-emerald-100 dark:border-emerald-800/20 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$0.00</div>
                  <p className="text-xs text-muted-foreground">No pending transactions</p>
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="bg-emerald-50 dark:bg-emerald-950/20">
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
                >
                  Recent Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="payment-methods"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
                >
                  Payment Methods
                </TabsTrigger>
                <TabsTrigger
                  value="bank-accounts"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
                >
                  Bank Accounts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="transactions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>View your recent wallet transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
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
                      <div className="rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-emerald-500/20 p-2">
                              <ArrowUp className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Investment Purchase</h3>
                              <p className="text-sm text-muted-foreground">Apr 2, 2025</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-emerald-600">-$5,000.00</p>
                            <p className="text-sm text-muted-foreground">Farm Stock</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
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
                      <div className="rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-emerald-500/20 p-2">
                              <ArrowUp className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Investment Purchase</h3>
                              <p className="text-sm text-muted-foreground">Mar 25, 2025</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-emerald-600">-$10,000.00</p>
                            <p className="text-sm text-muted-foreground">Real Estate</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-emerald-500/20 p-2">
                              <ArrowUp className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Investment Purchase</h3>
                              <p className="text-sm text-muted-foreground">Mar 20, 2025</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-emerald-600">-$3,000.00</p>
                            <p className="text-sm text-muted-foreground">Cryptocurrency</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="payment-methods" className="mt-4">
                <Card>
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
                        <Plus className="h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="bank-accounts" className="mt-4">
                <Card>
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
                        <Plus className="h-4 w-4" />
                        Add Bank Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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

