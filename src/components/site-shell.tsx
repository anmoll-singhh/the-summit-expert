import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { email, interests, phones, tours } from "@/data/tours";

const nav: { slug: string; label: string }[] = [
  { slug: "", label: "Home" },
  { slug: "about-us", label: "About Us" },
  { slug: "cultural-tours", label: "Cultural Tours" },
  { slug: "explore-adventures", label: "Explore Adventures" },
  { slug: "gallery", label: "Gallery" },
  { slug: "why-pakistan", label: "Why Pakistan?" },
  { slug: "meet-the-team", label: "Meet The Team" },
  { slug: "faqs", label: "FAQs" },
  { slug: "contact-us", label: "Contact" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 36 32" className="h-8 w-9 shrink-0" aria-hidden>
        <path fill="#FF5247" d="M18 2 34 30H24.2L18 17.2 11.8 30H2L18 2Z" />
      </svg>
      <span className="leading-none">
        <span className={`block text-[15px] font-extrabold tracking-[0.14em] ${light ? "text-paper" : "text-ink"}`}>
          SUMMIT EXPERTS
        </span>
        <span className={`mt-1 block text-[9px] font-semibold tracking-[0.28em] ${light ? "text-paper/80" : "text-muted"}`}>
          ADVENTURE TOURS
        </span>
      </span>
    </span>
  );
}

