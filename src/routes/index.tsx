import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Menu,
  Star,
  Download,
  ChevronDown,
  Filter,
  Store,
  User,
  Utensils,
  Building2,
  GraduationCap,
  HeartPulse,
  Plane,
  Home,
  Briefcase,
  ShoppingCart,
  Package,
  Clock,
  School as SchoolIcon,
  Stethoscope,
  CalendarCheck,
  Users,
  Layers,
  ExternalLink,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  TEMPLATES,
  WEBSITE_CATEGORIES,
  SOLUTION_CATEGORIES,
  type Template,
} from "@/lib/templates-data";

export const Route = createFileRoute("/")({ component: Index });

const CATEGORY_ICONS: Record<string, typeof Store> = {
  "Business Website": Briefcase,
  eCommerce: Store,
  Restaurant: Utensils,
  Hotel: Building2,
  School: GraduationCap,
  Hospital: HeartPulse,
  "Travel Agency": Plane,
  "Real Estate": Home,
  Portfolio: User,
  "POS System": ShoppingCart,
  "Inventory System": Package,
  "Attendance System": Clock,
  "School Management System": SchoolIcon,
  "Hospital Management System": Stethoscope,
  "Booking System": CalendarCheck,
  CRM: Users,
  ERP: Layers,
};

const PAGE_SIZE = 9;

