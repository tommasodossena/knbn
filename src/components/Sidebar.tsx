"use client";
import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import { motion } from 'framer-motion';
import {
  SquareKanban,
  Asterisk,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Nav } from "@/components/Nav";
import { SPRING } from "@/constants";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <motion.aside
      initial={{ width: 200 }}
      animate={{ width: isCollapsed ? 60 : 200 }}
      transition={SPRING}
      className="flex flex-col justify-between rounded-md bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="flex flex-col items-center w-full">
        <div
          className={cn(
            "w-full flex h-[60px] items-center justify-between px-2",
            isCollapsed && "justify-center"
          )}
        >
          <Typography
            variant="h4"
            as="h1"
            className={cn(isCollapsed && "sr-only")}
          >
            knbn
          </Typography>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
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
              label: "3",
              href: "/boards",
              icon: SquareKanban,
            },
            {
              title: "Board 1",
              label: "3",
              href: "/boards/1",
              icon: Asterisk,
            },
          ]}
        />
      </div>

      <div className="group flex flex-col items-center gap-2 py-2">
        <Separator />
        <div className="w-full flex flex-col items-center gap-2 px-2">
          <ThemeToggle isCollapsed={isCollapsed} />
          {/* <Button variant="outline" size={isCollapsed ? "icon" : "sidebar"}>
            {isCollapsed ? "TD" : "Tommaso Dossena"}
          </Button> */}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },  
            }}
          />
        </div>
      </div>
    </motion.aside>
  );
}
