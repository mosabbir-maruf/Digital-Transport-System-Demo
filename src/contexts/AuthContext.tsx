import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "admin" | "user" | null;

interface RegisterData {
  username?: string;
  phone?: string;
  email: string;
  password: string;
  fullName: string;
  studentId?: string;
}

interface AuthContextType {
  user: { role: UserRole; name?: string } | null;
  login: (role: UserRole, credentials?: { username: string; password: string }) => Promise<boolean>;
  register: (role: UserRole, data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ role: UserRole; name?: string } | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (role: UserRole, credentials?: { username: string; password: string }): Promise<boolean> => {
    // TODO: Replace with actual API call
    // FIXME: Add proper error handling
    if (role === "admin") {
      const adminUser = { role: "admin" as const, name: "Admin User" };
      setUser(adminUser);
      localStorage.setItem("auth_user", JSON.stringify(adminUser));
      return true;
    } else if (role === "user") {
      const userUser = { role: "user" as const, name: "User" };
      setUser(userUser);
      localStorage.setItem("auth_user", JSON.stringify(userUser));
      return true;
    }
    return false;
  };

  const register = async (role: UserRole, data: RegisterData): Promise<boolean> => {
    // TODO: Connect to backend API
    if (role === "admin") {
      const adminUser = { role: "admin" as const, name: data.fullName || "Admin User" };
      setUser(adminUser);
      localStorage.setItem("auth_user", JSON.stringify(adminUser));
      return true;
    } else if (role === "user") {
      const userUser = { role: "user" as const, name: data.fullName || "User" };
      setUser(userUser);
      localStorage.setItem("auth_user", JSON.stringify(userUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
