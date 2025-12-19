import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export function AdminGuard({ children }) {
  const { isLoggedIn, userRole, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard if not admin
  if (userRole !== 'admin') {
    if (userRole === 'staff') {
      return <Navigate to="/staff" replace />;
    } else if (userRole === 'user') {
      return <Navigate to="/user" replace />;
    } else {
      // Unknown role, redirect to login
      return <Navigate to="/login" replace />;
    }
  }

  // User is authenticated admin, show children
  return children;
}
