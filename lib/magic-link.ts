import { Resend } from 'resend';
import { MagicLinkEmail } from '@/emails/magic-link';

import type { EmailConfig } from '@auth/core/providers';
import type { Theme } from '@auth/core/types';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

interface VerificationProps {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
  theme: Theme;
  request: Request;
}

export async function sendVerificationRequest(params: VerificationProps) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);

  if (typeof provider.from !== 'string') {
    throw new Error(
      `Invalid "from" email: Expected a string but received ${typeof provider.from}. Please provide a valid email address.`,
    );
  }

  const { data: res, error } = await resend.emails.send({
    from: provider.from,
    to,
    subject: `Sign in to ${host}`,
    react: MagicLinkEmail({ magicLink: url }),
    text: text({ url, host }),
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
