'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Zap,
  MessageSquare,
  BookOpen,
  Bot,
  Users2,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Settings,
  Shield,
  Coffee,
  Lock,
  ClipboardList,
  Fingerprint,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { branding, modules } = useSchool();
  const { role } = useAuth();

  const isAdmin = role === 'school_admin' || role === 'super_admin';
  const isTeacherOrAdmin = role === 'teacher' || isAdmin;

  // General Portal Modules (Dynamic by School Admin toggles)
  const baseNavigation = [
    { name: 'HUD Overview', href: '/portal/dashboard', icon: LayoutDashboard, enabled: true },
    {
      name: role === 'student' || role === 'parent' ? 'Attendance Vault' : '1-Min Attendance',
      href: '/portal/attendance',
      icon: Zap,
      badge: role === 'student' || role === 'parent' ? 'Read' : '30s',
      enabled: modules.attendance,
    },
    {
      name: 'Social Feed & Wall',
      href: '/portal/feed',
      icon: MessageSquare,
      enabled: modules.socialFeed,
    },
    {
      name: 'Study Notes & Vault',
      href: '/portal/notes',
      icon: BookOpen,
      enabled: modules.notesVault,
    },
    {
      name: 'AI Study Assistant',
      href: '/portal/ai-study',
      icon: Bot,
      badge: 'AI',
      enabled: modules.aiStudy,
    },
    {
      name: 'Clubs & Branches',
      href: '/portal/clubs',
      icon: Users2,
      enabled: modules.clubs,
    },
    {
      name: 'GPA & Results',
      href: '/portal/results',
      icon: GraduationCap,
      enabled: modules.gpaCalculator,
    },
  ].filter((item) => item.enabled);

  // Private Faculty & Staff Zones (Strictly hidden from Students and Parents)
  const privateStaffNavigation = [
    {
      name: 'Staff Lounge',
      href: '/portal/staff-lounge',
      icon: Coffee,
      badge: '🔒 Staff',
      enabled: isTeacherOrAdmin,
    },
    {
      name: 'Internal Gradebook',
      href: '/portal/gradebook/internal',
      icon: ClipboardList,
      badge: '🔒 Drafts',
      enabled: isTeacherOrAdmin,
    },
    {
      name: 'Staff Attendance',
      href: '/portal/staff-attendance',
      icon: Fingerprint,
      badge: '🔒 Admin',
      enabled: isAdmin,
    },
  ].filter((item) => item.enabled);

  // Admin Customization & Control Hub (Visible only to School Admin and Super Admin)
  const adminNavigation = [
    {
      name: 'Admin Settings Hub',
      href: '/portal/settings',
      icon: Settings,
      badge: '👑 Admin',
      enabled: isAdmin,
    },
  ].filter((item) => item.enabled);

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-teal-950/40 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Sidebar Container with Light Sea Green Glassmorphism */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-teal-900/10 bg-white/75 backdrop-blur-2xl transition-all duration-300 ease-in-out shadow-lg ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-teal-900/10">
          <Link href="/portal/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-glow-teal p-0.5">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-lg shadow-inner">
                <span>{branding.schoolLogoIcon}</span>
              </div>
            </div>
            {!collapsed && (
              <div className="whitespace-nowrap transition-opacity duration-200">
                <span className="font-extrabold text-sm tracking-wider text-teal-950 truncate max-w-[140px] block">
                  {branding.schoolName}
                </span>
                <p className="text-[9px] font-mono text-teal-700 font-bold tracking-widest uppercase">
                  {branding.campusCode}
                </p>
              </div>
            )}
          </Link>

          {/* Collapse Toggle (Desktop) */}
          <button
            onClick={onToggle}
            className="hidden lg:flex p-1.5 rounded-xl text-slate-500 hover:text-teal-950 hover:bg-white/60 transition"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {/* Main Portal Links */}
          <div className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-teal-900 font-bold mb-1">
                Academic Modules
              </p>
            )}
            {baseNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onMobileClose}
                  className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-teal-900 text-white shadow-[0_4px_18px_rgba(0,77,64,0.3)] font-bold'
                      : 'text-slate-700 hover:text-teal-950 hover:bg-white/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-teal-200 stroke-[2.5]' : 'text-teal-700'
                    }`}
                  />
                  {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                  {!collapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-teal-100 text-teal-900 border border-teal-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Private Faculty & Staff Zones (Isolated from Students/Parents) */}
          {privateStaffNavigation.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-teal-900/10">
              {!collapsed && (
                <div className="px-3 flex items-center justify-between mb-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-900 font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Staff Private
                  </p>
                  <span className="text-[9px] font-mono font-bold text-amber-700">CONFIDENTIAL</span>
                </div>
              )}
              {privateStaffNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onMobileClose}
                    className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all group ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-[0_4px_18px_rgba(245,158,11,0.3)] font-bold'
                        : 'text-amber-900 hover:text-amber-950 hover:bg-amber-50'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-slate-950 stroke-[2.5]' : 'text-amber-700'
                      }`}
                    />
                    {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                    {!collapsed && item.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Admin Autonomous Settings Zone */}
          {adminNavigation.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-teal-900/10">
              {!collapsed && (
                <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-teal-900 font-bold mb-1">
                  School Admin
                </p>
              )}
              {adminNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onMobileClose}
                    className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all group ${
                      isActive
                        ? 'bg-teal-700 text-white shadow-[0_4px_18px_rgba(13,148,136,0.3)] font-bold'
                        : 'text-teal-900 hover:text-teal-950 hover:bg-teal-50'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white stroke-[2.5]' : 'text-teal-700'
                      }`}
                    />
                    {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                    {!collapsed && item.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-teal-100 text-teal-900 border border-teal-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info & Public Showcase link */}
        <div className="p-3 border-t border-teal-900/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-teal-950 hover:bg-white/50 transition"
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-teal-700" />
            {!collapsed && <span>Public Showcase</span>}
          </Link>

          {!collapsed && (
            <div className="p-3 rounded-2xl glass-card-crystal text-[10px] font-mono text-slate-600">
              <div className="flex items-center gap-1.5 text-teal-900 font-bold mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                {branding.schoolName}
              </div>
              <p className="text-slate-500 text-[9px]">SaaS Tenant Active</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
