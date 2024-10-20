"use client";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const manrope = localFont({
  src: "/fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased` }
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
