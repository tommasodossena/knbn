import * as React from 'react';

import { range } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BoardCard } from '@/components/BoardCard'; 

export default function BoardsPage() {
  return (
    <div className="flex flex-col gap-3 pt-4 pb-2">
      <div className="flex items-center gap-2">
        <Button variant="secondary">Create Board</Button>
        <Input type="search" placeholder="Search Boards" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {range(0, 8).map((i) => (
          <BoardCard key={i} />
        ))}
      </div>
    </div>
  );
}
