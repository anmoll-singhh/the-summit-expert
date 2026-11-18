import { createIsomorphicFn } from "@tanstack/react-start";
import routeMap from "./routes.json";

/**
 * Every page of thesummitexperts.com is captured as its rendered markup
 * (src/wp/packs/pages-*.html) plus its head metadata (src/wp/meta.json) by
 * tools/wp-import (see docs/WORDPRESS-PORT.md). Pages are server-rendered from those files so
 * the markup, styles and behaviour match the original site 1:1.
 */
export type PageMeta = {
  title: string;
  bodyClass: string;
  meta: Record<string, string>[];
  links: Record<string, string>[];
  jsonld: string[];
};

export type PageData = PageMeta & { key: string; status: number };

const routes = routeMap.routes as Record<string, string>;
const redirects = routeMap.redirects as Record<string, string>;

export type Resolution =
  | { kind: "page"; key: string; status: number }
  | { kind: "redirect"; to: string };

export function resolvePath(pathname: string): Resolution {
  let path = pathname || "/";
  try {
    path = decodeURI(path);
  } catch {
    /* keep raw */
  }
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  const redirectTo = redirects[withSlash];
  if (redirectTo) return { kind: "redirect", to: redirectTo };
  if (routes[path]) return { kind: "page", key: routes[path], status: 200 };
  // WordPress 301s slash-less URLs to their trailing-slash canonical form.
  if (!path.endsWith("/") && routes[withSlash]) return { kind: "redirect", to: withSlash };
  return { kind: "page", key: "__404", status: 404 };
}

/** Head metadata for a page (server only; pages are server-rendered). */
export const loadPageMeta = createIsomorphicFn()
  .server((key: string): PageMeta => {
    const all = import.meta.glob<Record<string, PageMeta>>("./meta.json", { eager: true, import: "default" })[
      "./meta.json"
    ];
    return all[key] ?? all["__404"];
  })
  .client((): PageMeta => ({ title: "", bodyClass: "", meta: [], links: [], jsonld: [] }));

const PAGE_MARKER = /<!--@@wp-page:([^@]+)@@-->\n/;
let pageCache: Map<string, string> | undefined;

/** Pages are stored a few per file in src/wp/packs/pages-NN.html, each after a `<!--@@wp-page:key@@-->` line. */
function parsePacks(packs: string[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const pack of packs) {
    const parts = pack.split(PAGE_MARKER);
    for (let i = 1; i < parts.length; i += 2) map.set(parts[i], parts[i + 1].replace(/\n$/, ""));
  }
  return map;
}

/** Page markup: bundled on the server only; the browser keeps the SSR'd DOM. */
export const getPageHtml = createIsomorphicFn()
  .server((key: string): string => {
    const serverPages = () =>
      (pageCache ??= parsePacks(
        Object.values(
          import.meta.glob<string>("./packs/pages-*.html", { eager: true, query: "?raw", import: "default" }),
        ),
      ));
    const pages = serverPages();
    return pages.get(key) ?? pages.get("__404") ?? "";
  })
  .client((): string => {
    const el = document.getElementById("wp-page");
    return el ? el.innerHTML : "";
  });
