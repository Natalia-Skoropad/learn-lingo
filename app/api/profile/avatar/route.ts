import { NextResponse } from 'next/server';

import { adminStorageBucket } from '@/lib/firebase/admin';
import {
  getCurrentUserProfile,
  updateCurrentUserAvatar,
} from '@/lib/server/profile/profile.server';

//===============================================================

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

//===============================================================

function getAvatarExtension(file: File): string {
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
}

function createFirebaseDownloadUrl(
  bucketName: string,
  path: string,
  token: string
): string {
  const encodedPath = encodeURIComponent(path);

  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`;
}

async function deleteStorageFile(path?: string): Promise<void> {
  if (!path) return;

  try {
    await adminStorageBucket.file(path).delete();
  } catch (error) {
    console.error('Failed to delete avatar file:', error);
  }
}

//===============================================================

export async function POST(request: Request) {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('avatar');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: 'Avatar file is required' },
        { status: 400 }
      );
    }

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: 'Please upload a JPG, PNG, or WEBP image.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_AVATAR_SIZE) {
      return NextResponse.json(
        { message: 'Avatar image must be smaller than 2 MB.' },
        { status: 400 }
      );
    }

    const extension = getAvatarExtension(file);
    const avatarPath = `users/${
      profile.uid
    }/avatar/avatar-${Date.now()}.${extension}`;
    const downloadToken = crypto.randomUUID();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await adminStorageBucket.file(avatarPath).save(buffer, {
      contentType: file.type,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: downloadToken,
        },
      },
    });

    const avatarUrl = createFirebaseDownloadUrl(
      adminStorageBucket.name,
      avatarPath,
      downloadToken
    );

    await deleteStorageFile(profile.avatarPath);

    const user = await updateCurrentUserAvatar({
      avatarUrl,
      avatarPath,
    });

    return NextResponse.json({
      user,
      ok: true,
    });
  } catch (error) {
    console.error('POST /api/profile/avatar error:', error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Unable to upload avatar',
      },
      { status: 400 }
    );
  }
}

//===============================================================

export async function DELETE() {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await deleteStorageFile(profile.avatarPath);

    const user = await updateCurrentUserAvatar({
      avatarUrl: null,
      avatarPath: null,
    });

    return NextResponse.json({
      user,
      ok: true,
    });
  } catch (error) {
    console.error('DELETE /api/profile/avatar error:', error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Unable to delete avatar',
      },
      { status: 400 }
    );
  }
}
