'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Bell,
  Bot,
  Menu,
  Shield,
  Sparkles,
  Check,
  ChevronDown,
  Building,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSchool } from '@/context/SchoolContext';
import { UserRole, ROLE_CONFIG } from '@/lib/rbac';

interface TopNavProps {
  onOpenMobileSidebar: () => void;
  onOpenHeyClicky: () => void;
  activeRole?: string;
  onChangeRole?: (role: any) => void;
}

export default function TopNav({
  onOpenMobileSidebar,
  onOpenHeyClicky,
}: TopNavProps) {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const { role, switchRole, currentUser, schoolId } = useAuth();
  const { branding } = useSchool();

  const roles: { role: UserRole; title: string; color: string; icon: string }[] = [
    { role: 'super_admin', title: 'Super Admin (Root)', color: 'text-red-700', icon: '👑' },
    { role: 'school_admin', title: 'School Admin', color: 'text-amber-800', icon: '🏫' },
    { role: 'teacher', title: 'Faculty / Teacher', color: 'text-teal-800', icon: '🎓' },
    { role: 'student', title: 'Student Portal', color: 'text-purple-800', icon: '📚' },
    { role: 'parent', title: 'Parent Portal', color: 'text-emerald-800', icon: '👪' },
  ];

  const currentRoleCfg = ROLE_CONFIG[role] || ROLE_CONFIG.teacher;

  const notifications = [
    { id: 1, title: 'Class 10-A Attendance Synchronized', time: '2m ago' },
    { id: 2, title: 'AI Study Assistant: Chemistry Summary Ready', time: '18m ago' },
    { id: 3, title: 'Robotics Society hackathon registration open', time: '1h ago' },
  ];

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-teal-900/10 bg-white/75 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between shadow-sm">
      {/* Left: Mobile hamburger & Global Search HUD */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-700 hover:text-teal-950 rounded-xl hover:bg-white/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global HUD Search Input (Click opens Hey-Clicky) */}
        <button
          onClick={onOpenHeyClicky}
          className="hidden sm:flex items-center gap-3 px-4 py-2.5 glass-pill-dock rounded-full text-xs text-slate-700 font-mono transition-all w-64 md:w-80 group text-left hover:border-teal-500/50"
        >
          <Search className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
          <span className="truncate">Ask Hey-Clicky or search HUD...</span>
          <kbd className="hidden md:inline-block ml-auto px-1.5 py-0.5 text-[9px] bg-teal-100 border border-teal-200 rounded-md text-teal-900 font-bold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Hey-Clicky + Role Switcher + Notifications + Avatar */}
      <div className="flex items-center gap-3">
        {/* Hey-Clicky Dedicated AI Voice/Text Button */}
        <button
          onClick={onOpenHeyClicky}
          className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-card-crystal text-teal-900 text-xs font-bold transition-all shadow-glow-teal hover:scale-[1.03] active:scale-95 group border border-teal-500/30"
        >
          <Bot className="w-3.5 h-3.5 text-teal-600 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Hey-Clicky</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
        </button>

        {/* Dynamic RBAC Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-card-crystal text-xs font-mono transition border border-teal-200 shadow-sm"
          >
            <span>{currentRoleCfg.icon}</span>
            <span className="capitalize font-bold hidden sm:inline text-teal-950">
              {currentRoleCfg.label}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 glass-container rounded-2xl py-2 z-50 shadow-2xl border border-teal-100">
              <div className="px-3.5 py-2 border-b border-teal-900/10 text-[9px] font-mono uppercase text-slate-500 font-bold flex items-center justify-between">
                <span>Switch RBAC Role</span>
                <span className="text-teal-700 font-bold">Live Guard</span>
              </div>
              {roles.map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    switchRole(item.role);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono text-left hover:bg-teal-50 transition ${
                    role === item.role ? 'bg-teal-100/70 font-bold' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className={item.color}>{item.title}</span>
                  </div>
                  {role === item.role && (
                    <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative p-2 text-slate-700 hover:text-teal-950 rounded-full glass-card-crystal transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shadow-glow-teal" />
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 glass-container rounded-3xl p-4 z-50 shadow-2xl border border-teal-100">
              <div className="flex items-center justify-between pb-2 border-b border-teal-900/10">
                <span className="text-xs font-mono font-bold text-teal-950 uppercase">
                  Quantum HUD Alerts
                </span>
                <span className="text-[10px] font-mono font-bold text-teal-700">3 Verified</span>
              </div>
              <div className="py-2 space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-white hover:bg-teal-50 text-left transition cursor-pointer border border-teal-100/60 shadow-sm"
                  >
                    <p className="text-xs text-slate-800 font-semibold">{n.title}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-teal-900/10">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-teal-300 bg-teal-50">
            <Image
              src={currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=campushub'}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-teal-950 leading-tight truncate max-w-[120px]">
              {currentUser.name}
            </p>
            <p className="text-[9px] font-mono text-teal-700 font-bold">{branding.campusCode}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
