import { NextRequest, NextResponse } from 'next/server';

//===============================================================

const SESSION_COOKIE_NAME = 'learnlingo_session';

const privateRoutes = ['/favorites', '/profile'];
const privateApiRoutes = ['/api/favorites', '/api/profile'];

//===============================================================

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPrivateApiRoute = privateApiRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (sessionCookie) {
    return NextResponse.next();
  }

  if (isPrivateApiRoute) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

//===============================================================

export const config = {
  matcher: [
    '/favorites/:path*',
    '/profile/:path*',
    '/api/favorites/:path*',
    '/api/profile/:path*',
  ],
};
