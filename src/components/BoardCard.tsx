"use client";
import React, { memo } from "react";
import { cn } from "@/lib/utils";

import { Text } from "@/components/ui/text";
import { Card, CardHeader } from "@/components/ui/card";

interface BoardCardProps {
  id: string;
  value: string;
  createdAt: string;
  className?: string;
  onClick: () => void;
}

export const BoardCard = memo(
  ({ id, value, className, onClick }: BoardCardProps) => {
    return (
      <Card
        className={cn(
          "w-full bg-sidebar-foreground cursor-pointer mb-1.5",
          className,
        )}
        onClick={onClick}
      >
        <CardHeader className="p-3">
          <Text
            variant="smallText"
            className="text-accent break-words whitespace-pre-wrap"
          >
            {value}
          </Text>
        </CardHeader>
      </Card>
    );
  },
);
