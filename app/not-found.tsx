import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function Component() {
  return (
    <div className="flex h-full min-h-svh flex-col items-center justify-center">
      <div className="flex max-w-md flex-1 flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg p-2 text-primary-foreground bg-zinc-900">
            <Bot className="size-6" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-lg text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Button asChild className="w-full">
          <Link href="/">Back To Home</Link>
        </Button>
        <div className="fixed bottom-4 inset-x-0 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground">
          <p className="text-sm text-muted-foreground">Error 404</p>
        </div>
      </div>
    </div>
  );
}
