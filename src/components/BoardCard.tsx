"use client";
import * as React from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BoardCardProps {
  id: string;
  title: string;
  description: string;
  className?: string;
  onClick: () => void;
}

export function BoardCard({
  id,
  title,
  description,
  className,
  onClick,
}: BoardCardProps) {
  return (
    <Card
      className={cn("dark:bg-neutral-900 cursor-pointer", className)}
      onClick={onClick}
    >
      <CardHeader>
        <Text variant="largeText">{title}</Text>
      </CardHeader>
      <CardContent>
        <Text>{description}</Text>
      </CardContent>
    </Card>
  );
}
