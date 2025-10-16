import { NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';

export default auth((req) => {
  const baseUrl = req.nextUrl.origin;

  const isRefreshTokenExpired =
    req.auth && Date.now() >= req.auth.validity.refreshUntil * 1000;

  if (!req.auth || isRefreshTokenExpired) {
    const newUrl = new URL('/auth/signin', baseUrl);
    const response = NextResponse.redirect(newUrl);

    response.cookies.set('next-auth.session-token', '', { maxAge: 0 });
    response.cookies.set('next-auth.csrf-token', '', { maxAge: 0 });

    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/profile', '/reservation-status', '/registration'],
};
