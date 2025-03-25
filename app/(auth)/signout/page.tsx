import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signOut } from '@/server/auth';

export default function AuthSignoutPage() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center p-6">
      <Card className="min-h-44 min-w-80 bg-muted/50 hover:bg-muted/80 md:min-w-96">
        <CardHeader>
          <CardTitle>Sign out</CardTitle>
        </CardHeader>
        <CardContent>Are you sure you want to sign out?</CardContent>
        <CardFooter>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button variant={'destructive'} type="submit">
              Sign out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
