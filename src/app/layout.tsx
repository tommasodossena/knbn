import type { Metadata } from "next";
import "@/styles/globals.css";

import { fontSans, fontMono } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "knbn",
  description: "client-side minimal kanban board",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
