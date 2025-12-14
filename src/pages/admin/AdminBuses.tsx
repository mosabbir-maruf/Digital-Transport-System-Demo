import { AdminSidebar } from "@/components/AdminSidebar";
import { buses } from "@/data/mockData";
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
import { Bus, Users, Wrench } from "lucide-react";

// TODO: Add edit/delete functionality for buses
const AdminBuses = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "maintenance":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "inactive":
        return "bg-slate-100 text-slate-700 border-slate-200";
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
              Bus Information
            </h1>
            <p className="text-muted-foreground">
              Fleet overview and vehicle management
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary">
            <Bus className="h-5 w-5" />
            <span className="font-semibold">{buses.length} Buses</span>
          </div>
        </div>

        {/* Bus Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="rounded-2xl bg-card border border-border shadow-card p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl admin-gradient">
                    <Bus className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{bus.number}</h3>
                    <p className="text-sm text-muted-foreground">{bus.model}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize font-medium",
                    getStatusColor(bus.status)
                  )}
                >
                  {bus.status === "maintenance" && (
                    <Wrench className="h-3 w-3 mr-1" />
                  )}
                  {bus.status}
                </Badge>
              </div>
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Capacity
                  </span>
                  <span className="font-semibold text-foreground">
                    {bus.capacity} seats
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Driver</span>
                  <span className="font-medium text-foreground">
                    {bus.driver}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bus Table */}
        <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold font-display text-foreground">
              Fleet Details
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Bus Number</TableHead>
                <TableHead className="font-semibold">Model</TableHead>
                <TableHead className="font-semibold">Capacity</TableHead>
                <TableHead className="font-semibold">Driver</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{bus.number}</TableCell>
                  <TableCell>{bus.model}</TableCell>
                  <TableCell>{bus.capacity} seats</TableCell>
                  <TableCell>{bus.driver}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize font-medium",
                        getStatusColor(bus.status)
                      )}
                    >
                      {bus.status}
                    </Badge>
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

export default AdminBuses;
