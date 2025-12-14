// Admin dashboard - overview of fleet, finances, and operations

import { AdminSidebar } from "@/components/AdminSidebar";
import { StatCard } from "@/components/StatCard";
import { NearbyBusMap } from "@/components/NearbyBusMap";
import { IncomeChart } from "@/components/IncomeChart";
import { Bus, Users, Route, MapPin, TrendingUp, TrendingDown, Receipt, Clock, CheckCircle2 } from "lucide-react";
import { adminStats, companyInfo, adminTransactions, buses, drivers } from "@/data/mockData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Calculate financials from transactions
  // TODO: Add date range filtering
  const totalRevenue = adminTransactions.reduce((acc, t) => acc + t.revenue, 0);
  const totalExpenses = adminTransactions.reduce((acc, t) => acc + t.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  
  // console.log("Financial summary:", { totalRevenue, totalExpenses, netProfit }); // debug
  
  const activeBuses = buses.filter(bus => bus.status === "active").length;
  const onDutyDrivers = drivers.filter(driver => driver.status === "on-duty").length;
  
  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Company Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl admin-gradient p-8 text-primary-foreground"
        >
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold font-display mb-2"
            >
              {companyInfo.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/80 text-lg"
            >
              {companyInfo.tagline}
            </motion.p>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute -right-5 -bottom-10 h-32 w-32 rounded-full bg-white/5" 
          />
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Bus className="absolute right-8 bottom-8 h-24 w-24 text-white/20" />
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Buses"
              value={adminStats.totalBuses}
              subtitle="Active fleet"
              icon={Bus}
              variant="admin"
              trend={{ value: 12, positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Drivers"
              value={adminStats.totalDrivers}
              subtitle="Registered drivers"
              icon={Users}
              variant="admin"
              trend={{ value: 8, positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Active Routes"
              value={adminStats.activeRoutes}
              subtitle="Operating today"
              icon={Route}
              variant="admin"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Today's Trips"
              value={adminStats.todayTrips}
              subtitle="Completed trips"
              icon={MapPin}
              variant="admin"
              trend={{ value: 5, positive: true }}
            />
          </motion.div>
        </motion.div>

        {/* Financial Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-3xl font-bold font-display text-foreground">
                ৳{totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Last 5 days
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <p className="text-3xl font-bold font-display text-foreground">
                ৳{totalExpenses.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Last 5 days
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 admin-gradient text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary-foreground/80">
                  Net Profit
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Receipt className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <p className="text-3xl font-bold font-display">
                ৳{netProfit.toLocaleString()}
              </p>
              <p className="text-xs text-primary-foreground/80 mt-2">
                Last 5 days
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map and Chart Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Map Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-foreground">
                Live Bus Tracking
              </h2>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <motion.span 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-2 w-2 rounded-full bg-emerald-500" 
                  />
                  Live
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/admin/buses")}
                  className="text-primary hover:text-primary/80"
                >
                  View All
                </Button>
              </div>
            </div>
            <NearbyBusMap className="h-[360px]" />
          </div>

          {/* Chart Section */}
          <IncomeChart className="h-full" />
        </motion.div>

        {/* Recent Activity & Active Buses */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/admin/transactions")}
                  className="text-primary hover:text-primary/80"
                >
                  View All
                </Button>
              </div>
              <CardDescription>
                Latest financial activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminTransactions.slice(0, 5).map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <Receipt className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {transaction.route}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date} • {transaction.trips} trips
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-600">
                        ৳{transaction.revenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Profit: ৳{(transaction.revenue - transaction.expenses).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Buses Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Buses</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/admin/buses")}
                  className="text-primary hover:text-primary/80"
                >
                  View All
                </Button>
              </div>
              <CardDescription>
                {activeBuses} of {buses.length} buses active
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {buses.filter(bus => bus.status === "active").slice(0, 5).map((bus, index) => (
                  <motion.div
                    key={bus.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                        <Bus className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {bus.number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {bus.model} • {bus.capacity} seats
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-600">Active</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminSidebar>
  );
};

export default AdminDashboard;
