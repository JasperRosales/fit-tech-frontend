import { Card, CardContent } from "@/components/ui/card"
import { IconUsers, IconTrendingUp, IconPackage, IconBell } from "@tabler/icons-react"

export function QuickActions({ onQuickAction }) {
  const quickActions = [
    { icon: IconUsers, label: "Manage Users & Personnel", color: "bg-green-500", modal: "user" },
    { icon: IconTrendingUp, label: "Create Promotions", color: "bg-purple-500", modal: "promotion" },
    { icon: IconPackage, label: "Manage Stock", color: "bg-orange-500", modal: "product" },
    { icon: IconBell, label: "View Notifications", color: "bg-blue-500", modal: "notification" },
  ]

  const handleQuickAction = (action) => {
    if (onQuickAction) {
      onQuickAction(action);
    }
  }

  return (
    <div className="px-4 lg:px-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => handleQuickAction(action)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`${action.color} rounded-full p-3 shadow-lg`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
