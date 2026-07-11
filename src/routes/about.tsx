import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGrid, Sparkles, Rocket, ShieldCheck, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About WebMarket — Modern Websites & Digital Solutions" },
      { name: "description", content: "We build modern, professional websites and digital solutions for businesses of all sizes." },
      { property: "og:title", content: "About WebMarket" },
      { property: "og:description", content: "Modern websites and digital solutions for businesses of all sizes." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">WebMarket</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">Browse</Link>
            <Link to="/about" className="rounded-md bg-accent px-3 py-2 text-sm font-medium">About</Link>
          </nav>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" /> About WebMarket
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Modern websites for every business
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            We create modern, professional websites and digital solutions for businesses of all sizes.
            Our goal is to help companies build a strong online presence with beautiful, fast, and
            user-friendly websites.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Rocket, title: "Launch faster", body: "Pre-built websites for restaurants, hotels, shops, schools, and more — ready to customize and go live." },
            { icon: ShieldCheck, title: "Built to last", body: "Clean, modern designs that look great on every device and load quickly for your visitors." },
            { icon: HeartHandshake, title: "Made for business", body: "Websites and tools designed around real business needs — bookings, sales, inventory, and customers." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to grow your business online?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Browse our collection of websites and digital solutions — from online stores to booking systems.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Explore templates
          </Link>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} WebMarket. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
