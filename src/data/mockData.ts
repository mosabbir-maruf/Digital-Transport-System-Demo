// Mock data for development/demo
// TODO: Replace with actual API calls

// Admin Dashboard Mock Data
export const adminStats = {
  totalBuses: 12,
  totalDrivers: 24,
  activeRoutes: 6,
  todayTrips: 48,
};

export const busLocations = [
  { id: 1, name: "BUS-01", lat: 23.8759, lng: 90.3208, status: "active" },
  { id: 2, name: "BUS-02", lat: 23.8612, lng: 90.2985, status: "active" },
  { id: 3, name: "BUS-03", lat: 23.8508, lng: 90.2662, status: "idle" },
];

export const weeklyIncome = [
  { name: "Sat", income: 28000 },
  { name: "Sun", income: 32000 },
  { name: "Mon", income: 45000 },
  { name: "Tue", income: 42000 },
  { name: "Wed", income: 48000 },
  { name: "Thu", income: 52000 },
  { name: "Fri", income: 18000 },
];

export const monthlyIncome = [
  { name: "Jan", income: 850000 },
  { name: "Feb", income: 780000 },
  { name: "Mar", income: 920000 },
  { name: "Apr", income: 880000 },
  { name: "May", income: 650000 },
  { name: "Jun", income: 420000 },
  { name: "Jul", income: 380000 },
  { name: "Aug", income: 750000 },
  { name: "Sep", income: 980000 },
  { name: "Oct", income: 1050000 },
  { name: "Nov", income: 1120000 },
  { name: "Dec", income: 980000 },
];

export const yearlyIncome = [
  { name: "2020", income: 4500000 },
  { name: "2021", income: 5200000 },
  { name: "2022", income: 7800000 },
  { name: "2023", income: 9200000 },
  { name: "2024", income: 10500000 },
];

// Driver data (using team names for demo)
export const drivers = [
  { id: 1, name: "Md Tamim Islam", phone: "+880 1712-345678", bus: "BUS-01", status: "on-duty", trips: 8 },
  { id: 2, name: "Mahidul Islam", phone: "+880 1812-456789", bus: "BUS-02", status: "on-duty", trips: 6 },
  { id: 3, name: "Shahriar Limon", phone: "+880 1912-567890", bus: "BUS-03", status: "off-duty", trips: 0 },
  { id: 4, name: "Mosabbir Maruf", phone: "+880 1612-678901", bus: "BUS-04", status: "break", trips: 5 },
  { id: 5, name: "Belal Ahmed", phone: "+880 1512-789012", bus: "BUS-05", status: "break", trips: 4 },
  { id: 6, name: "Kuddus Ali", phone: "+880 1612-890123", bus: "BUS-06", status: "on-duty", trips: 7 },
];

// Bus fleet data
export const buses = [
  { id: 1, number: "BUS-01", model: "Hino AK", capacity: 52, status: "active", driver: "Md Tamim Islam", route: "Main Campus - Khagan - Birulia" },
  { id: 2, number: "BUS-02", model: "Ashok Leyland", capacity: 48, status: "active", driver: "Mahidul Islam", route: "Main Campus - Savar - Dhaka" },
  { id: 3, number: "BUS-03", model: "Tata Starbus", capacity: 54, status: "maintenance", driver: "Shahriar Limon", route: "Main Campus - Mirpur" },
  { id: 4, number: "BUS-04", model: "Hino AK", capacity: 52, status: "active", driver: "Mosabbir Maruf", route: "Main Campus - Uttara" },
  { id: 5, number: "BUS-05", model: "Eicher Skyline", capacity: 45, status: "active", driver: "Belal Ahmed", route: "Main Campus - Farmgate" },
  { id: 6, number: "BUS-06", model: "Hino RK", capacity: 56, status: "active", driver: "Kuddus Ali", route: "Main Campus - Motijheel" },
];

export const adminTransactions = [
  { id: 1, date: "2024-12-10", route: "Main Campus - Khagan - Birulia", trips: 12, revenue: 24000, expenses: 8000 },
  { id: 2, date: "2024-12-09", route: "Main Campus - Savar - Dhaka", trips: 8, revenue: 32000, expenses: 12000 },
  { id: 3, date: "2024-12-08", route: "Main Campus - Uttara", trips: 10, revenue: 28000, expenses: 9500 },
  { id: 4, date: "2024-12-07", route: "Main Campus - Mirpur", trips: 6, revenue: 18000, expenses: 6000 },
  { id: 5, date: "2024-12-06", route: "Main Campus - Farmgate", trips: 8, revenue: 22000, expenses: 7500 },
];

// User Dashboard Mock Data (bKash style)
export const userProfile = {
  name: "Hamza Choudhury",
  phone: "+880 1712-345678",
  email: "hamza.choudhury@example.com",
  memberId: "MEM-2024-0012",
  joinDate: "2024-01-15",
  address: "Dhaka, Bangladesh",
  studentId: "221-15-5678",
  department: "Computer Science & Engineering",
  batch: "58th",
};

export const userBalance = {
  total: 1250.50,
  todayExpense: 40.00,
  totalExpense: 8680.00,
  monthlyBudget: 2000.00,
};

