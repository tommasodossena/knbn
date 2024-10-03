"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  DarkLight,
  Gear,
  GridCirclePlus,
  Plus,
} from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import useBoardStore from "@/store/boardStore";
import { AddBoardDialog } from "@/components/AddBoardDialog";

const MotionText = motion(Text);

interface SidebarProps {
  collapsedSize?: number;
  defaultSize?: number;
  defaultCollapsed?: boolean;
  className?: string;
}

export const Sidebar = ({
  collapsedSize = 76,
  defaultSize = 225,
  defaultCollapsed = true,
  className,
}: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isAddBoardDialogOpen, setIsAddBoardDialogOpen] = useState(false);
  const { boards, addBoard } = useBoardStore();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const boardLinks = boards.map((board) => ({
    title: board.name,
    href: `/boards/${board.id}`,
  }));

  const navLinks = [
    {
      title: "Boards List",
      href: "/boards",
      icon: GridCirclePlus,
    },
    ...boardLinks,
    {
      title: "Create Board",
      icon: Plus,
      onClick: () => setIsAddBoardDialogOpen(true),
    },
  ];

  const handleAddBoard = (boardName: string) => {
    addBoard(boardName);
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? collapsedSize : defaultSize }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={cn(className, "p-2")}
      >
        <div className="w-full h-full flex flex-col justify-between rounded-md bg-sidebar text-sidebar-foreground shadow-md">
          <div className="flex flex-col items-center w-full">
            <div
              className={cn(
                "w-full flex h-[60px] items-center justify-between px-2",
                isCollapsed && "justify-center",
              )}
            >
              <MotionText
                variant="h4"
                as="h1"
                className={cn(isCollapsed && "sr-only", "text-accent")}
                initial={false}
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  x: isCollapsed ? -10 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                knbn
              </MotionText>
              <Button variant="outline" size="icon" onClick={toggleSidebar}>
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                {!isCollapsed && (
                  <span className="sr-only">Toggle Sidebar</span>
                )}
              </Button>
            </div>

            <Separator className="bg-sidebar-foreground" />

            <Nav isCollapsed={isCollapsed} links={navLinks} />
          </div>

          <div className="group flex flex-col items-center gap-2 pb-2">
            <Separator className="bg-sidebar-foreground" />
            <div className="w-full flex flex-col items-center gap-2 px-2">
              {/* Theme Button */}
              <Button
                variant="outline"
                size={isCollapsed ? "icon" : "sidebar"}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <div className="w-full flex items-center justify-center">
                  <motion.div
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  >
                    <DarkLight />
                  </motion.div>
                  <motion.div
                    initial={false}
                    className={cn("pl-2", isCollapsed && "sr-only")}
                  >
                    Toggle theme
                  </motion.div>
                </div>
              </Button>

              {/* Settings Button */}
              <Button variant="outline" size={isCollapsed ? "icon" : "sidebar"}>
                <Gear />
                <motion.div
                  initial={false}
                  className={cn("pl-2", isCollapsed && "sr-only")}
                >
                  Settings
                </motion.div>
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>

      <AddBoardDialog
        isOpen={isAddBoardDialogOpen}
        onOpenChange={setIsAddBoardDialogOpen}
        onAddBoard={handleAddBoard}
      />
    </>
  );
};
