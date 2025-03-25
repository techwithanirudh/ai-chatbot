'use client';

import { useAction } from 'next-safe-action/hooks';

import type { MagicLink } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { MagicLinkSchema } from '@/lib/validators';

import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';

import { loginWithMagicLink } from '@/app/(auth)/actions';

import { LoaderIcon } from 'lucide-react';

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(MagicLinkSchema),
    defaultValues: {
      email: '',
    },
  });

  const { execute, result, status } = useAction(loginWithMagicLink);

  const onSubmit = (values: MagicLink) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email address</FormLabel> */}
                <FormControl>
                  <Input
                    {...field}
                    disabled={status === 'executing'}
                    placeholder="Email address"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {status === 'hasSucceeded' && (
          <FormSuccess message={'Confirmation email has been sent!'} />
        )}
        <FormError message={result.serverError} />

        <Button
          disabled={status === 'executing'}
          type="submit"
          className="w-full"
        >
          {status === 'executing' && (
            <LoaderIcon className="mr-2 size-4 animate-spin" />
          )}
          Continue with Email
        </Button>
      </form>
    </Form>
  );
};
