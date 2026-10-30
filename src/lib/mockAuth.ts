// ============================================================
// CampusHub Mock Auth — Simulates JWT session via cookies
// Phase 1: Cookie-based role simulation (no real backend yet)
// ============================================================

import { MockUser, MOCK_USERS } from '@/lib/rbac';

const SESSION_KEY = 'campushub_session';

export function setSession(user: MockUser): void {
  if (typeof document === 'undefined') return;
  // Store in sessionStorage (tab-scoped) + cookie for middleware
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  // Set cookies for Next.js middleware (7-day expiry)
  document.cookie = `campushub_role=${user.role}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  document.cookie = `campushub_school_id=${user.schoolId}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  document.cookie = `campushub_user_id=${user.id}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearSession(): void {
  if (typeof document === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY);
  document.cookie = 'campushub_role=; path=/; max-age=0';
  document.cookie = 'campushub_school_id=; path=/; max-age=0';
  document.cookie = 'campushub_user_id=; path=/; max-age=0';
}

export function getSession(): MockUser | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

export function getUserById(id: string): MockUser | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}

// Default guest user (before login)
export const GUEST_USER: MockUser = {
  id: 'guest',
  name: 'Guest User',
  email: 'guest@campushub.edu',
  role: 'student',
  schoolId: 'sch-001',
  schoolName: 'Quantum Academy',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
  quantumRank: 'VISITOR',
};

