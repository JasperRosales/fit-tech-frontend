
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "../../hooks/use-auth";


// LocalStorage utility functions for reservations
const STORAGE_KEYS = {
  COUNTERS: 'fittech_counters'
};

// Get user-specific storage key
const getUserStorageKey = (baseKey, userEmail) => {
  return userEmail ? `${baseKey}_${userEmail}` : baseKey;
};


// Initialize data in localStorage if not exists
const initializeStorage = () => {
  
  if (!localStorage.getItem(STORAGE_KEYS.COUNTERS)) {
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify({
      reservationId: 0,
      notificationId: 0
    }));
  }
};

// Get data from localStorage
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Save data to localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Generate next ID for a specific entity type
const generateId = (entityType) => {
  const counters = getFromStorage(STORAGE_KEYS.COUNTERS) || {};
  const defaults = {
    reservationId: 0,
    notificationId: 0
  };
  const finalCounters = { ...defaults, ...counters };
  
  if (finalCounters[entityType] === undefined) {
    finalCounters[entityType] = 0;
  }
  finalCounters[entityType] += 1;
  saveToStorage(STORAGE_KEYS.COUNTERS, finalCounters);
  return finalCounters[entityType];
};


// Initialize mock reservation data
const initializeMockData = (userEmail) => {
  initializeStorage();
  
  if (!userEmail) return;
  
  const reservationsKey = getUserStorageKey('fittech_reservations', userEmail);
  const existingReservations = getFromStorage(reservationsKey);
  
  if (!existingReservations || existingReservations.length === 0) {
    // Sample reservations data
    const sampleReservations = [
      {
        id: 1,
        reservation_date: "2024-02-15",
        reservation_time: "14:00",
        duration_minutes: 60,
        status: "pending",
        notes: "Initial consultation for new services",
        contact_phone: "+1-555-0123",
        location: "Main Office - Room 101",
        staff_assigned: {
          name: "Sarah Johnson",
          email: "sarah@fittech.com"
        },
        items: [
          {
            name: "Personal Training Session",
            price: 75.00
          }
        ],
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        reservation_date: "2024-02-20",
        reservation_time: "10:00",
        duration_minutes: 90,
        status: "confirmed",
        notes: "Follow-up consultation",
        contact_phone: "+1-555-0123",
        location: "Main Office - Room 202",
        staff_assigned: {
          name: "Mike Chen",
          email: "mike@fittech.com"
        },
        items: [
          {
            name: "Nutrition Consultation",
            price: 50.00
          }
        ],
        created_at: "2024-01-16T11:00:00Z",
        updated_at: "2024-01-16T11:00:00Z"
      }
    ];
    saveToStorage(reservationsKey, sampleReservations);
  }
};


// LocalStorage-based reservation functions
const getAllReservations = (params = {}, userEmail) => {
  if (!userEmail) return [];
  
  const reservationsKey = getUserStorageKey('fittech_reservations', userEmail);
  const reservations = getFromStorage(reservationsKey) || [];
  
  // Filter by status if provided
  if (params.status && params.status !== "all") {
    return reservations.filter(r => r.status === params.status);
  }
  
  return reservations;
};

const createReservation = (reservationData, userEmail) => {
  if (!userEmail) return null;
  
  const reservationsKey = getUserStorageKey('fittech_reservations', userEmail);
  const reservations = getFromStorage(reservationsKey) || [];
  
  const newReservation = {
    id: generateId('reservationId'),
    reservation_date: reservationData.reservation_date,
    reservation_time: reservationData.reservation_time,
    duration_minutes: reservationData.duration_minutes || 60,
    status: reservationData.status || "pending",
    notes: reservationData.notes || "",
    contact_phone: reservationData.contact_phone || "",
    location: reservationData.location || "Main Office",
    staff_assigned: reservationData.staff_assigned || null,
    items: reservationData.items || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  reservations.push(newReservation);
  saveToStorage(reservationsKey, reservations);
  
  return newReservation;
};

const updateReservation = (id, reservationData, userEmail) => {
  if (!userEmail) return null;
  
  const reservationsKey = getUserStorageKey('fittech_reservations', userEmail);
  const reservations = getFromStorage(reservationsKey) || [];
  const index = reservations.findIndex(r => r.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Reservation not found');
  }
  
  const updatedReservation = {
    ...reservations[index],
    ...reservationData,
    updated_at: new Date().toISOString()
  };
  
  reservations[index] = updatedReservation;
  saveToStorage(reservationsKey, reservations);
  
  return updatedReservation;
};

const createNotification = (notificationData, userEmail) => {
  if (!userEmail) return null;
  
  const notificationsKey = getUserStorageKey('fittech_notifications', userEmail);
  const notifications = getFromStorage(notificationsKey) || [];
  
  const newNotification = {
    id: generateId('notificationId'),
    title: notificationData.title,
    message: notificationData.message,
    type: notificationData.type || 'reservation_update',
    is_read: false,
    created_at: new Date().toISOString()
  };
  
  notifications.push(newNotification);
  saveToStorage(notificationsKey, notifications);
  
  return newNotification;
};
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Filter
} from "lucide-react";



