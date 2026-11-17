import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BookingForm } from "@/components/site-shell";
import { k2Itinerary } from "@/data/k2-itinerary";
import { faqs, filters, formatPrice, gallery, getTour, team, tours, type Tour } from "@/data/tours";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    if (!known(params.slug) && !getTour(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const tour = getTour(params.slug);
    const title = tour?.title ?? pageTitle(params.slug);
    return { meta: [{ title: `${title} - The Summit Expert` }] };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-40 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <Link to="/" className="mt-6 inline-block text-coral">
        Back home
      </Link>
    </div>
  ),
});

const pages = new Set([
  "about-us",
  "cultural-tours",
  "explore-adventures",
  "gallery",
  "why-pakistan",
  "meet-the-team",
  "faqs",
  "contact-us",
  "privacy-policy",
  "terms-condition",
]);

function known(slug: string) {
  return pages.has(slug);
}

function pageTitle(slug: string) {
  const map: Record<string, string> = {
    "about-us": "About Us",
    "cultural-tours": "Cultural Tours",
    "explore-adventures": "Explore Adventures",
    gallery: "Gallery",
    "why-pakistan": "Why Pakistan?",
    "meet-the-team": "Meet The Team",
    faqs: "FAQs",
    "contact-us": "Contact",
    "privacy-policy": "Privacy Policy",
    "terms-condition": "Terms & Conditions",
  };
  return map[slug] ?? "Summit Experts";
}

function Page() {
  const { slug } = Route.useLoaderData();
  const tour = getTour(slug);
  if (tour) return <TourPage tour={tour} />;
  if (slug === "about-us") return <About />;
  if (slug === "why-pakistan") return <Why />;
  if (slug === "cultural-tours") return <Catalog category="cultural" title="Cultural Tours" lede="Day trips and heritage journeys through Pakistan’s cities, sacred sites, and UNESCO landscapes." />;
  if (slug === "explore-adventures") return <Catalog category="adventure" title="Explore Adventures" lede="Treks, expeditions, and valley journeys from Fairy Meadows to K2 Base Camp." />;
  if (slug === "gallery") return <GalleryPage />;
  if (slug === "meet-the-team") return <TeamPage />;
  if (slug === "faqs") return <FaqPage />;
  if (slug === "contact-us") return <ContactPage />;
  if (slug === "privacy-policy") return <Legal title="Privacy Policy" body={privacy} />;
  if (slug === "terms-condition") return <Legal title="Terms & Conditions" body={terms} />;
  return null;
}

function HeroBand({ image, kicker, title, lede }: { image: string; kicker?: string; title: string; lede?: string }) {
  return (
    <section className="relative flex min-h-[52vh] items-end bg-ink text-paper">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-12 pt-32 md:px-6">
        {kicker && <p className="text-xs font-semibold tracking-[0.22em] text-coral">{kicker}</p>}
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-paper/80">{lede}</p>}
      </div>
    </section>
  );
}

function Catalog({ category, title, lede }: { category: "cultural" | "adventure"; title: string; lede: string }) {
  const list = tours.filter((t) => t.category === category);
  return (
    <div>
      <HeroBand image={category === "adventure" ? "/media/tours/k2.jpg" : "/media/tours/lahore.jpg"} kicker="DEPARTURES" title={title} lede={lede} />
      <div className="mx-auto grid max-w-[1240px] gap-5 px-4 py-14 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
        {list.map((t) => (
          <TourCard key={t.slug} tour={t} />
        ))}
      </div>
    </div>
  );
}

function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link to="/$slug" params={{ slug: tour.slug }} className="group overflow-hidden rounded-[24px] border border-line bg-paper">
      <div className="aspect-[16/11] overflow-hidden">
        <img src={tour.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h2 className="text-lg font-semibold leading-snug">{tour.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{tour.excerpt}</p>
        <p className="mt-4 text-2xl font-semibold text-coral">
          {formatPrice(tour.price)}
          {tour.price != null && <span className="ml-1 text-sm font-medium text-muted">/Per Person</span>}
        </p>
      </div>
    </Link>
  );
}