export const userTransactions = [
  { id: 1, date: "2024-12-10", type: "Bus Fare", route: "Main Campus - Khagan", amount: -20.00, status: "completed" },
  { id: 2, date: "2024-12-10", type: "Recharge", description: "bKash Payment", amount: 500.00, status: "completed" },
  { id: 3, date: "2024-12-09", type: "Bus Fare", route: "Khagan - Main Campus", amount: -20.00, status: "completed" },
  { id: 4, date: "2024-12-08", type: "Bus Fare", route: "Main Campus - Birulia", amount: -25.00, status: "completed" },
  { id: 5, date: "2024-12-07", type: "Recharge", description: "Card Payment", amount: 1000.00, status: "completed" },
  { id: 6, date: "2024-12-06", type: "Bus Fare", route: "Savar - Main Campus", amount: -30.00, status: "completed" },
];

export const travelHistory = [
  { id: 1, date: "2024-12-10", from: "Main Campus", to: "Khagan", bus: "BUS-01", fare: 20.00, duration: "15 min" },
  { id: 2, date: "2024-12-09", from: "Khagan", to: "Main Campus", bus: "BUS-01", fare: 20.00, duration: "15 min" },
  { id: 3, date: "2024-12-08", from: "Main Campus", to: "Birulia", bus: "BUS-02", fare: 25.00, duration: "20 min" },
  { id: 4, date: "2024-12-07", from: "Savar", to: "Main Campus", bus: "BUS-02", fare: 30.00, duration: "25 min" },
  { id: 5, date: "2024-12-06", from: "Main Campus", to: "Savar", bus: "BUS-02", fare: 30.00, duration: "25 min" },
];

export const quickActions = [
  { id: 1, name: "Recharge", icon: "Wallet" },
  { id: 2, name: "Scan QR", icon: "QrCode" },
  { id: 3, name: "Routes", icon: "MapPin" },
  { id: 4, name: "Schedule", icon: "Calendar" },
];

export const companyInfo = {
  name: "Digital Transport System",
  fullName: "Digital Transport System",
  tagline: "Safe Journey for Everyone",
  address: "123 Transport Avenue, City Center, Dhaka-1216",
  phone: "+880 2-7788-9900",
  email: "transport@bms.com",
  established: "2020",
  website: "bus-management-service-demo.vercel.app",
};

export const routes = [
  { id: 1, name: "Main Campus - Khagan", stops: ["Main Campus", "Khagan Bazar", "Khagan"], fare: 20 },
  { id: 2, name: "Main Campus - Birulia", stops: ["Main Campus", "Khagan", "Birulia Bazar", "Birulia"], fare: 25 },
  { id: 3, name: "Main Campus - Savar", stops: ["Main Campus", "Khagan", "Birulia", "Savar Bus Stand"], fare: 30 },
  { id: 4, name: "Main Campus - Dhaka (Mirpur)", stops: ["Main Campus", "Savar", "Nabinagar", "Mirpur-10"], fare: 50 },
  { id: 5, name: "Main Campus - Dhaka (Uttara)", stops: ["Main Campus", "Savar", "Diabari", "Uttara"], fare: 55 },
  { id: 6, name: "Main Campus - Dhaka (Motijheel)", stops: ["Main Campus", "Savar", "Gabtoli", "Farmgate", "Motijheel"], fare: 70 },
];

export const announcements = [
  {
    id: 1,
    title: "New Route Added: Main Campus to Motijheel",
    message: "We're excited to announce a new route connecting Main Campus to Motijheel. This route will operate from 6:00 AM to 10:00 PM daily with buses every 30 minutes.\n\nFare: ৳70\nStops: Main Campus → Savar → Gabtoli → Farmgate → Motijheel",
    type: "important",
    date: "2024-12-10",
    time: "10:30 AM",
    link: { text: "View Route Details", url: "/user/find-bus" },
  },
  {
    id: 2,
    title: "Holiday Schedule Update",
    message: "Please note that bus services will operate on a reduced schedule during the upcoming holidays (December 25-26). Buses will run every 45 minutes instead of the regular 30-minute intervals.\n\nRegular schedule will resume on December 27, 2024.",
    type: "update",
    date: "2024-12-09",
    time: "2:15 PM",
  },
  {
    id: 3,
    title: "QR Code Payment Now Available",
    message: "You can now pay for your bus fare using QR codes! Simply scan the QR code at the bus entrance using our mobile app. This makes payment faster and more convenient.\n\nMake sure you have sufficient balance in your account before boarding.",
    type: "info",
    date: "2024-12-08",
    time: "9:00 AM",
    link: { text: "Learn More", url: "/user/help" },
  },
  {
    id: 4,
    title: "Maintenance Notice: BUS-03",
    message: "BUS-03 (Tata Starbus) is currently under maintenance and will be unavailable until further notice. We apologize for any inconvenience this may cause.\n\nAlternative buses are available on all routes. Please check the Find Bus page for real-time bus availability.",
    type: "important",
    date: "2024-12-07",
    time: "11:00 AM",
    link: { text: "Find Alternative Buses", url: "/user/find-bus" },
  },
  {
    id: 5,
    title: "New Driver Onboarding",
    message: "We're pleased to welcome new drivers to our team. All new drivers have completed comprehensive training and are ready to serve you safely.\n\nIf you have any feedback about your journey, please use the Report feature.",
    type: "info",
    date: "2024-12-05",
    time: "3:30 PM",
  },
  {
    id: 6,
    title: "Fare Adjustment Notice",
    message: "Effective January 1, 2025, there will be a minor fare adjustment on select routes due to operational costs. The new fares will be:\n\n• Main Campus - Khagan: ৳20 (no change)\n• Main Campus - Birulia: ৳25 (no change)\n• Main Campus - Savar: ৳32 (was ৳30)\n\nWe appreciate your understanding.",
    type: "update",
    date: "2024-12-04",
    time: "4:00 PM",
  },
];
