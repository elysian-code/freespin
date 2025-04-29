"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import type { ChartData, ChartOptions } from "chart.js"
import type { Investment } from "@/utils/database/types"

interface PortfolioChartProps {
  portfolioData: ChartData<"doughnut">
  chartOptions: ChartOptions<"doughnut">
  isLoading: boolean
  investments: Investment[] | null
}

export function PortfolioChart({
  portfolioData,
  chartOptions,
  isLoading,
  investments
}: PortfolioChartProps) {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex items-center justify-center">
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
          ) : portfolioData.datasets[0].data.every(value => value === 0) ? (
            <p className="text-muted-foreground text-center">No active investments to display</p>
          ) : (
            <Doughnut data={portfolioData} options={chartOptions} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}