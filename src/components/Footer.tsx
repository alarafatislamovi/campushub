'use client';

import React from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { MapPin, Mail, Phone, Building2 } from 'lucide-react';

export default function Footer() {
  const { branding, content, modules } = useSchool();

  return (
    <footer className="border-t border-teal-900/10 glass-container mt-auto py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center text-xl text-white font-bold p-0.5 shadow-glow-teal">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-lg">
                  <span>{branding.schoolLogoIcon}</span>
                </div>
              </div>
              <div>
                <span className="font-black text-lg tracking-wider text-teal-950 block">
                  {branding.schoolName}
                </span>
                <span className="text-[10px] font-mono font-bold text-teal-700">
                  {branding.campusCode} • Est. {branding.establishedYear}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-md leading-relaxed">
              {branding.schoolTagline} — Empowering our student and faculty collective with autonomous attendance, dual AI study engines, and holographic collaboration.
            </p>

            <div className="space-y-1 text-xs font-mono text-slate-600 pt-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                {content.address}
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <span className="flex items-center gap-1.5 text-teal-800">
                  <Mail className="w-3.5 h-3.5 text-teal-600" />
                  {content.contactEmail}
                </span>
                <span className="flex items-center gap-1.5 text-teal-800">
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  {content.contactPhone}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Hub Links (Dynamically filtered by enabled modules) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-teal-900 mb-4 font-bold">
              Autonomous Hubs
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {modules.attendance && (
                <li>
                  <Link href="/portal/attendance" className="hover:text-teal-800 transition">
                    1-Min Attendance Protocol
                  </Link>
                </li>
              )}
              {modules.socialFeed && (
                <li>
                  <Link href="/portal/feed" className="hover:text-teal-800 transition">
                    Campus Social Feed &amp; Wall
                  </Link>
                </li>
              )}
              {modules.notesVault && (
                <li>
                  <Link href="/portal/notes" className="hover:text-teal-800 transition">
                    Study Notes &amp; PDF Vault
                  </Link>
                </li>
              )}
              {modules.aiStudy && (
                <li>
                  <Link href="/portal/ai-study" className="hover:text-teal-800 transition">
                    AI Study Assistant &amp; Predictor
                  </Link>
                </li>
              )}
              {modules.clubs && (
                <li>
                  <Link href="/portal/clubs" className="hover:text-teal-800 transition">
                    Clubs &amp; Branch Groupings
                  </Link>
                </li>
              )}
              {modules.gpaCalculator && (
                <li>
                  <Link href="/portal/results" className="hover:text-teal-800 transition">
                    Interactive GPA &amp; Exam Simulator
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* School Admin & Security */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-teal-900 mb-4 font-bold">
              School Administration
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li>
                <Link href="/portal/settings" className="hover:text-teal-800 transition font-medium">
                  ⚙️ Admin Customization Hub
                </Link>
              </li>
              <li>
                <Link href="/portal/staff-lounge" className="hover:text-teal-800 transition">
                  🔒 Faculty Staff Lounge
                </Link>
              </li>
              <li>
                <Link href="/portal/gradebook/internal" className="hover:text-teal-800 transition">
                  🔒 Internal Draft Gradebook
                </Link>
              </li>
              <li>
                <Link href="/portal/staff-attendance" className="hover:text-teal-800 transition">
                  🔒 Staff Biometric Attendance
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-teal-800 transition">
                  Role-Based Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-teal-900/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 font-mono gap-4">
          <p>© {branding.establishedYear}–2026 {branding.schoolName}. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>Light Sea Green Crystalline UI • Version 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
