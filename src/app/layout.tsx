import type { Metadata } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["WONK"], // Fraunces has some nice variable axes if needed
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Shayan | Full-Stack Developer",
  description: "Full-Stack Developer & Founder of FJ NEXUS. I build web apps and school/business systems that ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased bg-[var(--ink)] text-[var(--paper)] selection:bg-[var(--signal)] selection:text-[var(--paper)]">
        {children}
      </body>
    </html>
  );
}
