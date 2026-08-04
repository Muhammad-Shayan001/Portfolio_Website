import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Muhammad Shayan | Full Stack Developer & Software Engineer",
  description: "Cinematic developer portfolio of Muhammad Shayan - Full Stack Developer crafting clean, high-performance web applications using React, Next.js, Node.js, and TypeScript.",
  keywords: ["Muhammad Shayan", "Full Stack Developer", "Software Engineer", "Next.js Portfolio", "React Developer", "Karachi Pakistan"],
  openGraph: {
    title: "Muhammad Shayan | Full Stack Developer",
    description: "Passionate developer crafting clean, efficient code to solve real-world problems.",
    url: "https://github.com/Muhammad-Shayan001",
    siteName: "Muhammad Shayan Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      <body className="antialiased bg-[#08080A] text-[#F1F1F3] selection:bg-[#E10600] selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
