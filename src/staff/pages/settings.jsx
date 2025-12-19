import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { 
  IconSettings, 
  IconUser,
  IconBell,
  IconShield,
  IconDatabase,
  IconLock,
  IconEye,
  IconRefreshDot as IconRefreshCw,
  IconFolderCheck as IconSave,
  IconDownload,
  IconKey,
  IconClock,
  IconHeartRateMonitor as IconMonitor
} from "@tabler/icons-react"

export default function Settings() {
  const settingsCategories = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and preferences",
      icon: IconUser,
      items: [
        { label: "Full Name", value: "Sarah Johnson", type: "text" },
        { label: "Email", value: "sarah.johnson@fittech.com", type: "email" },
        { label: "Phone", value: "+1 (555) 123-4567", type: "tel" },
        { label: "Role", value: "Customer Service Specialist", type: "text", readonly: true },
      ]
    },
    {
      title: "Notification Preferences",
      description: "Configure how you receive notifications",
      icon: IconBell,
      items: [
        { label: "Email Notifications", value: true, type: "switch" },
        { label: "Push Notifications", value: true, type: "switch" },
        { label: "SMS Alerts", value: false, type: "switch" },
        { label: "Customer Updates", value: true, type: "switch" },
      ]
    },
    {
      title: "Security Settings",
      description: "Manage your account security and access",
      icon: IconShield,
      items: [
        { label: "Two-Factor Authentication", value: true, type: "switch" },
        { label: "Login Alerts", value: true, type: "switch" },
        { label: "Session Timeout", value: "30 minutes", type: "select", options: ["15 minutes", "30 minutes", "1 hour", "Never"] },
      ]
    },
  ]

  const systemSettings = [
    {
      title: "Display Settings",
      description: "Customize your dashboard appearance",
      icon: IconMonitor,
      items: [
        { label: "Theme", value: "light", type: "select", options: ["light", "dark", "auto"] },
        { label: "Language", value: "English", type: "select", options: ["English", "Spanish", "French", "German"] },
        { label: "Time Zone", value: "Eastern Time", type: "select", options: ["Eastern Time", "Central Time", "Mountain Time", "Pacific Time"] },
      ]
    },
    {
      title: "Data & Privacy",
      description: "Control your data and privacy settings",
      icon: IconDatabase,
      items: [
        { label: "Data Export", value: false, type: "button", action: "export", buttonText: "Export Data" },
        { label: "Activity Logs", value: false, type: "button", action: "view-logs", buttonText: "View Logs" },
        { label: "Data Retention", value: "1 year", type: "select", options: ["6 months", "1 year", "2 years", "Forever"] },
      ]
    },
  ]

  const recentActivities = [
    { action: "Profile updated", time: "2 hours ago", user: "You" },
    { action: "Notification settings changed", time: "1 day ago", user: "You" },
    { action: "Password changed", time: "3 days ago", user: "You" },
    { action: "Two-factor authentication enabled", time: "1 week ago", user: "You" },
    { action: "Login from new device", time: "1 week ago", user: "You" },
  ]

  const accessLogs = [
    { action: "Login", ip: "192.168.1.100", location: "New York, NY", time: "2 hours ago", status: "success" },
    { action: "Settings Updated", ip: "192.168.1.100", location: "New York, NY", time: "2 hours ago", status: "success" },
    { action: "Failed Login", ip: "203.0.113.45", location: "Unknown", time: "1 day ago", status: "failed" },
    { action: "Password Reset", ip: "192.168.1.100", location: "New York, NY", time: "3 days ago", status: "success" },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">

          <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-gray-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconSettings className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Staff Settings</h1>
                <p className="text-gray-100 text-sm md:text-base drop-shadow">
                  Manage your account and system preferences
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconSave className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconRefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Categories */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {settingsCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      <Label htmlFor={category.title + '-' + itemIndex}>{item.label}</Label>
                      {item.type === "text" || item.type === "email" || item.type === "tel" ? (
                        <Input 
                          id={category.title + '-' + itemIndex}
                          type={item.type}
                          value={item.value}
                          readOnly={item.readonly}
                          className={item.readonly ? "bg-muted" : ""}
                        />
                      ) : item.type === "switch" ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{item.label}</span>
                          <Switch defaultChecked={item.value} />
                        </div>
                      ) : item.type === "select" ? (
                        <select 
                          id={category.title + '-' + itemIndex}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue={item.value}
                        >
                          {item.options?.map((option, optIndex) => (
                            <option key={optIndex} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : item.type === "button" ? (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => console.log(item.action)}
                        >
                          {item.buttonText}
                        </Button>
                      ) : null}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Settings */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {systemSettings.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      <Label htmlFor={category.title + '-' + itemIndex}>{item.label}</Label>
                      {item.type === "select" ? (
                        <select 
                          id={category.title + '-' + itemIndex}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue={item.value}
                        >
                          {item.options?.map((option, optIndex) => (
                            <option key={optIndex} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : item.type === "button" ? (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => console.log(item.action)}
                        >
                          {item.action === "export" && <IconDownload className="h-4 w-4 mr-2" />}
                          {item.action === "view-logs" && <IconEye className="h-4 w-4 mr-2" />}
                          {item.buttonText}
                        </Button>
                      ) : null}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activity Logs and Access Logs */}
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Recent Activities */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconClock className="h-5 w-5" />
                <CardTitle>Recent Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Access Logs */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconKey className="h-5 w-5" />
                <CardTitle>Access Logs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {accessLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full ${
                    log.status === "success" ? "bg-green-500" : "bg-red-500"
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{log.action}</p>
                      <Badge variant={log.status === "success" ? "default" : "destructive"}>
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {log.ip} • {log.location} • {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Security Actions */}
        <div className="px-4 lg:px-6">
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconLock className="h-5 w-5" />
                <CardTitle>Security Actions</CardTitle>
              </div>
              <CardDescription>
                Manage your account security and access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <IconKey className="h-6 w-6 mb-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <IconShield className="h-6 w-6 mb-2" />
                  Two-Factor Auth
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <IconDownload className="h-6 w-6 mb-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <IconEye className="h-6 w-6 mb-2" />
                  View Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

