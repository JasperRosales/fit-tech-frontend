
import React, { useState, Suspense } from "react"

import { AppSidebar } from "@/staff/components/app-sidebar"


import { SiteHeader } from "@/components/shared/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Loader2 } from "lucide-react"

// Lazy load all page components
const Dashboard = React.lazy(() => import("./dashboard"))
const CustomerAnalytics = React.lazy(() => import("./customer-analytics"))
const StockManagement = React.lazy(() => import("./stock-management"))
const Reservations = React.lazy(() => import("./reservations"))
const CustomerCare = React.lazy(() => import("./customer-care"))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading page...</p>
    </div>
  </div>
)

export default function StaffDashboard() {
  const [activePage, setActivePage] = useState("Dashboard")





  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        )
      case "Analytics":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <CustomerAnalytics />
          </Suspense>
        )
      case "Stock":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <StockManagement />
          </Suspense>
        )
      case "Reservations":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Reservations />
          </Suspense>
        )
      case "Customer Care":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <CustomerCare />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        )
    }
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar 
        variant="inset" 
        onPageChange={setActivePage}
        activePage={activePage}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {renderPage()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
