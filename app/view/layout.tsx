// ./add/layout.tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Add Product | Item Catalog",
  description:
    "Add new products with details like name, price, category and image.",

  robots: {
    index: false,
    follow: false,
  },

  applicationName: "Daiwik Korat",
  authors: [{ name: "Daiwik" }],
  generator: "Next.js",

  keywords: [
    "add product",
    "product form",
    "inventory management",
    "admin panel",
  ],

  openGraph: {
    title: "Add Product | Item Catalog",
    description:
      "Create and manage products easily in the inventory system.",
    url: "https://github.com/",
    siteName: "GitHub",
    images: [
      {
        url: "https://github.com/",
        width: 1200,
        height: 630,
        alt: "Add Product Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
