import { Link, useNavigate } from "react-router-dom";
import { Bus, Users, ArrowRight, Wallet, Shield, MapPin, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Index = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAdminDashboard = async () => {
    // Quick demo login
    await login("admin", { username: "demo", password: "demo" });
    navigate("/admin");
  };

  const handleUserDashboard = async () => {
    // Quick demo login
    await login("user", { username: "demo", password: "demo" });
    navigate("/user");
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

        <div className="relative container mx-auto px-6 py-20">
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-20"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl admin-gradient shadow-admin"
              >
                <Bus className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold font-display text-foreground">Digital Transport System</h1>
              
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="rounded-xl">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </motion.div>
              </Link>
              <Link to="/admin/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="rounded-xl">Admin Login</Button>
                </motion.div>
              </Link>
              <Link to="/user/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="rounded-xl admin-gradient border-0">User Login</Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.nav>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center space-y-8 mb-20"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold font-display text-foreground leading-tight"
            >
              Digital Transport<br /><span className="admin-gradient-text">System</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              A modern solution for bus fleet management, driver tracking, and passenger services.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="rounded-2xl px-8 py-6 text-lg font-semibold border-2">
                    <UserPlus className="mr-2 h-5 w-5" />Get Started<ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="rounded-2xl admin-gradient border-0 px-8 py-6 text-lg font-semibold shadow-admin"
                  onClick={handleAdminDashboard}
                >
                  <Shield className="mr-2 h-5 w-5" />Admin Dashboard<ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="rounded-2xl px-8 py-6 text-lg font-semibold bkash-gradient text-white border-0 shadow-bkash"
                  onClick={handleUserDashboard}
                >
                  <Wallet className="mr-2 h-5 w-5" />User Dashboard<ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Bus,
                title: "Fleet Management",
                description: "Track and manage your entire bus fleet with real-time GPS monitoring.",
                gradient: "admin-gradient",
              },
              {
                icon: Users,
                title: "Driver Portal",
                description: "Manage driver information and track performance in one platform.",
                gradient: "bkash-gradient",
              },
              {
                icon: MapPin,
                title: "Live Tracking",
                description: "Real-time bus location tracking with route optimization.",
                gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl bg-card p-8 shadow-card border border-border"
              >
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.gradient} mb-6`}
                >
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-bold font-display text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-border bg-card/50 py-8"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Digital Transport System. UI Showcase Demo.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
