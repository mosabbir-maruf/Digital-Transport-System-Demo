import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

interface TransactionItemProps {
  type: string;
  description?: string;
  route?: string;
  amount: number;
  date: string;
  status: string;
  variant?: "admin" | "user";
}

export function TransactionItem({
  type,
  description,
  route,
  amount,
  date,
  status,
  variant = "user",
}: TransactionItemProps) {
  const isPositive = amount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5, backgroundColor: "rgba(0,0,0,0.02)" }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between py-4 border-b border-border last:border-0 rounded-lg px-2"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            isPositive
              ? "bg-emerald-100 text-emerald-600"
              : variant === "user"
              ? "bkash-gradient-soft text-bkash-primary"
              : "bg-primary/10 text-primary"
          )}
        >
          {isPositive ? (
            <ArrowDownRight className="h-5 w-5" />
          ) : (
            <ArrowUpRight className="h-5 w-5" />
          )}
        </motion.div>
        <div>
          <p className="text-sm font-medium text-foreground">{type}</p>
          <p className="text-xs text-muted-foreground">
            {route || description}
          </p>
        </div>
      </div>
      <div className="text-right">
        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={cn(
            "text-sm font-semibold",
            isPositive ? "text-emerald-600" : "text-foreground"
          )}
        >
          {isPositive ? "+" : ""}৳{Math.abs(amount).toFixed(2)}
        </motion.p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </motion.div>
  );
}
