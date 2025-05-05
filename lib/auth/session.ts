import { headers } from 'next/headers';
import { dummySession } from '@/lib/auth/dummy-session';
import type { Session } from '@/lib/auth/types';

/**
 * Checks if authentication is disabled in the current environment
 * @returns Boolean indicating if auth is disabled
 */
function isAuthDisabled(): boolean {
  return process.env.DISABLE_AUTH === 'true';
}

/**
 * Function to get session from auth app. Called from RSC/APIs
 * @returns User's session
 */
export async function getAuthSession(): Promise<Session | null> {
  const requestHeaders = await headers();

  // When auth is disabled, a dummy session is returned
  if (isAuthDisabled()) {
    return dummySession;
  }

  try {
    const authAppUrl = process.env.NEXT_PUBLIC_AUTH_APP_URL;
    if (!authAppUrl) {
      throw new Error('Auth app URL is not configured', {
        cause: new Error(
          `NEXT_PUBLIC_AUTH_APP_URL environment variable is missing or empty`,
        ),
      });
    }
    const cookie = requestHeaders.get('cookie') || '';

    const response = await fetch(`${authAppUrl}/api/auth/get-session`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    });
    const rawSession = await response.json();

    if (!rawSession?.session) {
      throw new Error('Session not found');
    }

    return {
      ...rawSession,
      session: {
        ...rawSession.session,
        userId: Number(rawSession.session.userId),
      },
      user: {
        ...rawSession.user,
        id: Number(rawSession.user.id),
      },
    };
  } catch (error) {
    console.error('Error fetching auth session:', error, {
      authAppUrl: process.env.NEXT_PUBLIC_AUTH_APP_URL,
      hasCookie: !!requestHeaders.get('cookie'),
    });
    return null;
  }
}
