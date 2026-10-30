'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MockUser, UserRole, canAccess, ROUTE_PERMISSIONS } from '@/lib/rbac';
import { getSession, setSession, clearSession, GUEST_USER } from '@/lib/mockAuth';

interface AuthContextValue {
  currentUser: MockUser;
  role: UserRole;
  schoolId: string;
  isAuthenticated: boolean;
  login: (user: MockUser) => void;
  logout: () => void;
  hasAccess: (route: string) => boolean;
  switchRole: (role: UserRole) => void; // Demo helper
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser>(GUEST_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const saved = getSession();
    if (saved) {
      setCurrentUser(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback((user: MockUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setSession(user);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(GUEST_USER);
    setIsAuthenticated(false);
    clearSession();
  }, []);

  const hasAccess = useCallback(
    (route: string) => canAccess(currentUser.role, route),
    [currentUser.role]
  );

  // Demo helper: switch role without full login flow
  const switchRole = useCallback(
    (role: UserRole) => {
      const updated: MockUser = { ...currentUser, role };
      setCurrentUser(updated);
      setSession(updated);
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser.role,
        schoolId: currentUser.schoolId,
        isAuthenticated,
        login,
        logout,
        hasAccess,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

