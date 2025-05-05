import { headers } from 'next/headers';
import { dummySession } from '@/lib/auth/dummy-session';
import type { Session } from '@/lib/auth/types';

/**
 * Function to get session from auth app. Called from RSC/APIs
 * @returns User's session
 */
export async function getAuthSession(): Promise<Session | null> {
  const requestHeaders = await headers();
  try {
    // When auth is disabled, a dummy session is returned
    if (process.env.DISABLE_AUTH === 'true') {
      return dummySession;
    }

    const authAppUrl = process.env.NEXT_PUBLIC_AUTH_APP_URL;
    if (!authAppUrl) {
      throw new Error('Auth app URL is not configured');
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

    const session: Session = {
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

    return session;
  } catch (error) {
    console.error('Error fetching auth session:', error);
    return null;
  }
}
