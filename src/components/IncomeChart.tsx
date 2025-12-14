import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { weeklyIncome, monthlyIncome, yearlyIncome } from "@/data/mockData";

interface IncomeChartProps {
  className?: string;
}

type Period = "weekly" | "monthly" | "yearly";

const periodData = {
  weekly: weeklyIncome,
  monthly: monthlyIncome,
  yearly: yearlyIncome,
};

export function IncomeChart({ className }: IncomeChartProps) {
  const [period, setPeriod] = useState<Period>("weekly");

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `৳${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `৳${(value / 1000).toFixed(0)}K`;
    }
    return `৳${value}`;
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-card p-6 shadow-card border border-border",
        className
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold font-display text-foreground">
            Income Overview
          </h3>
          <p className="text-sm text-muted-foreground">
            Revenue analysis by period
          </p>
        </div>
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {(["weekly", "monthly", "yearly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                period === p
                  ? "admin-gradient text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={periodData[period]} barCategoryGap="20%">
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Income"]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Bar
            dataKey="income"
            fill="hsl(var(--primary))"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
