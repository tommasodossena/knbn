import * as React from 'react';

import { Typography } from '@/components/ui/typography';

export default function MarketingPage() {
  return (
    <>
      <section className="mb-4">
        <Typography variant="h6" as="h1">knbn</Typography>
        <p>Keep notes, build notes.</p>
      </section>
      <section className="mb-4">
        <Typography variant="h6" as="h2">About</Typography>
        <p>Built for personal usage, designed with personal preferences. Bare-featured, minimal boring interface.</p>
      </section>
      <section className="mb-4">
        <Typography variant="h6" as="h2">Join</Typography>
        <p>Sign up for free to start managing your tasks.</p>
      </section>
    </>
  );
}
