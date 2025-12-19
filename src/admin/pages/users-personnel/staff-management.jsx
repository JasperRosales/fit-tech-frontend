


import { useState, useEffect } from "react";
import { staffService } from "@/services/staffService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, Eye, Users } from "lucide-react";

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStaff, setTotalStaff] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    birthday: "",
    password: ""
  });


  // Load staff list
  const loadStaff = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await staffService.list({ page, limit });
      setStaffList(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalStaff(response.pagination.total);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      console.error('Failed to load staff:', err);
      setError(err.response?.data?.message || 'Failed to load staff data');
      toast.error('Failed to load staff data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);


  // Filter staff based on search term
  const filteredStaff = staffList.filter(staff =>
    `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStaff) {
        await staffService.update(editingStaff.id, formData);
        toast.success('Staff member updated successfully');
      } else {
        await staffService.create(formData);
        toast.success('Staff member created successfully');
      }
      setIsDialogOpen(false);
      setEditingStaff(null);
      resetForm();
      loadStaff(currentPage);
    } catch (err) {
      console.error('Failed to save staff:', err);
      const errorMessage = err.response?.data?.message || 'Failed to save staff member';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };


  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await staffService.remove(id);
        toast.success('Staff member deleted successfully');
        loadStaff(currentPage);
      } catch (err) {
        console.error('Failed to delete staff:', err);
        const errorMessage = err.response?.data?.message || 'Failed to delete staff member';
        toast.error(errorMessage);
      }
    }
  };


  // Handle edit
  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setFormData({
      firstName: staff.firstName || "",
      lastName: staff.lastName || "",
      email: staff.email || "",
      position: staff.position || "",
      birthday: staff.birthday || "",
      password: "" // Don't populate password for security
    });
    setIsDialogOpen(true);
  };


  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      birthday: "",
      password: ""
    });
  };

  // Open dialog for new staff
  const handleNewStaff = () => {
    setEditingStaff(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <div className="text-center py-8">Loading staff data...</div>
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
                <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
                <p className="text-muted-foreground">
                  Manage staff members, roles, and permissions
                </p>
              </div>
              <Button onClick={handleNewStaff} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Staff Member
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStaff}</div>
                <p className="text-xs text-muted-foreground">
                  Active employees
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Page</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredStaff.length}</div>
                <p className="text-xs text-muted-foreground">
                  Showing on current page
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pages</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPages}</div>
                <p className="text-xs text-muted-foreground">
                  Total pages
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
                      placeholder="Search staff by name, email, or position..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => loadStaff(1)}
                    disabled={loading}
                  >
                    Refresh
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Staff Table */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Members</CardTitle>
                <CardDescription>
                  A list of all staff members in the system
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
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Birthday</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>

                        {filteredStaff.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No staff members found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredStaff.map((staff) => (
                            <TableRow key={staff.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {`${staff.firstName?.[0] || ''}${staff.lastName?.[0] || ''}`.toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{`${staff.firstName} ${staff.lastName}`}</div>
                                    <div className="text-sm text-muted-foreground">ID: {staff.id}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{staff.email}</TableCell>
                              <TableCell>{staff.position || 'Not specified'}</TableCell>
                              <TableCell>{staff.birthday ? new Date(staff.birthday).toLocaleDateString() : 'Not specified'}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(staff)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(staff.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
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
                        onClick={() => loadStaff(currentPage - 1)}
                        disabled={currentPage <= 1 || loading}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadStaff(currentPage + 1)}
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

      {/* Add/Edit Staff Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
              </DialogTitle>
              <DialogDescription>
                {editingStaff 
                  ? 'Update the staff member information below.'
                  : 'Enter the new staff member information below.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
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
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthday" className="text-right">
                  Birthday
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="col-span-3"
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
                  required={!editingStaff}
                  placeholder={editingStaff ? "Leave blank to keep current password" : ""}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {editingStaff ? 'Update' : 'Create'} Staff Member
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

