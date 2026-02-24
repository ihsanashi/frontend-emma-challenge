'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Link as LinkIcon } from 'lucide-react';

export default function AppLinks() {
  const pathname = usePathname();

  return (
    <section className="my-5">
      <div className="flex items-center justify-center gap-2.5">
        {ROUTES.filter((route) => route.path !== pathname).map((r) => (
          <Button asChild className="mb-5" key={r.key} variant="outline">
            <Link href={r.path}>
              <LinkIcon />
              {r.label}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
