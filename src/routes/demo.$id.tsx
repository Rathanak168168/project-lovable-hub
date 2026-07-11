import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShoppingCart, Star, MapPin, Phone, Mail, Calendar, Clock, Users, Bed, Plane,
  GraduationCap, Stethoscope, Home, Search, Plus, Minus, Trash2, Check,
  Package, TrendingUp, DollarSign, BarChart3, ChevronRight, Menu,
} from "lucide-react";
import { TEMPLATES, type Template } from "@/lib/templates-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/$id")({
  loader: ({ params }) => {
    const t = TEMPLATES.find(x => String(x.id) === params.id);
    if (!t) throw notFound();
    return { template: t };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.template.name} — Live Demo` : "Live Demo" },
      { name: "description", content: loaderData?.template.description ?? "Live interactive demo." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DemoPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-display text-2xl font-bold">Demo not found</p>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">← Back to WebMarket</Link>
      </div>
    </div>
  ),
});

function DemoPage() {
  const { template } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DemoBar t={template} />
      <DemoBody t={template} />
    </div>
  );
}

function DemoBar({ t }: { t: Template }) {
  return (
    <div className="sticky top-0 z-50 flex items-center gap-3 border-b border-slate-200 bg-slate-900 px-4 py-2 text-xs text-slate-100">
      <Link to="/" className="rounded bg-slate-700 px-2 py-1 font-medium hover:bg-slate-600">← WebMarket</Link>
      <span className="hidden text-slate-400 sm:inline">Live demo:</span>
      <span className="font-semibold">{t.name}</span>
      <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">Interactive</Badge>
      <span className="ml-auto hidden text-slate-400 sm:inline">{t.category}</span>
    </div>
  );
}

function DemoBody({ t }: { t: Template }) {
  switch (t.category) {
    case "eCommerce": return <EcommerceDemo t={t} />;
    case "Restaurant": return <RestaurantDemo t={t} />;
    case "Hotel": return <HotelDemo t={t} />;
    case "Business Website": return <BusinessDemo t={t} />;
    case "School": return <SchoolDemo t={t} />;
    case "Hospital": return <HospitalDemo t={t} />;
    case "Travel Agency": return <TravelDemo t={t} />;
    case "Real Estate": return <RealEstateDemo t={t} />;
    case "Portfolio": return <PortfolioDemo t={t} />;
    case "POS System": return <POSDemo t={t} />;
    case "Inventory System": return <InventoryDemo t={t} />;
    case "Attendance System": return <AttendanceDemo t={t} />;
    case "School Management System": return <SchoolMgmtDemo t={t} />;
    case "Hospital Management System": return <HospitalMgmtDemo t={t} />;
    case "Booking System": return <BookingDemo t={t} />;
    case "CRM": return <CRMDemo t={t} />;
    case "ERP": return <ERPDemo t={t} />;
    default: return <BusinessDemo t={t} />;
  }
}

/* ============================================================
   SHARED PIECES
   ============================================================ */

function SiteNav({ brand, links, accent = "slate" }: { brand: string; links: string[]; accent?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-8 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-lg bg-${accent}-600`} />
          <span className="text-lg font-bold">{brand}</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-slate-700 hover:text-slate-900">{l}</a>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}><Menu className="h-5 w-5" /></button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block border-b px-4 py-3 text-sm">{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function ContactForm({ accent = "slate" }: { accent?: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent!"); }}
      className="mx-auto grid max-w-xl gap-3 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <Input required placeholder="Your name" />
      <Input required type="email" placeholder="Email" />
      <textarea required placeholder="Message" rows={4}
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" />
      <button type="submit" className={`rounded-md bg-${accent}-600 px-4 py-2 text-sm font-semibold text-white hover:bg-${accent}-700`}>
        {sent ? "Sent ✓ — Send another" : "Send message"}
      </button>
    </form>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">{eyebrow}</div>}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
    </div>
  );
}

/* ============================================================
   ECOMMERCE
   ============================================================ */
function EcommerceDemo({ t }: { t: Template }) {
  const products = [
    { id: 1, name: "Linen Overshirt", price: 89, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80" },
    { id: 2, name: "Canvas Sneakers", price: 65, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
    { id: 3, name: "Wool Sweater", price: 120, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80" },
    { id: 4, name: "Leather Bag", price: 210, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
    { id: 5, name: "Wrist Watch", price: 180, img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80" },
    { id: 6, name: "Denim Jacket", price: 140, img: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&q=80" },
  ];
  const [cart, setCart] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const add = (id: number) => { setCart(c => ({ ...c, [id]: (c[id] ?? 0) + 1 })); toast.success("Added to cart"); };
  const change = (id: number, d: number) => setCart(c => {
    const q = (c[id] ?? 0) + d;
    const nc = { ...c };
    if (q <= 0) delete nc[id]; else nc[id] = q;
    return nc;
  });
  const items = Object.entries(cart).map(([id, q]) => ({ p: products.find(p => p.id === Number(id))!, q }));
  const total = items.reduce((s, i) => s + i.p.price * i.q, 0);
  const count = items.reduce((s, i) => s + i.q, 0);

  return (
    <div className="bg-white">
      <nav className="sticky top-8 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600" />
            <span className="text-lg font-bold">{t.name}</span>
          </div>
          <div className="hidden gap-6 md:flex">
            {["Shop", "New", "Sale", "About"].map(l => <a key={l} href="#shop" className="text-sm font-medium hover:text-emerald-700">{l}</a>)}
          </div>
          <button onClick={() => setOpen(true)} className="relative rounded-md border px-3 py-2 text-sm font-medium hover:bg-slate-50">
            <ShoppingCart className="inline h-4 w-4" /> Cart
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-xs font-bold text-white">{count}</span>}
          </button>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-emerald-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Everyday essentials, refined.</h1>
            <p className="mt-4 text-lg text-slate-600">Timeless pieces made with quality materials — free shipping over $100.</p>
            <a href="#shop" className="mt-6 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Shop new arrivals</a>
          </div>
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="hero" className="rounded-3xl object-cover shadow-xl" />
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="Shop" title="Featured products" />
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
          {products.map(p => (
            <div key={p.id} className="group overflow-hidden rounded-xl border">
              <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="font-semibold">{p.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-slate-600">${p.price}</span>
                  <button onClick={() => add(p.id)} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setOpen(false)}>
          <div className="flex h-full w-full max-w-md flex-col bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-bold">Your cart ({count})</h3>
              <button onClick={() => setOpen(false)} className="text-slate-500">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? <p className="text-sm text-slate-500">Cart is empty.</p> : items.map(i => (
                <div key={i.p.id} className="mb-4 flex gap-3">
                  <img src={i.p.img} className="h-16 w-16 rounded-md object-cover" alt="" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{i.p.name}</p>
                    <p className="text-xs text-slate-500">${i.p.price}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => change(i.p.id, -1)} className="grid h-6 w-6 place-items-center rounded border"><Minus className="h-3 w-3" /></button>
                      <span className="text-sm">{i.q}</span>
                      <button onClick={() => change(i.p.id, 1)} className="grid h-6 w-6 place-items-center rounded border"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                  <button onClick={() => change(i.p.id, -i.q)}><Trash2 className="h-4 w-4 text-slate-400" /></button>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="mb-3 flex justify-between font-semibold"><span>Total</span><span>${total}</span></div>
              <button
                disabled={items.length === 0}
                onClick={() => { toast.success("Order placed! (demo)"); setCart({}); setOpen(false); }}
                className="w-full rounded-md bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >Checkout</button>
            </div>
          </div>
        </div>
      )}

      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   RESTAURANT
   ============================================================ */
function RestaurantDemo({ t }: { t: Template }) {
  const menu = [
    { c: "Starters", items: [{ n: "Burrata & tomato", p: 14 }, { n: "Charred octopus", p: 18 }, { n: "Beet salad", p: 12 }] },
    { c: "Mains", items: [{ n: "Grilled sea bass", p: 32 }, { n: "Truffle risotto", p: 26 }, { n: "Wagyu burger", p: 24 }] },
    { c: "Desserts", items: [{ n: "Tiramisu", p: 10 }, { n: "Chocolate torte", p: 11 }] },
  ];
  const [tab, setTab] = useState(0);
  return (
    <div className="bg-white">
      <SiteNav brand={t.name} links={["Menu", "Reserve", "About", "Contact"]} accent="amber" />
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80" alt="" className="h-[70vh] w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-2xl px-4 text-center text-white">
            <p className="text-sm uppercase tracking-widest text-amber-300">Farm to table · Est. 2014</p>
            <h1 className="mt-3 font-serif text-5xl font-bold md:text-6xl">{t.name}</h1>
            <p className="mt-4 text-lg text-slate-100">Seasonal cuisine crafted with locally-sourced ingredients.</p>
            <a href="#reserve" className="mt-6 inline-block rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600">Reserve a table</a>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-4xl px-4 py-16">
        <SectionTitle eyebrow="Menu" title="Today's offering" />
        <div className="mt-8 flex justify-center gap-2">
          {menu.map((m, i) => (
            <button key={m.c} onClick={() => setTab(i)}
              className={cn("rounded-full px-4 py-2 text-sm font-medium", tab === i ? "bg-amber-500 text-white" : "border")}>{m.c}</button>
          ))}
        </div>
        <div className="mt-8 divide-y">
          {menu[tab].items.map(it => (
            <div key={it.n} className="flex items-baseline justify-between py-4">
              <span className="font-semibold">{it.n}</span>
              <span className="mx-4 flex-1 border-b border-dashed border-slate-300" />
              <span className="font-mono">${it.p}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="reserve" className="border-t bg-amber-50 py-16">
        <SectionTitle eyebrow="Reservations" title="Book your table" />
        <ReservationForm />
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-4 py-16">
        <SectionTitle title="Visit us" />
        <div className="mt-6 grid gap-4 text-center text-sm text-slate-600 sm:grid-cols-3">
          <div><MapPin className="mx-auto mb-2 h-5 w-5" />125 Vine Street, Portland</div>
          <div><Phone className="mx-auto mb-2 h-5 w-5" />(555) 123-4567</div>
          <div><Clock className="mx-auto mb-2 h-5 w-5" />Tue–Sun · 5–11pm</div>
        </div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

function ReservationForm() {
  const [ok, setOk] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); setOk(true); toast.success("Reservation confirmed!"); }}
      className="mx-auto mt-8 grid max-w-2xl gap-3 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2">
      <Input required placeholder="Name" />
      <Input required type="email" placeholder="Email" />
      <Input required type="date" />
      <Input required type="time" />
      <select className="rounded-md border px-3 py-2 text-sm sm:col-span-2">
        {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} guest{n>1?"s":""}</option>)}
      </select>
      <button className="rounded-md bg-amber-500 py-2 text-sm font-semibold text-white hover:bg-amber-600 sm:col-span-2">
        {ok ? "Confirmed ✓ — Book another" : "Reserve now"}
      </button>
    </form>
  );
}

/* ============================================================
   HOTEL
   ============================================================ */
function HotelDemo({ t }: { t: Template }) {
  const rooms = [
    { n: "Deluxe Ocean View", p: 320, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
    { n: "Executive Suite", p: 480, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
    { n: "Garden Villa", p: 620, img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
  ];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  return (
    <div className="bg-white">
      <SiteNav brand={t.name} links={["Rooms", "Amenities", "About", "Contact"]} accent="rose" />
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80" className="h-[70vh] w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="absolute inset-0 flex items-end justify-center pb-24">
          <div className="max-w-3xl px-4 text-center text-white">
            <h1 className="text-4xl font-bold md:text-6xl">{t.name}</h1>
            <p className="mt-3 text-lg">Luxury on the coast — since 1998.</p>
          </div>
        </div>
        <div className="absolute -bottom-10 left-1/2 w-[92%] max-w-3xl -translate-x-1/2 rounded-2xl bg-white p-4 shadow-xl">
          <div className="grid gap-3 sm:grid-cols-4">
            <div><label className="text-xs text-slate-500">Check-in</label><Input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} /></div>
            <div><label className="text-xs text-slate-500">Check-out</label><Input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} /></div>
            <div><label className="text-xs text-slate-500">Guests</label>
              <select value={guests} onChange={e => setGuests(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm">
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n>1?"s":""}</option>)}
              </select>
            </div>
            <button onClick={() => toast.success(`Searching ${guests} guests...`)} className="self-end rounded-md bg-rose-500 py-2 text-sm font-semibold text-white hover:bg-rose-600">
              <Search className="mr-1 inline h-4 w-4" /> Search
            </button>
          </div>
        </div>
      </section>

      <section id="rooms" className="mx-auto max-w-6xl px-4 py-24">
        <SectionTitle eyebrow="Rooms & Suites" title="Where you'll stay" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {rooms.map(r => (
            <div key={r.n} className="overflow-hidden rounded-2xl border">
              <img src={r.img} className="aspect-[4/3] w-full object-cover" alt="" />
              <div className="p-5">
                <h3 className="font-bold">{r.n}</h3>
                <p className="mt-1 text-sm text-slate-500 flex items-center gap-3"><Bed className="h-4 w-4" /> King bed · 2 guests</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">${r.p}<span className="text-xs font-normal text-slate-500">/night</span></span>
                  <button onClick={() => toast.success(`Booked ${r.n}!`)} className="rounded-md bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   BUSINESS
   ============================================================ */
function BusinessDemo({ t }: { t: Template }) {
  return (
    <div className="bg-white">
      <SiteNav brand={t.name} links={["Services", "Work", "About", "Contact"]} accent="blue" />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
        <div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Strategy · Design · Build</span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight">Grow your business with expert consulting.</h1>
          <p className="mt-5 text-lg text-slate-600">We help ambitious companies scale with modern strategy, design, and technology.</p>
          <div className="mt-6 flex gap-3">
            <a href="#contact" className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Get in touch</a>
            <a href="#services" className="rounded-md border px-5 py-3 text-sm font-semibold hover:bg-slate-50">Our services</a>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80" className="rounded-3xl object-cover shadow-xl" alt="" />
      </section>
      <section id="services" className="border-y bg-slate-50 py-20">
        <SectionTitle eyebrow="Services" title="How we help" />
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            { t: "Brand Strategy", d: "Positioning, messaging, and identity that resonates." },
            { t: "Product Design", d: "Beautiful, functional interfaces built for users." },
            { t: "Web Development", d: "Fast, modern websites and applications." },
          ].map(s => (
            <div key={s.t} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="py-20">
        <SectionTitle eyebrow="Contact" title="Let's talk" />
        <div className="mt-8"><ContactForm accent="blue" /></div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   SCHOOL
   ============================================================ */
function SchoolDemo({ t }: { t: Template }) {
  return (
    <div className="bg-white">
      <SiteNav brand={t.name} links={["Programs", "Admissions", "Faculty", "Contact"]} accent="indigo" />
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80" className="h-96 w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-indigo-900/60" />
        <div className="absolute inset-0 grid place-items-center px-4 text-center text-white">
          <div>
            <GraduationCap className="mx-auto mb-3 h-10 w-10" />
            <h1 className="text-4xl font-bold md:text-5xl">{t.name}</h1>
            <p className="mt-3 text-lg">Educating tomorrow's leaders since 1972.</p>
          </div>
        </div>
      </section>
      <section id="programs" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="Programs" title="Explore our curriculum" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Elementary", "Middle School", "High School"].map(p => (
            <div key={p} className="rounded-xl border p-6">
              <h3 className="font-bold">{p}</h3>
              <p className="mt-2 text-sm text-slate-600">Personalized education fostering curiosity and growth.</p>
              <button onClick={() => toast("Learn more coming soon")} className="mt-4 text-sm font-semibold text-indigo-600">Learn more →</button>
            </div>
          ))}
        </div>
      </section>
      <section id="admissions" className="bg-indigo-50 py-16">
        <SectionTitle eyebrow="Admissions" title="Apply today" />
        <div className="mt-6"><ContactForm accent="indigo" /></div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   HOSPITAL
   ============================================================ */
function HospitalDemo({ t }: { t: Template }) {
  return (
    <div className="bg-white">
      <SiteNav brand={t.name} links={["Departments", "Doctors", "Appointment", "Contact"]} accent="sky" />
      <section className="bg-gradient-to-br from-sky-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">Accredited hospital · 24/7 care</span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight">Compassionate care, close to home.</h1>
            <p className="mt-4 text-slate-600">Comprehensive medical services with a patient-first approach.</p>
            <a href="#appointment" className="mt-6 inline-block rounded-md bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">Book appointment</a>
          </div>
          <img src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&q=80" className="rounded-3xl object-cover shadow-xl" alt="" />
        </div>
      </section>
      <section id="departments" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="Departments" title="Specialized care" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {["Cardiology", "Pediatrics", "Neurology", "Orthopedics"].map(d => (
            <div key={d} className="rounded-xl border p-5 text-center">
              <Stethoscope className="mx-auto h-6 w-6 text-sky-600" />
              <p className="mt-2 font-semibold">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="appointment" className="border-t bg-slate-50 py-16">
        <SectionTitle eyebrow="Appointments" title="Schedule a visit" />
        <div className="mt-6"><ContactForm accent="sky" /></div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   TRAVEL AGENCY
   ============================================================ */
function TravelDemo({ t }: { t: Template }) {
  const tours = [
    { n: "Bali Escape", p: 1290, d: "7 days", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
    { n: "Iceland Aurora", p: 2450, d: "5 days", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80" },
    { n: "Kyoto Cherry", p: 1890, d: "8 days", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
  ];
  const [q, setQ] = useState("");
  const filtered = tours.filter(t => t.n.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="bg-white">
      <SiteNav brand={t.name} links={["Destinations", "Tours", "About", "Contact"]} accent="teal" />
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80" className="h-96 w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-teal-900/50" />
        <div className="absolute inset-0 grid place-items-center px-4 text-center text-white">
          <div className="w-full max-w-2xl">
            <Plane className="mx-auto mb-3 h-10 w-10" />
            <h1 className="text-4xl font-bold md:text-5xl">Discover your next adventure</h1>
            <div className="relative mt-6">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tours..." className="h-12 rounded-full bg-white pl-12 text-slate-900" />
            </div>
          </div>
        </div>
      </section>
      <section id="tours" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="Popular tours" title="Handpicked itineraries" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filtered.map(tr => (
            <div key={tr.n} className="overflow-hidden rounded-2xl border">
              <img src={tr.img} className="aspect-[4/3] w-full object-cover" alt="" />
              <div className="p-5">
                <h3 className="font-bold">{tr.n}</h3>
                <p className="text-sm text-slate-500">{tr.d}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-bold">${tr.p}</span>
                  <button onClick={() => toast.success(`Inquiry sent for ${tr.n}`)} className="rounded-md bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700">Book</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="col-span-3 text-center text-slate-500">No tours match.</p>}
        </div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   REAL ESTATE
   ============================================================ */
function RealEstateDemo({ t }: { t: Template }) {
  const props = [
    { n: "Modern Family Home", p: 785000, b: 4, ba: 3, sqft: 2800, city: "Austin", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80" },
    { n: "Downtown Loft", p: 520000, b: 2, ba: 2, sqft: 1400, city: "Denver", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
    { n: "Suburban Ranch", p: 645000, b: 3, ba: 2, sqft: 2100, city: "Austin", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
    { n: "Waterfront Villa", p: 1450000, b: 5, ba: 4, sqft: 4200, city: "Miami", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" },
  ];
  const [city, setCity] = useState("All");
  const cities = ["All", ...Array.from(new Set(props.map(p => p.city)))];
  const filtered = city === "All" ? props : props.filter(p => p.city === city);
  return (
    <div className="bg-white">
      <SiteNav brand={t.name} links={["Buy", "Rent", "Agents", "Contact"]} accent="orange" />
      <section className="bg-orange-50">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <Home className="mx-auto h-10 w-10 text-orange-600" />
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Find your next home</h1>
          <p className="mt-3 text-slate-600">Browse curated listings across top cities.</p>
          <div className="mt-6 inline-flex gap-2">
            {cities.map(c => (
              <button key={c} onClick={() => setCity(c)}
                className={cn("rounded-full px-4 py-2 text-sm font-medium", city === c ? "bg-orange-600 text-white" : "border bg-white")}>{c}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map(p => (
            <div key={p.n} className="overflow-hidden rounded-2xl border">
              <img src={p.img} className="aspect-[16/10] w-full object-cover" alt="" />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{p.n}</h3>
                  <span className="text-lg font-bold text-orange-700">${p.p.toLocaleString()}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500"><MapPin className="mr-1 inline h-3 w-3" />{p.city}</p>
                <div className="mt-3 flex gap-4 text-sm text-slate-600">
                  <span>{p.b} beds</span><span>{p.ba} baths</span><span>{p.sqft.toLocaleString()} sqft</span>
                </div>
                <button onClick={() => toast.success("Tour requested!")} className="mt-4 w-full rounded-md bg-orange-600 py-2 text-sm font-semibold text-white hover:bg-orange-700">Request tour</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   PORTFOLIO
   ============================================================ */
function PortfolioDemo({ t }: { t: Template }) {
  const works = [
    "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  ];
  return (
    <div className="bg-neutral-50 text-neutral-900">
      <SiteNav brand={t.name} links={["Work", "About", "Contact"]} accent="violet" />
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">Designer · Portland</p>
        <h1 className="mt-3 text-6xl font-bold tracking-tight">Selected work,<br/>2020–2026.</h1>
      </section>
      <section id="work" className="mx-auto max-w-6xl columns-2 gap-4 px-4 md:columns-3">
        {works.map((w, i) => (
          <img key={i} src={w} alt="" className="mb-4 w-full rounded-lg break-inside-avoid" />
        ))}
      </section>
      <section id="contact" className="py-24">
        <SectionTitle eyebrow="Contact" title="Say hello" />
        <div className="mt-6"><ContactForm accent="violet" /></div>
      </section>
      <FooterBlock brand={t.name} />
    </div>
  );
}

/* ============================================================
   DASHBOARD SHELL for business solutions
   ============================================================ */
function DashboardShell({
  brand, accent, sidebar, children,
}: { brand: string; accent: string; sidebar: { icon: typeof Home; label: string }[]; children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex min-h-[calc(100vh-32px)] bg-slate-100">
      <aside className={`hidden w-60 flex-col bg-${accent}-900 p-4 text-white md:flex`}>
        <div className="mb-8 flex items-center gap-2">
          <div className={`h-8 w-8 rounded-lg bg-${accent}-500`} />
          <span className="font-bold">{brand}</span>
        </div>
        <nav className="space-y-1">
          {sidebar.map((s, i) => (
            <button key={s.label} onClick={() => setActive(i)}
              className={cn("flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm",
                active === i ? `bg-${accent}-700` : `hover:bg-${accent}-800`)}>
              <s.icon className="h-4 w-4" />{s.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-x-auto p-6">{children}</main>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent }: { label: string; value: string; icon: typeof Home; accent: string }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <div className={`grid h-8 w-8 place-items-center rounded-md bg-${accent}-100 text-${accent}-700`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

/* --------- POS --------- */
function POSDemo({ t }: { t: Template }) {
  const catalog = [
    { id: 1, n: "Espresso", p: 3.5 },
    { id: 2, n: "Cappuccino", p: 4.5 },
    { id: 3, n: "Croissant", p: 3 },
    { id: 4, n: "Sandwich", p: 8 },
    { id: 5, n: "Salad", p: 9.5 },
    { id: 6, n: "Juice", p: 5 },
  ];
  const [cart, setCart] = useState<{ id: number; q: number }[]>([]);
  const add = (id: number) => setCart(c => {
    const e = c.find(x => x.id === id);
    return e ? c.map(x => x.id === id ? { ...x, q: x.q + 1 } : x) : [...c, { id, q: 1 }];
  });
  const total = cart.reduce((s, i) => s + (catalog.find(c => c.id === i.id)!.p) * i.q, 0);
  return (
    <DashboardShell brand={t.name} accent="emerald" sidebar={[
      { icon: ShoppingCart, label: "Sales" }, { icon: Package, label: "Products" },
      { icon: BarChart3, label: "Reports" }, { icon: Users, label: "Staff" },
    ]}>
      <h1 className="mb-6 text-2xl font-bold">Point of Sale</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {catalog.map(c => (
            <button key={c.id} onClick={() => add(c.id)} className="rounded-xl border bg-white p-4 text-left hover:border-emerald-500">
              <div className="text-sm font-semibold">{c.n}</div>
              <div className="mt-1 text-xs text-slate-500">${c.p.toFixed(2)}</div>
            </button>
          ))}
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 font-bold">Current Sale</h3>
          {cart.length === 0 ? <p className="text-sm text-slate-500">Tap products to add.</p> : (
            <div className="space-y-2">
              {cart.map(i => {
                const p = catalog.find(c => c.id === i.id)!;
                return (
                  <div key={i.id} className="flex items-center justify-between text-sm">
                    <span>{p.n} × {i.q}</span>
                    <span>${(p.p * i.q).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="my-3 border-t" />
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button disabled={cart.length === 0} onClick={() => { toast.success("Payment received!"); setCart([]); }}
            className="mt-4 w-full rounded-md bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">Charge</button>
        </div>
      </div>
    </DashboardShell>
  );
}

/* --------- INVENTORY --------- */
function InventoryDemo({ t }: { t: Template }) {
  const [items, setItems] = useState([
    { sku: "SKU-001", name: "Widget A", stock: 120, price: 19 },
    { sku: "SKU-002", name: "Widget B", stock: 8, price: 24 },
    { sku: "SKU-003", name: "Gadget X", stock: 45, price: 49 },
    { sku: "SKU-004", name: "Gadget Y", stock: 0, price: 65 },
    { sku: "SKU-005", name: "Part Z", stock: 300, price: 5 },
  ]);
  const [q, setQ] = useState("");
  const filtered = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.sku.toLowerCase().includes(q.toLowerCase()));
  return (
    <DashboardShell brand={t.name} accent="blue" sidebar={[
      { icon: Package, label: "Products" }, { icon: TrendingUp, label: "Movements" },
      { icon: BarChart3, label: "Reports" }, { icon: Users, label: "Suppliers" },
    ]}>
      <h1 className="mb-6 text-2xl font-bold">Inventory</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Total SKUs" value={String(items.length)} icon={Package} accent="blue" />
        <StatCard label="Low stock" value={String(items.filter(i => i.stock > 0 && i.stock < 10).length)} icon={TrendingUp} accent="blue" />
        <StatCard label="Out of stock" value={String(items.filter(i => i.stock === 0).length)} icon={Package} accent="blue" />
        <StatCard label="Value" value={"$" + items.reduce((s, i) => s + i.stock * i.price, 0).toLocaleString()} icon={DollarSign} accent="blue" />
      </div>
      <div className="rounded-xl border bg-white">
        <div className="flex items-center gap-3 border-b p-4">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search SKU or name..." className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <table className="w-full text-sm">
          <thead className="border-b text-left text-xs uppercase text-slate-500">
            <tr><th className="p-3">SKU</th><th>Name</th><th>Stock</th><th>Price</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(i => (
              <tr key={i.sku} className="border-b last:border-0">
                <td className="p-3 font-mono text-xs">{i.sku}</td>
                <td>{i.name}</td>
                <td>
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold",
                    i.stock === 0 ? "bg-red-100 text-red-700" : i.stock < 10 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700")}>
                    {i.stock}
                  </span>
                </td>
                <td>${i.price}</td>
                <td className="p-3 text-right">
                  <button onClick={() => setItems(list => list.map(x => x.sku === i.sku ? { ...x, stock: x.stock + 10 } : x))}
                    className="rounded-md border px-2 py-1 text-xs font-medium hover:bg-slate-50">+10 stock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}

/* --------- ATTENDANCE --------- */
function AttendanceDemo({ t }: { t: Template }) {
  const [people, setPeople] = useState([
    { name: "Alex Kim", status: "in" as "in" | "out" | "off", time: "09:02" },
    { name: "Priya Singh", status: "in" as "in" | "out" | "off", time: "08:55" },
    { name: "Jordan Lee", status: "off" as "in" | "out" | "off", time: "-" },
    { name: "Sam Chen", status: "out" as "in" | "out" | "off", time: "17:10" },
  ]);
  const clock = (i: number) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setPeople(p => p.map((x, idx) => idx === i ? { ...x, status: x.status === "in" ? "out" : "in", time } : x));
    toast.success("Clock updated");
  };
  return (
    <DashboardShell brand={t.name} accent="indigo" sidebar={[
      { icon: Clock, label: "Today" }, { icon: Users, label: "Employees" },
      { icon: BarChart3, label: "Reports" }, { icon: Calendar, label: "Schedule" },
    ]}>
      <h1 className="mb-6 text-2xl font-bold">Attendance · {new Date().toLocaleDateString()}</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Present" value={String(people.filter(p => p.status === "in").length)} icon={Check} accent="indigo" />
        <StatCard label="Checked out" value={String(people.filter(p => p.status === "out").length)} icon={Clock} accent="indigo" />
        <StatCard label="Off today" value={String(people.filter(p => p.status === "off").length)} icon={Users} accent="indigo" />
      </div>
      <div className="rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-xs uppercase text-slate-500">
            <tr><th className="p-3">Employee</th><th>Status</th><th>Time</th><th></th></tr>
          </thead>
          <tbody>
            {people.map((p, i) => (
              <tr key={p.name} className="border-b last:border-0">
                <td className="p-3 font-medium">{p.name}</td>
                <td><span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold",
                  p.status === "in" ? "bg-emerald-100 text-emerald-700" : p.status === "out" ? "bg-slate-200 text-slate-700" : "bg-amber-100 text-amber-700")}>
                  {p.status.toUpperCase()}
                </span></td>
                <td>{p.time}</td>
                <td className="p-3 text-right">
                  {p.status !== "off" && (
                    <button onClick={() => clock(i)} className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700">
                      {p.status === "in" ? "Clock out" : "Clock in"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}

/* --------- SCHOOL MGMT --------- */
function SchoolMgmtDemo({ t }: { t: Template }) {
  const students = [
    { name: "Emma Watson", grade: "10A", avg: 92 },
    { name: "Liam Chen", grade: "10A", avg: 87 },
    { name: "Sofia Garcia", grade: "10B", avg: 78 },
    { name: "Noah Patel", grade: "10B", avg: 95 },
  ];
  return (
    <DashboardShell brand={t.name} accent="violet" sidebar={[
      { icon: Users, label: "Students" }, { icon: GraduationCap, label: "Teachers" },
      { icon: Calendar, label: "Timetable" }, { icon: BarChart3, label: "Grades" },
    ]}>
      <h1 className="mb-6 text-2xl font-bold">School Overview</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Students" value="642" icon={Users} accent="violet" />
        <StatCard label="Teachers" value="48" icon={GraduationCap} accent="violet" />
        <StatCard label="Classes" value="24" icon={Calendar} accent="violet" />
        <StatCard label="Avg. grade" value="88%" icon={TrendingUp} accent="violet" />
      </div>
      <div className="rounded-xl border bg-white">
        <div className="border-b p-4 font-bold">Grade 10 · Recent averages</div>
        <table className="w-full text-sm">
          <thead className="border-b text-left text-xs uppercase text-slate-500">
            <tr><th className="p-3">Student</th><th>Class</th><th>Average</th></tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.name} className="border-b last:border-0">
                <td className="p-3">{s.name}</td>
                <td>{s.grade}</td>
                <td className="font-mono">{s.avg}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}

/* --------- HOSPITAL MGMT --------- */
function HospitalMgmtDemo({ t }: { t: Template }) {
  const patients = [
    { name: "John Doe", dept: "Cardiology", doc: "Dr. Smith", status: "Admitted" },
    { name: "Jane Roe", dept: "Pediatrics", doc: "Dr. Ali", status: "Discharged" },
    { name: "Ravi Kumar", dept: "Orthopedics", doc: "Dr. Chen", status: "Consultation" },
  ];
  return (
    <DashboardShell brand={t.name} accent="sky" sidebar={[
      { icon: Users, label: "Patients" }, { icon: Stethoscope, label: "Doctors" },
      { icon: Calendar, label: "Appointments" }, { icon: DollarSign, label: "Billing" },
    ]}>
      <h1 className="mb-6 text-2xl font-bold">Hospital Dashboard</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Patients today" value="128" icon={Users} accent="sky" />
        <StatCard label="Appointments" value="42" icon={Calendar} accent="sky" />
        <StatCard label="Available beds" value="17" icon={Bed} accent="sky" />
        <StatCard label="Revenue" value="$24.8k" icon={DollarSign} accent="sky" />
      </div>
      <div className="rounded-xl border bg-white">
        <div className="border-b p-4 font-bold">Recent patients</div>
        <table className="w-full text-sm">
          <thead className="border-b text-left text-xs uppercase text-slate-500">
            <tr><th className="p-3">Patient</th><th>Department</th><th>Doctor</th><th>Status</th></tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.name} className="border-b last:border-0">
                <td className="p-3">{p.name}</td><td>{p.dept}</td><td>{p.doc}</td>
                <td><Badge variant="secondary">{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}

/* --------- BOOKING --------- */
function BookingDemo({ t }: { t: Template }) {
  const services = [
    { id: 1, n: "Haircut", d: "30 min", p: 35 },
    { id: 2, n: "Massage", d: "60 min", p: 85 },
    { id: 3, n: "Facial", d: "45 min", p: 65 },
  ];
  const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
  const [service, setService] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const canBook = service !== null && date && time !== null;
  return (
    <DashboardShell brand={t.name} accent="rose" sidebar={[
      { icon: Calendar, label: "Bookings" }, { icon: Users, label: "Clients" },
      { icon: BarChart3, label: "Reports" },
    ]}>
      <h1 className="mb-6 text-2xl font-bold">New Booking</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 font-bold">1. Service</h3>
          <div className="space-y-2">
            {services.map(s => (
              <button key={s.id} onClick={() => setService(s.id)}
                className={cn("flex w-full items-center justify-between rounded-md border p-3 text-left text-sm",
                  service === s.id ? "border-rose-500 bg-rose-50" : "hover:bg-slate-50")}>
                <div><div className="font-semibold">{s.n}</div><div className="text-xs text-slate-500">{s.d}</div></div>
                <span className="font-semibold">${s.p}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 font-bold">2. Date & Time</h3>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mb-3" />
          <div className="grid grid-cols-3 gap-2">
            {times.map(tm => (
              <button key={tm} onClick={() => setTime(tm)}
                className={cn("rounded-md border py-2 text-sm", time === tm ? "border-rose-500 bg-rose-50 font-semibold" : "hover:bg-slate-50")}>{tm}</button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 font-bold">3. Confirm</h3>
          <div className="space-y-1 text-sm">
            <div>Service: <b>{services.find(s => s.id === service)?.n ?? "—"}</b></div>
            <div>Date: <b>{date || "—"}</b></div>
            <div>Time: <b>{time ?? "—"}</b></div>
          </div>
          <button disabled={!canBook} onClick={() => { toast.success("Booking confirmed!"); setService(null); setDate(""); setTime(null); }}
            className="mt-4 w-full rounded-md bg-rose-500 py-2 text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-50">
            Confirm booking
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}

/* --------- CRM --------- */
function CRMDemo({ t }: { t: Template }) {
  type Deal = { id: number; name: string; value: number; stage: "Lead" | "Qualified" | "Proposal" | "Won" };
  const [deals, setDeals] = useState<Deal[]>([
    { id: 1, name: "Acme Corp", value: 12000, stage: "Lead" },
    { id: 2, name: "Globex", value: 8500, stage: "Qualified" },
    { id: 3, name: "Initech", value: 22000, stage: "Proposal" },
    { id: 4, name: "Umbrella", value: 45000, stage: "Won" },
    { id: 5, name: "Wayne Ent.", value: 6500, stage: "Lead" },
  ]);
  const stages: Deal["stage"][] = ["Lead", "Qualified", "Proposal", "Won"];
  const advance = (id: number) => setDeals(ds => ds.map(d => {
    if (d.id !== id) return d;
    const i = stages.indexOf(d.stage);
    return i < stages.length - 1 ? { ...d, stage: stages[i + 1] } : d;
  }));
  return (
    <DashboardShell brand={t.name} accent="amber" sidebar={[
      { icon: TrendingUp, label: "Pipeline" }, { icon: Users, label: "Contacts" },
      { icon: BarChart3, label: "Reports" },
    ]}>
      <h1 className="mb-6 text-2xl font-bold">Sales Pipeline</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {stages.map(s => (
          <div key={s} className="rounded-xl border bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold">{s}</span>
              <span className="text-xs text-slate-500">{deals.filter(d => d.stage === s).length}</span>
            </div>
            <div className="space-y-2">
              {deals.filter(d => d.stage === s).map(d => (
                <div key={d.id} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{d.name}</div>
                  <div className="mt-1 text-xs text-slate-500">${d.value.toLocaleString()}</div>
                  {d.stage !== "Won" && (
                    <button onClick={() => advance(d.id)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900">
                      Advance <ChevronRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

/* --------- ERP --------- */
function ERPDemo({ t }: { t: Template }) {
  const [tab, setTab] = useState<"finance" | "hr" | "ops">("finance");
  return (
    <DashboardShell brand={t.name} accent="teal" sidebar={[
      { icon: DollarSign, label: "Finance" }, { icon: Users, label: "HR" },
      { icon: Package, label: "Operations" }, { icon: BarChart3, label: "Analytics" },
    ]}>
      <h1 className="mb-2 text-2xl font-bold">Enterprise Overview</h1>
      <div className="mb-6 flex gap-2">
        {(["finance", "hr", "ops"] as const).map(t2 => (
          <button key={t2} onClick={() => setTab(t2)}
            className={cn("rounded-full px-4 py-1.5 text-sm font-medium capitalize", tab === t2 ? "bg-teal-600 text-white" : "border bg-white")}>{t2}</button>
        ))}
      </div>
      {tab === "finance" && (
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard label="Revenue" value="$482k" icon={DollarSign} accent="teal" />
          <StatCard label="Expenses" value="$312k" icon={TrendingUp} accent="teal" />
          <StatCard label="Profit" value="$170k" icon={BarChart3} accent="teal" />
          <StatCard label="Invoices" value="86" icon={Package} accent="teal" />
        </div>
      )}
      {tab === "hr" && (
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard label="Employees" value="248" icon={Users} accent="teal" />
          <StatCard label="Open roles" value="12" icon={Users} accent="teal" />
          <StatCard label="Attrition" value="4.2%" icon={TrendingUp} accent="teal" />
          <StatCard label="Payroll" value="$1.2M" icon={DollarSign} accent="teal" />
        </div>
      )}
      {tab === "ops" && (
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard label="Orders" value="1,284" icon={Package} accent="teal" />
          <StatCard label="Fulfilled" value="97%" icon={Check} accent="teal" />
          <StatCard label="Warehouses" value="6" icon={Home} accent="teal" />
          <StatCard label="On-time" value="94%" icon={Clock} accent="teal" />
        </div>
      )}
      <div className="mt-6 rounded-xl border bg-white p-6 text-sm text-slate-600">
        Switch tabs above to explore Finance, HR, and Operations dashboards.
      </div>
    </DashboardShell>
  );
}

/* --------- FOOTER --------- */
function FooterBlock({ brand }: { brand: string }) {
  return (
    <footer className="border-t bg-slate-900 py-10 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-bold text-white">{brand}</div>
            <p className="mt-1 text-xs text-slate-400">Interactive demo powered by WebMarket.</p>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />hello@example.com</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" />(555) 000-0000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// unused import guard
void useMemo;
