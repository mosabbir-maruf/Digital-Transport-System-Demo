import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "admin" | "user";
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "admin",
  trend,
  className,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
        variant === "admin"
          ? "bg-card shadow-card hover:shadow-admin border border-border"
          : "bg-card shadow-card hover:shadow-bkash border border-border",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <motion.p 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold font-display tracking-tight text-foreground"
          >
            {value}
          </motion.p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "text-sm font-medium",
                trend.positive ? "text-emerald-500" : "text-destructive"
              )}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </motion.p>
          )}
        </div>
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl relative z-10",
            variant === "admin" ? "admin-gradient" : "bkash-gradient"
          )}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="h-6 w-6 text-primary-foreground" />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute -right-4 -top-4 h-24 w-24 rounded-full",
          variant === "admin" ? "admin-gradient" : "bkash-gradient"
        )}
      />
    </motion.div>
  );
}
