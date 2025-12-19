import React, { useState, Suspense } from "react"

import { AppSidebar } from "@/admin/components/app-sidebar"

import { SiteHeader } from "@/components/shared/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Loader2 } from "lucide-react"


// Import the FloatingPromotionModal component
import { FloatingPromotionModal } from "@/admin/components/floating-promotion-modal"

// Lazy load all page components
const Home = React.lazy(() => import("./home/home"))
const Analytics = React.lazy(() => import("./analytics/analytics"))
const Sales = React.lazy(() => import("./sales/sales"))
const UsersPersonnel = React.lazy(() => import("./users-personnel/users-personnel"))
const Stock = React.lazy(() => import("./stock/stock"))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading page...</p>
    </div>
  </div>
)

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Home")
  const [showPromotionModal, setShowPromotionModal] = useState(false)

  const handleQuickCreate = (type) => {
    if (type === 'promotion') {
      setShowPromotionModal(true)
    }
  }

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Home setActivePage={setActivePage} />
          </Suspense>
        )
      case "Analytics":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Analytics />
          </Suspense>
        )
      case "Sales":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Sales />
          </Suspense>
        )
      case "Users & Personnel":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <UsersPersonnel />
          </Suspense>
        )
      case "Stock":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Stock />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Home setActivePage={setActivePage} />
          </Suspense>
        )
    }
  }

  return (
    <>
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
          onQuickCreate={handleQuickCreate}
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



      {/* Promotion Modal - only render when open */}
      {showPromotionModal && (
        <FloatingPromotionModal 
          open={showPromotionModal}
          onOpenChange={setShowPromotionModal}
        />
      )}
    </>
  )
}

