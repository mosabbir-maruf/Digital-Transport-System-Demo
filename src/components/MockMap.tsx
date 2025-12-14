import { cn } from "@/lib/utils";

interface MockMapProps {
  className?: string;
}

export function MockMap({ className }: MockMapProps) {
  const busMarkers = [
    { id: 1, name: "Bus 001", x: 35, y: 40, status: "active" },
    { id: 2, name: "Bus 002", x: 55, y: 60, status: "active" },
    { id: 3, name: "Bus 003", x: 70, y: 35, status: "idle" },
  ];

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
              id="grid"
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
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Fake roads */}
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

      {/* Bus markers */}
      {busMarkers.map((bus) => (
        <div
          key={bus.id}
          className="absolute flex flex-col items-center animate-pulse-soft"
          style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110",
              bus.status === "active"
                ? "admin-gradient"
                : "bg-muted-foreground/50"
            )}
          >
            <svg
              className="h-4 w-4 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="6" width="18" height="10" rx="2" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="17" cy="18" r="2" />
              <path d="M5 6V4a1 1 0 011-1h12a1 1 0 011 1v2" />
            </svg>
          </div>
          <span className="mt-1 text-xs font-medium text-foreground bg-card/80 px-2 py-0.5 rounded-full shadow-sm">
            {bus.name}
          </span>
        </div>
      ))}

      {/* Location label */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-card/90 backdrop-blur-sm px-3 py-2 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground">Dhaka Metropolitan</p>
        <p className="text-sm font-semibold text-foreground">Live Tracking</p>
      </div>
    </div>
  );
}
