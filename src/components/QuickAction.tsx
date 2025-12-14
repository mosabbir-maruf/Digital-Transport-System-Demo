import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface QuickActionProps {
  name: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function QuickAction({ name, icon: Icon, onClick, className }: QuickActionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-card border border-border transition-all duration-300",
        "hover:shadow-bkash hover:border-bkash-primary/30",
        "group",
        className
      )}
    >
      <motion.div 
        whileHover={{ rotate: 15 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bkash-gradient-soft transition-all group-hover:bkash-gradient"
      >
        <Icon className="h-6 w-6 text-bkash-primary group-hover:text-white transition-colors" />
      </motion.div>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </motion.button>
  );
}
