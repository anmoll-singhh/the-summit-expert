import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { faqs, filters, formatPrice, gallery, team, tours } from "@/data/tours";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home - The Summit Expert" },
      {
        name: "description",
        content:
          "Trek. Explore. Discover. Summit Experts runs trekking, mountaineering, and cultural tours across Pakistan.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  ["98%", "Satisfaction Rate"],
  ["500+", "Guided Tours Annually"],
  ["150+", "Destinations"],
  ["13K+", "Positive Review"],
];

const steps = [
  {
    n: "01",
    title: "Your Adventure Made Simple",
    body: "Explore our wide range of trekking journeys, mountaineering expeditions, and cultural tours. Pick the one that suits your interests, fitness level, and schedule.",
  },
  {
    n: "02",
    title: "Book Your Trip",
    body: "Secure your spot with our seamless booking process. Select your preferred dates, group size, and add any customizations for a truly personalized experience.",
  },
  {
    n: "03",
    title: "Get Prepared",
    body: "We’ll provide you with all the details, from packing lists to itineraries, to make sure you’re ready for the adventure. Our team is here to answer any questions before your trip.",
  },
  {
    n: "04",
    title: "Embark on Your Journey",
    body: "Join us for an unforgettable adventure. From start to finish, our expert guides will ensure your safety and make your journey extraordinary.",
  },
];

function Home() {
  const popular = tours.filter((t) => t.popular);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [openFaq, setOpenFaq] = useState(0);
  const shots = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.tag === filter)),
    [filter],
  );

  return (
    <div>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper">
        <img src="/media/ui/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/20" />
        <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-16 pt-36 md:px-6 md:pb-24">
          <h1 className="max-w-xl text-[64px] font-semibold leading-[0.92] tracking-tight sm:text-8xl">
            Trek.
            <br />
            Explore.
            <br />
            Discover.
          </h1>
          <p className="mt-6 max-w-md text-base text-paper/85 md:text-lg">
            We prioritize your safety, comfort, and a genuine connection to the landscapes we explore.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/$slug"
              params={{ slug: "explore-adventures" }}
              className="rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-paper hover:bg-coral-deep"
            >
              Explore Adventures
            </Link>
            <Link
              to="/$slug"
              params={{ slug: "cultural-tours" }}
              className="rounded-full border border-paper/70 px-6 py-3.5 text-sm font-semibold text-paper hover:bg-paper hover:text-ink"
            >
              Discover Tours
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-[1100px] px-4 md:px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="bg-paper px-5 py-7 text-center">
              <p className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">{n}</p>
              <p className="mt-2 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 py-20 md:px-6 lg:grid-cols-2">
        <div className="relative">
          <img src="/media/ui/why.jpg" alt="Trekkers in the Karakoram" className="aspect-[4/5] w-full rounded-[28px] object-cover" />
          <img
            src="/media/tours/hunza14.jpg"
            alt=""
            className="absolute -bottom-6 -right-2 hidden w-40 rounded-2xl border-4 border-paper object-cover shadow-lg sm:block md:w-48"
          />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-coral">SUMMIT EXPERTS</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Why Summit Experts?</h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            Summit Experts is a premier adventure and tourism company specializing in delivering exceptional trekking
            and cultural exploration experiences across Pakistan’s majestic landscapes. From the towering peaks of the
            Karakoram and Himalayan ranges to the serene valleys of Hunza and Skardu, Summit Experts connects travelers
            with the beauty, history, and culture of this diverse country.
          </p>
          <Link
            to="/$slug"
            params={{ slug: "about-us" }}
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper"
          >
            About Us
          </Link>
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Most Popular Packages</h2>
              <p className="mt-3 max-w-xl text-muted">
                Discover our most popular adventures and cultural tours happening soon.
              </p>
            </div>
            <Link to="/$slug" params={{ slug: "explore-adventures" }} className="text-sm font-semibold text-coral">
              View all departures
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((t) => (
              <Link
                key={t.slug}
                to="/$slug"
                params={{ slug: t.slug }}
                className="group overflow-hidden rounded-[24px] bg-paper shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img src={t.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-snug">{t.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{t.excerpt}</p>
                  <p className="mt-4 text-2xl font-semibold text-coral">
                    {formatPrice(t.price)}
                    {t.price != null && <span className="ml-1 text-sm font-medium text-muted">/Per Person</span>}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-20 md:px-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-coral">HOW IT WORKS</p>
        <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">Your Adventure Made Simple</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {steps.map((s) => (
            <article key={s.n} className="rounded-[24px] border border-line p-6 md:p-8">
              <p className="text-sm font-semibold text-coral">{s.n}</p>
              <h3 className="mt-3 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Meet The Team
                <br />
                Behind Your Journey
              </h2>
              <p className="mt-3 text-paper/70">Experienced guides and cultural experts dedicated to your adventure.</p>
            </div>
            <Link
              to="/$slug"
              params={{ slug: "meet-the-team" }}
              className="rounded-full border border-paper/30 px-5 py-3 text-sm font-semibold hover:bg-paper hover:text-ink"
            >
              View All Team Members
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article key={m.name} className="overflow-hidden rounded-[24px] bg-white/5">
                <div className="relative h-44">
                  <img src={m.image} alt="" className="h-full w-full object-cover opacity-80" />
                  <span className="absolute bottom-3 left-3 grid h-12 w-12 place-items-center rounded-full bg-coral text-sm font-bold">
                    {m.initial}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm text-coral">{m.role}</p>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-paper/70">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-20 md:px-6">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Moments from the Summit</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                filter === f ? "bg-ink text-paper" : "bg-sand text-ink hover:bg-blush"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-8 columns-2 gap-3 md:columns-3">
          {shots.map((g) => (
            <img key={g.src + g.title} src={g.src} alt={g.title} className="mb-3 w-full rounded-2xl object-cover" />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-coral to-coral-deep py-16 text-paper">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-4 md:px-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Want to personalize your own trip?</h2>
          <Link
            to="/$slug"
            params={{ slug: "contact-us" }}
            className="rounded-full bg-paper px-6 py-3.5 text-sm font-semibold tracking-wide text-ink"
          >
            PERSONALIZE YOUR TRIP
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-10 px-4 py-20 md:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Answers To Most
            <br />
            Of Your Questions
          </h2>
          <Link
            to="/$slug"
            params={{ slug: "faqs" }}
            className="mt-6 inline-flex rounded-full border border-line px-5 py-3 text-sm font-semibold hover:border-ink"
          >
            View All
          </Link>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-muted">Most Asked Questions:</p>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  className="flex w-full items-start gap-4 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-semibold text-coral">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-lg font-semibold">{f.q}</span>
                  <span className="text-2xl leading-none text-muted">{openFaq === i ? "–" : "+"}</span>
                </button>
                {openFaq === i && <p className="pb-5 pl-10 pr-6 text-muted">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
