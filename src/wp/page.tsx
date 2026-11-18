import { notFound, redirect } from "@tanstack/react-router";
import { getPageHtml, loadPageMeta, resolvePath, type PageData } from "./content";

export async function loadPage(pathname: string, searchStr = ""): Promise<PageData> {
  const res = resolvePath(pathname);
  if (res.kind === "redirect") throw redirect({ href: res.to + searchStr, statusCode: 301 } as Parameters<typeof redirect>[0]);
  const data: PageData = { ...loadPageMeta(res.key), key: res.key, status: res.status };
  // Served with a 404 status, like WordPress; the root still renders its head.
  if (res.status === 404) throw notFound({ data });
  return data;
}

/**
 * The page's <head> tags, identical to the original: title, every meta (incl.
 * the repeated `generator` metas the router's head API would de-duplicate),
 * canonical/icon/feed links and Yoast JSON-LD.
 */
export function PageHeadTags({ data }: { data: PageData | undefined }) {
  if (!data) return null;
  return (
    <>
      {data.meta.map((attrs, i) => (
        <meta key={`m${i}`} {...attrs} />
      ))}
      <title>{data.title}</title>
      {data.links.map((attrs, i) => (
        <link key={`l${i}`} {...attrs} />
      ))}
      {data.jsonld.map((json, i) => (
        <script
          key={`j${i}`}
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </>
  );
}

/**
 * Renders the captured page markup. Scripts inside it run while the browser
 * parses the server HTML (exactly like the original site); React does not
 * hydrate it (see src/client.tsx), so the widgets they initialise stay intact.
 */
export function WpPage({ pageKey }: { pageKey: string }) {
  const html = getPageHtml(pageKey);
  return (
    <div
      id="wp-page"
      style={{ display: "contents" }}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
