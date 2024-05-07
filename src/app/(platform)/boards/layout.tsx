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
        <div className="grid grid-cols-[auto,minmax(0,1fr)] w-full">
          <Sidebar className="h-screen" />
          <main className="h-screen">
            {children}
          </main>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
