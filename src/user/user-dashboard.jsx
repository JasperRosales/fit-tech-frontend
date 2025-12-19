import React, { useState, Suspense } from "react"

import { AppSidebar } from "@/user/components/app-sidebar"


import { SiteHeader } from "@/components/shared/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Loader2 } from "lucide-react"


// Lazy load all page components
const Home = React.lazy(() => import("./pages/home"))
const Products = React.lazy(() => import("./pages/products"))
const Cart = React.lazy(() => import("./pages/cart"))
const Reservations = React.lazy(() => import("./pages/reservations"))
const Inbox = React.lazy(() => import("./pages/inbox"))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading page...</p>
    </div>
  </div>
)

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("Home")

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Home setActivePage={setActivePage} />
          </Suspense>
        )
      case "Products":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Products />
          </Suspense>
        )
      case "Cart":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Cart />
          </Suspense>
        )
      case "Reservations":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Reservations />
          </Suspense>
        )

      case "Inbox":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Inbox />
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
