import React from "react";

import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/DataTableColumns";
import { initialTasks } from "@/data";

const Tasks = () => {
  return (
    <DataTable columns={columns} data={initialTasks} />
  );
}

export { Tasks };