import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar2 from "./ui/main/navbarv2";

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
          <div className="fixed top-0 inset-x-0 z-30 justify-center">
            <Navbar2 />
          </div>

          <main className="relative z-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
