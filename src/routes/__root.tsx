import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import type { PageData } from "@/wp/content";
import { PageHeadTags } from "@/wp/page";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "UTF-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
  }),
  component: Root,
  notFoundComponent: () => null,
});

function Root() {
  const page = useRouterState({
    select: (s) => {
      const leaf = s.matches[s.matches.length - 1];
      return (leaf?.loaderData ?? (leaf?.error as { data?: PageData } | undefined)?.data) as PageData | undefined;
    },
  });
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <HeadContent />
        <PageHeadTags data={page} />
        <Scripts />
      </head>
      <body className={page?.bodyClass ?? ""} suppressHydrationWarning>
        <Outlet />
      </body>
    </html>
  );
}
