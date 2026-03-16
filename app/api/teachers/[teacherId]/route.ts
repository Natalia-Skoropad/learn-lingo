import { NextResponse } from 'next/server';

import { getTeacherById } from '@/lib/server/teachers/teachers.server';

//===============================================================

type Params = {
  params: Promise<{
    teacherId: string;
  }>;
};

//===============================================================

export async function GET(_: Request, { params }: Params) {
  try {
    const { teacherId } = await params;

    const teacher = await getTeacherById(teacherId);

    if (!teacher) {
      return NextResponse.json(
        { message: 'Teacher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ teacher });
  } catch (error) {
    console.error('GET /api/teachers/[teacherId] error:', error);

    return NextResponse.json(
      { message: 'Failed to load teacher' },
      { status: 500 }
    );
  }
}
