"use client";
import { usePathname } from "next/navigation";

import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface BoardsLayoutProps {
  children: React.ReactNode
}

export default function BoardsLayout({ children }: BoardsLayoutProps) {
  const pathname = usePathname();
  const slugs = pathname.split('/').filter(slug => slug);

  let title;
  if (slugs.length > 1) {
    title = slugs.join(' - ');
  } else {
    title = slugs[0];
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={0}>
        <div className="flex">
          <Sidebar className="sticky top-0 left-0 h-screen" />
          <main className="flex-1 px-3 py-2">{children}</main>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
