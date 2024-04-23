"use client";
import * as React from "react";
import {
  Square,
  SquareCheckBig,
} from "lucide-react";

import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// interface BoardCardProps {
//   title: string;
//   description: string;
//   href: string;
// }

export function BoardCard() {
  return (
    <Card className="dark:bg-neutral-900">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Square size={14} />
          <Typography variant="p">14 task</Typography>
        </div>
        <div className="flex items-center gap-2">
          <SquareCheckBig size={14} />
          <Typography variant="p">2 completed Tasks</Typography>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-2">
          <Button>View</Button>
          <Button variant="outline">Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
