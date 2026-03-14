import { NextResponse } from 'next/server';

import {
  addTeacherToCurrentUserFavorites,
  getFavoriteTeachersForCurrentUser,
} from '@/lib/server/favorites/favorites.server';

//===============================================================

type PostBody = {
  teacherId?: string;
};

//===============================================================

export async function GET() {
  try {
    const teachers = await getFavoriteTeachersForCurrentUser();

    return NextResponse.json({
      teachers,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.error('GET /api/favorites error:', error);

    return NextResponse.json(
      { message: 'Failed to load favorites' },
      { status: 500 }
    );
  }
}

//===============================================================

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PostBody;
    const teacherId = body.teacherId?.trim();

    if (!teacherId) {
      return NextResponse.json(
        { message: 'teacherId is required' },
        { status: 400 }
      );
    }

    await addTeacherToCurrentUserFavorites(teacherId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.error('POST /api/favorites error:', error);

    return NextResponse.json(
      { message: 'Failed to add favorite' },
      { status: 500 }
    );
  }
}
