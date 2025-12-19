
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts'
import { dataService } from "@/data"

const ORANGE_COLORS = ['#ff6b35', '#ff8c42', '#ffa726', '#ffb74d', '#ffcc80', '#ffab91', '#ff7043', '#f57c00']

export default function Analytics() {
  const isMobile = useIsMobile()
  const [timeFilter, setTimeFilter] = useState("30")
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)
        const data = await dataService.getAnalyticsData()
        setAnalyticsData(data)
        setError(null)
      } catch (err) {
        console.error('Failed to load analytics data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-4 md:gap-8 pt-4 md:pt-8">
          <div className="px-3 md:px-4 lg:px-6">
            <div className="text-center py-8">Loading analytics data...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-4 md:gap-8 pt-4 md:pt-8">
          <div className="px-3 md:px-4 lg:px-6">
            <div className="text-center py-8 text-red-600">Error loading analytics data: {error}</div>
          </div>
        </div>
      </div>
    )
  }

  const { overview, categorySalesData, genderData, salesData7Days, salesData30Days, salesData90Days } = analyticsData

  const getSalesData = () => {
    switch (timeFilter) {
      case "7":
        return salesData7Days
      case "30":
        return salesData30Days
      case "90":
        return salesData90Days
      default:
        return salesData30Days
    }
  }

  const getTimeLabel = () => {
    switch (timeFilter) {
      case "7":
        return "Last 7 Days"
      case "30":
        return "Last 30 Days"
      case "90":
        return "Last 90 Days"
      default:
        return "Last 30 Days"
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 md:gap-8 pt-4 md:pt-8">
      
        {/* Charts Grid - Only 3 Charts */}
        <div className="px-3 md:px-4 lg:px-6 space-y-4 md:space-y-8">
          <div className={`grid gap-3 md:gap-4 pt-4 md:pt-8 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Total Revenue</CardTitle>
                <svg className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </CardHeader>

              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{overview.totalRevenue}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{overview.totalRevenueChange}</span> from last month
                </p>
              </CardContent>
            </Card>


            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Total Orders</CardTitle>
                <svg className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </CardHeader>

              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{overview.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{overview.totalOrdersChange}</span> from last month
                </p>
              </CardContent>
            </Card>


            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Avg. Order Value</CardTitle>
                <svg className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </CardHeader>

              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{overview.avgOrderValue}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{overview.avgOrderValueChange}</span> from last month
                </p>
              </CardContent>
            </Card>


            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Conversion Rate</CardTitle>
                <svg className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </CardHeader>

              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{overview.conversionRate}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">{overview.conversionRateChange}</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 1. Enhanced Sales Performance Area Chart - Professional Structure */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader className="pb-2 md:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                <div>
                  <CardTitle className="text-base md:text-lg lg:text-xl">Sales Performance Trends</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Online vs In-Store clothing sales performance</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-[120px] md:w-[140px] h-9">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 Days</SelectItem>
                      <SelectItem value="30">Last 30 Days</SelectItem>
                      <SelectItem value="90">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800 text-xs">
                    {getTimeLabel()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <ResponsiveContainer 
                width="100%" 
                height={isMobile ? 280 : 350}
                className="min-h-[280px]"
              >
                <AreaChart data={getSalesData()}>
                  <defs>
                    <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#ff6b35"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#ff6b35"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="fillInStore" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#ff8c42"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#ff8c42"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={isMobile ? 4 : 8}
                    tickFontSize={isMobile ? 10 : 12}
                    minTickGap={isMobile ? 30 : 20}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={isMobile ? 4 : 8}
                    tickFontSize={isMobile ? 10 : 12}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'onlineSales' ? `$${Number(value).toLocaleString()}` : `$${Number(value).toLocaleString()}`, 
                      name === 'onlineSales' ? 'Online Sales' : 'In-Store Sales'
                    ]}
                    labelStyle={{ fontSize: isMobile ? '12px' : '14px' }}
                    contentStyle={{ 
                      fontSize: isMobile ? '12px' : '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: isMobile ? '12px' : '14px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="inStoreSales" 
                    stroke="#ff8c42" 
                    fill="url(#fillInStore)"
                    fillOpacity={0.6}
                    name="In-Store Sales"
                    strokeWidth={isMobile ? 2 : 3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="onlineSales" 
                    stroke="#ff6b35" 
                    fill="url(#fillOnline)"
                    fillOpacity={0.6}
                    name="Online Sales"
                    strokeWidth={isMobile ? 2 : 3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 2. Two Column Layout for Category and Gender Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            

            {/* Category Sales Bar Chart */}
            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-base md:text-lg">Product Category Performance</CardTitle>
                <CardDescription className="text-xs md:text-sm">Revenue by clothing category</CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-6">
                <ResponsiveContainer 
                  width="100%" 
                  height={isMobile ? 300 : 350}
                  className="min-h-[300px]"
                >
                  <BarChart data={categorySalesData} margin={{ left: isMobile ? 10 : 20 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category" 
                      angle={isMobile ? -60 : -45} 
                      textAnchor={isMobile ? "end" : "end"} 
                      height={isMobile ? 100 : 80}
                      fontSize={isMobile ? 9 : 12}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={isMobile ? 4 : 8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={isMobile ? 4 : 8}
                      fontSize={isMobile ? 10 : 12}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      labelStyle={{ fontSize: isMobile ? '12px' : '14px' }}
                      contentStyle={{ 
                        fontSize: isMobile ? '12px' : '14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="sales" 
                      fill="#ff6b35" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>


            {/* Gender Distribution Pie Chart */}
            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-base md:text-lg">Customer Gender Distribution</CardTitle>
                <CardDescription className="text-xs md:text-sm">Market segmentation by gender</CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-6">
                <div className="flex flex-col items-center">
                  <ResponsiveContainer 
                    width="100%" 
                    height={isMobile ? 200 : 250}
                    className="min-h-[200px]"
                  >
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${isMobile ? '' : name}: ${(percent * 100).toFixed(1)}%`}
                        outerRadius={isMobile ? 60 : 80}
                        innerRadius={isMobile ? 20 : 30}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ORANGE_COLORS[index % ORANGE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        labelStyle={{ fontSize: isMobile ? '12px' : '14px' }}
                        contentStyle={{ 
                          fontSize: isMobile ? '12px' : '14px',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row gap-4'} mt-4 w-full justify-center`}>
                    {genderData.map((item, index) => (
                      <div key={index} className={`flex items-center ${isMobile ? 'justify-center' : 'gap-3'}`}>
                        <div 
                          className="w-3 h-3 md:w-4 md:h-4 rounded-full" 
                          style={{ backgroundColor: ORANGE_COLORS[index] }}
                        ></div>
                        <div className="text-center">
                          <div className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.name}</div>
                          <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            ${item.sales.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>          
        </div>
      </div>
    </div>
  )
}
