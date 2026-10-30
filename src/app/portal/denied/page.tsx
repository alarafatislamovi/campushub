'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIG, UserRole } from '@/lib/rbac';
import { ShieldOff, ArrowLeft, Lock, AlertTriangle } from 'lucide-react';

function DeniedContent() {
  const searchParams = useSearchParams();
  const { role, currentUser } = useAuth();

  const required = (searchParams.get('required') || '').split(',').filter(Boolean) as UserRole[];
  const from = searchParams.get('from') || '/portal/dashboard';

  const currentCfg = ROLE_CONFIG[role];
  const requiredLabels = required.map((r) => ROLE_CONFIG[r]?.label || r).join(' or ');

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-400/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Big Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-3xl bg-red-50 border border-red-300 flex items-center justify-center shadow-lg">
            <ShieldOff className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Error code */}
        <p className="text-[10px] font-mono text-red-700 uppercase tracking-[0.3em] mb-2 font-bold">
          Error 403 — Access Denied
        </p>
        <h1 className="text-4xl font-black text-teal-950 mb-3">
          Permission <span className="text-red-600">Denied</span>
        </h1>
        <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
          You do not have the required clearance to access this zone. This incident has been logged.
        </p>

        {/* Current vs Required */}
        <div className="glass-card-crystal rounded-2xl p-5 mb-6 text-left space-y-3 shadow-md border border-teal-100">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">Your Role</span>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${currentCfg.bgColor} ${currentCfg.color}`}>
              {currentCfg.icon} {currentCfg.label}
            </span>
          </div>
          <div className="h-px bg-teal-900/10" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">Required Role</span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-red-100 border border-red-300 text-red-800">
              🔒 {requiredLabels}
            </span>
          </div>
          <div className="h-px bg-teal-900/10" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">Route</span>
            <code className="text-[10px] font-mono text-teal-950 bg-teal-50 px-2 py-1 rounded-lg border border-teal-200">{from}</code>
          </div>
          <div className="h-px bg-teal-900/10" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">Account</span>
            <span className="text-[10px] font-mono text-slate-800 font-bold">{currentUser.name}</span>
          </div>
        </div>

        {/* Warning box */}
        <div className="mb-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-left shadow-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 font-mono font-medium">
            Unauthorized access attempts are recorded. If you believe this is an error, contact your
            School Administrator.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Link
            href="/portal/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-crystal text-sm font-bold text-teal-950 hover:bg-white transition border border-teal-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-700 to-cyan-600 text-white text-sm font-bold hover:from-teal-800 hover:to-cyan-700 transition shadow-md"
          >
            <Lock className="w-4 h-4" />
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DeniedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-950 font-bold">Loading...</div>}>
      <DeniedContent />
    </Suspense>
  );
}
