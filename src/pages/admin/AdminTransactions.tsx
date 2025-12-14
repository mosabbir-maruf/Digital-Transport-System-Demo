import { AdminSidebar } from "@/components/AdminSidebar";
import { adminTransactions } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Receipt, TrendingUp, TrendingDown } from "lucide-react";

const AdminTransactions = () => {
  const totalRevenue = adminTransactions.reduce((acc, t) => acc + t.revenue, 0);
  const totalExpenses = adminTransactions.reduce(
    (acc, t) => acc + t.expenses,
    0
  );
  const netProfit = totalRevenue - totalExpenses;

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Transactions
          </h1>
          <p className="text-muted-foreground">
            Financial overview and transaction history
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-card border border-border shadow-card p-6">
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
          </div>

          <div className="rounded-2xl bg-card border border-border shadow-card p-6">
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
          </div>

          <div className="rounded-2xl bg-card border border-border shadow-card p-6 admin-gradient text-primary-foreground">
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
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold font-display text-foreground">
              Recent Transactions
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Route</TableHead>
                <TableHead className="font-semibold text-right">Trips</TableHead>
                <TableHead className="font-semibold text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-right">Expenses</TableHead>
                <TableHead className="font-semibold text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {transaction.date}
                  </TableCell>
                  <TableCell>{transaction.route}</TableCell>
                  <TableCell className="text-right">{transaction.trips}</TableCell>
                  <TableCell className="text-right text-emerald-600 font-medium">
                    ৳{transaction.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-red-600 font-medium">
                    ৳{transaction.expenses.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ৳{(transaction.revenue - transaction.expenses).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminTransactions;
