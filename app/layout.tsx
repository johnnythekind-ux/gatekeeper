import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gatekeeper",
description:
  "Portfolio SaaS application demonstrating Stripe subscriptions, entitlement logic, webhooks, billing portals, and protected application access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
  <header className="border-b border-slate-800 bg-slate-950">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="/" className="text-lg font-bold">
        Gatekeeper™
      </a>

      <nav className="flex items-center gap-5 text-sm text-slate-300">

  <a href="/" className="hover:text-white">
    Home
  </a>

  <a href="/pricing" className="hover:text-white">
    Pricing
  </a>

  <a href="/dashboard" className="hover:text-white">
    Dashboard
  </a>

  <a href="/signin" className="hover:text-white">
    Sign In
  </a>

  <a
    href="/signup"
    className="rounded border border-slate-700 px-3 py-1 hover:border-slate-500 hover:text-white"
  >
    Sign Up
  </a>

</nav>
    </div>
  </header>

  {children}
</body>
    </html>
  );
}
