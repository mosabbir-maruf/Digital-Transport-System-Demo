import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  Bus,
  Receipt,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { companyInfo } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Transport Authority", href: "/admin/company", icon: Building2 },
  { name: "Drivers Info", href: "/admin/drivers", icon: Users },
  { name: "Bus Info", href: "/admin/buses", icon: Bus },
  { name: "Transactions", href: "/admin/transactions", icon: Receipt },
];

interface AdminSidebarProps {
  children: React.ReactNode;
}

export function AdminSidebar({ children }: AdminSidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Bus className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-base font-semibold text-gray-900">
                {companyInfo.name}
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      isActive
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Right side - Role badge, Logout & Mobile menu button */}
            <div className="flex items-center gap-3">
              {/* Admin Role Badge */}
              <span className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md border border-blue-100">
                Admin
              </span>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white md:hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors",
                        isActive
                          ? "text-blue-700 bg-blue-50 font-medium"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors mt-2"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white/50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-center text-gray-500">
            © {new Date().getFullYear()} {companyInfo.fullName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
