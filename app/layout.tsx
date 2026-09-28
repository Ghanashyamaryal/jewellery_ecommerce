import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { NavigationProvider } from "@/components/layout/NavigationProvider";
import { getNavigation } from "@/lib/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aryal Siring Gems — Handcrafted Silver Jewellery from Nepal",
    template: "%s | Aryal Siring Gems",
  },
  description:
    "Handcrafted 925 sterling silver jewellery, natural gemstones, deity idols and silver home decor from Nepali silversmiths in Kathmandu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NavigationProvider value={getNavigation()}>
            <Suspense fallback={<div className="h-20" />}></Suspense>
            {children}
          </NavigationProvider>
        </Providers>
      </body>
    </html>
  );
}
