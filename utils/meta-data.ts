export const homeMetaData = () => ({
  title: {
    default:
      "Akhlaq Digital Editor - Modern Rich Text Editor for React & JavaScript",
    template: "%s | Akhlaq Digital Editor",
  },
  description:
    "A powerful, modern rich text editor for React applications and vanilla JavaScript. Built with Tiptap and optimized for performance, accessibility, and developer experience. Features include rich formatting, tables, lists, mentions, and more.",
  keywords: [
    "rich text editor",
    "react editor",
    "tiptap",
    "wysiwyg",
    "markdown",
    "javascript editor",
    "typescript",
    "prosemirror",
    "text editor",
    "content editor",
    "mentions",
    "tables",
    "formatting",
  ],
  authors: [
    { name: "Akhlaq Digital", url: "https://akhlaq-digital-editor.vercel.app" },
  ],
  creator: "Akhlaq Digital",
  publisher: "Akhlaq Digital",
  category: "Developer Tools",
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" }],
    other: [{ rel: "mask-icon", url: "/favicon.svg", color: "#3B82F6" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Akhlaq Digital Editor - Modern Rich Text Editor",
    description:
      "A powerful, modern rich text editor for React applications and vanilla JavaScript. Built with Tiptap and optimized for performance, accessibility, and developer experience.",
    url: "https://akhlaq-digital-editor.vercel.app",
    siteName: "Akhlaq Digital Editor",
    images: [
      {
        url: "https://akhlaq-digital-editor.vercel.app/editor-preview.svg",
        width: 800,
        height: 500,
        alt: "Akhlaq Digital Editor Preview - Rich Text Editor Interface",
      },
      {
        url: "https://akhlaq-digital-editor.vercel.app/icon-192.svg",
        width: 192,
        height: 192,
        alt: "Akhlaq Digital Editor Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhlaq Digital Editor - Modern Rich Text Editor",
    description:
      "A powerful, modern rich text editor for React applications and vanilla JavaScript. Built with Tiptap and optimized for performance.",
    images: ["https://akhlaq-digital-editor.vercel.app/editor-preview.svg"],
    creator: "@akhlaqdigital", // Replace with actual Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://akhlaq-digital-editor.vercel.app",
  },
});

export const getSoftwareAppSchemaMarkup = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Akhlaq Digital Editor",
    description:
      "A powerful, modern rich text editor for React applications and vanilla JavaScript. Built with Tiptap and optimized for performance, accessibility, and developer experience.",
    url: "https://akhlaq-digital-editor.vercel.app",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Akhlaq Digital",
      url: "https://akhlaq-digital-editor.vercel.app",
    },
    datePublished: "2024-01-01",
    dateModified: "2025-09-06",
    version: "0.14.7",
    programmingLanguage: ["JavaScript", "TypeScript"],
    runtimePlatform: ["Web Browser", "Node.js"],
    codeRepository: "https://github.com/shahnewaz171/akhlaqdigital",
    downloadUrl: "https://npmjs.com/package/@akhlaqdigital/editor",
    softwareVersion: "0.14.7",
    releaseNotes:
      "Modern rich text editor with enhanced features and performance improvements",
  };

  return JSON.stringify(schema);
};

export const getBreadcrumbListSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://akhlaq-digital-editor.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Documentation",
        item: "https://akhlaq-digital-editor.vercel.app/docs",
      },
    ],
  };
  return JSON.stringify(schema);
};