/* ---------- Logo mark ---------- */

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="26" height="20" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="3" y="6" width="26" height="6" rx="4" fill="currentColor" opacity="0.35" />
      <circle cx="7" cy="9" r="1" fill="currentColor" />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
      <path
        d="M20 13l1.8 3.7L25.5 18l-3.7 1.3L20 23l-1.3-3.7L15 18l3.7-1.3L20 13z"
        fill="currentColor"
      />
    </svg>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [kind, setKind] = useState<"all" | "website" | "solution">("all");
  const [price, setPrice] = useState<"all" | "free" | "premium">("all");
  const [sort, setSort] = useState<"popularity" | "latest" | "downloads">("popularity");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    let items = [...TEMPLATES];
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }
    if (category) items = items.filter((t) => t.category === category);
    if (kind !== "all") items = items.filter((t) => t.kind === kind);
    if (price === "free") items = items.filter((t) => t.price === 0);
    if (price === "premium") items = items.filter((t) => t.price > 0);
    if (sort === "latest") items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sort === "downloads") items.sort((a, b) => b.downloads - a.downloads);
    else
      items.sort(
        (a, b) => b.rating * 1000 + b.downloads / 1000 - (a.rating * 1000 + a.downloads / 1000),
      );
    return items;
  }, [query, category, kind, price, sort]);

  useEffect(() => {
    setPage(1);
  }, [query, category, kind, price, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const scrollToCatalog = () =>
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const pickCategory = (c: string) => {
    setCategory(c);
    const isSolution = (SOLUTION_CATEGORIES as readonly string[]).includes(c);
    setKind(isSolution ? "solution" : "website");
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar
        query={query}
        setQuery={setQuery}
        mobileOpen={mobileNavOpen}
        setMobileOpen={setMobileNavOpen}
        onCategoryPick={pickCategory}
      />

      <Hero query={query} setQuery={setQuery} onSearch={scrollToCatalog} searchRef={searchRef} />

      <CategoryChips
        active={category}
        onPick={(c) => {
          if (c === category) {
            setCategory(null);
            setKind("all");
            scrollToCatalog();
          } else pickCategory(c);
        }}
      />

      <section ref={catalogRef} className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {category ??
                (kind === "solution"
                  ? "Business Solutions"
                  : kind === "website"
                    ? "Websites"
                    : "All templates")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <div className="pt-6">
                  <FiltersPanel
                    price={price}
                    setPrice={setPrice}
                    kind={kind}
                    setKind={setKind}
                    category={category}
                    setCategory={setCategory}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border bg-card p-5">
              <FiltersPanel
                price={price}
                setPrice={setPrice}
                kind={kind}
                setKind={setKind}
                category={category}
                setCategory={setCategory}
              />
            </div>
          </aside>

          <div className="min-w-0">
            {pageItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-16 text-center">
                <p className="font-display text-lg font-semibold">No results match your filters</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try clearing a filter or searching for something else.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setQuery("");
                    setCategory(null);
                    setKind("all");
                    setPrice("all");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((t) => (
                  <TemplateCard key={t.id} t={t} />
                ))}
              </div>
            )}

            {totalPages > 1 && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- Navbar ---------- */

function Navbar({
  query,
  setQuery,
  mobileOpen,
  setMobileOpen,
  onCategoryPick,
}: {
  query: string;
  setQuery: (v: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  onCategoryPick: (c: string) => void;
}) {
  const [openMenu, setOpenMenu] = useState<null | "websites" | "solutions">(null);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <LogoMark className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">Website Agent</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <MegaMenu
            label="Websites"
            open={openMenu === "websites"}
            onOpenChange={(o) => setOpenMenu(o ? "websites" : null)}
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              {WEBSITE_CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICONS[c];
                return (
                  <button
                    key={c}
                    onClick={() => {
                      onCategoryPick(c);
                      setOpenMenu(null);
                    }}
                    className="flex items-start gap-3 rounded-lg p-3 text-left hover:bg-accent"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{c}</div>
                      <div className="text-xs text-muted-foreground">
                        Browse {c.toLowerCase()} templates
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </MegaMenu>
          <MegaMenu
            label="Business Solutions"
            open={openMenu === "solutions"}
            onOpenChange={(o) => setOpenMenu(o ? "solutions" : null)}
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              {SOLUTION_CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICONS[c];
                return (
                  <button
                    key={c}
                    onClick={() => {
                      onCategoryPick(c);
                      setOpenMenu(null);
                    }}
                    className="flex items-start gap-3 rounded-lg p-3 text-left hover:bg-accent"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{c}</div>
                      <div className="text-xs text-muted-foreground">Ready-to-launch software</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </MegaMenu>
          <Link to="/about" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
            About
          </Link>
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2">
          <div className="relative hidden max-w-xs flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search websites & solutions..."
              className="pl-9"
            />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <div className="mt-6 space-y-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="pl-9"
                  />
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Websites
                  </div>
                  <div className="grid gap-1">
                    {WEBSITE_CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          onCategoryPick(c);
                          setMobileOpen(false);
                        }}
                        className="rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Business Solutions
                  </div>
                  <div className="grid gap-1">
                    {SOLUTION_CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          onCategoryPick(c);
                          setMobileOpen(false);
                        }}
                        className="rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  About
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({
  label,
  open,
  onOpenChange,
  children,
}: {
  label: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseLeave={() => onOpenChange(false)}>
      <button
        onMouseEnter={() => onOpenChange(true)}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
          open && "bg-accent",
        )}
      >
        {label} <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-[560px] pt-2">
          <div className="rounded-xl border bg-popover shadow-xl">{children}</div>
        </div>
      )}
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero({
  query,
  setQuery,
  onSearch,
  searchRef,
}: {
  query: string;
  setQuery: (v: string) => void;
  onSearch: () => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
}) {
  const floatingPreviews = [
    {
      Icon: Utensils,
      label: "Bistro & Co.",
      accent: "bg-orange-500",
      wrap: "left-[2%] top-[14%] hidden lg:block",
      rotate: "-rotate-6",
      delay: "0s",
    },
    {
      Icon: Store,
      label: "Shopfront",
      accent: "bg-emerald-500",
      wrap: "right-[4%] top-[10%] hidden lg:block",
      rotate: "rotate-6",
      delay: "0.6s",
    },
    {
      Icon: Building2,
      label: "Grand Hotel",
      accent: "bg-sky-500",
      wrap: "left-[9%] bottom-[8%] hidden xl:block",
      rotate: "rotate-3",
      delay: "1.2s",
    },
    {
      Icon: User,
      label: "Portfolio",
      accent: "bg-violet-500",
      wrap: "right-[8%] bottom-[12%] hidden xl:block",
      rotate: "-rotate-3",
      delay: "1.8s",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b">
      {/* Blueprint dot-grid texture — nods to "building" a site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--color-foreground) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(620px 320px at 18% 8%, color-mix(in oklab, var(--color-primary) 20%, transparent), transparent), radial-gradient(520px 320px at 85% 22%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent)",
        }}
      />

      {/* Floating template preview cards */}
      {floatingPreviews.map(({ Icon, label, accent, wrap, rotate, delay }) => (
        <div
          key={label}
          className={cn(
            "absolute z-0 w-[150px] motion-safe:animate-[float_6s_ease-in-out_infinite]",
            wrap,
            rotate,
          )}
          style={{ animationDelay: delay }}
        >
          <div className="overflow-hidden rounded-xl border bg-card/90 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1 border-b bg-muted/50 px-2 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-1.5 p-3">
              <div className={cn("grid h-7 w-7 place-items-center rounded-md text-white", accent)}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="h-1.5 w-4/5 rounded-full bg-muted-foreground/20" />
              <div className="h-1.5 w-3/5 rounded-full bg-muted-foreground/20" />
              <div className="pt-0.5 text-[10px] font-medium text-muted-foreground">{label}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Find the perfect{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            website to grow
          </span>{" "}
          your business
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Ready-to-use website templates for landing pages, online stores, dashboards, and more —
          designed to help your business grow faster.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="relative mx-auto mt-8 max-w-xl"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 opacity-0 blur-lg transition-opacity duration-300 focus-within:opacity-100" />
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 'restaurant', 'hotel', 'POS system'..."
              className="h-14 rounded-full border-2 bg-card pl-12 pr-24 text-base shadow-sm"
            />
            <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </section>
  );
}
/* ---------- Category chips ---------- */

function CategoryChips({ active, onPick }: { active: string | null; onPick: (c: string) => void }) {
  return (
    <div className="border-b bg-muted/30">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {WEBSITE_CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c];
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => onPick(c)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:bg-accent",
              )}
            >
              <Icon className="h-4 w-4" />
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Filters ---------- */

function FiltersPanel({
  price,
  setPrice,
  kind,
  setKind,
  category,
  setCategory,
}: {
  price: "all" | "free" | "premium";
  setPrice: (v: "all" | "free" | "premium") => void;
  kind: "all" | "website" | "solution";
  setKind: (v: "all" | "website" | "solution") => void;
  category: string | null;
  setCategory: (c: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Type</h3>
        <RadioGroup
          value={kind}
          onValueChange={(v) => setKind(v as "all" | "website" | "solution")}
        >
          {[
            { v: "all", l: "All" },
            { v: "website", l: "Websites" },
            { v: "solution", l: "Business Solutions" },
          ].map((o) => (
            <div key={o.v} className="flex items-center gap-2">
              <RadioGroupItem id={`kind-${o.v}`} value={o.v} />
              <Label htmlFor={`kind-${o.v}`} className="cursor-pointer text-sm font-normal">
                {o.l}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Price</h3>
        <RadioGroup value={price} onValueChange={(v) => setPrice(v as "all" | "free" | "premium")}>
          {[
            { v: "all", l: "All" },
            { v: "free", l: "Free" },
            { v: "premium", l: "Premium" },
          ].map((o) => (
            <div key={o.v} className="flex items-center gap-2">
              <RadioGroupItem id={`price-${o.v}`} value={o.v} />
              <Label htmlFor={`price-${o.v}`} className="cursor-pointer text-sm font-normal">
                {o.l}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Websites</h3>
        <div className="space-y-1">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              "block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
              category === null && "bg-accent font-semibold",
            )}
          >
            All categories
          </button>
          {WEBSITE_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
                category === c && "bg-accent font-semibold",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">
          Business Solutions
        </h3>
        <div className="space-y-1">
          {SOLUTION_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
                category === c && "bg-accent font-semibold",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Sort ---------- */

function SortDropdown({
  value,
  onChange,
}: {
  value: "popularity" | "latest" | "downloads";
  onChange: (v: "popularity" | "latest" | "downloads") => void;
}) {
  const label =
    value === "popularity" ? "Popularity" : value === "latest" ? "Latest" : "Most Downloaded";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Sort: {label} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange("popularity")}>Popularity</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("latest")}>Latest</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("downloads")}>Most Downloaded</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------- Card ---------- */

function TemplateCard({ t }: { t: Template }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={t.thumbnail}
          alt={`${t.name} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            to="/demo/$id"
            params={{ id: String(t.id) }}
            target="_blank"
            rel="noopener"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground shadow-lg hover:bg-secondary/90"
          >
            Live Preview <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <div className="absolute left-3 top-3">
          <Badge
            className={cn(
              t.price === 0
                ? "bg-emerald-500 text-white hover:bg-emerald-500"
                : "bg-foreground text-background hover:bg-foreground",
            )}
          >
            {t.price === 0 ? "Free" : `$${t.price}`}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {t.category}
          </Badge>
        </div>

        <h3 className="font-display text-base font-bold">{t.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {t.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="h-3.5 w-3.5" /> {t.downloads.toLocaleString()}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to="/demo/$id"
            params={{ id: String(t.id) }}
            target="_blank"
            rel="noopener"
            className="inline-flex flex-1 items-center justify-center rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            Live Preview
          </Link>
          {t.price === 0 ? (
            <Button
              className="flex-1"
              onClick={() =>
                toast.success(`Downloading ${t.name}...`, {
                  description: "Mock download — no file will be sent.",
                })
              }
            >
              <Download className="mr-2 h-4 w-4" /> Get
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={() =>
                toast("Checkout coming soon", { description: `${t.name} · $${t.price}` })
              }
            >
              Buy — ${t.price}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Pagination ---------- */

function Pagination({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: (n: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="sm"
          onClick={() => setPage(p)}
          className="min-w-9"
        >
          {p}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <LogoMark className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold">Website Agent</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Modern websites and digital solutions for businesses of all sizes.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider">Follow</h4>
            <div className="mt-3 flex gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Website Agent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
