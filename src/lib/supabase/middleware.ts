import { NextResponse, type NextRequest } from 'next/server';

export function handleAdminMiddleware(request: NextRequest) {
  const token = request.cookies.get('sb-access-token')?.value;
  if (!token && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}
