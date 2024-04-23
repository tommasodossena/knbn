import * as React from 'react';

import { Typography } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

export default function Board({
  params,
}: {
  params: { id: string; };  
}) {
  return (
  <div className="flex flex-col flex-1 gap-4 py-6">
    <Typography as="h2" variant="h4">Board {params.id}</Typography>
    <div className="flex gap-4">
      <Typography variant="p">Column 1</Typography>
      <Typography variant="p">Column 2</Typography>
      <Typography variant="p">Column 3</Typography>
    </div>
  </div>
  );
}
