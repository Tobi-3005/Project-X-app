import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "../components/navbar";
import { getCurrentUser } from "../lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project X",
  description: "Smart Energy Platform for Vacation Rentals",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") ?? "";
  const isLoginPage = pathname === "/login";

  const user = isLoginPage ? null : await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F9FA] text-gray-900`}
      >
        {isLoginPage ? (
          children
        ) : (
          <div className="flex min-h-screen">
            <Navbar user={user} />
            <main className="flex-1 ml-60 min-h-screen">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}
