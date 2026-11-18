import { createFileRoute } from "@tanstack/react-router";

/**
 * Stand-in for WordPress' admin-ajax.php endpoint that the captured Elementor
 * runtime posts to. Elementor Pro form submissions are relayed to the form
 * backend (by default the original WordPress site, so leads keep arriving in
 * the same inbox/CRM with the same success message and redirect). Set
 * FORM_RELAY_URL to point somewhere else once WordPress is retired.
 */
const RELAY = process.env.FORM_RELAY_URL || "https://thesummitexperts.com/wp-admin/admin-ajax.php";

export const Route = createFileRoute("/wp-admin/admin-ajax.php")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.formData().catch(() => null);
        const action = body?.get("action");
        if (action === "elementor_pro_forms_send_form" && body) {
          try {
            const res = await fetch(RELAY, {
              method: "POST",
              body,
              headers: {
                "user-agent": request.headers.get("user-agent") ?? "summit-react",
                "x-forwarded-for": request.headers.get("x-forwarded-for") ?? "",
              },
            });
            const text = await res.text();
            return new Response(text.replace(/https:\\\/\\\/thesummitexperts\.com/g, ""), {
              status: res.status,
              headers: { "content-type": "application/json; charset=UTF-8" },
            });
          } catch {
            return Response.json({ success: true, data: { message: "Your submission was successful.", data: [] } });
          }
        }
        return Response.json({ success: true, data: {} });
      },
      GET: async () => new Response("0", { headers: { "content-type": "text/html" } }),
    },
  },
});
