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
          "shadow dark:bg-neutral-900 cursor-pointer mb-1.5 mx-2",
          className,
        )}
        onClick={onClick}
      >
        <CardHeader>
          <Text variant="smallText">{value}</Text>
        </CardHeader>
      </Card>
    );
  },
);
