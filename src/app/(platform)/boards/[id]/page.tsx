import * as React from 'react';

import { Typography } from '@/components/ui/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Board } from "@/components/Board"
import { Tasks } from "@/components/Tasks"

export default function BoardPage({
  params,
}: {
  params: { id: string; };  
}) {
  return (
    <Tabs defaultValue="board" className="flex flex-col h-full py-2">
      <div className="h-[60px] shrink-0 flex justify-between items-center pr-3 pl-2">
        <Typography as="h2" variant="h4">Board {params.id}</Typography>
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="task">Tasks</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="board" className="m-0 pt-3 h-full max-h-[calc(100%-60px)]">
        <Board />
      </TabsContent>
      <TabsContent value="task" className="m-0 h-full max-h-[calc(100%-60px)]">
        <Tasks />
      </TabsContent>
    </Tabs>
  );
}
