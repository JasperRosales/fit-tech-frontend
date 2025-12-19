
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "../../hooks/use-auth";


// LocalStorage utility functions for notifications
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
      notificationId: 0,
      promotionId: 0
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
    notificationId: 0,
    promotionId: 0
  };
  const finalCounters = { ...defaults, ...counters };
  
  if (finalCounters[entityType] === undefined) {
    finalCounters[entityType] = 0;
  }
  finalCounters[entityType] += 1;
  saveToStorage(STORAGE_KEYS.COUNTERS, finalCounters);
  return finalCounters[entityType];
};


// Initialize mock notification data
const initializeMockData = (userEmail) => {
  initializeStorage();
  
  if (!userEmail) return;
  
  const notificationsKey = getUserStorageKey('fittech_notifications', userEmail);
  const existingNotifications = getFromStorage(notificationsKey);
  
  if (!existingNotifications || existingNotifications.length === 0) {
    // Sample notifications data
    const sampleNotifications = [
      {
        id: 1,
        title: "Welcome to FitTech!",
        message: "Thank you for joining our fitness community. We're excited to help you achieve your goals!",
        type: "system",
        is_read: false,
        created_at: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        title: "New Promotion Available",
        message: "Get 20% off on all personal training sessions this week. Use code FIT20!",
        type: "promotion",
        is_read: false,
        created_at: "2024-01-16T14:15:00Z"
      },
      {
        id: 3,
        title: "Order Confirmed",
        message: "Your order #12345 has been confirmed and is being processed.",
        type: "order",
        is_read: true,
        created_at: "2024-01-17T09:45:00Z"
      },
      {
        id: 4,
        title: "Reservation Reminder",
        message: "You have a personal training session scheduled for tomorrow at 2:00 PM.",
        type: "reservation",
        is_read: false,
        created_at: "2024-01-18T16:20:00Z"
      },
      {
        id: 5,
        title: "Account Update Required",
        message: "Please update your profile information to ensure the best service experience.",
        type: "alert",
        is_read: true,
        created_at: "2024-01-19T11:30:00Z"
      }
    ];
    saveToStorage(notificationsKey, sampleNotifications);
  }
};


// LocalStorage-based notification functions
const getAllNotifications = (params = {}, userEmail) => {
  if (!userEmail) return [];
  
  const notificationsKey = getUserStorageKey('fittech_notifications', userEmail);
  const notifications = getFromStorage(notificationsKey) || [];
  
  // Filter by type if provided
  if (params.type && params.type !== "all") {
    return notifications.filter(n => n.type === params.type);
  }
  
  return notifications;
};

const updateNotification = (id, notificationData, userEmail) => {
  if (!userEmail) return null;
  
  const notificationsKey = getUserStorageKey('fittech_notifications', userEmail);
  const notifications = getFromStorage(notificationsKey) || [];
  const index = notifications.findIndex(n => n.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Notification not found');
  }
  
  const updatedNotification = {
    ...notifications[index],
    ...notificationData
  };
  
  notifications[index] = updatedNotification;
  saveToStorage(notificationsKey, notifications);
  
  return updatedNotification;
};

const removeNotification = (id, userEmail) => {
  if (!userEmail) return { success: false };
  
  const notificationsKey = getUserStorageKey('fittech_notifications', userEmail);
  const notifications = getFromStorage(notificationsKey) || [];
  const index = notifications.findIndex(n => n.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Notification not found');
  }
  
  notifications.splice(index, 1);
  saveToStorage(notificationsKey, notifications);
  
  return { success: true };
};

const getPromotions = (userEmail) => {
  if (!userEmail) return [];
  
  const promotionsKey = getUserStorageKey('fittech_promotions', userEmail);
  return getFromStorage(promotionsKey) || [];
};
import { 
  Bell, 
  Mail, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Info,
  Gift,
  ShoppingCart,
  Calendar,
  Star,
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  Archive,


} from "lucide-react";



