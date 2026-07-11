import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, Menu, X, Star, Download, ChevronDown, Filter,
  LayoutGrid, Store, User, Utensils, Rocket, Gauge, Github, Twitter, Linkedin,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TEMPLATES, type Template } from "@/lib/templates-data";

export const Route = createFileRoute("/")({ component: Index });

const CATEGORIES = ["eCommerce", "Admin Dashboard", "Portfolio", "Landing Page", "Restaurant"] as const;
const FRAMEWORKS = ["Bootstrap", "Tailwind", "Next.js", "React", "Vue"] as const;
const CATEGORY_ICONS: Record<string, typeof Store> = {
  eCommerce: Store, Portfolio: User, "Landing Page": Rocket,
  "Admin Dashboard": Gauge, Restaurant: Utensils,
};
const PAGE_SIZE = 9;

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<"all" | "free" | "premium">("all");
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [sort, setSort] = useState<"popularity" | "latest" | "downloads">("popularity");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  // ⌘K focus
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
      items = items.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.framework.toLowerCase().includes(q),
      );
    }
    if (category) items = items.filter(t => t.category === category);
    if (price === "free") items = items.filter(t => t.price === 0);
    if (price === "premium") items = items.filter(t => t.price > 0);
    if (frameworks.length) items = items.filter(t => frameworks.includes(t.framework));
    if (sort === "latest") items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sort === "downloads") items.sort((a, b) => b.downloads - a.downloads);
    else items.sort((a, b) => b.rating * 1000 + b.downloads / 1000 - (a.rating * 1000 + a.downloads / 1000));
    return items;
  }, [query, category, price, frameworks, sort]);

  useEffect(() => { setPage(1); }, [query, category, price, frameworks, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const toggleFramework = (fw: string) => {
    setFrameworks(prev => prev.includes(fw) ? prev.filter(f => f !== fw) : [...prev, fw]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar
        query={query}
        setQuery={setQuery}
        mobileOpen={mobileNavOpen}
        setMobileOpen={setMobileNavOpen}
        onCategoryPick={(c) => { setCategory(c); scrollToCatalog(); }}
      />

      <Hero
        query={query}
        setQuery={setQuery}
        onSearch={scrollToCatalog}
        searchRef={searchRef}
      />

      <CategoryChips active={category} onPick={(c) => { setCategory(c === category ? null : c); scrollToCatalog(); }} />

      <section ref={catalogRef} className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {category ?? "All templates"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filtered.length} template{filtered.length === 1 ? "" : "s"} found
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
                    price={price} setPrice={setPrice}
                    frameworks={frameworks} toggleFramework={toggleFramework}
                    category={category} setCategory={(c) => setCategory(c)}
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
                price={price} setPrice={setPrice}
                frameworks={frameworks} toggleFramework={toggleFramework}
                category={category} setCategory={setCategory}
              />
            </div>
          </aside>

          <div className="min-w-0">
            {pageItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-16 text-center">
                <p className="font-display text-lg font-semibold">No templates match your filters</p>
                <p className="mt-1 text-sm text-muted-foreground">Try clearing a filter or searching for something else.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setQuery(""); setCategory(null); setPrice("all"); setFrameworks([]);
                }}>Reset filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map(t => <TemplateCard key={t.id} t={t} />)}
              </div>
            )}

            {totalPages > 1 && (
              <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- Navbar ---------- */

function Navbar({
  query, setQuery, mobileOpen, setMobileOpen, onCategoryPick,
}: {
  query: string; setQuery: (v: string) => void;
  mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
  onCategoryPick: (c: string) => void;
}) {
  const [openMenu, setOpenMenu] = useState<null | "websites" | "business">(null);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">WebMarket</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          <MegaMenu
            label="Websites"
            open={openMenu === "websites"}
            onOpenChange={(o) => setOpenMenu(o ? "websites" : null)}
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              {CATEGORIES.map(c => {
                const Icon = CATEGORY_ICONS[c];
                return (
                  <button key={c}
                    onClick={() => { onCategoryPick(c); setOpenMenu(null); }}
                    className="flex items-start gap-3 rounded-lg p-3 text-left hover:bg-accent">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{c}</div>
                      <div className="text-xs text-muted-foreground">Browse {c.toLowerCase()} templates</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </MegaMenu>
          <MegaMenu
            label="Business Solutions"
            open={openMenu === "business"}
            onOpenChange={(o) => setOpenMenu(o ? "business" : null)}
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              {["Enterprise licensing", "Custom development", "Team plans", "White-label", "Priority support", "Design services"].map(l => (
                <button key={l} onClick={() => { setOpenMenu(null); toast("Coming soon"); }}
                  className="rounded-lg p-3 text-left text-sm hover:bg-accent">
                  <div className="font-semibold">{l}</div>
                  <div className="text-xs text-muted-foreground">Learn more →</div>
                </button>
              ))}
            </div>
          </MegaMenu>
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2">
          <div className="relative hidden max-w-xs flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates..."
              className="pl-9"
            />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-6 space-y-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates..." className="pl-9" />
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Websites</div>
                  <div className="grid gap-1">
                    {CATEGORIES.map(c => (
                      <button key={c} onClick={() => { onCategoryPick(c); setMobileOpen(false); }}
                        className="rounded-md px-3 py-2 text-left text-sm hover:bg-accent">{c}</button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" onClick={() => toast("Login coming soon")}>Login</Button>
                  <Button onClick={() => toast("Sign up coming soon")}>Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({
  label, open, onOpenChange, children,
}: { label: string; open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  return (
    <div className="relative" onMouseLeave={() => onOpenChange(false)}>
      <button
        onMouseEnter={() => onOpenChange(true)}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
          open && "bg-accent",
        )}>
        {label} <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-[520px] pt-2">
          <div className="rounded-xl border bg-popover shadow-xl">{children}</div>
        </div>
      )}
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero({
  query, setQuery, onSearch, searchRef,
}: {
  query: string; setQuery: (v: string) => void; onSearch: () => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 10%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent), radial-gradient(500px 300px at 80% 20%, color-mix(in oklab, var(--color-primary) 12%, transparent), transparent)",
        }}
      />
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <Badge variant="secondary" className="mb-5">24+ curated templates · updated weekly</Badge>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
          Find the perfect template for your next project.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Production-ready coded templates for landing pages, dashboards, storefronts, and more —
          crafted with React, Next.js, Tailwind, Vue, and Bootstrap.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); onSearch(); }}
          className="relative mx-auto mt-8 max-w-xl"
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'admin dashboard', 'restaurant', 'Next.js'..."
            className="h-14 rounded-full pl-12 pr-24 text-base shadow-sm"
          />
          <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </form>
      </div>
    </section>
  );
}

/* ---------- Category chips ---------- */

function CategoryChips({ active, onPick }: { active: string | null; onPick: (c: string) => void }) {
  return (
    <div className="border-b bg-muted/30">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {CATEGORIES.map(c => {
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
  price, setPrice, frameworks, toggleFramework, category, setCategory,
}: {
  price: "all" | "free" | "premium";
  setPrice: (v: "all" | "free" | "premium") => void;
  frameworks: string[];
  toggleFramework: (fw: string) => void;
  category: string | null;
  setCategory: (c: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Price</h3>
        <RadioGroup value={price} onValueChange={(v) => setPrice(v as "all" | "free" | "premium")}>
          {[
            { v: "all", l: "All" },
            { v: "free", l: "Free" },
            { v: "premium", l: "Premium" },
          ].map(o => (
            <div key={o.v} className="flex items-center gap-2">
              <RadioGroupItem id={`price-${o.v}`} value={o.v} />
              <Label htmlFor={`price-${o.v}`} className="cursor-pointer text-sm font-normal">{o.l}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Framework</h3>
        <div className="space-y-2">
          {FRAMEWORKS.map(fw => (
            <div key={fw} className="flex items-center gap-2">
              <Checkbox
                id={`fw-${fw}`}
                checked={frameworks.includes(fw)}
                onCheckedChange={() => toggleFramework(fw)}
              />
              <Label htmlFor={`fw-${fw}`} className="cursor-pointer text-sm font-normal">{fw}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              "block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
              category === null && "bg-accent font-semibold",
            )}
          >All categories</button>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
                category === c && "bg-accent font-semibold",
              )}
            >{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Sort ---------- */

function SortDropdown({
  value, onChange,
}: { value: "popularity" | "latest" | "downloads"; onChange: (v: "popularity" | "latest" | "downloads") => void }) {
  const label = value === "popularity" ? "Popularity" : value === "latest" ? "Latest" : "Most Downloaded";
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
      <Dialog>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={t.thumbnail}
            alt={`${t.name} template preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="pointer-events-auto shadow-lg">
                Live Preview
              </Button>
            </DialogTrigger>
          </div>
          <div className="absolute left-3 top-3">
            <Badge className={cn(
              t.price === 0
                ? "bg-emerald-500 text-white hover:bg-emerald-500"
                : "bg-foreground text-background hover:bg-foreground",
            )}>
              {t.price === 0 ? "Free" : `$${t.price}`}
            </Badge>
          </div>
        </div>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          <img src={t.thumbnail.replace("/800/560", "/1600/1120")} alt={t.name} className="h-auto w-full" />
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{t.framework}</Badge>
          <Badge variant="secondary" className="text-xs">{t.category}</Badge>
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
          {t.price === 0 ? (
            <Button className="flex-1" onClick={() => toast.success(`Downloading ${t.name}...`, { description: "Mock download — no file will be sent." })}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          ) : (
            <Button className="flex-1" onClick={() => toast("Checkout coming soon", { description: `${t.name} · $${t.price}` })}>
              Buy Now — ${t.price}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Pagination ---------- */

function Pagination({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (n: number) => void }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
      {pages.map(p => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="sm"
          onClick={() => setPage(p)}
          className="min-w-9"
        >{p}</Button>
      ))}
      <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
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
                <LayoutGrid className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold">WebMarket</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A curated marketplace of production-ready website templates for makers and teams.
            </p>
            <Button className="mt-5" onClick={() => toast("Author onboarding coming soon")}>
              Sell your template
            </Button>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider">Follow</h4>
            <div className="mt-3 flex gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent" aria-label="Social link">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} WebMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
