import type { NextRequest } from 'next/server';
import { handleAdminMiddleware } from '@/lib/supabase/middleware';

export function middleware(request: NextRequest) {
  return handleAdminMiddleware(request);
}

export const config = {
  matcher: ['/admin/:path*'],
};
