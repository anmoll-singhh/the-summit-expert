import { createFileRoute } from "@tanstack/react-router";
import { loadPage, pageHead, WpPage } from "@/wp/page";

export const Route = createFileRoute("/")({
  loader: () => loadPage("/"),
  head: ({ loaderData }) => pageHead(loaderData),
  component: HomePage,
});

function HomePage() {
  return <WpPage pageKey={Route.useLoaderData().key} />;
}
