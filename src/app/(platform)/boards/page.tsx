import * as React from 'react';

import { range } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BoardCard } from '@/components/BoardCard'; 
import { ScrollArea } from '@/components/ui/scroll-area';

export default function BoardsPage() {
  return (
    <div className="h-full flex flex-col gap-3 pt-2 pr-3">
      <div className="h-[60px] shrink-0 flex items-center gap-2">
        <Button variant="secondary">Create Board</Button>
        <Input type="search" placeholder="Search Boards" />
      </div>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2">
          {range(0, 8).map((i, idx, arr) => (
            <BoardCard key={i} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
