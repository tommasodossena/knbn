"use client";
import React from "react";
import { Table } from "@tanstack/react-table";
import { X } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/DataTableFacetedFilter";
import { DataTableViewOptions } from "@/components/DataTableViewOptions";

import { taskPriorities, taskStatuses } from "@/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search tasks..."
          value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("content")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("columnId") && (
          <DataTableFacetedFilter
            column={table.getColumn("columnId")}
            title="Status"
            options={taskStatuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={taskPriorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}