"use client";
import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    href?: string;
    label?: string;
    title: string;
    icon?: LucideIcon;
    onClick?: () => void;
  }[];
}

interface NavItemProps {
  link: {
    href?: string;
    label?: string;
    title: string;
    icon?: LucideIcon;
    onClick?: () => void;
  };
  isCollapsed: boolean;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ link, isCollapsed, pathname }) => {
  const Component = link.href ? Link : Button;

  const isActive = pathname === link.href;
  const staticClasses = "justify-start transition-all duration-250 ease-linear";
  const variantClasses = buttonVariants({
    variant: "sidebar",
    size: "sidebar",
  });
  const sizeClasses = isCollapsed
    ? "h-10 w-10 rounded-3xl hover:rounded-xl"
    : "rounded-md hover:rounded-md";
  const activeClasses = isActive
    ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-50/90 dark:text-neutral-900"
    : "";
  const activeCollapsedClasses = isActive && isCollapsed ? "rounded-xl" : "";

  const itemClasses = cn(
    staticClasses,
    variantClasses,
    sizeClasses,
    activeClasses,
    activeCollapsedClasses,
  );

  const motionProps = {
    initial: false,
    animate: isCollapsed ? "collapsed" : "expanded",
    transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 },
    variants: {
      collapsed: { opacity: 0, x: -10 },
      expanded: { opacity: 1, x: 0 },
    },
  };

  return (
    <Tooltip key={link.title} delayDuration={0}>
      <TooltipTrigger asChild>
        <Component
          href={link.href || ""}
          className={itemClasses}
          onClick={link.onClick}
        >
          {isActive && (
            <motion.div
              layoutId="nav-active"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="absolute w-2 h-8 -left-1 bg-neutral-900 dark:bg-neutral-50/90 rounded-xl"
            />
          )}

          <div className="flex-1 flex items-center">
            {link.icon ? (
              <link.icon className="h-4 w-4" />
            ) : (
              <span className="h-4 w-4 flex items-center justify-center">
                {link.title.slice(0, 2).toUpperCase()}
              </span>
            )}

            <motion.span
              {...motionProps}
              className={cn("pl-2", isCollapsed && "sr-only")}
            >
              {link.title}
            </motion.span>

            <motion.span
              {...motionProps}
              className={cn("ml-auto", isCollapsed && "sr-only")}
            >
              {link.label}
            </motion.span>
          </div>
        </Component>
      </TooltipTrigger>

      <TooltipContent
        side="right"
        className={cn("flex items-center gap-4", !isCollapsed && "hidden")}
      >
        {link.title}
        {link.label && (
          <span className="ml-auto text-muted-foreground">{link.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export function Nav({ isCollapsed, links }: NavProps) {
  const pathname = usePathname();

  return (
    <ScrollArea
      data-collapsed={isCollapsed}
      className="group w-full max-h-[calc(100vh-182px)]"
    >
      <nav className="grid gap-2 p-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 shrink-0 relative">
        {links.map((link, index) => (
          <NavItem
            key={`${link.title}-${index}`}
            link={link}
            isCollapsed={isCollapsed}
            pathname={pathname}
          />
        ))}
      </nav>
    </ScrollArea>
  );
}
