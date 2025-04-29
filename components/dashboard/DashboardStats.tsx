"use client"

import { BarChart3, DollarSign, PieChart, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AccountBalance, Investment } from "@/utils/database/types"

interface DashboardStatsProps {
  balance: AccountBalance | null
  investments: Investment[] | null
  isLoading: boolean
}

export function DashboardStats({ balance, investments, isLoading }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
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
                ${balance?.main_balance?.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                Available for investments and withdrawals
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Investments</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
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
                ${investments?.filter(inv => inv?.status === 'active')
                  .reduce((sum, inv) => sum + (inv?.expected_payout || 0), 0)
                  .toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                Total value of active investments
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Funds</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
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
                Balance available for withdrawal
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
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
                {investments?.filter(inv => inv?.status === 'active')?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Current active investment plans
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}