function SearchBox({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 1) return tours.slice(0, 6);
    return tours.filter((t) => (t.title + t.excerpt + t.season).toLowerCase().includes(s)).slice(0, 8);
  }, [q]);
  return (
    <div className="fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-auto mt-20 w-[min(720px,calc(100%-2rem))] rounded-3xl bg-paper p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <Search className="size-5 text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search treks, valleys, cities…"
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="rounded-full p-2 hover:bg-sand">
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-3 max-h-[50vh] overflow-auto">
          {results.length === 0 && <li className="px-2 py-6 text-muted">No departures match that search.</li>}
          {results.map((t) => (
            <li key={t.slug}>
              <Link
                to="/$slug"
                params={{ slug: t.slug }}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-2 py-2.5 hover:bg-sand"
              >
                <img src={t.image} alt="" className="h-14 w-20 rounded-xl object-cover" />
                <span>
                  <span className="block font-semibold">{t.title}</span>
                  <span className="text-sm text-muted">{t.days} · {t.season}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const overHero = path === "/";
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overHero || scrolled || open;
  const light = overHero && !solid;

  return (
    <div className="min-h-screen">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          solid ? "bg-paper/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center gap-4 px-4 md:px-6">
          <Link to="/" aria-label="Summit Experts home" className="shrink-0">
            <Logo light={light} />
          </Link>
          <nav className="ml-auto hidden items-center gap-3 min-[1480px]:flex">
            {nav.map((item) => {
              const href = item.slug ? `/${item.slug}` : "/";
              const active = path === href;
              return item.slug ? (
                <Link
                  key={item.slug}
                  to="/$slug"
                  params={{ slug: item.slug }}
                  className={`whitespace-nowrap text-[12.5px] font-medium tracking-wide ${
                    light ? "text-paper/90 hover:text-paper" : active ? "text-coral" : "text-ink/80 hover:text-coral"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key="home"
                  to="/"
                  className={`whitespace-nowrap text-[12.5px] font-medium tracking-wide ${
                    light ? "text-paper/90 hover:text-paper" : active ? "text-coral" : "text-ink/80 hover:text-coral"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            aria-label="Search tours"
            onClick={() => setSearch(true)}
            className={`ml-auto rounded-full p-2 min-[1480px]:ml-2 ${light ? "text-paper" : "text-ink"}`}
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            className={`rounded-full p-2 min-[1480px]:hidden ${light ? "text-paper" : "text-ink"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-line bg-paper px-4 py-3 min-[1480px]:hidden">
            {nav.map((item) =>
              item.slug ? (
                <Link
                  key={item.slug}
                  to="/$slug"
                  params={{ slug: item.slug }}
                  className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-sand"
                >
                  {item.label}
                </Link>
              ) : (
                <Link key="home" to="/" className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-sand">
                  {item.label}
                </Link>
              ),
            )}
          </div>
        )}
      </header>
      {search && <SearchBox onClose={() => setSearch(false)} />}
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function BookingForm({ compact = false, intent = "" }: { compact?: boolean; intent?: string }) {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const prev = JSON.parse(localStorage.getItem("summit-inquiries") || "[]");
    prev.push({ ...data, intent, at: new Date().toISOString() });
    localStorage.setItem("summit-inquiries", JSON.stringify(prev));
    setSent(true);
  }
  if (sent) {
    return (
      <div className="rounded-3xl bg-blush p-6 text-ink">
        <p className="text-lg font-semibold">Message received.</p>
        <p className="mt-2 text-muted">
          Our agents will reply at the email you shared. For anything urgent, call {phones[0]}.
        </p>
      </div>
    );
  }
  const field = "w-full rounded-xl border border-line bg-paper px-3 py-3 text-sm outline-none focus:border-coral";
  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      <input required name="name" placeholder="Full Name" className={field} />
      <input required type="email" name="email" placeholder="Email" className={field} />
      <input name="country" placeholder="Country" className={field} />
      <input name="phone" placeholder="Phone" className={field} />
      <label className="text-xs font-medium text-muted">
        Start Date
        <input required type="date" name="start" className={`${field} mt-1`} />
      </label>
      <label className="text-xs font-medium text-muted">
        End Date
        <input type="date" name="end" className={`${field} mt-1`} />
      </label>
      <input name="guests" placeholder="Number of Guests" className={field} />
      <select name="interest" defaultValue={intent || ""} className={field}>
        <option value="">Location of interest</option>
        {interests.map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>
      {!compact && (
        <textarea name="note" placeholder="Tell us what you have in mind" className={`${field} sm:col-span-2 min-h-28`} />
      )}
      <button
        type="submit"
        className="sm:col-span-2 rounded-full bg-coral px-6 py-3.5 text-sm font-semibold tracking-wide text-paper hover:bg-coral-deep"
      >
        Submit Message
      </button>
    </form>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-sand">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Have questions or
            <br />
            ready to book?
          </h2>
          <div className="mt-8">
            <BookingForm />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:pb-2">
          <a href={`tel:${phones[0].replace(/\s/g, "")}`} className="block">
            <p className="text-2xl font-semibold tracking-tight">{phones[0]}</p>
            <p className="text-2xl font-semibold tracking-tight">{phones[1]}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Call us directly if you need any urgent help. Our agents will help you.
            </p>
          </a>
          <a href={`mailto:${email}`} className="block">
            <p className="text-xl font-semibold">{email}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Email us directly if you need any help. Our agents will help you.
            </p>
          </a>
        </div>
      </div>
      <div className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              We prioritize your safety, comfort, and a genuine connection to the landscapes we explore.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/summitexpertspakistan/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-line p-2 hover:border-coral hover:text-coral"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.facebook.com/summitexpertsPakistan"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-line p-2 hover:border-coral hover:text-coral"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">Quicklinks</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {nav.slice(0, 6).map((n) => (
                <li key={n.label}>
                  {n.slug ? (
                    <Link to="/$slug" params={{ slug: n.slug }} className="hover:text-coral">
                      {n.label}
                    </Link>
                  ) : (
                    <Link to="/" className="hover:text-coral">
                      {n.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">More</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link to="/$slug" params={{ slug: "why-pakistan" }} className="hover:text-coral">
                  Why Pakistan?
                </Link>
              </li>
              <li>
                <Link to="/$slug" params={{ slug: "faqs" }} className="hover:text-coral">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/$slug" params={{ slug: "contact-us" }} className="hover:text-coral">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/$slug" params={{ slug: "terms-condition" }} className="hover:text-coral">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/$slug" params={{ slug: "privacy-policy" }} className="hover:text-coral">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <Newsletter />
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-muted md:px-6">
            <p>Summit Experts. All Rights Reserved 2025.</p>
            <p className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <Phone className="size-3.5" /> {phones[0]}
              </span>
              <span className="inline-flex items-center gap-1">
                <Mail className="size-3.5" /> {email}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <div>
      <p className="text-sm font-semibold tracking-wide">Join Our Newsletter</p>
      <p className="mt-3 text-sm text-muted">Signup for our latest news & articles. We won’t give you spam mails.</p>
      {done ? (
        <p className="mt-4 text-sm font-medium text-coral">You’re on the list.</p>
      ) : (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input required type="email" placeholder="Email address" className="w-full rounded-full border border-line px-4 py-2.5 text-sm outline-none focus:border-coral" />
          <button type="submit" className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper">
            Join
          </button>
        </form>
      )}
    </div>
  );
}
