'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { Sparkles, ShieldCheck, ChevronRight, Menu, X, Settings } from 'lucide-react';

export default function Navbar({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { branding, modules } = useSchool();

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 pt-4">
      <div className="max-w-7xl mx-auto glass-container rounded-[24px] sm:rounded-full px-6 sm:px-8 h-18 py-3.5 flex items-center justify-between transition-all">
        {/* Dynamic Brand Logo & Custom School Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-glow-teal transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-lg shadow-inner">
              <span>{branding.schoolLogoIcon}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-teal-950">
                {branding.schoolName}
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-teal-600/10 text-teal-800 border border-teal-600/20">
                {branding.campusCode}
              </span>
            </div>
          </div>
        </Link>

        {/* Floating Capsule Nav Items (Inspired by Image 2's Pill Dock) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 glass-pill-dock rounded-full">
          <Link
            href="/"
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all ${
              pathname === '/'
                ? 'glass-pill-item-active'
                : 'text-slate-700 hover:text-teal-900 hover:bg-white/50'
            }`}
          >
            Home
          </Link>
          <Link
            href="/#showcase"
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-white/50 rounded-full transition-all"
          >
            Showcase
          </Link>
          <Link
            href="/#notices"
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-white/50 rounded-full transition-all"
          >
            Notice HUD
          </Link>

          {/* Conditionally show admission if module flag is active */}
          {modules.admissions && (
            <button
              onClick={onOpenAdmission}
              className="px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-white/50 rounded-full transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Admission Hub
            </button>
          )}

          <Link
            href="/portal/settings"
            className="px-4 py-2 text-xs font-mono font-bold text-amber-800 bg-amber-500/10 hover:bg-amber-500/20 rounded-full transition-all flex items-center gap-1 border border-amber-500/20"
            title="School Admin Customization Hub"
          >
            <Settings className="w-3.5 h-3.5 text-amber-600" />
            Admin Hub
          </Link>
        </nav>

        {/* Action Button: Launch Portal */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/portal/dashboard"
            className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white transition-all bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 rounded-full shadow-[0_4px_18px_rgba(13,148,136,0.35)] hover:scale-[1.03] active:scale-95 group"
          >
            <ShieldCheck className="w-4 h-4 mr-1.5 text-teal-100" />
            Portal Sign In
            <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-teal-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-container rounded-3xl p-5 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-800 text-sm font-semibold py-1.5 hover:text-teal-800"
          >
            Home
          </Link>
          <Link
            href="/#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-800 text-sm font-semibold py-1.5 hover:text-teal-800"
          >
            Showcase
          </Link>
          <Link
            href="/#notices"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-800 text-sm font-semibold py-1.5 hover:text-teal-800"
          >
            Notice HUD
          </Link>
          <Link
            href="/portal/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-amber-800 text-sm font-semibold py-1.5"
          >
            ⚙️ Admin Settings Hub
          </Link>
          <Link
            href="/portal/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-2.5 bg-gradient-to-r from-teal-700 to-cyan-600 text-white font-bold rounded-2xl block text-sm shadow-md"
          >
            Enter Portal
          </Link>
        </div>
      )}
    </header>
  );
}
