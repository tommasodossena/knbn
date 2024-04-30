import * as React from 'react';

import { Typography } from '@/components/ui/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Board({
  params,
}: {
  params: { id: string; };  
}) {
  return (
    <Tabs defaultValue="board" className="flex flex-col flex-1">
      <div className="h-[60px] flex justify-between items-center ">
        <Typography as="h2" variant="h4">Board {params.id}</Typography>
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="task">Tasks</TabsTrigger>
        </TabsList>
      </div>

      <div className="py-2">
        <TabsContent value="board" className="m-0 flex gap-4 overflow-x-auto">
          {/* columns view with 3 default columns (editable), with drag and drop and reorder features */}
          <Typography variant="p">Column 1</Typography>
          <Typography variant="p">Column 2</Typography>
          <Typography variant="p">Column 3</Typography>
        </TabsContent>
        <TabsContent value="task" className="m-0 flex flex-col gap-4">
          {/* data table view with all tasks */}
          <Typography variant="p">Task 1</Typography>
          <Typography variant="p">Task 2</Typography>
          <Typography variant="p">Task 3</Typography>
        </TabsContent>
      </div>
    </Tabs>
  );
}
