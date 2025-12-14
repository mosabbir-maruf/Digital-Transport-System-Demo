import { UserSidebar } from "@/components/UserSidebar";
import { TransactionItem } from "@/components/TransactionItem";
import { userTransactions } from "@/data/mockData";
import { Receipt } from "lucide-react";

const UserTransactions = () => {
  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Transaction History
            </h1>
            <p className="text-muted-foreground">
              All your payments and recharges
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bkash-gradient-soft text-bkash-primary">
            <Receipt className="h-5 w-5" />
            <span className="font-semibold">{userTransactions.length} Transactions</span>
          </div>
        </div>

        {/* Transactions List */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-6">
          <div className="space-y-0">
            {userTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                type={transaction.type}
                route={transaction.route}
                description={transaction.description}
                amount={transaction.amount}
                date={transaction.date}
                status={transaction.status}
                variant="user"
              />
            ))}
          </div>
        </div>
      </div>
    </UserSidebar>
  );
};

export default UserTransactions;
