const getExcludePaths = () => [];

export default function robots() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://akhlaq-digital-editor.vercel.app";

  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Slurp",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: getExcludePaths(),
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
