import { NextResponse } from 'next/server';

import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from '@/lib/server/profile/profile.server';

//===============================================================

type UpdateProfileRequestBody = {
  name?: string;
  email?: string;
  phone?: string | null;
};

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

//===============================================================

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as UpdateProfileRequestBody;

    const user = await updateCurrentUserProfile({
      name: body.name,
      email: body.email,
      phone: body.phone,
    });

    return NextResponse.json({
      user,
      ok: true,
    });
  } catch (error) {
    console.error('PATCH /api/profile error:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Unable to update profile',
      },
      { status: 400 }
    );
  }
}
