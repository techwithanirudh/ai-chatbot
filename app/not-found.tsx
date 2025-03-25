import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function Component() {
  return (
    <div className="flex h-full min-h-svh flex-col items-center justify-center">
      <div className="flex max-w-lg flex-1 flex-col items-center justify-center gap-4 p-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg p-2 bg-muted">
            <Bot className="size-6 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-md text-center text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Button asChild className="w-full">
          <Link href="/">Back To Home</Link>
        </Button>
        <div className="fixed bottom-4 inset-x-0 flex w-full items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">Error 404</p>
        </div>
      </div>
    </div>
  );
}
