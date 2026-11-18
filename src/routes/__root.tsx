import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import type { PageData } from "@/wp/content";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "UTF-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
  }),
  component: Root,
  notFoundComponent: () => null,
});

function Root() {
  const bodyClass = useRouterState({
    select: (s) => {
      const leaf = s.matches[s.matches.length - 1];
      const data = (leaf?.loaderData ?? (leaf?.error as { data?: PageData } | undefined)?.data) as
        | PageData
        | undefined;
      return data?.bodyClass ?? "";
    },
  });
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <HeadContent />
        <Scripts />
      </head>
      <body className={bodyClass} suppressHydrationWarning>
        <Outlet />
      </body>
    </html>
  );
}
