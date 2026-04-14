import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anis Ksontini — Tech Lead & Solution Architect | PHP/Symfony · Node.js",
  description:
    "Senior Tech Lead and Solution Architect with 17+ years in B2B SaaS and ERP. PHP/Symfony, Node.js, cloud architecture. Remote-ready for European teams.",
  metadataBase: new URL("https://ksontini.me"),
  openGraph: {
    type: "website",
    url: "https://ksontini.me",
    title: "Anis Ksontini — Tech Lead & Solution Architect",
    description:
      "Senior Tech Lead and Solution Architect with 17+ years in B2B SaaS and ERP. PHP/Symfony, Node.js, cloud architecture. Remote-ready for European teams.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://ksontini.me" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        className="min-h-screen antialiased"
        style={{ fontFamily: "var(--font-inter-var), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
