"use client";
import * as React from "react";
import {
  SquareKanban,
  SquareCheckBig,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Nav } from "@/components/Nav";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    // TODO: add a transition to the sidebar (hint: use the `framer motion layout` utility)
    <aside
      className={cn(
        "flex flex-col justify-between h-screen border-r",
        isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
      )}
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
              title: "Board",
              label: "3",
              href: "/board",
              icon: SquareKanban,
            },
            {
              title: "Tasks",
              label: "12",
              href: "/tasks",
              icon: SquareCheckBig,
            },
          ]}
        />
      </div>

      <div className="group flex flex-col items-center gap-2 py-2">
        <Separator />
        <div className="flex flex-col items-center gap-2 px-2">
          <ThemeToggle isCollapsed={isCollapsed} />
          <Button variant="outline" size={isCollapsed ? "icon" : "sidebar"}>
            {isCollapsed ? "TD" : "Tommaso Dossena"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
