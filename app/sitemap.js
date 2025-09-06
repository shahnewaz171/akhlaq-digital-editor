export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://akhlaq-digital-editor.vercel.app";
  const currentDate = new Date().toISOString();

  // Define all app directory pages
  const appPages = [
    {
      url: "",
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "/docs",
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "/docs/npm",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "/docs/cdn",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "/example",
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  return appPages.map((page) => ({
    url: page.url ? `${baseUrl}${page.url}` : baseUrl,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
