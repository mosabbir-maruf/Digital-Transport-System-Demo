import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    studentId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone.trim() || !formData.email.trim() || !formData.password.trim() || !formData.fullName.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register("user", {
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        studentId: formData.studentId,
      });

      if (success) {
        toast.success("Registration successful! Welcome aboard.");
        navigate("/user", { replace: true });
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full bkash-gradient opacity-20 blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bkash-gradient opacity-10 blur-3xl" 
          />
        </motion.div>

        <div className="relative flex items-center justify-center min-h-screen p-4">
          {/* Back Button - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-6 left-6 z-20"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/register")}
              className="h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground shadow-lg hover:bg-card"
              aria-label="Back to Selection"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md z-10"
          >
            <Card className="rounded-3xl bg-card shadow-card border border-border">
              <CardHeader className="space-y-4 text-center pb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bkash-gradient shadow-lg"
                  >
                    <Wallet className="h-8 w-8 text-white" />
                  </motion.div>
                </motion.div>
                <div>
                  <CardTitle className="text-2xl font-bold font-display text-foreground">User Registration</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">
                    Create your account to access bus services
                  </CardDescription>
                </div>
              </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-sm font-medium text-foreground">
                  Student ID <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="studentId"
                  name="studentId"
                  type="text"
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="new-password"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bkash-gradient text-white border-0 font-semibold shadow-lg rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => navigate("/user/login")}
                  className="p-0 h-auto text-[hsl(var(--bkash-primary))] hover:text-[hsl(var(--bkash-primary-light))] font-semibold"
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
