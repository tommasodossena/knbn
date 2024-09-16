"use client";
import * as React from "react";

import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, CalendarClock, Dot } from "lucide-react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface BoardCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  className?: string;
  onClick: () => void;
}

export function BoardCard({
  id,
  title,
  description,
  createdAt,
  className,
  onClick,
}: BoardCardProps) {
  return (
    <Card
      className={cn("dark:bg-neutral-900 cursor-pointer mb-2", className)}
      onClick={onClick}
    >
      <div className="flex gap-2 p-3.5">
        <Badge>Development</Badge>
      </div>
      <Separator />
      <CardHeader>
        <Text variant="largeText">{title}</Text>
        <Text>{description}</Text>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="w-full lg:w-fit flex-1 flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
            <div>
              <Text className="text-xs font-semibold uppercase text-neutral-400">
                Created on
              </Text>
              <Text
                className="text-gray-600 tracking-tighter"
                variant="smallText"
              >
                {createdAt
                  ? format(new Date(createdAt), "EEE, dd MMM yyyy")
                  : "N/A"}
              </Text>
            </div>
            <Calendar size={16} strokeWidth={1.5} color="gray" />
          </div>

          <div className="w-full lg:w-fit flex-1 flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
            <div>
              <Text className="text-xs font-semibold uppercase text-neutral-400">
                Due Date
              </Text>
              <Text
                className="text-gray-600 tracking-tighter"
                variant="smallText"
              >
                Thu, 12 Sep 2024
              </Text>
            </div>
            <CalendarClock size={16} strokeWidth={1.5} color="gray" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Dot size={20} strokeWidth={3} color="gray" />
            <Text variant="smallText">Priority: Normal</Text>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