function TourPage({ tour }: { tour: Tour }) {
  const [tab, setTab] = useState<"overview" | "itinerary">("overview");
  const related = tours.filter((t) => t.category === tour.category && t.slug !== tour.slug).slice(0, 3);
  const isK2 = tour.slug === "k2-base-camp-trek";
  return (
    <div>
      <HeroBand image={tour.image} kicker={tour.season.toUpperCase()} title={tour.title} />
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setTab("overview")} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === "overview" ? "bg-ink text-paper" : "bg-sand"}`}>
              Overview
            </button>
            {isK2 && (
              <button type="button" onClick={() => setTab("itinerary")} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === "itinerary" ? "bg-ink text-paper" : "bg-sand"}`}>
                Itinerary
              </button>
            )}
          </div>
          {tab === "overview" && (
            <div className="mt-8">
              <h2 className="text-3xl font-semibold">About Expedition</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{tour.overview}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li key={h} className="rounded-2xl bg-sand px-4 py-3 text-sm font-medium">
                    {h}
                  </li>
                ))}
              </ul>
              {isK2 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold">Why This Trek?</h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                    <li>Unparalleled scenery of K2, Broad Peak, and the Gasherbrum peaks.</li>
                    <li>A challenging route through one of the world’s most remote landscapes.</li>
                    <li>Cultural time in Skardu and Askole before the glacier.</li>
                    <li>Built for experienced trekkers ready for a high-altitude expedition.</li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {tab === "itinerary" && (
            <ol className="mt-8 space-y-4">
              {k2Itinerary.map((d) => (
                <li key={d.day} className="rounded-2xl border border-line p-5">
                  <p className="text-xs font-semibold tracking-wide text-coral">{d.day}</p>
                  <h3 className="mt-1 text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                </li>
              ))}
            </ol>
          )}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold">You may also like</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-[28px] border border-line bg-sand p-5 lg:sticky lg:top-24">
          <p className="text-sm text-muted">Starting From</p>
          <p className="text-4xl font-semibold text-coral">{formatPrice(tour.price)}</p>
          {tour.price != null && <p className="text-sm text-muted">/Per Person</p>}
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-line pb-2">
              <dt className="text-muted">Duration</dt>
              <dd className="font-semibold">{tour.days}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-2">
              <dt className="text-muted">Group Size</dt>
              <dd className="font-semibold">{tour.group}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Season</dt>
              <dd className="text-right font-semibold">{tour.season}</dd>
            </div>
          </dl>
          <a href="tel:+923185217495" className="mt-5 block rounded-full bg-ink py-3 text-center text-sm font-semibold text-paper">
            Call Us Now
          </a>
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold">Have questions or ready to book?</p>
            <BookingForm compact intent={tour.title} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <HeroBand
        image="/media/ui/why.jpg"
        kicker="ABOUT US"
        title="Welcome to Summit Experts Adventure Tours"
        lede="Our legacy of adventure. Discover Pakistan’s beauty with us."
      />
      <article className="mx-auto max-w-3xl space-y-5 px-4 py-16 text-lg leading-relaxed text-muted md:px-6">
        <p>
          At Summit Experts, we’re more than just a travel company — we’re a community of passionate locals hailing from the breathtaking Karakoram Mountains. Our mission is to showcase the beauty and culture of our homeland while delivering safe, authentic, and exhilarating adventures for explorers from around the globe.
        </p>
        <p>
          Our story began with a shared dream: to create unforgettable travel experiences that reflect the spirit of Pakistan’s majestic landscapes and the warmth of its people. One of our lead climbers has summited three 8,000-meter peaks — K2, Gasherbrum II, and Nanga Parbat — all by the age of 24. Supporting him is our specialist in tourism and hospitality management, with nine years of experience in trek and expedition planning, and our expert in cultural tours, who designs journeys that foster meaningful connections.
        </p>
        <h2 className="pt-4 text-3xl font-semibold text-ink">Our Core Values</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Authenticity", "Genuine experiences rooted in local culture and natural beauty."],
            ["Safety First", "Rigorous safety measures for every trek and tour."],
            ["Sustainability", "Eco-friendly tourism that supports local communities."],
            ["Excellence", "Experienced guides and meticulous planning."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl bg-sand p-5">
              <p className="font-semibold text-ink">{t}</p>
              <p className="mt-1 text-base">{b}</p>
            </div>
          ))}
        </div>
        <h2 className="pt-4 text-3xl font-semibold text-ink">Shah Doulat, founder of Summit Experts</h2>
        <p>
          At the heart of Summit Experts is Shah, a seasoned mountaineer whose vision for adventure tourism has been shaped on the mountain itself. His recent expeditions include K2 (8,611m) on 22 July 2022, Nanga Parbat (8,126m) without oxygen on 26 June 2023, and Gasherbrum II (8,035m) on 22 July 2024. He has also climbed and guided Pastore Peak, Minglik Sar, Lukpe La, the Snow Lake Trek, and the K2 Base Camp & Gondogoro La circuit.
        </p>
        <p>
          A harrowing expedition in the Karakoram, through treacherous weather and a near-death experience, deepened his commitment to bringing every guest home. Summit Experts is local talent — guides, porters, and planners from these valleys — paired with careful modern planning.
        </p>
      </article>
    </div>
  );
}

