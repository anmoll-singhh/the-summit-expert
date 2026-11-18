import { createFileRoute } from "@tanstack/react-router";
import type { PageData } from "@/wp/content";
import { loadPage, WpPage } from "@/wp/page";

export const Route = createFileRoute("/$")({
  loader: ({ location }) => loadPage(location.pathname, location.searchStr),
  component: SitePage,
  notFoundComponent: ({ data }) => <WpPage pageKey={(data as PageData | undefined)?.key ?? "__404"} />,
});

function SitePage() {
  return <WpPage pageKey={Route.useLoaderData().key} />;
}
