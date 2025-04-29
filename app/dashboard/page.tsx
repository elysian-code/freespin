"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { getBalance, getInvestments, signOut } from "@/_actions/crud"
import type { Investment, AccountBalance } from "@/utils/database/types"
import type { ChartData } from "chart.js"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { PortfolioChart } from "@/components/dashboard/PortfolioChart"
import { InvestmentDistribution } from "@/components/dashboard/InvestmentDistribution"
import { InvestmentTabs } from "@/components/dashboard/InvestmentTabs"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [balance, setBalance] = useState<AccountBalance | null>(null)
  const [investments, setInvestments] = useState<Investment[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState<ChartData<"doughnut">>({
    labels: ["Farm Stocks", "Real Estate", "Cryptocurrency"],
    datasets: [
      {
        label: "Investment Distribution",
        data: [0, 0, 0],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
        hoverBackgroundColor: ["#66bb6a", "#42a5f5", "#ffb74d"],
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceData, investmentsData] = await Promise.all([
          getBalance(),
          getInvestments(),
        ]);

        const activeInvestments = investmentsData?.filter((investment: Investment | null) => investment?.status === 'active') || [];
        const totalInvested = activeInvestments.reduce((sum: number, inv: Investment | null) => sum + (inv?.amount_invested || 0), 0);
        const totalExpectedPayout = activeInvestments.reduce((sum: number, inv: Investment | null) => sum + (inv?.expected_payout || 0), 0);
        const mainBalance = (balanceData?.main_balance || 0) + totalExpectedPayout;

        if (balanceData) {
          setBalance({
            ...balanceData,
            main_balance: mainBalance,
            investment_balance: totalInvested,
          } as AccountBalance);
        }
        
        setInvestments(investmentsData);

        // Update portfolio data
        const farmStocks = activeInvestments
          .filter((inv) => inv?.investment_type === "farm_stocks")
          .reduce((sum, inv) => sum + (inv?.amount_invested || 0), 0);

        const realEstate = activeInvestments
          .filter((inv) => inv?.investment_type === "real_estate")
          .reduce((sum, inv) => sum + (inv?.amount_invested || 0), 0);

        const cryptocurrency = activeInvestments
          .filter((inv) => inv?.investment_type === "cryptocurrency")
          .reduce((sum, inv) => sum + (inv?.amount_invested || 0), 0);

        setPortfolioData({
          labels: [
            `Farm Stocks ($${farmStocks.toFixed(2)})`,
            `Real Estate ($${realEstate.toFixed(2)})`,
            `Cryptocurrency ($${cryptocurrency.toFixed(2)})`
          ],
          datasets: [{
            label: "Investment Distribution",
            data: [farmStocks, realEstate, cryptocurrency],
            backgroundColor: [
              "rgba(76, 175, 80, 0.8)",
              "rgba(33, 150, 243, 0.8)",
              "rgba(255, 152, 0, 0.8)", 
            ],
            hoverBackgroundColor: [
              "rgba(76, 175, 80, 1)",
              "rgba(33, 150, 243, 1)",
              "rgba(255, 152, 0, 1)",
            ],
          }],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader 
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        handleLogout={handleLogout}
      />
      <main className="flex-1 py-6">
        <div className="container">
          <div className="flex flex-col gap-4 md:gap-8">
            <DashboardStats 
              balance={balance}
              investments={investments}
              isLoading={isLoading}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <PortfolioChart
                portfolioData={portfolioData}
                chartOptions={chartOptions}
                isLoading={isLoading}
                investments={investments}
              />
              <InvestmentDistribution investments={investments} />
            </div>
            <InvestmentTabs
              investments={investments}
              isLoading={isLoading}
            />
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

