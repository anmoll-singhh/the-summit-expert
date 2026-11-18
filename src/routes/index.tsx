import { createFileRoute } from "@tanstack/react-router";
import { loadPage, WpPage } from "@/wp/page";

export const Route = createFileRoute("/")({
  loader: () => loadPage("/"),
  component: HomePage,
});

function HomePage() {
  return <WpPage pageKey={Route.useLoaderData().key} />;
}
