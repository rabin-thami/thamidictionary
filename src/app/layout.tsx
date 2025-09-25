import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import type React from "react";
import { auth } from "@/auth";
import SessionWrapper from "@/components/session-provider/page";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Template",
  description: "Template or boilerplate for Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={` ${spaceGrotesk.variable} antialiased`}>
        <SessionWrapper session={session}>{children}</SessionWrapper>
      </body>
    </html>
  );
}
