import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: "admin" | "user";
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={requiredRole === "admin" ? "/admin/login" : "/user/login"} state={{ from: location }} replace />;
  }

  if (user?.role !== requiredRole) {
    // Wrong role, send them home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
