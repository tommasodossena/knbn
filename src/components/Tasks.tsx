import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/DataTableColumns";
import { initialTasks } from "@/data";

const Tasks = () => {
  return (
    <ScrollArea className="h-full">
      <DataTable columns={columns} data={initialTasks} />
      <ScrollBar />
    </ScrollArea>
  );
}

export { Tasks };