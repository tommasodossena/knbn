import * as React from 'react';

import { Typography } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

export default function Board() {
  return (
  <div className="flex flex-col flex-1">
    <div className="flex items-center px-4 h-[60px]">
      <Typography variant="h4" as="h1">Workspace&apos;s Name Board</Typography>
    </div>
    <Separator />
  </div>
  );
}
