// Downloads the site's static files (theme/plugin CSS & JS, images, video,
// fonts, robots.txt, sitemaps) listed in src/wp/assets.txt into public/ before
// the build, at the same paths the original WordPress site served them from.
// Absolute https://thesummitexperts.com/ URLs inside CSS/JS are made
// root-relative so everything is served from this deployment.
// Origin can be overridden with WP_ASSET_ORIGIN (e.g. a bucket/CDN mirror).
import { mkdir, stat, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = (process.env.WP_ASSET_ORIGIN || "https://thesummitexperts.com").replace(/\/$/, "");
const root = join(dirname(new URL(import.meta.url).pathname), "..");
const list = (await readFile(join(root, "src/wp/assets.txt"), "utf8")).split("\n").filter(Boolean);

let fetched = 0;
let skipped = 0;
const failed = [];
async function one(path) {
  const dest = join(root, "public", path);
  try {
    if ((await stat(dest)).size > 0) return void skipped++;
  } catch {
    /* missing */
  }
  const url = ORIGIN + "/" + path.split("/").map(encodeURIComponent).join("/");
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      await mkdir(dirname(dest), { recursive: true });
      let body = Buffer.from(await res.arrayBuffer());
      if (/\.(css|js)$/.test(path)) {
        body = Buffer.from(
          body
            .toString("utf8")
            .replaceAll("https://thesummitexperts.com/", "/")
            .replaceAll("https:\\/\\/thesummitexperts.com\\/", "\\/"),
        );
      }
      await writeFile(dest, body);
      fetched++;
      return;
    } catch (err) {
      if (attempt === 2) failed.push(`${path} (${err.message})`);
    }
  }
}
const queue = [...list];
await Promise.all(
  Array.from({ length: 16 }, async () => {
    while (queue.length) await one(queue.shift());
  }),
);
console.log(`[wp-assets] fetched ${fetched}, already present ${skipped}, failed ${failed.length}`);
if (failed.length) console.log(failed.join("\n"));
