# CampusHub - Enterprise Security & RBAC Architecture Specification

---

## 1. Executive Summary

**CampusHub** is architected as a high-security, multi-tenant SaaS School Operating System. It provides absolute data isolation across participating institutions while enforcing strict, zero-trust Role-Based Access Control (RBAC).

---

## 2. Role Hierarchy & Privilege Matrix

| Role | Hierarchy Level | Route Access | Attendance Perms | Gradebook Perms | Admin Customizer |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Super Admin** | `Level 5` | Full Platform & All Tenants | Override All / Unlock | Full Access | Global Root Config |
| **School Admin**| `Level 4` | Institution-Wide Routes | Mark, Lock & Unlock | View & Publish | Full School Customizer |
| **Teacher**     | `Level 3` | Faculty Lounges & Classes | 1-Tap Mark & Lock | Draft & Submit | View Only |
| **Student**     | `Level 2` | Student HUD & Clubs | **Strict Read-Only** | View Published Only| Hidden / Blocked |
| **Parent**      | `Level 1` | Ward HUD & Notifications | **Strict Read-Only** | View Published Only| Hidden / Blocked |

---

## 3. Defense-in-Depth Security Layers

### Layer 1: Next.js Edge Middleware (`src/middleware.ts`)
- Evaluates `campushub_role` and `campushub_school_id` cookies at the network boundary before page hydration.
- Immediately redirects unauthorized roles attempting to access restricted zones (`/portal/settings`, `/portal/staff-lounge`, `/portal/gradebook/internal`, `/portal/staff-attendance`) to `/portal/denied` with high-visibility audit alerts.

### Layer 2: Client Guard & Context Isolation (`src/context/AuthContext.tsx`)
- Cryptographic session state held within `AuthProvider`.
- Real-time role switching telemetry with automatic UI pruning:
  - Sidebar automatically removes restricted links from student/parent view.
  - Interactive write buttons are stripped from client bundles for unauthorized roles.

### Layer 3: Attendance Immutability & Anti-Tamper Engine (`src/app/portal/attendance/page.tsx`)
- **Student Anti-Tamper Safeguard:** Student and parent accounts cannot invoke write mutations, NFC simulators, bulk resets, or sync triggers.
- **Biometric Submission Lock:** Once marked and locked by the teacher, the session is cryptographically stamped with the faculty member's digital signature and timestamp (`isLocked = true`). Modifications are physically disabled unless overridden by a verified School Admin.

### Layer 4: Multi-Tenant Data Isolation (`src/lib/rbac.ts`)
- Every request payload and data query requires a mandatory `school_id`.
- Users from School A (`sch-001`) are prevented from inspecting or modifying School B (`sch-002`) entities.

---

## 4. PostgreSQL Row-Level Security (RLS) Reference

```sql
-- Multi-Tenant Tenant Isolation Policy
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenant_isolation" ON users
    FOR ALL
    USING (school_id = (auth.jwt() ->> 'school_id')::uuid);

-- Student Read-Only Attendance Policy
CREATE POLICY "student_attendance_readonly" ON attendance
    FOR SELECT
    USING (student_id = auth.uid());

-- Attendance Submission Lock Policy
CREATE POLICY "attendance_immutability_lock" ON attendance
    FOR UPDATE
    USING (
        is_locked = FALSE OR 
        (auth.jwt() ->> 'role') IN ('school_admin', 'super_admin')
    );
```

