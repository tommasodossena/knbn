"use client";
import * as React from "react";
import { useRouter } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
import {
  User,
  Settings,
  LifeBuoy,
  LogOut
} from "lucide-react";
 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserButtonProps {
  isCollapsed: boolean;
}

export function UserButton({ isCollapsed }: UserButtonProps) {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <Skeleton className={cn("w-full h-10")} />
    )
  }
 
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={isCollapsed ? "icon" : "sidebar"}>
          {isCollapsed ? user.firstName?.charAt(0) + (user.lastName?.charAt(0) ?? '') : user.fullName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mb-2" side="right" sideOffset={20}>
        <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => openUserProfile()}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(() => router.push('/'))}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



