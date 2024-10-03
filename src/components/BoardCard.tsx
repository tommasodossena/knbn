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
          "w-full bg-primary cursor-pointer mb-1.5 mx-auto",
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
