import * as React from 'react';

import { Typography } from '@/components/ui/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Board } from "@/components/Board"

export default function BoardPage({
  params,
}: {
  params: { id: string; };  
}) {
  return (
    <Tabs defaultValue="board" className="flex flex-col h-full w-full py-2">
      <div className="h-[60px] shrink-0 flex justify-between items-center">
        <Typography as="h2" variant="h4">Board {params.id}</Typography>
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="task">Tasks</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="board" className="m-0 pt-3 w-full h-full">
        <Board />
      </TabsContent>
      <TabsContent value="task" className="m-0 pt-3">
        {/* data table view component with all tasks */}
        <Typography variant="p">Task 1</Typography>
        <Typography variant="p">Task 2</Typography>
        <Typography variant="p">Task 3</Typography>
      </TabsContent>
    </Tabs>
  );
}
