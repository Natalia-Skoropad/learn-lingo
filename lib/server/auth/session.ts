import 'server-only';

import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';

//===============================================================

const SESSION_COOKIE_NAME = 'learnlingo_session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 5;

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export type SessionUser = {
  uid: string;
  email: string;
  name: string;
};

//===============================================================

export async function createSessionCookie(idToken: string): Promise<string> {
  return adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION_MS,
  });
}

//===============================================================

export async function setSessionCookie(sessionCookie: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: sessionCookie,
    ...baseCookieOptions,
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

//===============================================================

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    ...baseCookieOptions,
    maxAge: 0,
  });
}

//===============================================================

export async function getSessionCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

//===============================================================

export async function verifySessionCookie(
  sessionCookie: string,
  checkRevoked = true
) {
  return adminAuth.verifySessionCookie(sessionCookie, checkRevoked);
}

//===============================================================

export async function getCurrentUserFromSession(): Promise<SessionUser | null> {
  const sessionCookie = await getSessionCookie();

  if (!sessionCookie) return null;

  try {
    const decoded = await verifySessionCookie(sessionCookie);

    return {
      uid: decoded.uid,
      email: decoded.email ?? '',
      name:
        typeof decoded.name === 'string' && decoded.name.trim()
          ? decoded.name
          : 'User',
    };
  } catch {
    return null;
  }
}

//===============================================================

export async function revokeSessionByCookie(): Promise<void> {
  const sessionCookie = await getSessionCookie();

  if (!sessionCookie) return;

  try {
    const decoded = await verifySessionCookie(sessionCookie, false);
    await adminAuth.revokeRefreshTokens(decoded.sub);
  } catch {
    // no-op
  }
}
