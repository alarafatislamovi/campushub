'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MOCK_USERS, ROLE_CONFIG } from '@/lib/rbac';
import {
  Shield,
  Eye,
  EyeOff,
  Sparkles,
  LogIn,
  Lock,
  User,
  ChevronDown,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [selectedUserId, setSelectedUserId] = useState(MOCK_USERS[0].id);
  const [password, setPassword] = useState('campushub2026');
  const [showPass, setShowPass] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedUser = MOCK_USERS.find((u) => u.id === selectedUserId)!;
  const fromPath = searchParams.get('from') || '/portal/dashboard';

  const handleLogin = async () => {
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate async auth delay
    await new Promise((res) => setTimeout(res, 800));
    login(selectedUser);
    setLoading(false);
    router.push(fromPath);
  };

  const cfg = ROLE_CONFIG[selectedUser.role];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glowing Light Sea Green orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-teal-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl grid lg:grid-cols-2 gap-0 rounded-[32px] overflow-hidden border border-white/80 shadow-2xl">
        {/* LEFT — Luminous Welcome Panel (From Reference Image 1) */}
        <div className="hidden lg:flex flex-col justify-between p-10 glass-welcome-panel text-white relative">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/30">
                🏫
              </div>
              <div>
                <h1 className="font-extrabold text-white tracking-widest text-sm">CAMPUSHUB</h1>
                <p className="text-[10px] font-mono text-teal-100 font-bold">SMART SCHOOL OS</p>
              </div>
            </div>

            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Welcome <span className="text-teal-200">Back!</span>
            </h2>
            <p className="text-white/90 text-sm leading-relaxed mb-8 font-medium">
              Sign in to your secure role-based portal. Your access clearance and data are strictly isolated
              by your school institution and role hierarchy.
            </p>

            {/* Role Hierarchy Visual */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-mono text-white/80 uppercase tracking-widest mb-3 font-bold">
                Supported Role Clearance
              </p>
              {(['super_admin', 'school_admin', 'teacher', 'student', 'parent'] as const).map((r) => {
                const c = ROLE_CONFIG[r];
                return (
                  <div key={r} className="flex items-center gap-2.5 text-xs text-white/95">
                    <span className="text-base">{c.icon}</span>
                    <span className="font-bold">{c.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/15 border border-white/30 text-[10px] font-mono text-white/90 shadow-sm">
            <div className="flex items-center gap-1.5 text-teal-200 mb-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
              MULTI-TENANT CRYPTOGRAPHIC ISOLATION
            </div>
            <p>School data is strictly isolated. School A users cannot access School B data.</p>
          </div>
        </div>

        {/* RIGHT — Light Sea Green Frosted Login Form */}
        <div className="flex flex-col justify-center p-8 sm:p-10 bg-white/85 backdrop-blur-2xl">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-teal-950 mb-1">Sign In</h3>
            <p className="text-slate-600 text-xs font-mono font-medium">Select your role account to continue</p>
          </div>

          {/* From-path notice */}
          {searchParams.get('from') && searchParams.get('from') !== '/portal/dashboard' && (
            <div className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>
                You need to sign in to access <code className="font-mono font-bold">{searchParams.get('from')}</code>
              </span>
            </div>
          )}

          {/* Account Selector */}
          <div className="mb-4">
            <label className="text-[10px] font-mono text-slate-700 uppercase tracking-widest mb-2 block font-bold">
              Account Roster Profile
            </label>
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl glass-card-crystal text-left transition hover:border-teal-500/50"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${cfg.bgColor}`}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-teal-950 truncate">{selectedUser.name}</p>
                  <p className="text-[10px] font-mono text-teal-700 font-bold">
                    {cfg.label} — {selectedUser.schoolName}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropOpen && (
                <div className="absolute left-0 right-0 mt-2 glass-container rounded-2xl overflow-hidden z-50 border border-teal-200 shadow-2xl max-h-80 overflow-y-auto">
                  {/* School A */}
                  <div className="px-3 py-1.5 bg-teal-50 border-b border-teal-100">
                    <p className="text-[9px] font-mono text-teal-900 uppercase tracking-widest font-bold">
                      🏫 Quantum Academy (sch-001)
                    </p>
                  </div>
                  {MOCK_USERS.filter((u) => u.schoolId === 'sch-001').map((u) => {
                    const uc = ROLE_CONFIG[u.role];
                    return (
                      <button
                        key={u.id}
                        onClick={() => { setSelectedUserId(u.id); setDropOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-teal-50 transition ${
                          selectedUserId === u.id ? 'bg-teal-100/70 font-bold' : ''
                        }`}
                      >
                        <span className="text-base">{uc.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-teal-950">{u.name}</p>
                          <p className={`text-[10px] font-mono ${uc.color} font-bold`}>{uc.label}</p>
                        </div>
                        {selectedUserId === u.id && (
                          <span className="ml-auto text-teal-700 text-[10px] font-mono font-bold">✓ Selected</span>
                        )}
                      </button>
                    );
                  })}

                  {/* School B */}
                  <div className="px-3 py-1.5 bg-teal-50 border-b border-teal-100 border-t border-t-teal-100">
                    <p className="text-[9px] font-mono text-teal-900 uppercase tracking-widest font-bold">
                      🔭 Galaxy Institute (sch-002)
                    </p>
                  </div>
                  {MOCK_USERS.filter((u) => u.schoolId === 'sch-002').map((u) => {
                    const uc = ROLE_CONFIG[u.role];
                    return (
                      <button
                        key={u.id}
                        onClick={() => { setSelectedUserId(u.id); setDropOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-teal-50 transition ${
                          selectedUserId === u.id ? 'bg-teal-100/70 font-bold' : ''
                        }`}
                      >
                        <span className="text-base">{uc.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-teal-950">{u.name}</p>
                          <p className={`text-[10px] font-mono ${uc.color} font-bold`}>{uc.label}</p>
                        </div>
                        {selectedUserId === u.id && (
                          <span className="ml-auto text-teal-700 text-[10px] font-mono font-bold">✓ Selected</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-[10px] font-mono text-slate-700 uppercase tracking-widest mb-2 block font-bold">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full pl-10 pr-12 py-3.5 rounded-2xl glass-pill-input text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                placeholder="Enter your password"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            {error && (
              <p className="mt-1.5 text-[11px] text-red-600 font-mono flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
              </p>
            )}
          </div>

          {/* Role badge preview */}
          <div className="mb-6 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-teal-200 bg-teal-50 text-xs font-mono text-teal-900 font-medium">
            <Shield className="w-3.5 h-3.5 shrink-0 text-teal-700" />
            <span>Signing in as <strong>{cfg.label}</strong> · {selectedUser.schoolName}</span>
          </div>

          {/* Sign In Button (From Image 1: Gradient Pill Button) */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm shadow-[0_4px_20px_rgba(59,130,246,0.35)] active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In to CampusHub
              </>
            )}
          </button>

          <p className="mt-4 text-center text-[10px] font-mono text-slate-500 font-medium">
            Phase 1 Demo — Select any account from dropdown to test RBAC roles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-950 font-mono font-bold">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
