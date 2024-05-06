"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Button } from "@/components/ui/button";
import { SPRING } from "@/constants";

interface ThemeToggleProps {
  isCollapsed: boolean;
}

const MotionButton = motion(Button);

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ isCollapsed, ...props }, ref) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const themeControls = useAnimation();
    const collapseControls = useAnimation();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (isCollapsed) {
        collapseControls.start({ opacity: 0, x: -10, transition: { ...SPRING, delay: 0.1 } });
      } else {
        collapseControls.start({ opacity: 1, x: 0, transition: { ...SPRING, delay: 0.1 } });
      }
    }, [isCollapsed, collapseControls]);

    function handleClick() {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
      themeControls.start({ rotate: theme === 'light' ? 0 : -90 }, { type: "spring", duration: 0.5 });
    }

    if (!mounted) {
      return (
        <Skeleton className={cn("w-full h-10")} />
      )
    }

    return (
      <MotionButton
        variant="outline"
        size={isCollapsed ? "icon" : "sidebar"}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="w-full flex items-center justify-center">
          <motion.div
            animate={themeControls}
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          >
            {theme === 'light' ? <Sun size="20" /> : <Moon size="20" />}
          </motion.div>
          <motion.div
            initial={false}
            animate={collapseControls}
            className={cn("pl-2", isCollapsed && "sr-only")}
          >
            Toggle theme
          </motion.div>
        </div>
      </MotionButton>
    );
  }
);


export { ThemeToggle };