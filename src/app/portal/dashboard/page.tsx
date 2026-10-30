'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Users,
  Bot,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  CloudDownload,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { CURRENT_USER } from '@/data/mockData';

export default function PortalDashboardPage() {
  const [targetDonut, setTargetDonut] = useState(105);

  return (
    <div className="space-y-8">
      {/* TOP MASTER HUD BANNER */}
      <div className="glass-container rounded-[32px] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 text-[10px] font-mono bg-teal-100 text-teal-900 rounded-full border border-teal-200 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                QUANTUM HUD // ACTIVE
              </span>
              <span className="text-xs font-mono text-slate-600 font-medium">Class 10 Alpha Sector</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-teal-950 tracking-wide">
              Welcome back, {CURRENT_USER.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
              Crystalline glass nodes synchronized. Attendance matrix is primed, and curriculum AI co-pilots are ready for prompt dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/portal/attendance"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-700 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(13,148,136,0.35)] hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 fill-white text-white" />
              1-Tap Attendance
            </Link>
            <Link
              href="/portal/ai-study"
              className="inline-flex items-center gap-2 px-5 py-3 glass-card-crystal text-teal-900 hover:text-teal-950 rounded-full transition-all text-xs sm:text-sm font-bold border border-teal-200 shadow-sm"
            >
              <Bot className="w-4 h-4 text-teal-600" />
              AI Assistant
            </Link>
          </div>
        </div>
      </div>

      {/* SIGNATURE 3-CARD LAYOUT DIRECTLY ECHOING REFERENCE IMAGE 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1 (4 COLS): Circular Gradient Ring Donut Gauge (Directly from Image 2) */}
        <div className="lg:col-span-4 glass-card-crystal rounded-[28px] p-6 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between pb-2 border-b border-teal-900/10">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-bold">
              Target Arc Gauge
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">
              98.2% Sync
            </span>
          </div>

          <div className="my-4 relative">
            <div className="w-36 h-36 rounded-full p-3 conic-gradient-ring shadow-[0_0_25px_rgba(249,115,22,0.3)] flex items-center justify-center animate-spin-slow">
              <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center p-2 text-center shadow-inner">
                <span className="text-3xl font-black text-teal-950 font-mono leading-none">
                  {targetDonut}
                </span>
                <span className="text-[9px] text-slate-600 font-mono font-bold uppercase mt-1 leading-tight">
                  Total Download Target
                </span>
              </div>
            </div>
          </div>

          <div className="w-full pt-2 border-t border-teal-900/10 flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Class 10 Target</span>
            <button
              onClick={() => setTargetDonut((d) => (d >= 130 ? 95 : d + 10))}
              className="text-teal-700 font-bold hover:underline"
            >
              Adjust Arc
            </button>
          </div>
        </div>

        {/* Card 2 (4 COLS): "Your Profile Stats" Dual Stat Box (Directly from Image 2) */}
        <div className="lg:col-span-4 glass-card-crystal rounded-[28px] p-6 flex flex-col justify-between space-y-4">
          <div className="text-center pb-2 border-b border-teal-900/10">
            <h5 className="text-xs font-mono uppercase tracking-widest text-teal-950 font-bold">
              Your Profile Stats
            </h5>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center divide-x divide-teal-900/10 my-auto py-2">
            {/* Stat 1: Download Remaining (95) */}
            <div className="space-y-2 px-2">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700 shadow-sm">
                <CloudDownload className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-3xl font-black text-teal-950 font-mono">
                95
              </div>
              <p className="text-[11px] text-slate-600 font-mono font-medium leading-tight">
                Download Remaining
              </p>
            </div>

            {/* Stat 2: Earnings ($750) */}
            <div className="space-y-2 px-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700 shadow-sm">
                <CreditCard className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-3xl font-black text-teal-950 font-mono">
                $750
              </div>
              <p className="text-[11px] text-slate-600 font-mono font-medium leading-tight">
                Earnings / Ledger
              </p>
            </div>
          </div>

          <div className="w-full pt-2 border-t border-teal-900/10 text-center text-[10px] font-mono text-teal-800 font-bold">
            Synchronized with PostgreSQL
          </div>
        </div>

        {/* Card 3 (4 COLS): Mini Quick Action Hub */}
        <div className="lg:col-span-4 glass-card-crystal rounded-[28px] p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-teal-900/10">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-bold">
              Fast Dispatch
            </span>
            <span className="w-2 h-2 rounded-full bg-teal-500" />
          </div>

          <div className="space-y-2.5 my-auto">
            <Link
              href="/portal/attendance"
              className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-teal-50 border border-teal-100 transition shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <Zap className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-950">1-Min Attendance</p>
                  <p className="text-[10px] text-slate-500 font-mono">30-sec grid mark</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-950 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/portal/notes"
              className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-teal-50 border border-teal-100 transition shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-950">Study Notes Vault</p>
                  <p className="text-[10px] text-slate-500 font-mono">1,420 holographic PDFs</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-950 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/portal/clubs"
              className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-teal-50 border border-teal-100 transition shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                  <Award className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-950">Club Pavilions</p>
                  <p className="text-[10px] text-slate-500 font-mono">5 societies active</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-950 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="w-full pt-2 border-t border-teal-900/10 flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Next: Physics Quiz</span>
            <span className="text-teal-800 font-bold">11:30 AM</span>
          </div>
        </div>

      </div>
    </div>
  );
}
