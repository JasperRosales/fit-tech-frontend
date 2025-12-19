"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"

export const description = "Sales performance over time"

// Clothing business sales data
const chartData = [
  { date: "2024-04-01", onlineSales: 4200, inStoreSales: 3200 },
  { date: "2024-04-02", onlineSales: 2100, inStoreSales: 2800 },
  { date: "2024-04-03", onlineSales: 3600, inStoreSales: 4100 },
  { date: "2024-04-04", onlineSales: 5200, inStoreSales: 3800 },
  { date: "2024-04-05", onlineSales: 7800, inStoreSales: 5400 },
  { date: "2024-04-06", onlineSales: 6400, inStoreSales: 6200 },
  { date: "2024-04-07", onlineSales: 5100, inStoreSales: 4800 },
  { date: "2024-04-08", onlineSales: 8200, inStoreSales: 6900 },
  { date: "2024-04-09", onlineSales: 3100, inStoreSales: 3500 },
  { date: "2024-04-10", onlineSales: 5800, inStoreSales: 5200 },
  { date: "2024-04-11", onlineSales: 7200, inStoreSales: 6800 },
  { date: "2024-04-12", onlineSales: 6100, inStoreSales: 5600 },
  { date: "2024-04-13", onlineSales: 8400, inStoreSales: 7400 },
  { date: "2024-04-14", onlineSales: 4800, inStoreSales: 4200 },
  { date: "2024-04-15", onlineSales: 3900, inStoreSales: 3600 },
  { date: "2024-04-16", onlineSales: 4500, inStoreSales: 4100 },
  { date: "2024-04-17", onlineSales: 9100, inStoreSales: 8200 },
  { date: "2024-04-18", onlineSales: 7800, inStoreSales: 7100 },
  { date: "2024-04-19", onlineSales: 5900, inStoreSales: 5200 },
  { date: "2024-04-20", onlineSales: 3800, inStoreSales: 3400 },
  { date: "2024-04-21", onlineSales: 5100, inStoreSales: 4600 },
  { date: "2024-04-22", onlineSales: 6700, inStoreSales: 5800 },
  { date: "2024-04-23", onlineSales: 5200, inStoreSales: 4700 },
  { date: "2024-04-24", onlineSales: 8600, inStoreSales: 7800 },
  { date: "2024-04-25", onlineSales: 6400, inStoreSales: 5900 },
  { date: "2024-04-26", onlineSales: 3200, inStoreSales: 2900 },
  { date: "2024-04-27", onlineSales: 9200, inStoreSales: 8400 },
  { date: "2024-04-28", onlineSales: 4800, inStoreSales: 4200 },
  { date: "2024-04-29", onlineSales: 7100, inStoreSales: 6400 },
  { date: "2024-04-30", onlineSales: 9800, inStoreSales: 8700 },
  { date: "2024-05-01", onlineSales: 5600, inStoreSales: 5100 },
  { date: "2024-05-02", onlineSales: 7900, inStoreSales: 7200 },
  { date: "2024-05-03", onlineSales: 6100, inStoreSales: 5600 },
  { date: "2024-05-04", onlineSales: 8700, inStoreSales: 7900 },
  { date: "2024-05-05", onlineSales: 10200, inStoreSales: 9200 },
  { date: "2024-05-06", onlineSales: 11000, inStoreSales: 9800 },
  { date: "2024-05-07", onlineSales: 8400, inStoreSales: 7600 },
  { date: "2024-05-08", onlineSales: 4800, inStoreSales: 4400 },
  { date: "2024-05-09", onlineSales: 6300, inStoreSales: 5700 },
  { date: "2024-05-10", onlineSales: 7800, inStoreSales: 7000 },
  { date: "2024-05-11", onlineSales: 7200, inStoreSales: 6500 },
  { date: "2024-05-12", onlineSales: 5400, inStoreSales: 4900 },
  { date: "2024-05-13", onlineSales: 4600, inStoreSales: 4100 },
  { date: "2024-05-14", onlineSales: 9800, inStoreSales: 8900 },
  { date: "2024-05-15", onlineSales: 10500, inStoreSales: 9400 },
  { date: "2024-05-16", onlineSales: 8200, inStoreSales: 7400 },
  { date: "2024-05-17", onlineSales: 11200, inStoreSales: 10100 },
  { date: "2024-05-18", onlineSales: 7800, inStoreSales: 7000 },
  { date: "2024-05-19", onlineSales: 6100, inStoreSales: 5500 },
  { date: "2024-05-20", onlineSales: 5200, inStoreSales: 4700 },
  { date: "2024-05-21", onlineSales: 3800, inStoreSales: 3400 },
  { date: "2024-05-22", onlineSales: 3600, inStoreSales: 3200 },
  { date: "2024-05-23", onlineSales: 6800, inStoreSales: 6100 },
  { date: "2024-05-24", onlineSales: 7400, inStoreSales: 6700 },
  { date: "2024-05-25", onlineSales: 5800, inStoreSales: 5200 },
  { date: "2024-05-26", onlineSales: 4600, inStoreSales: 4100 },
  { date: "2024-05-27", onlineSales: 9400, inStoreSales: 8500 },
  { date: "2024-05-28", onlineSales: 6200, inStoreSales: 5600 },
  { date: "2024-05-29", onlineSales: 4100, inStoreSales: 3700 },
  { date: "2024-05-30", onlineSales: 8300, inStoreSales: 7500 },
  { date: "2024-05-31", onlineSales: 5100, inStoreSales: 4600 },
  { date: "2024-06-01", onlineSales: 4900, inStoreSales: 4400 },
  { date: "2024-06-02", onlineSales: 10600, inStoreSales: 9600 },
  { date: "2024-06-03", onlineSales: 4200, inStoreSales: 3800 },
  { date: "2024-06-04", onlineSales: 9900, inStoreSales: 8900 },
  { date: "2024-06-05", onlineSales: 3900, inStoreSales: 3500 },
  { date: "2024-06-06", onlineSales: 7100, inStoreSales: 6400 },
  { date: "2024-06-07", onlineSales: 8200, inStoreSales: 7400 },
  { date: "2024-06-08", onlineSales: 8600, inStoreSales: 7800 },
  { date: "2024-06-09", onlineSales: 10200, inStoreSales: 9200 },
  { date: "2024-06-10", onlineSales: 5400, inStoreSales: 4900 },
  { date: "2024-06-11", onlineSales: 4200, inStoreSales: 3800 },
  { date: "2024-06-12", onlineSales: 11400, inStoreSales: 10300 },
  { date: "2024-06-13", onlineSales: 3800, inStoreSales: 3400 },
  { date: "2024-06-14", onlineSales: 9600, inStoreSales: 8700 },
  { date: "2024-06-15", onlineSales: 7800, inStoreSales: 7000 },
  { date: "2024-06-16", onlineSales: 8400, inStoreSales: 7600 },
  { date: "2024-06-17", onlineSales: 10800, inStoreSales: 9700 },
  { date: "2024-06-18", onlineSales: 4800, inStoreSales: 4300 },
  { date: "2024-06-19", onlineSales: 7800, inStoreSales: 7000 },
  { date: "2024-06-20", onlineSales: 9400, inStoreSales: 8500 },
  { date: "2024-06-21", onlineSales: 5600, inStoreSales: 5100 },
  { date: "2024-06-22", onlineSales: 7200, inStoreSales: 6500 },
  { date: "2024-06-23", onlineSales: 11000, inStoreSales: 9900 },
  { date: "2024-06-24", onlineSales: 5200, inStoreSales: 4700 },
  { date: "2024-06-25", onlineSales: 5800, inStoreSales: 5200 },
  { date: "2024-06-26", onlineSales: 9800, inStoreSales: 8800 },
  { date: "2024-06-27", onlineSales: 10400, inStoreSales: 9400 },
  { date: "2024-06-28", onlineSales: 5100, inStoreSales: 4600 },
  { date: "2024-06-29", onlineSales: 4600, inStoreSales: 4100 },
  { date: "2024-06-30", onlineSales: 10200, inStoreSales: 9200 },
]

