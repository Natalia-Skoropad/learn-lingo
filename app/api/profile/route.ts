import { NextResponse } from 'next/server';

import { getCurrentUserProfile } from '@/lib/server/profile/profile.server';

//===============================================================

export async function GET() {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('GET /api/profile error:', error);

    return NextResponse.json(
      { message: 'Unable to load profile' },
      { status: 500 }
    );
  }
}
