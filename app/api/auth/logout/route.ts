import { NextResponse } from 'next/server';

import {
  clearSessionCookie,
  revokeSessionByCookie,
} from '@/lib/server/auth/session';

//===============================================================

export async function POST() {
  try {
    await revokeSessionByCookie();
    await clearSessionCookie();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('POST /api/auth/logout error:', error);

    return NextResponse.json(
      { message: 'Unable to sign out' },
      { status: 500 }
    );
  }
}
