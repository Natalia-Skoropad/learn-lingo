import { NextResponse } from 'next/server';

import {
  createSessionCookie,
  getCurrentUserFromSession,
  setSessionCookie,
} from '@/lib/server/auth/session';

//===============================================================

type LoginRequestBody = {
  idToken?: string;
};

//===============================================================

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequestBody;
    const idToken = body.idToken?.trim();

    if (!idToken) {
      return NextResponse.json(
        { message: 'idToken is required' },
        { status: 400 }
      );
    }

    const sessionCookie = await createSessionCookie(idToken);
    await setSessionCookie(sessionCookie);

    const user = await getCurrentUserFromSession();

    if (!user) {
      return NextResponse.json(
        { message: 'Failed to create session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user,
      ok: true,
    });
  } catch (error) {
    console.error('POST /api/auth/login error:', error);

    return NextResponse.json({ message: 'Unable to sign in' }, { status: 500 });
  }
}