const chartConfig = {
  sales: {
    label: "Sales",
  },
  onlineSales: {
    label: "Online Sales",
    color: "#ff6b35", // Orange color for online
  },
  inStoreSales: {
    label: "In-Store Sales", 
    color: "#ff8c42", // Lighter orange for in-store
  },
} 

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Sales Performance Trends</CardTitle>
          <CardDescription>
            Showing online vs in-store sales for clothing business
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className={`aspect-auto ${isMobile ? 'h-[280px]' : 'h-[350px]'} w-full`}
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-onlineSales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-onlineSales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillInStore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-inStoreSales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-inStoreSales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={isMobile ? 4 : 8}
              minTickGap={isMobile ? 32 : 32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                  formatter={(value, name) => [
                    `$${Number(value).toLocaleString()}`,
                    name === 'onlineSales' ? 'Online Sales' : 'In-Store Sales'
                  ]}
                />
              }
            />
            <Area
              dataKey="inStoreSales"
              type="natural"
              fill="url(#fillInStore)"
              stroke="var(--color-inStoreSales)"
              stackId="a"
              strokeWidth={isMobile ? 2 : 3}
            />
            <Area
              dataKey="onlineSales"
              type="natural"
              fill="url(#fillOnline)"
              stroke="var(--color-onlineSales)"
              stackId="a"
              strokeWidth={isMobile ? 2 : 3}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
