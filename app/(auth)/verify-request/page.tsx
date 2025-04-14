import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthVerifyPage() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center p-6">
      <Card className="min-h-44 min-w-80 bg-muted/50 hover:bg-muted/80 md:min-w-96">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
        </CardHeader>
        <CardContent>
          A sign in link has been sent to your email address.
        </CardContent>
      </Card>
    </div>
  );
}
