import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/main/navbar";

const PAD_T = "pt-[72px]"; // must match NAV_H

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raimundo Estévez",
  description: "Información personal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen `}
      >
        <div>
          <div className="fixed inset-x-0 top-0 z-50 flex justify-center h-225">
            <Navbar />
          </div>
          <div className="w-full h-[200px]"></div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
