import React, { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskCard, Task } from "@/components/TaskCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GripVertical, Plus } from "lucide-react";

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
          <span className="ml-auto"> {column.value}</span>
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
        <Button variant={"ghost"} size={"sidebar"}>
          <Plus size={16} />
          <span className="ml-2">Add Task</span>
        </Button>
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