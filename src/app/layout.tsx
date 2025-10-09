import type { Metadata } from "next";
import { Space_Grotesk, Eczar } from "next/font/google";
import "./globals.css";
import type React from "react";
import { auth } from "@/auth";
import SessionWrapper from "@/components/session-provider/page";
import { ThemeProvider } from "@/components/session-provider/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const eczar = Eczar({
  variable: "--font-eczar",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thami Dictionary",
  description: "Your own Language Dictionary.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${spaceGrotesk.variable} ${eczar.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionWrapper session={session}>{children}</SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
