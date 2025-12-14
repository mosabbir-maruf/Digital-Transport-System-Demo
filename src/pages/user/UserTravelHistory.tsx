import { UserSidebar } from "@/components/UserSidebar";
import { travelHistory } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, Clock, Bus } from "lucide-react";

const UserTravelHistory = () => {
  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Travel History
            </h1>
            <p className="text-muted-foreground">
              Your recent journeys
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bkash-gradient-soft text-bkash-primary">
            <MapPin className="h-5 w-5" />
            <span className="font-semibold">{travelHistory.length} Trips</span>
          </div>
        </div>

        {/* Travel Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {travelHistory.map((trip) => (
            <div
              key={trip.id}
              className="rounded-2xl bg-card border border-border shadow-card p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{trip.date}</span>
                <span className="text-sm font-semibold text-bkash-primary">
                  ৳{trip.fare.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bkash-gradient" />
                  <div className="h-12 w-0.5 bg-gradient-to-b from-bkash-primary to-bkash-light" />
                  <div className="h-3 w-3 rounded-full bg-bkash-light" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">{trip.from}</p>
                    <p className="text-xs text-muted-foreground">Start</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{trip.to}</p>
                    <p className="text-xs text-muted-foreground">Destination</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Bus className="h-4 w-4" />
                  {trip.bus}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {trip.duration}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Table */}
        <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold font-display text-foreground">
              All Journeys
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">From</TableHead>
                <TableHead className="font-semibold">To</TableHead>
                <TableHead className="font-semibold">Bus</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold text-right">Fare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {travelHistory.map((trip) => (
                <TableRow key={trip.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{trip.date}</TableCell>
                  <TableCell>{trip.from}</TableCell>
                  <TableCell>{trip.to}</TableCell>
                  <TableCell>{trip.bus}</TableCell>
                  <TableCell>{trip.duration}</TableCell>
                  <TableCell className="text-right font-semibold text-bkash-primary">
                    ৳{trip.fare.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </UserSidebar>
  );
};

export default UserTravelHistory;
