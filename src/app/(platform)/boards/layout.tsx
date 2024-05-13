"use client";
import { usePathname } from "next/navigation";

import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";

interface BoardsLayoutProps {
  children: React.ReactNode
}

export default function BoardsLayout({ children }: BoardsLayoutProps) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={0}>
        <div className="grid grid-cols-[auto,minmax(0,1fr)] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <Sidebar className="h-screen z-20" />
          <main className="h-screen z-10">
            {children}
          </main>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
