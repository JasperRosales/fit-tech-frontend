import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export function StaffGuard({ children }) {
  const { isLoggedIn, userRole, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard if not staff or admin
  if (userRole !== 'staff' && userRole !== 'admin') {
    if (userRole === 'admin') {
      // Admin should be able to access staff section
      return children;
    } else if (userRole === 'user') {
      return <Navigate to="/user" replace />;
    } else {
      // Unknown role, redirect to login
      return <Navigate to="/login" replace />;
    }
  }

  // User is authenticated staff or admin, show children
  return children;
}
