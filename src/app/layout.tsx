import type { Metadata } from "next";
import "@/styles/globals.css";

import { fontSans, fontMono } from "@/lib/fonts";
import { Sidebar } from "@/components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <TooltipProvider delayDuration={0}>
          <div className="grid grid-cols-[auto,minmax(0,1fr)] w-full dark:bg-black bg-white font-mono">
            <Sidebar className="h-screen" />
            <main className="h-screen">{children}</main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
