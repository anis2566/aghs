import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react"
import localFont from "next/font/local";
import NextTopLoader from 'nextjs-toploader';

import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth";

import { QueryProvider } from "@/providers/query-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";

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

export const metadata: Metadata = {
  title: "AGHS | Reunion 2024",
  description: "Armanitola Govt. High School Reunion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              {children}
              <Toaster />
              <NextTopLoader showSpinner={false} />
              <ModalProvider />
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
