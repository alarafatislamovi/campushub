'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdmissionModal from '@/components/AdmissionModal';
import { useSchool } from '@/context/SchoolContext';
import {
  Sparkles,
  Zap,
  Bot,
  Users2,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Activity,
  Layers,
  ChevronRight,
  FileText,
  Calendar,
  Award,
  Lock,
  User,
  CloudDownload,
  CreditCard,
  KeyRound,
  Eye,
  Sliders,
  Settings,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HomePage() {
  const { branding, content, modules, notices } = useSchool();
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [selectedNoticeCategory, setSelectedNoticeCategory] = useState<'all' | 'urgent' | 'exam' | 'general'>('all');

  // Interactive Reference Showcase Card State (Directly reflecting Image 1 & 2)
  const [activeTabMenu, setActiveTabMenu] = useState<'Home' | 'Services' | 'About us' | 'Contact us'>('Home');
  const [loginEmail, setLoginEmail] = useState('faculty.vance@campushub.school');
  const [loginPass, setLoginPass] = useState('••••••••••••');
  const [otpDigits, setOtpDigits] = useState(['4', '9', '2', '8', '1', '7']);
  const [simulatedLoginState, setSimulatedLoginState] = useState<'idle' | 'logging' | 'success'>('idle');

  // Target Donut Metric State
  const [donutMetric, setDonutMetric] = useState(105);

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulatedLoginState('logging');

    setTimeout(() => {
      setSimulatedLoginState('success');
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}
      setTimeout(() => setSimulatedLoginState('idle'), 3000);
    }, 700);
  };

  const filteredNotices = selectedNoticeCategory === 'all'
    ? notices
    : notices.filter((n) => n.category === selectedNoticeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenAdmission={() => setAdmissionOpen(true)} />

      <main className="flex-1 space-y-20 pt-6">
        {/* HERO SECTION WITH DYNAMIC HEADLINE & SUBHEADLINE */}
        <section className="relative px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card-crystal text-teal-900 text-xs font-mono mb-6 shadow-glow-teal border border-teal-600/30">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span className="font-bold">{branding.schoolName.toUpperCase()} • {branding.campusCode}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-teal-950 mb-6 leading-tight">
            {content.heroHeadline.includes('100-Years') ? (
              <>
                The 100-Years-Ahead <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-800 via-teal-600 to-cyan-600">
                  Cyber-School Holographic OS
                </span>
              </>
            ) : (
              content.heroHeadline
            )}
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-lg text-slate-700 mb-8 font-normal leading-relaxed">
            {content.heroSubheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/portal/dashboard"
              className="px-6 py-3.5 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(13,148,136,0.35)] text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition hover:scale-[1.02] active:scale-95"
            >
              Enter Student / Faculty Portal
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/portal/settings"
              className="px-5 py-3.5 glass-card-crystal text-amber-900 hover:text-amber-950 rounded-full text-xs sm:text-sm font-mono font-bold flex items-center gap-2 transition border border-amber-500/30 hover:border-amber-500/60"
            >
              <Settings className="w-4 h-4 text-amber-600" />
              Customize School Portal
            </Link>
          </div>
        </section>

        {/* =========================================================================
            FEATURED INTERACTIVE SHOWCASE MODULE (DIRECTLY EMBODYING IMAGES 1 & 2)
            ========================================================================= */}
        <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-teal-800 bg-teal-600/10 px-3.5 py-1.5 rounded-full border border-teal-600/20 font-bold">
              Interactive Crystalline Glassmorphic UI
            </span>
          </div>

          {/* Master Glass Container (Matching Image 1 & 2 outer frame) */}
          <div className="glass-container rounded-[36px] p-5 sm:p-8 relative overflow-hidden">
            {/* Top Micro Header */}
            <div className="flex items-center justify-between pb-6 border-b border-teal-900/10 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-sm shadow-inner text-white font-bold">
                  {branding.schoolLogoIcon}
                </div>
                <span className="text-teal-950 font-extrabold tracking-wider uppercase">
                  {branding.schoolName} // QUANTUM_PORTAL
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-teal-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  Light Sea Green Crystalline Active
                </span>
                <span>•</span>
                <span className="text-slate-700 font-bold">Node: {branding.campusCode}</span>
              </div>
            </div>

            {/* Grid Layout: Left Side (Login/Welcome Split) + Right Side (Donut Arc & Profile Stats) */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDE (7 COLS): DUAL-TONE SPLIT CARD (INSPIRED BY REFERENCE IMAGE 1 & 2) */}
              <div className="lg:col-span-7 rounded-[30px] overflow-hidden border border-white/80 shadow-2xl grid grid-cols-1 sm:grid-cols-12">
                
                {/* Left Inner Welcome Banner (Directly from Image 1's Luminous Saturated Gradient Card) */}
                <div className="sm:col-span-5 glass-welcome-panel p-6 sm:p-8 flex flex-col justify-between text-white relative">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center mb-6 border border-white/40 text-xl shadow-inner">
                      {branding.schoolLogoIcon}
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                      Welcome Back!
                    </h3>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                      To keep connected with {branding.schoolName}, please authenticate with your credentials.
                    </p>
                  </div>

                  <div className="pt-8">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/80 block">
                      Institutional Node
                    </span>
                    <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      PostgreSQL RLS Protected
                    </span>
                  </div>
                </div>

                {/* Right Inner Form Panel (From Image 1 & 2's Frosted Inputs & Buttons) */}
                <div className="sm:col-span-7 bg-white/80 backdrop-blur-2xl p-6 sm:p-8 space-y-5 border-t sm:border-t-0 sm:border-l border-teal-900/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-extrabold text-teal-950 tracking-wide">
                        LOGIN <span className="text-neon-orange font-black">REGISTER</span>
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Sign in to your quantum school portal
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSimulateLogin} className="space-y-4">
                    {/* User ID / Email Input */}
                    <div className="relative">
                      <input
                        type="text"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Username / Email"
                        className="w-full px-4 py-2.5 pr-10 glass-pill-input rounded-full text-xs sm:text-sm placeholder-slate-400 font-medium"
                      />
                      <User className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                      <input
                        type="password"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2.5 pr-10 glass-pill-input rounded-full text-xs sm:text-sm placeholder-slate-400 font-medium"
                      />
                      <Lock className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
                    </div>

                    {/* 6-Digit OTP Simulation (Directly from Image 2) */}
                    <div className="pt-1">
                      <label className="block text-[11px] font-mono text-center text-slate-600 uppercase tracking-widest mb-2 font-bold">
                        Enter 6 digit OTP / Smart Token
                      </label>
                      <div className="flex justify-center gap-2">
                        {otpDigits.map((digit, i) => (
                          <div
                            key={i}
                            className="w-8 h-9 rounded-xl bg-white border border-teal-200 flex items-center justify-center font-mono font-bold text-sm text-teal-900 shadow-sm"
                          >
                            {digit}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button: Styled with Blue/Violet Gradient Pill (From Reference Image 1) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-black rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(59,130,246,0.35)] active:scale-95 flex items-center justify-center gap-2"
                      >
                        {simulatedLoginState === 'logging' ? (
                          'Verifying Biometrics...'
                        ) : simulatedLoginState === 'success' ? (
                          <span className="text-white flex items-center gap-1 font-bold">
                            <CheckCircle className="w-4 h-4" /> Authenticated!
                          </span>
                        ) : (
                          'SIGN IN'
                        )}
                      </button>
                    </div>

                    {/* Quick Link into full dashboard */}
                    <div className="text-center pt-1">
                      <Link
                        href="/portal/dashboard"
                        className="text-[11px] text-teal-800 hover:text-teal-950 font-mono font-bold underline inline-flex items-center gap-1"
                      >
                        Launch Direct Portal HUD →
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              {/* RIGHT SIDE (5 COLS): GAUGE DONUT + STATS + PILL DOCK (FROM IMAGE 2) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Top Row: Donut Progress Arc (Middle) + Vertical Pill Dock (Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  
                  {/* Circular Gradient Donut Progress (Directly from Image 2's 105 Donut) */}
                  <div className="sm:col-span-7 glass-card-crystal rounded-3xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <span className="text-[11px] font-mono text-slate-600 uppercase tracking-wider mb-2 font-bold">
                      Attendance &amp; Target
                    </span>

                    {/* Outer Conic Ring */}
                    <div className="relative w-32 h-32 rounded-full p-2.5 conic-gradient-ring shadow-[0_0_25px_rgba(249,115,22,0.3)] flex items-center justify-center animate-spin-slow">
                      {/* Core Circle */}
                      <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center p-2 text-center shadow-inner">
                        <span className="text-2xl font-black text-teal-950 font-mono leading-none">
                          {donutMetric}
                        </span>
                        <span className="text-[9px] text-slate-600 font-mono font-bold uppercase mt-1 leading-tight">
                          Total Class Target
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => setDonutMetric((m) => (m >= 120 ? 95 : m + 5))}
                        className="px-3 py-1 text-[10px] font-mono font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 transition border border-teal-200"
                      >
                        Cycle Target
                      </button>
                    </div>
                  </div>

                  {/* Vertical Floating Pill Menu Dock (Directly from Image 2's Pill Menu) */}
                  <div className="sm:col-span-5 glass-pill-dock rounded-3xl p-3 flex flex-col justify-center space-y-2">
                    {(['Home', 'Services', 'About us', 'Contact us'] as const).map((menuItem) => (
                      <button
                        key={menuItem}
                        onClick={() => setActiveTabMenu(menuItem)}
                        className={`w-full py-2.5 px-4 text-xs font-bold rounded-2xl text-center transition-all ${
                          activeTabMenu === menuItem
                            ? 'glass-pill-item-active'
                            : 'text-slate-700 hover:text-teal-950 hover:bg-white/40'
                        }`}
                      >
                        {menuItem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Card: "Your Profile Stats" (Directly from Image 2's 95 / $750 Card) */}
                <div className="glass-card-crystal rounded-3xl p-6 space-y-4">
                  <div className="text-center pb-2 border-b border-teal-900/10">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-teal-950 font-bold">
                      Your Profile Stats
                    </h5>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center divide-x divide-teal-900/10">
                    {/* Stat 1: Download Remaining (95) */}
                    <div className="space-y-2 px-2">
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700 shadow-sm">
                        <CloudDownload className="w-5 h-5 text-teal-600" />
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
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700 shadow-sm">
                        <CreditCard className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-3xl font-black text-teal-950 font-mono">
                        $750
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono font-medium leading-tight">
                        Earnings / Fund Ledger
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CORE FUNCTIONAL PILLARS (DYNAMICALLY RESPECTING MODULE TOGGLES)
            ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-teal-800 uppercase tracking-widest bg-teal-600/10 px-3.5 py-1.5 rounded-full border border-teal-600/20 font-bold">
              Active Institutional Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 mt-3">
              Configured for {branding.schoolName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1-Minute Attendance */}
            {modules.attendance && (
              <div className="glass-card-crystal rounded-3xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-5 shadow-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-950 mb-2">
                    1-Minute Attendance System
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Defaults all students to Present. Teachers tap only the absentees in 30 seconds. Automatically syncs and alerts parents.
                  </p>
                </div>
                <Link
                  href="/portal/attendance"
                  className="inline-flex items-center text-xs font-mono font-bold text-teal-800 hover:text-teal-950 group"
                >
                  Experience 1-Tap Grid →
                </Link>
              </div>
            )}

            {/* Dual AI System */}
            {modules.aiStudy && (
              <div className="glass-card-crystal rounded-3xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-5 shadow-sm">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-950 mb-2">
                    Dual AI Cognitive Engine
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Synthesizes exam summary notes, predicts board questions with 94%+ accuracy, and features &apos;Hey-Clicky&apos; voice navigation.
                  </p>
                </div>
                <Link
                  href="/portal/ai-study"
                  className="inline-flex items-center text-xs font-mono font-bold text-purple-800 hover:text-purple-950 group"
                >
                  Launch AI Assistant →
                </Link>
              </div>
            )}

            {/* Club Hubs */}
            {modules.clubs && (
              <div className="glass-card-crystal rounded-3xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-5 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-950 mb-2">
                    Dynamic Club Hubs &amp; Badges
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Robotics, Astrophysics, Debate, Art, and Coding societies with verifiable digital badges and class branch groupings.
                  </p>
                </div>
                <Link
                  href="/portal/clubs"
                  className="inline-flex items-center text-xs font-mono font-bold text-amber-800 hover:text-amber-950 group"
                >
                  Explore Clubs &amp; Badges →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* PUBLIC NOTICE BOARD HUD */}
        <section id="notices" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-mono text-teal-800 uppercase tracking-widest font-bold">
                Official Campus Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1">
                Notice Board &amp; Circulars ({notices.length})
              </h2>
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 p-1 glass-pill-dock rounded-full text-xs font-mono">
              {(['all', 'urgent', 'exam', 'general'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedNoticeCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full capitalize transition-all font-bold ${
                    selectedNoticeCategory === cat
                      ? 'glass-pill-item-active'
                      : 'text-slate-600 hover:text-teal-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="glass-card-crystal p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded-full ${
                        notice.category === 'urgent'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : notice.category === 'exam'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-teal-100 text-teal-800 border border-teal-300'
                      }`}
                    >
                      {notice.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                      {notice.date}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-teal-950">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                    {notice.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="px-3 py-1 rounded-full bg-teal-50 text-[10px] font-mono text-teal-800 border border-teal-200 font-bold">
                    Verified Circular
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <AdmissionModal
        isOpen={admissionOpen}
        onClose={() => setAdmissionOpen(false)}
      />
    </div>
  );
}
