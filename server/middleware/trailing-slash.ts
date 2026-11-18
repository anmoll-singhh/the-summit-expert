/**
 * WordPress answers slash-less page URLs with a 301 to the trailing-slash
 * canonical URL; mirror that (the router alone would answer 307).
 */
export default function trailingSlash(event: { url: URL; req: { method: string } }) {
  const { pathname, search } = event.url;
  if (event.req.method !== "GET" && event.req.method !== "HEAD") return;
  if (pathname === "/" || pathname.endsWith("/")) return;
  if (/\.[a-z0-9]+$/i.test(pathname) || pathname.startsWith("/_") || pathname.startsWith("/wp-")) return;
  return new Response(null, { status: 301, headers: { location: `${pathname}/${search}` } });
}
