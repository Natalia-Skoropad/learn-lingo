import { NextResponse } from 'next/server';

import { getCurrentUserFromSession } from '@/lib/server/auth/session';

//===============================================================

export async function GET() {
  try {
    const user = await getCurrentUserFromSession();

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('GET /api/auth/me error:', error);

    return NextResponse.json(
      { message: 'Unable to get current user' },
      { status: 500 }
    );
  }
}
