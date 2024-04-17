"use client";
import * as React from "react";

import { Typography } from '@/components/ui/typography';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 h-[60px]">
      <Typography variant="h4" as="h2">{title}</Typography>
    </header>
  );
}