# Digital Transport System

A digital transport system I built for managing fleet operations, tracking drivers, and providing passenger services. Has separate dashboards for admins and users.

## Features

- **User Dashboard**: Find buses, track nearby buses on map, view announcements, transaction history
- **Admin Dashboard**: Fleet management, live bus tracking, financial analytics, driver management

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Query, Context API
- **UI Components**: Radix UI (shadcn/ui)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Build for development
bun run build:dev

# Preview production build
bun run preview

# Lint code
bun run lint
```

Open [http://localhost:1182](http://localhost:1182)

## Project Structure

```
bus-journey-showcase-main/
├── public/
│   ├── avatar/
│   │   └── hamza-avatar.jpg
│   ├── favicon.svg
│   ├── meta-graph.png
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── AdminSidebar.tsx
│   │   ├── UserSidebar.tsx
│   │   ├── NearbyBusMap.tsx
│   │   ├── MockMap.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── StatCard.tsx
│   │   ├── IncomeChart.tsx
│   │   ├── QuickAction.tsx
│   │   ├── TransactionItem.tsx
│   │   └── NavLink.tsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminBuses.tsx
│   │   │   ├── AdminDrivers.tsx
│   │   │   ├── AdminTransactions.tsx
│   │   │   ├── AdminCompanyInfo.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   └── AdminRegister.tsx
│   │   ├── user/
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── UserFindBus.tsx
│   │   │   ├── UserAnnouncements.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   ├── UserTransactions.tsx
│   │   │   ├── UserTravelHistory.tsx
│   │   │   ├── UserReport.tsx
│   │   │   ├── UserHelp.tsx
│   │   │   ├── UserLogin.tsx
│   │   │   └── UserRegister.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── RegisterSelection.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── components.json
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## Notes

- Currently using mock data - API integration is pending
- Some features like payment gateway and real-time GPS tracking are planned for future updates
- Built this as a side project to practice React and TypeScript

## Author

[Mosabbir Maruf](https://github.com/mosabbir-maruf) | [Portfolio](https://mosabbir.dev)
