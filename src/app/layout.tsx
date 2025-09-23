import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import type React from "react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Template",
  description: "Templatte or boilerplate for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
