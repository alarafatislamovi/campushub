// ============================================================
// CampusHub Next.js Middleware — Route-Level RBAC Enforcement
// Reads campushub_role cookie to gate protected routes
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { UserRole } from '@/lib/rbac';

const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/portal/settings': ['super_admin', 'school_admin'],
  '/portal/staff-lounge': ['super_admin', 'school_admin', 'teacher'],
  '/portal/gradebook/internal': ['super_admin', 'school_admin', 'teacher'],
  '/portal/staff-attendance': ['super_admin', 'school_admin'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get('campushub_role')?.value as UserRole | undefined;

  // Check if this route has restrictions
  const requiredRoles = ROUTE_PERMISSIONS[pathname];
  if (!requiredRoles) {
    // No restriction — allow through
    return NextResponse.next();
  }

  // No session cookie → redirect to login
  if (!roleCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Has cookie but wrong role → deny page
  if (!requiredRoles.includes(roleCookie)) {
    const deniedUrl = new URL('/portal/denied', request.url);
    deniedUrl.searchParams.set('required', requiredRoles.join(','));
    deniedUrl.searchParams.set('current', roleCookie);
    deniedUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(deniedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portal/settings',
    '/portal/staff-lounge',
    '/portal/gradebook/internal',
    '/portal/staff-attendance',
  ],
};

