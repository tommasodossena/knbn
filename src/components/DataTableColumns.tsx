"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge";
import { Task } from "@/components/TaskCard";
import type { ColumnId } from "@/data";
import { taskLabels, taskPriorities } from "@/data";

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "columnId",
    header: "Status",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  }
];

export { columns };