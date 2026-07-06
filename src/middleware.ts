import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Protect /admin routes, but ignore the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('session_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const session = await verifySessionToken(token);
    if (!session) {
      // Clear invalid token and force login redirect
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.set('session_token', '', { maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

// Intercept all routes starting with /admin
export const config = {
  matcher: ['/admin/:path*'],
};
