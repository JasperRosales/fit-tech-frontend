

import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Loader2 } from "lucide-react";

import { LoginForm } from "@/auth/pages/login-form";
import { SignupForm } from "@/auth/pages/signup-form";
import { OTPForm } from "@/auth/pages/otp-form";



import { ThemeProvider } from "@/components/shared/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { AdminGuard } from "@/components/guards/AdminGuard";
import { StaffGuard } from "@/components/guards/StaffGuard";
import { UserGuard } from "@/components/guards/UserGuard";

// Lazy load dashboard components
const AdminDashboard = lazy(() => import("@/admin/pages/admin-dashboard"));
const StaffDashboard = lazy(() => import("@/staff/pages/staff-dashboard"));
const UserDashboard = lazy(() => import("@/user/user-dashboard"));

// Loading fallback component for dashboards
const DashboardLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">Loading dashboard...</p>
    </div>
  </div>
)


function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="fit-tech-ui-theme">
      <ModalProvider>
        <Router>
          <div className="min-h-screen flex items-center justify-center">
            <Routes>
              <Route
                path="/login"
                element={
                  <div className="w-full max-w-md p-6 bg-background">
                    <LoginForm />
                  </div>
                }
              />
              <Route
                path="/signup"
                element={
                  <div className="w-full max-w-md p-6 bg-background">
                    <SignupForm />
                  </div>
                }
              />

              <Route
                path="/otp"
                element={
                  <div className="w-full max-w-sm">
                    <OTPForm />
                  </div>
                }
              />



              <Route
                path="/admin/*"
                element={
                  <AdminGuard>
                    <div className="w-full">
                      <Suspense fallback={<DashboardLoadingFallback />}>
                        <AdminDashboard />
                      </Suspense>
                    </div>
                  </AdminGuard>
                }
              />

              <Route
                path="/staff/*"
                element={
                  <StaffGuard>
                    <div className="w-full">
                      <Suspense fallback={<DashboardLoadingFallback />}>
                        <StaffDashboard />
                      </Suspense>
                    </div>
                  </StaffGuard>
                }
              />

              <Route
                path="/user/*"
                element={
                  <UserGuard>
                    <div className="w-full">
                      <Suspense fallback={<DashboardLoadingFallback />}>
                        <UserDashboard />
                      </Suspense>
                    </div>
                  </UserGuard>
                }
              />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