function Why() {
  return (
    <div>
      <HeroBand
        image="/media/ui/hero.jpg"
        kicker="WHY PAKISTAN"
        title="Why Explore Pakistan?"
        lede="From towering peaks to vibrant cultures, Pakistan offers an unparalleled blend of adventure, history, and natural beauty."
      />
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="text-3xl font-semibold">What Makes Pakistan Special?</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Pakistan is a land of unparalleled diversity, where adventure, natural beauty, and rich culture come together. From trekking the towering peaks of K2 and exploring vast glaciers to wandering through lush valleys and serene lakes, the landscapes are breathtaking. Beyond the scenery, Pakistan offers vibrant traditions, historic landmarks, and the warm hospitality of its people.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Home to three of the world’s largest mountain ranges, it is a destination that truly has it all — whether you are scaling high peaks, walking ancient cities, or simply sitting with a cup of tea above the Hunza river.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["108+", "Peaks above 7,000 meters"],
            ["20+", "UNESCO sites and landmarks"],
            ["3", "Great mountain ranges"],
            ["100%", "Unlike anywhere else"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-3xl bg-sand p-6">
              <p className="text-4xl font-semibold text-coral">{n}</p>
              <p className="mt-2 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-3 px-4 pb-16 md:px-6">
        <Link to="/$slug" params={{ slug: "explore-adventures" }} className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-paper">
          Explore Adventures
        </Link>
        <Link to="/$slug" params={{ slug: "cultural-tours" }} className="rounded-full border border-line px-6 py-3 text-sm font-semibold">
          Discover Tours
        </Link>
      </div>
    </div>
  );
}

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shots = filter === "All" ? gallery : gallery.filter((g) => g.tag === filter);
  return (
    <div>
      <HeroBand image="/media/gallery/shangrila.jpg" kicker="GALLERY" title="Moments from the Summit" />
      <div className="mx-auto max-w-[1240px] px-4 py-12 md:px-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-sm font-medium ${filter === f ? "bg-ink text-paper" : "bg-sand"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shots.map((g) => (
            <figure key={g.src + g.title} className="mb-4 break-inside-avoid">
              <img src={g.src} alt={g.title} className="w-full rounded-2xl object-cover" />
              <figcaption className="mt-2 text-sm text-muted">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamPage() {
  return (
    <div>
      <HeroBand image="/media/gallery/passu.jpg" kicker="THE TEAM" title="Meet The Team Behind Your Journey" lede="Experienced guides and cultural experts dedicated to your adventure." />
      <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-14 md:px-6">
        {team.map((m) => (
          <article key={m.name} className="grid overflow-hidden rounded-[28px] border border-line md:grid-cols-[280px_1fr]">
            <div className="relative min-h-56">
              <img src={m.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold text-coral">{m.role}</p>
              <h2 className="mt-1 text-3xl font-semibold">{m.name}</h2>
              <p className="mt-4 leading-relaxed text-muted">{m.bio}</p>
            </div>
          </article>
        ))}
        <article className="rounded-[28px] bg-ink p-8 text-paper">
          <p className="text-sm font-semibold text-coral">FOUNDER</p>
          <h2 className="mt-2 text-3xl font-semibold">Shah Doulat</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-paper/75">
            Founder of Summit Experts. Summits include K2 (22 July 2022), Nanga Parbat without oxygen (26 June 2023), and Gasherbrum II (22 July 2024). The person who still treats every departure as if he is going with you.
          </p>
        </article>
      </div>
    </div>
  );
}

function FaqPage() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <HeroBand image="/media/tours/fairy.jpg" kicker="FAQS" title="Answers To Most Of Your Questions" />
      <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-line">
            <button type="button" className="flex w-full items-start gap-4 py-5 text-left" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="font-semibold text-coral">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-lg font-semibold">{f.q}</span>
              <span>{open === i ? "–" : "+"}</span>
            </button>
            {open === i && <p className="pb-5 pl-10 text-muted">{f.a}</p>}
          </div>
        ))}
        <Link to="/$slug" params={{ slug: "contact-us" }} className="mt-8 inline-flex rounded-full bg-coral px-5 py-3 text-sm font-semibold text-paper">
          Ask a question
        </Link>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <HeroBand image="/media/tours/islamabad.jpg" kicker="CONTACT" title="Have questions or ready to book?" />
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 md:px-6 lg:grid-cols-2">
        <BookingForm />
        <div className="rounded-[28px] bg-sand p-8">
          <p className="text-2xl font-semibold">+92 318 5217495</p>
          <p className="text-2xl font-semibold">+1 855 608 8666</p>
          <p className="mt-3 text-muted">Call us directly if you need any urgent help. Our agents will help you.</p>
          <p className="mt-8 text-xl font-semibold">info@thesummitexperts.com</p>
          <p className="mt-2 text-muted">Email us directly if you need any help. Our agents will help you.</p>
          <p className="mt-8 text-sm text-muted">Recommended by Ibadat Khan, Expedition Expert · +1 (365) 832-6868</p>
        </div>
      </div>
    </div>
  );
}

const privacy = [
  "Summit Experts collects the details you submit in a booking or newsletter form — name, email, phone, country, travel dates, and the trip you are asking about — so our team can reply and plan your journey.",
  "We do not sell personal information. Messages stay with the people arranging your trek, tour, or expedition.",
  "You can ask us to update or delete an inquiry by emailing info@thesummitexperts.com.",
];

const terms = [
  "A booking is confirmed only after Summit Experts accepts it in writing and the agreed deposit is received.",
  "Trip prices are per person unless a quote says otherwise. International flights and travel insurance are not included.",
  "High mountain travel depends on weather, flights into Skardu or Gilgit, and trail conditions. We may adjust dates or routing to keep the group safe, including the contingency days built into expedition itineraries.",
  "Guests are responsible for honest fitness information, required insurance, and following guide instructions on the mountain.",
];

function Legal({ title, body }: { title: string; body: string[] }) {
  return (
    <div>
      <HeroBand image="/media/gallery/khaplu.jpg" title={title} />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-14 text-muted md:px-6">
        {body.map((p) => (
          <p key={p} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
