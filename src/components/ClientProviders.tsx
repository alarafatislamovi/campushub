'use client';

import React from 'react';
import { SchoolProvider } from '@/context/SchoolContext';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SchoolProvider>{children}</SchoolProvider>
    </AuthProvider>
  );
}

