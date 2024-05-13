import React, { useEffect, useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskCard, Task } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GripVertical, Plus } from "lucide-react";
import { taskLabels, taskStatuses } from "@/data";

export interface Column {
  id: UniqueIdentifier;
  value: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  column: Column;
  type: ColumnType;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

const BoardColumn = ({ column, tasks, isOverlay }: BoardColumnProps) => {
  const [isClient, setIsClient] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.value}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const columnVariants = cva(
    "h-auto w-[250px] bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={columnVariants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-3 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.value}`}</span>
          <GripVertical size={16} />
        </Button>
        <div className="flex items-center gap-1 ml-auto">
          <span className="ml-auto capitalize">{column.value}</span>
          <Badge variant={"outline"} className="ml-2">
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
      <CardFooter className="flex justify-center items-center p-2">
        {isClient && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"} size={"sidebar"}>
                <Plus size={16} />
                <span className="ml-2">Add Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>
                  Write down the task you want to add to the board.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="Title">Title</Label>
                  <Input id="Title" placeholder="Get sh*t done" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Description">Description (optional)</Label>
                  <Textarea id="Description" placeholder="Write a description" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Description">Label</Label>
                  <span>Bug | Feautre | etc...</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Description">Status</Label>
                  <span>Backlog | Todo | In Progress | Done</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Description">Priority</Label>
                  <span>Low | Medium | High</span>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const boardVariants = cva("h-full w-full", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={boardVariants({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 justify-center items-start h-full pr-3 pl-2">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export { BoardColumn };