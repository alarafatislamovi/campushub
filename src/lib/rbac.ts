// ============================================================
// CampusHub RBAC — Role-Based Access Control Core Library
// Phase 1: Frontend-simulated (Phase 2 will enforce via Supabase JWT)
// ============================================================

export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string;
  schoolName: string;
  avatar: string;
  quantumRank?: string;
}

// Role hierarchy: higher number = more permissions
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 5,
  school_admin: 4,
  teacher: 3,
  student: 2,
  parent: 1,
};

// Route permission map: which roles can access each route
export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/portal/dashboard': ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
  '/portal/attendance': ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
  '/portal/feed': ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
  '/portal/notes': ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
  '/portal/ai-study': ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
  '/portal/clubs': ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
  '/portal/results': ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
  // Admin-only
  '/portal/settings': ['super_admin', 'school_admin'],
  // Staff private zones — hidden from student & parent
  '/portal/staff-lounge': ['super_admin', 'school_admin', 'teacher'],
  '/portal/gradebook/internal': ['super_admin', 'school_admin', 'teacher'],
  '/portal/staff-attendance': ['super_admin', 'school_admin'],
};

// Role display config
export const ROLE_CONFIG: Record<UserRole, { label: string; color: string; bgColor: string; icon: string }> = {
  super_admin: { label: 'Super Admin', color: 'text-red-400', bgColor: 'bg-red-500/20 border-red-500/40', icon: '👑' },
  school_admin: { label: 'School Admin', color: 'text-amber-400', bgColor: 'bg-amber-500/20 border-amber-500/40', icon: '🏫' },
  teacher: { label: 'Teacher', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20 border-cyan-500/40', icon: '🎓' },
  student: { label: 'Student', color: 'text-purple-400', bgColor: 'bg-purple-500/20 border-purple-500/40', icon: '📚' },
  parent: { label: 'Parent', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20 border-emerald-500/40', icon: '👪' },
};

// Helper: check if a role can access a route
export function canAccess(role: UserRole, route: string): boolean {
  const allowed = ROUTE_PERMISSIONS[route];
  if (!allowed) return true; // public route
  return allowed.includes(role);
}

// Helper: check if role has minimum hierarchy level
export function hasMinRole(userRole: UserRole, minRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minRole];
}

// Helper: check if role can write attendance
export function canWriteAttendance(role: UserRole): boolean {
  return hasMinRole(role, 'teacher');
}

// Helper: can see staff-only zones
export function isStaff(role: UserRole): boolean {
  return hasMinRole(role, 'teacher');
}

// Mock user presets for the login page — two schools
export const MOCK_USERS: MockUser[] = [
  // School A — CampusHub Quantum Academy (sch-001)
  {
    id: 'sa-001',
    name: 'Dr. Orion Vance',
    email: 'orion@quantum.edu',
    role: 'super_admin',
    schoolId: 'sch-001',
    schoolName: 'Quantum Academy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=orion',
    quantumRank: 'SUPER ADMIN — SYSTEM ROOT',
  },
  {
    id: 'sa-002',
    name: 'Prof. Nova Chen',
    email: 'nova@quantum.edu',
    role: 'school_admin',
    schoolId: 'sch-001',
    schoolName: 'Quantum Academy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nova',
    quantumRank: 'SCHOOL ADMIN — TIER 1',
  },
  {
    id: 'sa-003',
    name: 'Ms. Lyra Sinclair',
    email: 'lyra@quantum.edu',
    role: 'teacher',
    schoolId: 'sch-001',
    schoolName: 'Quantum Academy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lyra',
    quantumRank: 'FACULTY — PHYSICS',
  },
  {
    id: 'sa-004',
    name: 'Zara Neon',
    email: 'zara@student.quantum.edu',
    role: 'student',
    schoolId: 'sch-001',
    schoolName: 'Quantum Academy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zara',
    quantumRank: 'STUDENT — CLASS 10-A',
  },
  {
    id: 'sa-005',
    name: 'Mr. Eon Neon (Parent)',
    email: 'eon@parent.quantum.edu',
    role: 'parent',
    schoolId: 'sch-001',
    schoolName: 'Quantum Academy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eon',
    quantumRank: 'PARENT — GUARDIAN',
  },
  // School B — Galaxy Institute (sch-002) — different tenant
  {
    id: 'sb-001',
    name: 'Principal Axon Ray',
    email: 'axon@galaxy.edu',
    role: 'school_admin',
    schoolId: 'sch-002',
    schoolName: 'Galaxy Institute',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=axon',
    quantumRank: 'SCHOOL ADMIN — TIER 1',
  },
  {
    id: 'sb-002',
    name: 'Ms. Vega Starr',
    email: 'vega@student.galaxy.edu',
    role: 'student',
    schoolId: 'sch-002',
    schoolName: 'Galaxy Institute',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vega',
    quantumRank: 'STUDENT — CLASS 9-B',
  },
];

