"use client";
import * as React from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BoardCardProps {
  title: string;
  description: string;
  className?: string;
}

export function BoardCard({ title, description, className }: BoardCardProps) {
  return (
    <Card className={cn("dark:bg-neutral-900", className)}>
      <CardHeader>
        <Text variant="largeText">{title}</Text>
      </CardHeader>
      <CardContent>
        <Text>{description}</Text>
      </CardContent>
    </Card>
  );
}
