import { useState, useEffect } from "react"

import { SectionCards } from "@/admin/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dataService } from "@/data"

export default function UsersPersonnel() {
  const [usersData, setUsersData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setLoading(true)
        const data = await dataService.getUsersData()
        setUsersData(data)
        setError(null)
      } catch (err) {
        console.error('Failed to load users data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsersData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <div className="text-center py-8">Loading users data...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <div className="text-center py-8 text-red-600">Error loading users data: {error}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { overview, usersData: users, personnelData } = usersData

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 lg:px-6">

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Registered users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overview.totalUsers}</div>
                <p className="text-sm text-muted-foreground">{overview.totalUsersChange} from last month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Active Personnel</CardTitle>
                <CardDescription>Currently active employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overview.activePersonnel}</div>
                <p className="text-sm text-muted-foreground">{overview.activePersonnelChange}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Active departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overview.departments}</div>
                <p className="text-sm text-muted-foreground">{overview.departmentsStatus}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Users awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overview.pendingApprovals}</div>
                <p className="text-sm text-muted-foreground">{overview.pendingApprovalsStatus}</p>
              </CardContent>
            </Card>
          </div>

          <div className="px-4 lg:px-6">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="personnel">Personnel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="space-y-4">

                <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>System Users</CardTitle>
                        <CardDescription>Manage user accounts and permissions</CardDescription>
                      </div>
                      <Button>Add User</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              {user.name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="personnel" className="space-y-4">

                <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Company Personnel</CardTitle>
                        <CardDescription>Manage employee records and information</CardDescription>
                      </div>
                      <Button>Add Employee</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Hire Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {personnelData.map((person) => (
                          <TableRow key={person.id}>
                            <TableCell className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              {person.name}
                            </TableCell>
                            <TableCell>{person.position}</TableCell>
                            <TableCell>{person.department}</TableCell>
                            <TableCell>
                              <Badge variant={person.status === "Active" ? "default" : "destructive"}>
                                {person.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{person.hireDate}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
