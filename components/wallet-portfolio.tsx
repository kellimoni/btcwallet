"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface WalletPortfolioProps {
  data: {
    totalBalance: number
    changePercentage: number
    chartData: Array<{ name: string; value: number }>
  } | null
}

export default function WalletPortfolio({ data }: WalletPortfolioProps) {
  if (!data) {
    return <div>Error loading wallet data.</div>
  }

  const { totalBalance, changePercentage, chartData } = data

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium mb-2">Total Balance</h2>
        <div className="text-4xl font-bold mb-4">
          ${totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center mb-6">
          {changePercentage >= 0 ? (
            <ArrowUpRight className="h-5 w-5 mr-1 text-green-400" />
          ) : (
            <ArrowDownRight className="h-5 w-5 mr-1 text-red-400" />
          )}
          <span className={changePercentage >= 0 ? "text-green-400" : "text-red-400"}>{changePercentage}% (24h)</span>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white text-gray-800 p-2 rounded shadow-sm">
                        <p className="font-bold">${payload[0].value}</p>
                        <p className="text-sm text-gray-500">{payload[0].payload.name}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

