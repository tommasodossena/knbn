import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from '@/components/ui/typography';

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between px-5 py-4">
        <Typography variant="h6" as="h1">knbn</Typography>
        {/* TODO: add theme selector here and make it public accessible */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "link", size: "default" }),
                  )}
                >
                  Log in
                </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 max-w-xl text-justify pt-40 px-5">
        {children}
      </main>
      {/* Footer */}
    </div>
  );
}