"use client";
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge";
import { Task } from "@/components/TaskCard";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Circle,
  CircleCheck,
  CircleHelp,
  CircleDot,
  LucideIcon
} from 'lucide-react';
import { taskLabels, taskPriorities, taskStatuses } from "@/data";

const statusComponents: { [key: string]: LucideIcon } = {
  "backlog": CircleHelp,
  "todo": Circle,
  "in-progress": CircleDot,
  "done": CircleCheck
};

const priorityComponents: { [key: string]: LucideIcon } = {
  "low": ArrowDown,
  "medium": ArrowRight,
  "high": ArrowUp
};

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {      
      const label = taskLabels.find((label) => label.value === (row.original.label as string).toLowerCase());      
      
      if (!label) {
        return null;
      }

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("content")}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "columnId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = taskStatuses.find((status) => status.id === (row.getValue("columnId") as string));

      if (!status) {
        return null;
      }

      const StatusComponent = statusComponents[status.id];

      return (
        <div className="flex items-center space-x-2">
          <span className="shrink-0">
            <StatusComponent size={16} strokeWidth={1.5} />
          </span>
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = taskPriorities.find((priority) => priority.value === (row.getValue("priority") as string).toLowerCase());

      if (!priority) {
        return null;
      }

      const PriorityComponent = priorityComponents[priority.value];

      return (
        <div className="flex items-center space-x-2">
          <span className="shrink-0">
            <PriorityComponent size={16} strokeWidth={1.5} />
          </span>
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

export { columns };