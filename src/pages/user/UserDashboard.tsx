// User dashboard - main landing page after login

import { UserSidebar } from "@/components/UserSidebar";
import { StatCard } from "@/components/StatCard";
import { QuickAction } from "@/components/QuickAction";
import { TransactionItem } from "@/components/TransactionItem";
import { NearbyBusMap } from "@/components/NearbyBusMap";
import { userBalance, userTransactions, buses, routes, announcements } from "@/data/mockData";
import { Wallet, TrendingDown, PiggyBank, QrCode, MapPin, Calendar, CreditCard, Bus, Route, CheckCircle2, Bell, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserDashboard = () => {
  const navigate = useNavigate();

  // TODO: Integrate actual payment gateway (bKash/Nagad)
  const handleRecharge = () => {
    // TODO: Integrate payment gateway
    // console.log("Recharge clicked"); // debug
    toast.info("Recharge feature coming soon! You'll be able to recharge via bKash, Nagad, or bank cards.");
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Recharge":
        handleRecharge();
        break;
      case "Scan QR":
        toast.info("QR Scanner will open. Point your camera at the QR code.");
        break;
      case "Routes":
        navigate("/user/find-bus");
        break;
      case "Schedule":
        toast.info("Bus schedule will be displayed here.");
        break;
      default:
        break;
    }
  };

  const activeBuses = buses.filter(bus => bus.status === "active").length;
  const totalRoutes = routes.length;
  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Balance card with bKash-style gradient */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl bkash-gradient p-8 text-white"
        >
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Balance</p>
                <motion.p 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold font-display mt-1"
                >
                  ৳{userBalance.total.toFixed(2)}
                </motion.p>
              </div>
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
              >
                <Wallet className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleRecharge}
                className="w-full bg-white text-bkash-primary hover:bg-white/90 font-semibold rounded-2xl py-6 text-lg shadow-lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Recharge Now
              </Button>
            </motion.div>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5" 
          />
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Expense"
            value={`৳${userBalance.todayExpense.toFixed(2)}`}
            icon={TrendingDown}
            variant="user"
          />
          <StatCard
            title="Total Expense"
            value={`৳${userBalance.totalExpense.toFixed(2)}`}
            subtitle="This month"
            icon={PiggyBank}
            variant="user"
          />
          <StatCard
            title="Active Buses"
            value={activeBuses}
            subtitle={`of ${buses.length} total`}
            icon={Bus}
            variant="user"
          />
          <StatCard
            title="Available Routes"
            value={totalRoutes}
            subtitle="Routes to choose from"
            icon={Route}
            variant="user"
          />
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-bold font-display text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <QuickAction name="Recharge" icon={Wallet} onClick={() => handleQuickAction("Recharge")} />
            <QuickAction name="Scan QR" icon={QrCode} onClick={() => handleQuickAction("Scan QR")} />
            <QuickAction name="Routes" icon={MapPin} onClick={() => handleQuickAction("Routes")} />
            <QuickAction name="Schedule" icon={Calendar} onClick={() => handleQuickAction("Schedule")} />
          </div>
        </motion.div>

        {/* Recent Announcements */}
        {announcements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl bg-card border border-border shadow-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold font-display text-foreground">
                  Recent Announcements
                </h2>
                <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                  {announcements.length} new
                </Badge>
              </div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  variant="ghost" 
                  className="text-bkash-primary hover:text-bkash-light"
                  onClick={() => navigate("/user/announcements")}
                >
                  View All
                </Button>
              </motion.div>
            </div>
            <div className="space-y-3">
              {announcements.slice(0, 3).map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => navigate("/user/announcements")}
                  className="flex items-start gap-3 p-4 rounded-lg border hover:border-pink-300 hover:bg-pink-50 transition-colors cursor-pointer"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    announcement.type === "important" 
                      ? "bg-red-50" 
                      : announcement.type === "update"
                      ? "bg-blue-50"
                      : "bg-green-50"
                  }`}>
                    {announcement.type === "important" ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Bell className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm text-foreground truncate">
                        {announcement.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs capitalize ${
                          announcement.type === "important"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : announcement.type === "update"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {announcement.date} • {announcement.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Nearby Bus Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-display text-foreground">
              Nearby Buses
            </h2>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                variant="ghost" 
                className="text-bkash-primary hover:text-bkash-light"
                onClick={() => navigate("/user/find-bus")}
              >
                View All
              </Button>
            </motion.div>
          </div>
          <NearbyBusMap className="h-[400px] w-full" />
        </motion.div>

        {/* Bus Information Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Popular Routes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-card border border-border shadow-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-display text-foreground">
                Popular Routes
              </h2>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  variant="ghost" 
                  className="text-bkash-primary hover:text-bkash-light"
                  onClick={() => navigate("/user/find-bus")}
                >
                  Find Bus
                </Button>
              </motion.div>
            </div>
            <div className="space-y-3">
              {routes.slice(0, 5).map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-pink-300 hover:bg-pink-50 transition-colors cursor-pointer"
                  onClick={() => navigate("/user/find-bus")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50">
                      <MapPin className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {route.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {route.stops.length} stops
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-pink-600">
                      ৳{route.fare}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Buses */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-card border border-border shadow-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-display text-foreground">
                Active Buses
              </h2>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  variant="ghost" 
                  className="text-bkash-primary hover:text-bkash-light"
                  onClick={() => navigate("/user/find-bus")}
                >
                  View All
                </Button>
              </motion.div>
            </div>
            <div className="space-y-3">
              {buses.filter(bus => bus.status === "active").slice(0, 5).map((bus, index) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-pink-300 hover:bg-pink-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                      <Bus className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {bus.number}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bus.model} • {bus.capacity} seats
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-green-600">Active</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-card border border-border shadow-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-display text-foreground">
              Recent Transactions
            </h2>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                variant="ghost" 
                className="text-bkash-primary hover:text-bkash-light"
                onClick={() => navigate("/user/transactions")}
              >
                See All
              </Button>
            </motion.div>
          </div>
          <div className="space-y-0">
            {userTransactions.slice(0, 5).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <TransactionItem
                  type={transaction.type}
                  route={transaction.route}
                  description={transaction.description}
                  amount={transaction.amount}
                  date={transaction.date}
                  status={transaction.status}
                  variant="user"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </UserSidebar>
  );
};

export default UserDashboard;
