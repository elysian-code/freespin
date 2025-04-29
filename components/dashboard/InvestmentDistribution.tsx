"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Investment } from "@/utils/database/types"

interface InvestmentDistributionProps {
  investments: Investment[] | null
}

export function InvestmentDistribution({ investments }: InvestmentDistributionProps) {
  const activeInvestments = investments?.filter(inv => inv?.status === 'active') || [];
  const totalInvested = activeInvestments.reduce((sum, inv) => sum + (inv?.amount_invested || 0), 0);

  const calculatePercentage = (type: string) => {
    const typeTotal = activeInvestments
      .filter(inv => inv?.investment_type === type)
      .reduce((sum, inv) => sum + (inv?.amount_invested || 0), 0);
    
    return totalInvested > 0 ? ((typeTotal / totalInvested) * 100).toFixed(1) : '0';
  };

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Investment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: "rgba(76, 175, 80, 0.8)" }}></div>
              <div>Farm Stocks</div>
            </div>
            <div className="font-medium">{calculatePercentage('farm_stocks')}%</div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: "rgba(33, 150, 243, 0.8)" }}></div>
              <div>Real Estate</div>
            </div>
            <div className="font-medium">{calculatePercentage('real_estate')}%</div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: "rgba(255, 152, 0, 0.8)" }}></div>
              <div>Cryptocurrency</div>
            </div>
            <div className="font-medium">{calculatePercentage('cryptocurrency')}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}