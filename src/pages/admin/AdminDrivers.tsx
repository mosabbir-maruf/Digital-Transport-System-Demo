import { AdminSidebar } from "@/components/AdminSidebar";
import { drivers } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Users, Phone, Bus } from "lucide-react";

// TODO: Add driver management features (add/edit/remove)
const AdminDrivers = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-duty":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "off-duty":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "break":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Drivers Info
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor all registered drivers
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
            <span className="font-semibold">{drivers.length} Drivers</span>
          </div>
        </div>

        {/* Drivers Table */}
        <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Driver Name</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Assigned Bus</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">
                  Today's Trips
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {driver.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-primary" />
                      {driver.bus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize font-medium",
                        getStatusColor(driver.status)
                      )}
                    >
                      {driver.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {driver.trips}
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

export default AdminDrivers;
