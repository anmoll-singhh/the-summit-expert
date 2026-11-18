import { redirect, notFound } from "@tanstack/react-router";
import { getPageHtml, loadPageMeta, resolvePath, type PageData } from "./content";

export async function loadPage(pathname: string): Promise<PageData> {
  const res = resolvePath(pathname);
  if (res.kind === "redirect") throw redirect({ href: res.to, statusCode: 301 } as Parameters<typeof redirect>[0]);
  const meta = loadPageMeta(res.key);
  if (res.status === 404) throw notFound({ data: { ...meta, key: res.key, status: 404 } });
  return { ...meta, key: res.key, status: res.status };
}

export function pageHead(data: PageData | undefined) {
  if (!data) return {};
  return {
    meta: [{ title: data.title }, ...data.meta],
    links: data.links,
    scripts: data.jsonld.map((json) => ({
      type: "application/ld+json",
      className: "yoast-schema-graph",
      children: json,
    })),
  };
}

/**
 * Renders the captured page markup. Scripts inside it run while the browser
 * parses the server HTML (exactly like the original site); React never
 * re-renders this subtree, so the widgets they initialise stay intact.
 */
export function WpPage({ pageKey }: { pageKey: string }) {
  const html = getPageHtml(pageKey);
  return (
    <div id="wp-page" style={{ display: "contents" }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
  );
}
