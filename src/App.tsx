// Main app component - handles routing and auth
// TODO: Add error boundary for better error handling

import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load all page components for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RegisterSelection = lazy(() => import("./pages/RegisterSelection"));
// Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminRegister = lazy(() => import("./pages/admin/AdminRegister"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDrivers = lazy(() => import("./pages/admin/AdminDrivers"));
const AdminBuses = lazy(() => import("./pages/admin/AdminBuses"));
const AdminTransactions = lazy(() => import("./pages/admin/AdminTransactions"));
const AdminCompanyInfo = lazy(() => import("./pages/admin/AdminCompanyInfo"));
// User Pages
const UserLogin = lazy(() => import("./pages/user/UserLogin"));
const UserRegister = lazy(() => import("./pages/user/UserRegister"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const UserProfile = lazy(() => import("./pages/user/UserProfile"));
const UserTransactions = lazy(() => import("./pages/user/UserTransactions"));
const UserTravelHistory = lazy(() => import("./pages/user/UserTravelHistory"));
const UserReport = lazy(() => import("./pages/user/UserReport"));
const UserHelp = lazy(() => import("./pages/user/UserHelp"));
const UserFindBus = lazy(() => import("./pages/user/UserFindBus"));
const UserAnnouncements = lazy(() => import("./pages/user/UserAnnouncements"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Registration */}
              <Route path="/register" element={<RegisterSelection />} />
              {/* Admin Login & Register */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              {/* Admin Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/drivers"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDrivers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/buses"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminBuses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/transactions"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminTransactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/company"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminCompanyInfo />
                  </ProtectedRoute>
                }
              />
              {/* User Login & Register */}
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/register" element={<UserRegister />} />
              {/* User Protected Routes */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/find-bus"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserFindBus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/announcements"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserAnnouncements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/transactions"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserTransactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/travel"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserTravelHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/report"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/help"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserHelp />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
