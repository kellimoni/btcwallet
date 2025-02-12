import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Asset {
  name: string
  symbol: string
  balance: number
  price: number
  change: number
  icon: string
}

interface AssetListProps {
  assets: Asset[] | null
}

export default function AssetList({ assets }: AssetListProps) {
  if (!assets) {
    return <div>Error loading asset data.</div>
  }

  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <Card
          key={asset.symbol}
          className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {asset.icon}
                </div>
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {asset.balance} {asset.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${(asset.balance * asset.price).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </p>
                <p className={`text-sm ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {asset.change >= 0 ? "+" : ""}
                  {asset.change}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between mt-6">
        <Button variant="outline" className="w-[48%]">
          <ArrowDownLeft className="mr-2 h-4 w-4" />
          Receive
        </Button>
        <Button className="w-[48%] bg-blue-600 hover:bg-blue-700">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  )
}

