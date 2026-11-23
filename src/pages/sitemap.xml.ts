import type { APIRoute } from "astro";
import casesData from "../data/cases.json";
import softwareData from "../data/software.json";

const base = "https://www.shmuzhian.cn";
const staticPaths = [
  "/",
  "/work/",
  "/services/",
  "/services/software/",
  "/studio/",
  "/contact/",
  "/company/",
  "/privacy/"
];

const cases = (casesData as any[]).filter((item) => item.published !== false);
const software = (softwareData as any[]).filter((item) => item.published !== false);
const lastmod = new Date().toISOString().slice(0, 10);

const urls = [
  ...staticPaths,
  ...cases.map((item) => `/work/${item.slug}/`),
  ...software.map((item) => `/services/software/${item.slug}/`)
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${base}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" ? "1.0" : path.includes("/services/software/") ? "0.7" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

export const GET: APIRoute = () =>
  new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
