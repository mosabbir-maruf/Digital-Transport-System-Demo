import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const UserLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/user";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim() || !password.trim()) {
      toast.error("Please enter both phone number and password");
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login("user", { username: phone, password });
      
      if (success) {
        toast.success("Login successful! Welcome back.");
        navigate(from, { replace: true });
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 p-4 relative">
      {/* Back Button - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 z-20"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-gray-900 shadow-lg hover:bg-white"
          aria-label="Back to Home"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-4 text-center pb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">User Login</CardTitle>
              <CardDescription className="mt-2">
                Sign in to access your digital transport system
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="current-password"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserLogin;
