// User sidebar navigation with mobile menu

import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Receipt,
  MapPin,
  FileText,
  HelpCircle,
  Menu,
  X,
  Wallet,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import { userProfile, companyInfo } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

// Navigation items
const navItems = [
  { name: "Dashboard", href: "/user", icon: LayoutDashboard },
  { name: "Find Bus", href: "/user/find-bus", icon: Search },
  { name: "Announcements", href: "/user/announcements", icon: Bell },
  { name: "Personal Details", href: "/user/profile", icon: User },
  { name: "Transaction History", href: "/user/transactions", icon: Receipt },
  { name: "Travel History", href: "/user/travel", icon: MapPin },
  { name: "Report", href: "/user/report", icon: FileText },
  { name: "Help", href: "/user/help", icon: HelpCircle },
];

interface UserSidebarProps {
  children: React.ReactNode;
}

export function UserSidebar({ children }: UserSidebarProps) {
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
              onClick={() => navigate("/user")}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50">
                <Wallet className="h-4 w-4 text-pink-600" />
              </div>
              <span className="text-base font-semibold text-gray-900">
                Digital Transport System
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
                        ? "text-pink-700 bg-pink-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Right side - User info, Role badge, Logout & Mobile menu button */}
            <div className="flex items-center gap-3">
              {/* User Profile (Desktop) */}
              <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-900">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userProfile.memberId}
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border-2 border-pink-200">
                  <img
                    src="/avatar/hamza-avatar.jpg"
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* User Role Badge */}
              <span className="px-2.5 py-1 text-xs font-semibold text-pink-700 bg-pink-50 rounded-md border border-pink-100">
                User
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
                {/* Mobile User Profile */}
                <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg bg-gray-50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border-2 border-pink-200">
                    <img
                      src="/avatar/hamza-avatar.jpg"
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {userProfile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userProfile.memberId}
                    </p>
                  </div>
                </div>

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
                          ? "text-pink-700 bg-pink-50 font-medium"
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
