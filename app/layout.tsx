// ./app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Item Catalog",
  authors: [{ name: "Daiwik Korat", url: "https://github.com/" }],
  description:
    "Welcome to the Webpage of a seller how sells random things but fun to buy LOL!",
  icons: {
    icon: "/logo.svg",
  },
  keywords: ["Selling Webpage", "Cheap Items", "High Quality Products"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D]"
      >
        {children}
      </body>
    </html>
  );
}
