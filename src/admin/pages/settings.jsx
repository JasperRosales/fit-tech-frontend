
import { SectionCards } from "@/admin/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function Settings() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          
          <div className="px-4 lg:px-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              

              <TabsContent value="general" className="space-y-4">
                <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                  <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                    <CardDescription>Manage your organization information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input id="org-name" defaultValue="Acme Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org-email">Contact Email</Label>
                        <Input id="org-email" defaultValue="admin@acme.com" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive email updates about system events</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              

              <TabsContent value="security" className="space-y-4">
                <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and access controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Password</h4>
                        <Button variant="outline" size="sm">Change Password</Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-2">Protect your account with an additional layer of security</p>
                        <Button variant="outline" size="sm">Manage 2FA</Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Active Sessions</h4>
                        <p className="text-sm text-muted-foreground mb-2">Manage your active login sessions</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Current Session</p>
                              <p className="text-xs text-muted-foreground">Chrome on Windows • Last active: Now</p>
                            </div>
                            <Badge variant="default">Current</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Mobile App</p>
                              <p className="text-xs text-muted-foreground">iOS • Last active: 2 hours ago</p>
                            </div>
                            <Button variant="outline" size="sm">Revoke</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              

              <TabsContent value="notifications" className="space-y-4">
                <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Updates</Label>
                          <p className="text-sm text-muted-foreground">Notifications about system maintenance and updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Security Alerts</Label>
                          <p className="text-sm text-muted-foreground">Important security-related notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">Weekly summary of activity and performance</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New User Registrations</Label>
                          <p className="text-sm text-muted-foreground">When new users join your organization</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              

              <TabsContent value="billing" className="space-y-4">
                <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>Manage your subscription and billing information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Pro</div>
                          <p className="text-sm text-muted-foreground">$29/month</p>
                          <Badge variant="secondary" className="mt-2">Active</Badge>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Next Billing</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$29</div>
                          <p className="text-sm text-muted-foreground">March 15, 2024</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Storage Used</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">2.4 GB</div>
                          <p className="text-sm text-muted-foreground">of 10 GB</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">Payment Method</h4>
                          <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">Billing Address</h4>
                          <p className="text-sm text-muted-foreground">123 Business St, Suite 100</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button>Upgrade Plan</Button>
                      <Button variant="outline">Download Invoice</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