const Reservations = () => {
  // Auth hook
  const { userEmail, isLoggedIn } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (userEmail) {
      // Initialize data on component mount
      initializeMockData(userEmail);
      fetchReservations();
    }
  }, [statusFilter, userEmail]);



  const fetchReservations = async () => {
    try {
      setLoading(true);
      
      const params = {};
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }
      
      // Get reservations from localStorage
      const reservationData = getAllReservations(params, userEmail);
      setReservations(reservationData || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };



  const createReservation = async () => {
    try {
      setCreating(true);
      
      // This would typically open a modal or form
      // For now, we'll create a sample reservation
      const newReservation = {
        reservation_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
        reservation_time: "14:00",
        duration_minutes: 60,
        notes: "Initial consultation",
        status: "pending"
      };
      
      const reservation = createReservation(newReservation, userEmail);
      setReservations(prev => [reservation, ...prev]);
      
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Error creating reservation');
    } finally {
      setCreating(false);
    }
  };



  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      const updatedReservation = updateReservation(reservationId, { status: newStatus }, userEmail);
      
      setReservations(prev => prev.map(res => 
        res.id === reservationId ? { ...res, status: newStatus } : res
      ));
      
      // Send notification about status change using localStorage
      createNotification({
        title: 'Reservation Status Updated',
        message: `Your reservation has been ${newStatus}`,
        type: 'reservation_update'
      }, userEmail);
      
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "secondary", icon: AlertCircle, color: "text-yellow-600" },
      confirmed: { variant: "default", icon: CheckCircle, color: "text-green-600" },
      cancelled: { variant: "destructive", icon: XCircle, color: "text-red-600" },
      completed: { variant: "outline", icon: CheckCircle, color: "text-blue-600" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderReservationCard = (reservation) => (
    <Card key={reservation.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Reservation #{reservation.id}</CardTitle>
          {getStatusBadge(reservation.status)}
        </div>
        <CardDescription>
          Created on {new Date(reservation.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Reservation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {new Date(reservation.reservation_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {reservation.reservation_time} ({reservation.duration_minutes} min)
              </span>
            </div>
            
            {reservation.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{reservation.location}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            {reservation.staff_assigned && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Assigned to: {reservation.staff_assigned.name}
                </span>
              </div>
            )}
            
            {reservation.contact_phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{reservation.contact_phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reservation Items */}
        {reservation.items && reservation.items.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Services/Items:</h4>
            <div className="space-y-2">
              {reservation.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name || item.service_name}</span>
                  <span className="font-medium">${item.price || 0}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {reservation.notes && (
          <div>
            <h4 className="font-medium mb-1">Notes:</h4>
            <p className="text-sm text-muted-foreground">{reservation.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          {reservation.status === "pending" && (
            <>
              <Button 
                size="sm" 
                onClick={() => updateReservationStatus(reservation.id, "confirmed")}
              >
                Confirm
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => updateReservationStatus(reservation.id, "cancelled")}
              >
                Cancel
              </Button>
            </>
          )}
          
          {reservation.status === "confirmed" && (
            <>
              <Button 
                size="sm" 
                onClick={() => updateReservationStatus(reservation.id, "completed")}
              >
                Mark Complete
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => updateReservationStatus(reservation.id, "cancelled")}
              >
                Cancel
              </Button>
            </>
          )}
          
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const filteredReservations = reservations.filter(reservation => {
    if (statusFilter === "all") return true;
    return reservation.status === statusFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reservations</h2>
          <p className="text-muted-foreground">
            Manage your appointments and bookings
          </p>
        </div>
        <Button onClick={createReservation} disabled={creating}>
          <Plus className="h-4 w-4 mr-2" />
          {creating ? 'Creating...' : 'New Reservation'}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reservations</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="text-sm text-muted-foreground">
          {filteredReservations.length} reservation{filteredReservations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reservations found</h3>
              <p className="text-muted-foreground mb-4">
                {statusFilter === "all" 
                  ? "Create your first reservation to get started"
                  : `No ${statusFilter} reservations found`
                }
              </p>
              <Button onClick={createReservation} disabled={creating}>
                <Plus className="h-4 w-4 mr-2" />
                Create Reservation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReservations.map(renderReservationCard)}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{reservations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {reservations.filter(r => r.status === "pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">
                  {reservations.filter(r => r.status === "confirmed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {reservations.filter(r => r.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reservations;
