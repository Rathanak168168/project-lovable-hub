export type Kind = "website" | "solution";

export type Template = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  price: number; // 0 = free
  kind: Kind;
  category: string;
  downloads: number;
  rating: number;
  createdAt: string;
  accent: string; // tailwind color class base, e.g. "emerald"
};

export const WEBSITE_CATEGORIES = [
  "Business Website",
  "eCommerce",
  "Restaurant",
  "Hotel",
  "School",
  "Hospital",
  "Travel Agency",
  "Real Estate",
  "Portfolio",
] as const;

export const SOLUTION_CATEGORIES = [
  "POS System",
  "Inventory System",
  "Attendance System",
  "School Management System",
  "Hospital Management System",
  "Booking System",
  "CRM",
  "ERP",
] as const;

export const ALL_CATEGORIES = [...WEBSITE_CATEGORIES, ...SOLUTION_CATEGORIES] as const;

const IMAGES: Record<string, string> = {
  "Business Website": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  "eCommerce": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
  "Restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  "Hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  "School": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  "Hospital": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80",
  "Travel Agency": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
  "Real Estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  "Portfolio": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
  "POS System": "https://images.unsplash.com/photo-1556742212-5b321f3c261b?w=1200&q=80",
  "Inventory System": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
  "Attendance System": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
  "School Management System": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
  "Hospital Management System": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
  "Booking System": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80",
  "CRM": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  "ERP": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
};

const ACCENTS: Record<string, string> = {
  "Business Website": "blue",
  "eCommerce": "emerald",
  "Restaurant": "amber",
  "Hotel": "rose",
  "School": "indigo",
  "Hospital": "sky",
  "Travel Agency": "teal",
  "Real Estate": "orange",
  "Portfolio": "violet",
  "POS System": "emerald",
  "Inventory System": "blue",
  "Attendance System": "indigo",
  "School Management System": "violet",
  "Hospital Management System": "sky",
  "Booking System": "rose",
  "CRM": "amber",
  "ERP": "teal",
};

type Seed = { name: string; description: string; price: number; downloads: number; rating: number; createdAt: string };

const websiteSeeds: Record<string, Seed[]> = {
  "Business Website": [
    { name: "Aster Consulting", description: "Modern corporate site with services, team, and case studies.", price: 39, downloads: 8420, rating: 4.8, createdAt: "2026-06-14" },
    { name: "Northline Agency", description: "Bold agency site with animated hero and portfolio grid.", price: 0, downloads: 12310, rating: 4.7, createdAt: "2026-05-02" },
  ],
  "eCommerce": [
    { name: "Nova Store", description: "Modern online storefront with cart and checkout flow.", price: 49, downloads: 15200, rating: 4.9, createdAt: "2026-06-01" },
    { name: "Vela Boutique", description: "Minimal fashion boutique with product filters.", price: 0, downloads: 9820, rating: 4.6, createdAt: "2026-04-11" },
  ],
  "Restaurant": [
    { name: "Bistro Bloom", description: "Warm restaurant site with menu and reservations.", price: 29, downloads: 6420, rating: 4.7, createdAt: "2026-05-24" },
    { name: "Saffron Table", description: "Fine dining site with chef highlights.", price: 0, downloads: 4210, rating: 4.5, createdAt: "2026-03-11" },
  ],
  "Hotel": [
    { name: "Azure Bay Resort", description: "Luxury hotel site with room booking.", price: 59, downloads: 5320, rating: 4.8, createdAt: "2026-06-18" },
    { name: "Urban Stay", description: "City boutique hotel with availability search.", price: 0, downloads: 7120, rating: 4.6, createdAt: "2026-05-06" },
  ],
  "School": [
    { name: "Brightpath Academy", description: "K-12 school site with programs and admissions.", price: 35, downloads: 3420, rating: 4.5, createdAt: "2026-04-21" },
    { name: "Learnhub College", description: "College site with courses and events.", price: 0, downloads: 5680, rating: 4.6, createdAt: "2026-03-28" },
  ],
  "Hospital": [
    { name: "Meridian Health", description: "Hospital site with departments and doctor booking.", price: 45, downloads: 2820, rating: 4.7, createdAt: "2026-05-30" },
    { name: "CityCare Clinic", description: "Clinic site with services and appointment form.", price: 0, downloads: 4110, rating: 4.5, createdAt: "2026-04-15" },
  ],
  "Travel Agency": [
    { name: "Wander Trails", description: "Travel agency with tour packages and inquiry.", price: 39, downloads: 4520, rating: 4.7, createdAt: "2026-06-08" },
    { name: "Voyage Co.", description: "Adventure travel site with destinations.", price: 0, downloads: 6320, rating: 4.6, createdAt: "2026-05-17" },
  ],
  "Real Estate": [
    { name: "Haven Realty", description: "Real estate site with property listings and search.", price: 49, downloads: 3820, rating: 4.8, createdAt: "2026-06-22" },
    { name: "Cornerstone Homes", description: "Home listings with agent contact.", price: 0, downloads: 5220, rating: 4.5, createdAt: "2026-04-30" },
  ],
  "Portfolio": [
    { name: "Prism Portfolio", description: "Elegant portfolio for designers and studios.", price: 0, downloads: 8342, rating: 4.6, createdAt: "2026-05-02" },
    { name: "Studio Mono", description: "Monochrome portfolio with grid gallery.", price: 25, downloads: 4890, rating: 4.7, createdAt: "2026-06-11" },
  ],
};

const solutionSeeds: Record<string, Seed> = {
  "POS System": { name: "SwiftPOS", description: "Point-of-sale system with cart, discounts, and receipts.", price: 79, downloads: 3120, rating: 4.8, createdAt: "2026-06-14" },
  "Inventory System": { name: "StockPilot", description: "Track products, stock levels, and suppliers.", price: 69, downloads: 2820, rating: 4.7, createdAt: "2026-05-24" },
  "Attendance System": { name: "TimeMark", description: "Employee attendance tracking with reports.", price: 49, downloads: 3420, rating: 4.6, createdAt: "2026-04-18" },
  "School Management System": { name: "EduHub", description: "Students, teachers, classes, and grades in one place.", price: 99, downloads: 1820, rating: 4.8, createdAt: "2026-06-04" },
  "Hospital Management System": { name: "MediCore", description: "Patients, appointments, doctors, and billing.", price: 129, downloads: 1420, rating: 4.9, createdAt: "2026-05-11" },
  "Booking System": { name: "BookFlow", description: "Online booking with calendar and confirmations.", price: 59, downloads: 4820, rating: 4.7, createdAt: "2026-06-20" },
  "CRM": { name: "PulseCRM", description: "Manage leads, deals, and customer pipeline.", price: 89, downloads: 3620, rating: 4.7, createdAt: "2026-05-08" },
  "ERP": { name: "OrbitERP", description: "Finance, HR, and operations in a unified suite.", price: 149, downloads: 980, rating: 4.6, createdAt: "2026-04-02" },
};

let nextId = 1;
const templates: Template[] = [];

for (const cat of WEBSITE_CATEGORIES) {
  for (const s of websiteSeeds[cat]) {
    templates.push({
      id: nextId++, kind: "website", category: cat, thumbnail: IMAGES[cat], accent: ACCENTS[cat],
      ...s,
    });
  }
}
for (const cat of SOLUTION_CATEGORIES) {
  const s = solutionSeeds[cat];
  templates.push({
    id: nextId++, kind: "solution", category: cat, thumbnail: IMAGES[cat], accent: ACCENTS[cat],
    ...s,
  });
}

export const TEMPLATES = templates;
