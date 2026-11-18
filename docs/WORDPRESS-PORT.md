# The Summit Experts — WordPress → React port

Goal: the React app must look and behave exactly like https://thesummitexperts.com
on every page, viewport and browser. The previous hand-written React pages only
approximated the design, so the site is now served from a faithful capture of
the original pages.

## How it works

- `src/wp/packs/pages-NN.html` — the rendered markup of every WordPress URL
  (pages, tours, products, team/review/gallery posts, archives, 404), with the
  page's stylesheets and scripts in their original order. Internal links and
  asset URLs are root-relative.
- `src/wp/meta.json` — each page's `<head>` data: title, meta
  description, robots, canonical, Open Graph / Twitter tags, icons, feeds and
  Yoast JSON-LD, kept byte-identical to the original (absolute URLs on
  thesummitexperts.com, which is the production domain this replaces).
- `src/wp/routes.json` — URL → page key map plus WordPress' 301 redirects
  (e.g. `/product/k2-base-camp-trek/` → `/k2-base-camp-trek/`).
- `src/routes/index.tsx` and `src/routes/$.tsx` server-render the page with
  React (TanStack Start). `src/client.tsx` deliberately does not hydrate: the
  site's own front-end runtime (Elementor sliders, menus, off-canvas, gallery,
  accordions, forms, custom widget scripts) runs on the server HTML exactly as
  on WordPress. Navigation is ordinary page loads, as on the original.
- `public/wp-content`, `public/wp-includes`, `robots.txt`, sitemaps — the
  original theme/plugin CSS & JS, images, video and fonts, listed in
  `src/wp/assets.txt` and downloaded into `public/` (same paths, absolute URLs
  in CSS/JS made root-relative) by `scripts/fetch-wp-assets.mjs` at the start
  of `npm run build`. Set `WP_ASSET_ORIGIN` to fetch from a mirror/bucket once
  WordPress is retired, or commit the files.
- `src/routes/wp-admin/admin-ajax[.]php.ts` — Elementor form submissions are
  relayed to the original form backend (`FORM_RELAY_URL`, default the WP
  site's admin-ajax.php) so leads, success messages and redirects stay the same.
- `server/middleware/trailing-slash.ts` — 301 slash-less URLs like WordPress.

## Re-capturing after content changes on WordPress

1. Download each URL's HTML into `.wp-capture/html/<path with / → __>.html`
   (`home.html` for `/`, `__404.html` for a missing URL) and list redirects in
   `.wp-capture/redirects.txt` (`<from-url> <to-url>` per line).
2. `python3 tools/wp-import/gen.py` regenerates `src/wp/packs/`, `src/wp/meta.json` and `src/wp/routes.json`.
3. `python3 tools/wp-import/assets.py` mirrors any new CSS/JS/media into
   `public/`; add their paths to `src/wp/assets.txt`.
