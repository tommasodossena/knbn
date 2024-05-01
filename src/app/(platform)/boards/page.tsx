import * as React from 'react';

import { range } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BoardCard } from '@/components/BoardCard'; 

export default function BoardsPage() {
  return (
    <div className="flex flex-col gap-3 pt-2 pb-2">
      <div className="flex items-center gap-2">
        <Button variant="secondary">Create Board</Button>
        <Input type="search" placeholder="Search Boards" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {range(0, 8).map((i) => (
          <BoardCard key={i} />
        ))}
      </div>
    </div>
  );
}