const Inbox = () => {
  // Auth hook
  const { userEmail, isLoggedIn } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  useEffect(() => {
    if (userEmail) {
      // Initialize data on component mount
      initializeMockData(userEmail);
      fetchNotifications();
    }
  }, [filterType, userEmail]);



  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      const params = {};
      if (filterType !== "all") {
        params.type = filterType;
      }
      
      // Get notifications from localStorage
      const notificationData = getAllNotifications(params, userEmail);
      setNotifications(notificationData || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };



  const markAsRead = async (notificationId) => {
    try {
      const updatedNotification = updateNotification(notificationId, { is_read: true }, userEmail);
      
      setNotifications(prev => prev.map(notif => 
        notif.id === notificationId ? { ...notif, is_read: true } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAsUnread = async (notificationId) => {
    try {
      const updatedNotification = updateNotification(notificationId, { is_read: false }, userEmail);
      
      setNotifications(prev => prev.map(notif => 
        notif.id === notificationId ? { ...notif, is_read: false } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as unread:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const result = removeNotification(notificationId, userEmail);
      
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };




  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      
      unreadIds.forEach(id => {
        updateNotification(id, { is_read: true }, userEmail);
      });
      
      setNotifications(prev => prev.map(notif => ({ ...notif, is_read: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteSelected = async () => {
    try {
      Array.from(selectedNotifications).forEach(id => {
        removeNotification(id, userEmail);
      });
      
      setNotifications(prev => prev.filter(n => !selectedNotifications.has(n.id)));
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error('Error deleting selected notifications:', error);
    }
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      order: ShoppingCart,
      reservation: Calendar,
      promotion: Gift,
      system: Info,
      alert: AlertCircle,
      message: Mail,
      default: Bell
    };
    
    const Icon = iconMap[type] || iconMap.default;
    return <Icon className="h-5 w-5" />;
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      order: "text-blue-600 bg-blue-100",
      reservation: "text-purple-600 bg-purple-100",
      promotion: "text-green-600 bg-green-100",
      system: "text-gray-600 bg-gray-100",
      alert: "text-red-600 bg-red-100",
      message: "text-indigo-600 bg-indigo-100",
      default: "text-blue-600 bg-blue-100"
    };
    
    return colorMap[type] || colorMap.default;
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = searchQuery === "" || 
      notification.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || notification.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const renderNotificationCard = (notification) => (
    <Card 
      key={notification.id} 
      className={`hover:shadow-md transition-shadow ${
        !notification.is_read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Selection Checkbox */}
          <div className="pt-1">
            <input
              type="checkbox"
              checked={selectedNotifications.has(notification.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedNotifications(prev => new Set([...prev, notification.id]));
                } else {
                  setSelectedNotifications(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(notification.id);
                    return newSet;
                  });
                }
              }}
              className="rounded border-gray-300"
            />
          </div>

          {/* Notification Icon */}
          <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
            {getNotificationIcon(notification.type)}
          </div>

          {/* Notification Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold ${!notification.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h3>
                  {!notification.is_read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {notification.message}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{new Date(notification.created_at).toLocaleDateString()}</span>
                  <span>{new Date(notification.created_at).toLocaleTimeString()}</span>
                  {notification.type && (
                    <Badge variant="outline" className="text-xs">
                      {notification.type}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 ml-4">
                {!notification.is_read ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsUnread(notification.id)}
                    title="Mark as unread"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
          <h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
          {selectedNotifications.size > 0 && (
            <Button variant="destructive" onClick={deleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedNotifications.size})
            </Button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Notifications</SelectItem>
            <SelectItem value="order">Orders</SelectItem>
            <SelectItem value="reservation">Reservations</SelectItem>
            <SelectItem value="promotion">Promotions</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="alert">Alerts</SelectItem>
            <SelectItem value="message">Messages</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
              <p className="text-muted-foreground">
                {searchQuery || filterType !== "all" 
                  ? "No notifications match your current filters"
                  : "You're all caught up! New notifications will appear here."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map(renderNotificationCard)
        )}
      </div>

      {/* Quick Actions for different notification types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType("promotion")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Gift className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Promotions</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === "promotion").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType("order")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === "order").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType("reservation")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reservations</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === "reservation").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType("alert")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === "alert").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inbox;
