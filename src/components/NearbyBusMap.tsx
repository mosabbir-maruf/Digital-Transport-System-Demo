// Map component showing nearby buses
// TODO: Integrate Google Maps or Mapbox API
// Note: Currently using mock coordinates

import { useState } from "react";
import { cn } from "@/lib/utils";
import { busLocations, buses } from "@/data/mockData";
import { Bus, MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

interface NearbyBusMapProps {
  className?: string;
}

// Convert GPS coords to map position (mock implementation)
const convertToMapPosition = (lat: number, lng: number) => {
  // Dhaka approximate bounds
  const minLat = 23.70;
  const maxLat = 23.90;
  const minLng = 90.20;
  const maxLng = 90.45;

  // Normalize to 0-100%
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100; // Invert Y axis

  return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
};

export function NearbyBusMap({ className }: NearbyBusMapProps) {
  const [selectedBus, setSelectedBus] = useState<number | null>(null);

  // Merge busLocations with bus details
  const busesWithLocations = busLocations.map((location) => {
    const busDetails = buses.find((b) => b.number === location.name);
    return {
      ...location,
      ...busDetails,
    };
  });

  // User location (mock - Main Campus area)
  const userLocation = { lat: 23.8759, lng: 90.3208 };
  const userPos = convertToMapPosition(userLocation.lat, userLocation.lng);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-border",
        className
      )}
    >
      {/* Map grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="nearby-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-400"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nearby-grid)" />
        </svg>
      </div>

      {/* Roads */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M10,50 Q30,30 50,50 T90,50"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M50,10 Q30,30 50,50 T50,90"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M20,20 L80,80"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* User Location Marker */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute flex flex-col items-center z-20"
        style={{ left: `${userPos.x}%`, top: `${userPos.y}%` }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-12 w-12 rounded-full bg-pink-500/20 border-2 border-pink-500"
        />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 shadow-lg border-2 border-white">
          <Navigation className="h-4 w-4 text-white" />
        </div>
        <span className="mt-1 text-xs font-semibold text-pink-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm border border-pink-200">
          You
        </span>
      </motion.div>

      {/* Bus markers */}
      {busesWithLocations.map((bus, index) => {
        const pos = convertToMapPosition(bus.lat, bus.lng);
        const isSelected = selectedBus === bus.id;
        const isActive = bus.status === "active";

        return (
          <motion.div
            key={bus.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute flex flex-col items-center z-10 cursor-pointer group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => setSelectedBus(isSelected ? null : bus.id)}
          >
            {/* Pulse animation for active buses */}
            {isActive && (
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute h-10 w-10 rounded-full bg-green-500/30"
              />
            )}
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all border-2",
                isActive
                  ? "bg-green-500 border-green-600"
                  : "bg-gray-400 border-gray-500",
                isSelected && "ring-4 ring-pink-300 ring-offset-2"
              )}
            >
              <Bus className="h-5 w-5 text-white" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{
                opacity: isSelected ? 1 : 0,
                y: isSelected ? 0 : -5,
              }}
              className="mt-2 min-w-[80px] text-center"
            >
              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200">
                <p className="text-xs font-bold text-foreground">{bus.name}</p>
                {bus.route && (
                  <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                    {bus.route}
                  </p>
                )}
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isActive ? "bg-green-500" : "bg-gray-400"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isActive ? "text-green-600" : "text-gray-500"
                    )}
                  >
                    {isActive ? "Active" : "Idle"}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 backdrop-blur-sm px-4 py-3 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-pink-600" />
          <p className="text-xs font-semibold text-foreground">Nearby Buses</p>
        </div>
        <p className="text-[10px] text-muted-foreground">
          {busesWithLocations.filter((b) => b.status === "active").length} active
          • {busesWithLocations.length} total
        </p>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 rounded-lg bg-white/95 backdrop-blur-sm px-3 py-2 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-xs text-foreground">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-400" />
          <span className="text-xs text-foreground">Idle</span>
        </div>
      </div>
    </div>
  );
}

