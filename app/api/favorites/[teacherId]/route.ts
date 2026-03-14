import { NextResponse } from 'next/server';

import { removeTeacherFromCurrentUserFavorites } from '@/lib/server/favorites/favorites.server';

//===============================================================

type Params = {
  params: Promise<{
    teacherId: string;
  }>;
};

//===============================================================

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { teacherId } = await params;
    const normalizedTeacherId = teacherId?.trim();

    if (!normalizedTeacherId) {
      return NextResponse.json(
        { message: 'teacherId is required' },
        { status: 400 }
      );
    }

    await removeTeacherFromCurrentUserFavorites(normalizedTeacherId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.error('DELETE /api/favorites/[teacherId] error:', error);

    return NextResponse.json(
      { message: 'Failed to remove favorite' },
      { status: 500 }
    );
  }
}
