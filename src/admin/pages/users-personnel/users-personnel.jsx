
import { useState, useEffect } from "react";

import { userService } from "@/services/userService";

import { banService } from "@/services/banService";
import { useBanDetection } from "@/hooks/use-ban-detection";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, Eye, Users, Filter, Ban, UserCheck, Clock, AlertTriangle } from "lucide-react";

export default function UsersPersonnel() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ totalMembers: 0, staffMembers: 0, regularUsers: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, staff, users
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [bannedUsers, setBannedUsers] = useState([]);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [userToBan, setUserToBan] = useState(null);
  const [banFormData, setBanFormData] = useState({
    reason: "",
    is_permanent: false,
    expires_at: ""
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });


  // Load filtered users and staff data
  const loadData = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Add timeout handling
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      // Fetch all users data with search and banned users
      const [
        usersData, 
        bannedData
      ] = await Promise.race([
        Promise.all([
          userService.getAll({ 
            page: 1,
            limit: 1000,
            search: searchTerm 
          }),
          banService.getBannedUsers({ limit: 1000 })
        ]),
        timeoutPromise
      ]);

      // Handle users response - service returns data directly, not in a data property
      const users = Array.isArray(usersData[0]) ? usersData[0] : usersData[0] || [];
      const bannedUsers = Array.isArray(bannedData[1]) ? bannedData[1] : bannedData[1] || [];
      
      // Filter data client-side based on filterType
      let filteredData = users.filter(user => {
        // Handle different role formats
        const userRole = user.role || user.type || 'user';
        
        if (filterType === 'staff') {
          return userRole === 'staff' || userRole === 'employee';
        } else if (filterType === 'users') {
          return userRole === 'user' || userRole === 'customer';
        }
        return true; // 'all' shows all users
      });
      
      // Calculate pagination for filtered data
      const itemsPerPage = 10;
      const totalItems = filteredData.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
      
      // Apply pagination to filtered data
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      // Calculate statistics from the data
      const totalMembers = users.length;
      const staffMembers = users.filter(user => (user.role || user.type) === 'staff').length;
      const regularUsers = users.filter(user => (user.role || user.type) === 'user').length;
      
      setUserList(paginatedData);
      setTotalPages(totalPages);
      setStats({
        totalMembers,
        staffMembers,
        regularUsers
      });
      setBannedUsers(bannedUsers);
      setCurrentPage(page);
    } catch (err) {
      console.warn('Failed to load data, using fallback:', err.message);
      
      // Set fallback data
      setUserList([]);
      setStats({
        totalMembers: 0,
        staffMembers: 0,
        regularUsers: 0
      });
      setBannedUsers([]);
      
      setError(err.message);
      
      // Show user-friendly toast only for critical errors
      if (err.message !== 'Request timeout') {
        toast.error("Using fallback data - some features may be limited");
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if user is banned
  const isUserBanned = (userId) => {
    return bannedUsers.some(ban => ban.user_id === userId);
  };

  // Get ban details for user
  const getUserBanDetails = (userId) => {
    return bannedUsers.find(ban => ban.user_id === userId) || null;
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      loadData(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filterType]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {

        // Update existing user
        await userService.update(editingUser.id, {
          email: formData.email,
          role: formData.role
        });
        toast.success('User updated successfully');
      } else {
        // Create new user
        await userService.create({
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        toast.success('User created successfully');
      }
      setIsDialogOpen(false);
      setEditingUser(null);
      resetForm();
      loadData(currentPage);
    } catch (err) {
      console.error('Failed to save user:', err);
      const errorMessage = err.response?.data?.message || 'Failed to save user';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {

      try {
        await userService.delete(id);
        toast.success('User deleted successfully');
        loadData(currentPage);
      } catch (err) {
        console.error('Failed to delete user:', err);
        const errorMessage = err.response?.data?.message || 'Failed to delete user';
        toast.error(errorMessage);
      }
    }
  };

  // Handle ban/unban
  const handleBanUser = async (e) => {
    e.preventDefault();
    if (!userToBan) return;

    try {
      const banData = {
        user_id: userToBan.id,
        reason: banFormData.reason,
        is_permanent: banFormData.is_permanent,
        expires_at: banFormData.is_permanent ? null : banFormData.expires_at
      };


      await banService.banUser(userToBan.id, banFormData.reason, banFormData.is_permanent, banFormData.expires_at);
      toast.success(`User ${userToBan.email} has been banned`);
      
      setIsBanDialogOpen(false);
      setUserToBan(null);
      resetBanForm();
      loadData(currentPage);
    } catch (err) {
      console.error('Failed to ban user:', err);
      toast.error('Failed to ban user');
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const banDetails = getUserBanDetails(userId);
      if (banDetails) {
        await banService.unbanUser(banDetails.id);
        toast.success('User has been unbanned');
        loadData(currentPage);
      }
    } catch (err) {
      console.error('Failed to unban user:', err);
      toast.error('Failed to unban user');
    }
  };

  // Handle edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email || "",
      password: "", // Don't populate password for security
      role: user.role || "user"
    });
    setIsDialogOpen(true);
  };

  // Handle ban dialog
  const handleBanDialog = (user) => {
    setUserToBan(user);
    setBanFormData({
      reason: "",
      is_permanent: false,
      expires_at: ""
    });
    setIsBanDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      role: "user"
    });
  };

  const resetBanForm = () => {
    setBanFormData({
      reason: "",
      is_permanent: false,
      expires_at: ""
    });
  };

  // Open dialog for new user
  const handleNewUser = () => {
    setEditingUser(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <div className="text-center py-8">Loading user data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Users & Personnel</h1>
                <p className="text-muted-foreground">
                  Manage users, staff members, roles, and permissions
                </p>
              </div>
              <Button onClick={handleNewUser} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add New User
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMembers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Active users and staff
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.staffMembers || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Employees with positions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.regularUsers || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Users without positions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users by email or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
                        <SelectItem value="users">Users Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => loadData(1)}
                    disabled={loading}
                  >
                    Refresh
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Users Table */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>
                    {filterType === 'users' ? 'Regular Users' : filterType === 'staff' ? 'Staff Members' : 'All Users & Staff'}
                </CardTitle>
                <CardDescription>
                  A comprehensive list of users and staff members in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="text-center py-8 text-red-600">
                    Error: {error}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userList.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No users found
                            </TableCell>
                          </TableRow>
                        ) : (
                          userList.map((user) => {
                            const banDetails = getUserBanDetails(user.id);
                            const isBanned = !!banDetails;
                            
                            return (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>
                                        {user.email?.charAt(0).toUpperCase() || 'U'}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">ID: {user.id}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {user.type === 'staff' ? 'Staff Account' : 'User Account'}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell>
                                  <Badge variant={
                                    user.role === 'admin' ? 'destructive' : 
                                    user.role === 'staff' ? 'default' : 'secondary'
                                  }>
                                    {user.role}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {isBanned ? (
                                    <div className="flex items-center gap-2">
                                      <Badge variant="destructive" className="flex items-center gap-1">
                                        <Ban className="h-3 w-3" />
                                        Banned
                                      </Badge>
                                      {banDetails.is_permanent ? (
                                        <Badge variant="outline">Permanent</Badge>
                                      ) : (
                                        <Badge variant="outline" className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          Temporary
                                        </Badge>
                                      )}
                                    </div>
                                  ) : (
                                    <Badge variant="outline" className="flex items-center gap-1">
                                      <UserCheck className="h-3 w-3" />
                                      Active
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEdit(user)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    {!isBanned ? (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleBanDialog(user)}
                                        className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                                      >
                                        <Ban className="h-4 w-4" />
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleUnbanUser(user.id)}
                                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                                      >
                                        <UserCheck className="h-4 w-4" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDelete(user.id)}
                                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadData(currentPage - 1)}
                        disabled={currentPage <= 1 || loading}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadData(currentPage + 1)}
                        disabled={currentPage >= totalPages || loading}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Edit User' : 'Add New User'}
              </DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? 'Update the user information below.'
                  : 'Enter the new user information below.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="col-span-3"
                  required={!editingUser}
                  placeholder={editingUser ? "Leave blank to keep current password" : ""}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {editingUser ? 'Update' : 'Create'} User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleBanUser}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Ban User
              </DialogTitle>
              <DialogDescription>
                You are about to ban <strong>{userToBan?.email}</strong>. This action can be reversed.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ban-reason" className="text-right">
                  Reason
                </Label>
                <Input
                  id="ban-reason"
                  value={banFormData.reason}
                  onChange={(e) => setBanFormData({ ...banFormData, reason: e.target.value })}
                  className="col-span-3"
                  placeholder="Reason for banning"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ban-permanent" className="text-right">
                  Permanent
                </Label>
                <Select 
                  value={banFormData.is_permanent.toString()} 
                  onValueChange={(value) => setBanFormData({ ...banFormData, is_permanent: value === 'true' })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Ban type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Temporary</SelectItem>
                    <SelectItem value="true">Permanent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {!banFormData.is_permanent && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ban-expires" className="text-right">
                    Expires
                  </Label>
                  <Input
                    id="ban-expires"
                    type="datetime-local"
                    value={banFormData.expires_at}
                    onChange={(e) => setBanFormData({ ...banFormData, expires_at: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsBanDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={loading}>
                Ban User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
