import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export function UserGuard({ children }) {
  const { isLoggedIn, userRole, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Allow all authenticated users to access user dashboard
  // (This includes users, staff, and admin - they can all see user features)
  return children;
}
