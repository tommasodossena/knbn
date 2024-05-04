"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Sparkle,
  Asterisk,
  PanelRightClose,
  PanelRightOpen,
  Plus,
} from "lucide-react";
import { SPRING } from "@/constants";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@/components/UserButton";
import { Nav } from "@/components/Nav";

interface SidebarProps {
  collapsedSize?: number;
  defaultSize?: number;
  defaultCollapsed?: boolean;
  className?: string;
}

const MotionTypography = motion(Typography);

export function Sidebar({
  collapsedSize = 76,
  defaultSize = 200,
  defaultCollapsed = true,
  className
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(prevState => !prevState);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? collapsedSize : defaultSize }}
      transition={SPRING}
      className={cn(className, "p-2")}
    >
      <div className="w-full h-full flex flex-col justify-between rounded-md bg-neutral-100 dark:bg-neutral-900">
        <div className="flex flex-col items-center w-full">
          <div
            className={cn(
              "w-full flex h-[60px] items-center justify-between px-2",
              isCollapsed && "justify-center"
            )}
          >
            <MotionTypography
              variant="h4"
              as="h1"
              className={cn(isCollapsed && "sr-only")}
              initial={false}
              animate={{ 
                opacity: isCollapsed ? 0 : 1,
                x: isCollapsed ? -10 : 0,
              }}
              transition={SPRING}
            >
              knbn
            </MotionTypography>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCollapse}
            >
              {isCollapsed ? <PanelRightClose /> : <PanelRightOpen />}
              {!isCollapsed && <span className="sr-only">Toggle Sidebar</span>}
            </Button>
          </div>

          <Separator />
          
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Boards List",
                href: "/boards",
                icon: Compass,
              },
              {
                title: "Board 1",
                label: "4",
                href: "/boards/1",
                icon: Sparkle,
              },
              {
                title: "Board 2",
                label: "7",
                href: "/boards/2",
                icon: Asterisk,
              },
              {
                title: "Create Board",
                icon: Plus,
              },
            ]}
          />
        </div>
        <div className="group flex flex-col items-center gap-2 pb-2">
          <Separator />
          <div className="w-full flex flex-col items-center gap-2 px-2">
            <ThemeToggle isCollapsed={isCollapsed} />          
            <UserButton isCollapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
