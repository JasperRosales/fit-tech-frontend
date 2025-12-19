import { useState } from "react"
import { IconHome } from "@tabler/icons-react"

import { OverviewStats } from "./overview-stats"
import { RecentPromotions } from "./recent-promotions"
import { SystemStatus } from "./system-status"

export default function Home({ setActivePage }) {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const handleEditComplete = () => {
    console.log('Edit completed - components will handle their own refresh')
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        {/* Welcome Header */}
        <div className="px-4 lg:px-6">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-orange-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconHome className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Welcome back, Admin!</h1>
                <p className="text-orange-100 text-sm md:text-base drop-shadow">{currentTime}</p>
              </div>
            </div>
            <p className="text-orange-50 max-w-2xl text-sm drop-shadow">
              Manage your Fit Tech operations efficiently. Here's what's happening with your business today.
            </p>
          </div>
        </div>

        <OverviewStats />
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RecentPromotions onEditComplete={handleEditComplete} />
          <SystemStatus />
        </div>
      </div>
    </div>
  )
}

