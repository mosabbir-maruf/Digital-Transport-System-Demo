// Find bus page - search buses by route
// TODO: Add real-time bus availability

import { useState } from "react";
import { UserSidebar } from "@/components/UserSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes, buses } from "@/data/mockData";
import { Search, Bus, MapPin, Users, Clock, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const UserFindBus = () => {
  // State management for search functionality
  // Using separate state for from/to to allow independent selection
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [searchResults, setSearchResults] = useState<typeof buses>([]);

  // Get unique locations from routes
  // Using Set to remove duplicates, then sorting alphabetically
  // This ensures users see all available stops in a clean list
  const allLocations = Array.from(
    new Set(
      routes.flatMap((route) => route.stops)
    )
  ).sort();

  // Search handler - validates input and finds matching buses
  // I check if locations are different to prevent invalid searches
  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      toast.error("Please select both 'From' and 'To' locations");
      return;
    }

    if (fromLocation === toLocation) {
      toast.error("'From' and 'To' locations must be different");
      return;
    }

    // Find routes that match the selected locations
    const matchingRoutes = routes.filter((route) => {
      const fromIndex = route.stops.indexOf(fromLocation);
      const toIndex = route.stops.indexOf(toLocation);
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    if (matchingRoutes.length === 0) {
      toast.info("No buses found for this route");
      setSearchResults([]);
      return;
    }

    // Find buses that operate on these routes
    const routeNames = matchingRoutes.map((r) => r.name);
    const availableBuses = buses.filter((bus) =>
      routeNames.some((routeName) => bus.route.includes(routeName.split(" - ")[1]))
    );

    if (availableBuses.length === 0) {
      // If no exact match, show buses that might be on similar routes
      const filteredBuses = buses.filter((bus) => bus.status === "active");
      setSearchResults(filteredBuses);
      toast.info("Showing available active buses");
    } else {
      setSearchResults(availableBuses);
      toast.success(`Found ${availableBuses.length} bus(es) for this route`);
    }
  };

  const getRouteInfo = (bus: typeof buses[0]) => {
    const matchingRoute = routes.find((route) =>
      bus.route.includes(route.name.split(" - ")[1])
    );
    return matchingRoute;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "maintenance":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-display text-foreground mb-2">
            Find Bus
          </h1>
          <p className="text-muted-foreground">
            Search for available buses on your desired route
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-pink-600" />
                Search Route
              </CardTitle>
              <CardDescription>
                Select your departure and destination locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    From
                  </label>
                  <Select value={fromLocation} onValueChange={setFromLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select departure location" />
                    </SelectTrigger>
                    <SelectContent>
                      {allLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    To
                  </label>
                  <Select value={toLocation} onValueChange={setToLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination location" />
                    </SelectTrigger>
                    <SelectContent>
                      {allLocations
                        .filter((loc) => loc !== fromLocation)
                        .map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleSearch}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg py-6 text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Buses
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-foreground">
                Available Buses
              </h2>
              <span className="text-sm text-muted-foreground">
                {searchResults.length} bus(es) found
              </span>
            </div>

            <div className="grid gap-4">
              {searchResults.map((bus, index) => {
                const routeInfo = getRouteInfo(bus);
                return (
                  <motion.div
                    key={bus.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          {/* Bus Info */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50">
                                <Bus className="h-6 w-6 text-pink-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-foreground">
                                  {bus.number}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {bus.model}
                                </p>
                              </div>
                            </div>

                            {/* Route Info */}
                            {routeInfo && (
                              <div className="flex items-start gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-pink-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-foreground">
                                    {routeInfo.name}
                                  </p>
                                  <p className="text-muted-foreground">
                                    Fare: ৳{routeInfo.fare}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Driver Info */}
                            {bus.driver !== "-" && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>Driver: {bus.driver}</span>
                              </div>
                            )}
                          </div>

                          {/* Status and Capacity */}
                          <div className="flex flex-col md:items-end gap-3">
                            <div
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${getStatusColor(
                                bus.status
                              )}`}
                            >
                              {getStatusIcon(bus.status)}
                              <span className="capitalize">{bus.status}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>Capacity: {bus.capacity} seats</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && fromLocation && toLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Bus className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  No buses found
                </h3>
                <p className="text-muted-foreground">
                  Try searching with different locations
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Popular Routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Popular Routes</CardTitle>
              <CardDescription>
                Quick access to frequently used routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {routes.slice(0, 6).map((route) => (
                  <motion.button
                    key={route.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const stops = route.stops;
                      setFromLocation(stops[0]);
                      setToLocation(stops[stops.length - 1]);
                    }}
                    className="text-left p-4 rounded-lg border hover:border-pink-300 hover:bg-pink-50 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-pink-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {route.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ৳{route.fare}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </UserSidebar>
  );
};

export default UserFindBus;
