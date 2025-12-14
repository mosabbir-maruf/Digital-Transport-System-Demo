import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Wallet, ArrowLeft, Bus } from "lucide-react";
import { motion } from "framer-motion";

const RegisterSelection = () => {
  const navigate = useNavigate();

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
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full admin-gradient opacity-20 blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bkash-gradient opacity-20 blur-3xl" 
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
              onClick={() => navigate("/")}
              className="h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground shadow-lg hover:bg-card"
              aria-label="Back to Home"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl z-10"
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
                    className="flex h-16 w-16 items-center justify-center rounded-2xl admin-gradient shadow-lg"
                  >
                    <Bus className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                </motion.div>
                <div>
                  <CardTitle className="text-2xl font-bold font-display text-foreground">Create Account</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">
                    Choose your account type to get started
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Admin Registration Option */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="cursor-pointer rounded-3xl bg-card shadow-card border border-border hover:border-primary/50 transition-all h-full">
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                          <motion.div 
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="flex h-14 w-14 items-center justify-center rounded-2xl admin-gradient shadow-lg"
                          >
                            <Shield className="h-7 w-7 text-primary-foreground" />
                          </motion.div>
                        </div>
                        <CardTitle className="text-xl font-bold font-display text-foreground">Admin</CardTitle>
                        <CardDescription className="mt-2 text-muted-foreground">
                          Manage buses, drivers, and transactions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => navigate("/admin/register")}
                          className="w-full admin-gradient border-0 text-primary-foreground font-semibold shadow-lg rounded-xl"
                        >
                          Register as Admin
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* User Registration Option */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="cursor-pointer rounded-3xl bg-card shadow-card border border-border hover:border-pink-500/50 transition-all h-full">
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                          <motion.div 
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="flex h-14 w-14 items-center justify-center rounded-2xl bkash-gradient shadow-lg"
                          >
                            <Wallet className="h-7 w-7 text-white" />
                          </motion.div>
                        </div>
                        <CardTitle className="text-xl font-bold font-display text-foreground">User</CardTitle>
                        <CardDescription className="mt-2 text-muted-foreground">
                          Access bus services and manage your wallet
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => navigate("/user/register")}
                          className="w-full bkash-gradient text-white border-0 font-semibold shadow-lg rounded-xl"
                        >
                          Register as User
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSelection;
