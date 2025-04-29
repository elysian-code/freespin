"use client"

import Link from "next/link"
import { Building, Coins, LandPlot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Investment } from "@/utils/database/types"

interface InvestmentTabsProps {
  investments: Investment[] | null
  isLoading: boolean
}

export function InvestmentTabs({ investments, isLoading }: InvestmentTabsProps) {
  const renderInvestmentCard = (investment: Investment | null) => {
    if (!investment) return null;
    
    return (
      <div key={investment.id} className="rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <div className={`rounded-full p-2 ${
            investment?.investment_type === 'farm_stocks'
              ? 'bg-primary/20'
              : investment?.investment_type === 'real_estate'
              ? 'bg-blue-500/20'
              : 'bg-green-500/20'
          }`}>
            {investment?.investment_type === 'farm_stocks' ? (
              <LandPlot className={`h-6 w-6 ${
                investment?.investment_type === 'farm_stocks' ? 'text-primary' : ''
              }`} />
            ) : investment?.investment_type === 'real_estate' ? (
              <Building className="h-6 w-6 text-blue-500" />
            ) : (
              <Coins className="h-6 w-6 text-green-500" />
            )}
          </div>
          <div>
            <h3 className="font-medium">
              {investment?.investment_type.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(investment?.invested_on || '').toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Invested</span>
            <span>${investment?.amount_invested.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Expected Payout</span>
            <span className="text-green-600">
              ${investment?.expected_payout.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Return</span>
            <span className="text-green-600">
              {((investment?.expected_payout / investment?.amount_invested - 1) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  const renderLoadingCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted h-10 w-10"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="h-3 w-16 bg-muted rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-muted rounded"></div>
                <div className="h-3 w-16 bg-muted rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-muted rounded"></div>
                <div className="h-3 w-16 bg-muted rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-12 bg-muted rounded"></div>
                <div className="h-3 w-12 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderInvestmentSection = (type: string) => {
    const filteredInvestments = investments?.filter(
      inv => inv?.investment_type === type && inv?.status === 'active'
    )

    return (
      <div className="space-y-4">
        {filteredInvestments && filteredInvestments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredInvestments.map(investment => investment && renderInvestmentCard(investment))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No investments found</p>
            <Button asChild className="mt-4">
              <Link href="/investments">Start Investing</Link>
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
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
            <CardDescription>
              {isLoading ? "Loading..." : 
                `You have ${investments?.filter(inv => inv?.status === 'active')?.length || 0} active investments across all categories.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                renderLoadingCards()
              ) : investments?.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No investments found</p>
                  <Button asChild className="mt-4">
                    <Link href="/investments">Start Investing</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {investments
                    ?.sort((a, b) => new Date(b?.invested_on || 0).getTime() - new Date(a?.invested_on || 0).getTime())
                    .slice(0, 3)
                    .map((investment) => investment && renderInvestmentCard(investment))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="farm" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Farm Stock Investments</CardTitle>
            <CardDescription>
              {isLoading ? "Loading..." : 
                `You have ${investments?.filter(inv => inv?.status === 'active' && inv?.investment_type === 'farm_stocks')?.length || 0} active farm stock investments.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {renderLoadingCards()}
              </div>
            ) : (
              renderInvestmentSection('farm_stocks')
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="real-estate" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Real Estate Investments</CardTitle>
            <CardDescription>
              {isLoading ? "Loading..." : 
                `You have ${investments?.filter(inv => inv?.status === 'active' && inv?.investment_type === 'real_estate')?.length || 0} active real estate investments.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {renderLoadingCards()}
              </div>
            ) : (
              renderInvestmentSection('real_estate')
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="crypto" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Cryptocurrency Investments</CardTitle>
            <CardDescription>
              {isLoading ? "Loading..." : 
                `You have ${investments?.filter(inv => inv?.status === 'active' && inv?.investment_type === 'cryptocurrency')?.length || 0} active cryptocurrency investments.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {renderLoadingCards()}
              </div>
            ) : (
              renderInvestmentSection('cryptocurrency')
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}