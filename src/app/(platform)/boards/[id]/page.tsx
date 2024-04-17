import * as React from 'react';

import { Typography } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

export default function Board({
  params,
}: {
  params: { id: string; };  
}) {
  return (
  <div className="flex flex-col flex-1 px-4">
    <Typography>Board {params.id}</Typography>
  </div>
  );
}
