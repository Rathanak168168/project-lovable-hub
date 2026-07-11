export type Template = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  price: number; // 0 = free
  framework: "Bootstrap" | "Tailwind" | "Next.js" | "React" | "Vue";
  category: "eCommerce" | "Portfolio" | "Landing Page" | "Admin Dashboard" | "Restaurant";
  downloads: number;
  rating: number;
  createdAt: string;
};

// Category-appropriate real imagery from Unsplash
const IMAGES: Record<string, string[]> = {
  eCommerce: [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
  ],
  Portfolio: [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
    "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1200&q=80",
  ],
  "Landing Page": [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
  ],
  "Admin Dashboard": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80",
  ],
  Restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=1200&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
  ],
};
const pickCounter: Record<string, number> = {};
const img = (category: keyof typeof IMAGES) => {
  const list = IMAGES[category];
  const i = (pickCounter[category] ?? 0) % list.length;
  pickCounter[category] = i + 1;
  return list[i];
};

export const TEMPLATES: Template[] = [
  { id: 1, name: "Nova Commerce", description: "Modern storefront with cart & checkout flow.", thumbnail: img("eCommerce"), price: 39, framework: "Next.js", category: "eCommerce", downloads: 12480, rating: 4.8, createdAt: "2026-06-14" },
  { id: 2, name: "Prism Portfolio", description: "Elegant portfolio for designers and studios.", thumbnail: img("Portfolio"), price: 0, framework: "React", category: "Portfolio", downloads: 8342, rating: 4.6, createdAt: "2026-05-02" },
  { id: 3, name: "Orbit Admin", description: "Full-featured dashboard with charts & tables.", thumbnail: img("Admin Dashboard"), price: 59, framework: "Tailwind", category: "Admin Dashboard", downloads: 21390, rating: 4.9, createdAt: "2026-04-21" },
  { id: 4, name: "Bistro Bloom", description: "Warm restaurant site with reservations.", thumbnail: img("Restaurant"), price: 29, framework: "Vue", category: "Restaurant", downloads: 4210, rating: 4.4, createdAt: "2026-03-11" },
  { id: 5, name: "Pulse Landing", description: "High-converting SaaS landing page.", thumbnail: img("Landing Page"), price: 0, framework: "Tailwind", category: "Landing Page", downloads: 15320, rating: 4.7, createdAt: "2026-07-01" },
  { id: 6, name: "Atlas Store", description: "Multi-vendor marketplace boilerplate.", thumbnail: img("eCommerce"), price: 49, framework: "Next.js", category: "eCommerce", downloads: 6720, rating: 4.5, createdAt: "2026-02-19" },
  { id: 7, name: "Ink Folio", description: "Editorial portfolio with case studies.", thumbnail: img("Portfolio"), price: 25, framework: "React", category: "Portfolio", downloads: 3110, rating: 4.3, createdAt: "2026-01-08" },
  { id: 8, name: "Quartz Dash", description: "Analytics dashboard with dark mode.", thumbnail: img("Admin Dashboard"), price: 0, framework: "React", category: "Admin Dashboard", downloads: 9820, rating: 4.6, createdAt: "2026-06-30" },
  { id: 9, name: "Saffron Table", description: "Fine dining site with menu highlights.", thumbnail: img("Restaurant"), price: 35, framework: "Bootstrap", category: "Restaurant", downloads: 2140, rating: 4.2, createdAt: "2025-12-14" },
  { id: 10, name: "Lift Landing", description: "Bold hero-first marketing page.", thumbnail: img("Landing Page"), price: 19, framework: "Next.js", category: "Landing Page", downloads: 11250, rating: 4.7, createdAt: "2026-05-24" },
  { id: 11, name: "Vela Shop", description: "Minimal fashion boutique template.", thumbnail: img("eCommerce"), price: 45, framework: "Vue", category: "eCommerce", downloads: 5480, rating: 4.5, createdAt: "2026-04-03" },
  { id: 12, name: "Studio Mono", description: "Monochrome portfolio with grid gallery.", thumbnail: img("Portfolio"), price: 0, framework: "Tailwind", category: "Portfolio", downloads: 7890, rating: 4.6, createdAt: "2026-06-11" },
  { id: 13, name: "Metric Ops", description: "Ops-focused admin with real-time widgets.", thumbnail: img("Admin Dashboard"), price: 65, framework: "Next.js", category: "Admin Dashboard", downloads: 4820, rating: 4.4, createdAt: "2026-03-27" },
  { id: 14, name: "Harvest Kitchen", description: "Farm-to-table restaurant template.", thumbnail: img("Restaurant"), price: 0, framework: "React", category: "Restaurant", downloads: 3320, rating: 4.5, createdAt: "2026-02-05" },
  { id: 15, name: "Rocket Launch", description: "Product launch page with waitlist.", thumbnail: img("Landing Page"), price: 15, framework: "Tailwind", category: "Landing Page", downloads: 18920, rating: 4.8, createdAt: "2026-07-05" },
  { id: 16, name: "Kite Market", description: "Digital goods marketplace template.", thumbnail: img("eCommerce"), price: 55, framework: "React", category: "eCommerce", downloads: 3980, rating: 4.3, createdAt: "2026-01-30" },
  { id: 17, name: "Canvas Folio", description: "Photography-first portfolio.", thumbnail: img("Portfolio"), price: 30, framework: "Vue", category: "Portfolio", downloads: 2670, rating: 4.4, createdAt: "2025-11-22" },
  { id: 18, name: "Beacon Admin", description: "Lightweight admin panel starter.", thumbnail: img("Admin Dashboard"), price: 0, framework: "Bootstrap", category: "Admin Dashboard", downloads: 14210, rating: 4.5, createdAt: "2026-05-16" },
  { id: 19, name: "Ember Grill", description: "Steakhouse & bar site template.", thumbnail: img("Restaurant"), price: 27, framework: "Tailwind", category: "Restaurant", downloads: 1980, rating: 4.2, createdAt: "2025-10-09" },
  { id: 20, name: "Signal Landing", description: "Startup landing with pricing tiers.", thumbnail: img("Landing Page"), price: 22, framework: "Next.js", category: "Landing Page", downloads: 8760, rating: 4.6, createdAt: "2026-04-18" },
  { id: 21, name: "Marble Store", description: "Luxury goods eCommerce theme.", thumbnail: img("eCommerce"), price: 69, framework: "Next.js", category: "eCommerce", downloads: 2340, rating: 4.7, createdAt: "2026-06-25" },
  { id: 22, name: "Draft Folio", description: "Writer & journalist portfolio.", thumbnail: img("Portfolio"), price: 0, framework: "React", category: "Portfolio", downloads: 5120, rating: 4.4, createdAt: "2026-03-02" },
  { id: 23, name: "Console Admin", description: "Developer console UI kit.", thumbnail: img("Admin Dashboard"), price: 42, framework: "Tailwind", category: "Admin Dashboard", downloads: 7640, rating: 4.5, createdAt: "2026-05-09" },
  { id: 24, name: "Basil & Co", description: "Cozy cafe with online ordering.", thumbnail: img("Restaurant"), price: 0, framework: "Vue", category: "Restaurant", downloads: 6210, rating: 4.6, createdAt: "2026-06-18" },
];
