"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isCollapsed: boolean;
}

export function ThemeToggle({ isCollapsed }: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  }

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Skeleton className={cn("w-full h-10")} />
    )
  }

  return (
    <Button
      variant="outline"
      size={isCollapsed ? "icon" : "sidebar"}
      onClick={handleClick}
    >
      <div className="w-full flex items-center justify-center">
        <Moon
          className={cn("h-[1.2rem] w-[1.2rem]",
            theme !== "dark" && "hidden",
            !isCollapsed && "mr-2"
          )}
        />
        <Sun
          className={cn("h-[1.2rem] w-[1.2rem]",
            theme === "dark" && "hidden",
            !isCollapsed && "mr-2"
          )}
        />
        {!isCollapsed && <span>Toggle Theme</span>}
      </div>
    </Button>
  );
}
