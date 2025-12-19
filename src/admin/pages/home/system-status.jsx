import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconShield } from "@tabler/icons-react"
import { systemMetricsService } from "@/services/systemMetricsService"

export function SystemStatus() {
  const [systemMetrics, setSystemMetrics] = useState({
    serverStatus: { status: 'loading', uptime: 0, responseTime: 0, lastCheck: new Date().toISOString() },
    database: { status: 'loading', connectionPool: 0, queryTime: 0, lastBackup: 'loading' },
    apiPerformance: { status: 'loading', requestsPerMinute: 0, errorRate: 0, avgResponseTime: 0 },
    systemResources: { status: 'loading', cpuUsage: 0, memoryUsage: 0, diskUsage: 0 }
  })

  // Load system metrics from Prometheus/Grafana
  const loadSystemMetrics = async () => {
    try {
      const metrics = await systemMetricsService.getSystemMetrics()
      setSystemMetrics(metrics)
    } catch (error) {
      console.error('Failed to load system metrics:', error)
      // Keep loading state or set error state
    }
  }

  useEffect(() => {
    loadSystemMetrics()
  }, [])

  return (
    <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <IconShield className="h-5 w-5" />
          <CardTitle>System Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Server Status */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">Server Status</span>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.serverStatus.responseTime > 0 ? `${systemMetrics.serverStatus.responseTime}ms response` : 'Checking...'}
            </p>
          </div>
          <Badge 
            variant={systemMetricsService.getStatusBadge(systemMetrics.serverStatus.status)}
            className={systemMetricsService.getStatusColor(systemMetrics.serverStatus.status)}
          >
            {systemMetrics.serverStatus.status}
          </Badge>
        </div>

        {/* Database Health */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">Database</span>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.database.connectionPool > 0 ? `${systemMetrics.database.connectionPool} connections` : 'Connecting...'}
            </p>
          </div>
          <Badge 
            variant={systemMetricsService.getStatusBadge(systemMetrics.database.status)}
            className={systemMetricsService.getStatusColor(systemMetrics.database.status)}
          >
            {systemMetrics.database.status}
          </Badge>
        </div>

        {/* API Performance */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">API Performance</span>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.apiPerformance.requestsPerMinute > 0 ? `${systemMetrics.apiPerformance.requestsPerMinute} RPM` : 'Monitoring...'}
            </p>
          </div>
          <Badge 
            variant={systemMetricsService.getStatusBadge(systemMetrics.apiPerformance.status)}
            className={systemMetricsService.getStatusColor(systemMetrics.apiPerformance.status)}
          >
            {systemMetrics.apiPerformance.status}
          </Badge>
        </div>

        {/* System Resources */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">System Resources</span>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.systemResources.cpuUsage > 0 ? `${systemMetrics.systemResources.cpuUsage}% CPU` : 'Loading...'}
            </p>
          </div>
          <Badge 
            variant={systemMetricsService.getStatusBadge(systemMetrics.systemResources.status)}
            className={systemMetricsService.getStatusColor(systemMetrics.systemResources.status)}
          >
            {systemMetrics.systemResources.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
