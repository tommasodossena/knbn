"use client";
import * as React from "react";
import {
  CircleCheckBig,
} from "lucide-react";

import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface BoardCardProps {
  // title: string;
  // description: string;
  // href: string;
  className?: string;
}

export function BoardCard({ className }: BoardCardProps) {
  return (
    <Card className={cn('dark:bg-neutral-900', className)}>
      <CardHeader>
        <CardTitle>Board Name</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div className="flex justify-end gap-2">
            <Button>View</Button>
            <Button variant="outline">Delete</Button>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig size={14} />
            <Typography variant="p">2/14</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
