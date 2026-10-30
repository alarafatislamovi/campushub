'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSchool, ClubInfo } from '@/context/SchoolContext';
import {
  Users2,
  Sparkles,
  Award,
  Layers,
  Calendar,
  CheckCircle,
  Radio,
  BookOpen,
  ArrowRight,
  Shield,
  MessageSquare,
  Plus,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClubsPage() {
  const { clubs, toggleJoinClub, classes } = useSchool();
  const [badgeModal, setBadgeModal] = useState<ClubInfo | null>(null);

  // Handle Joining Club
  const handleJoin = (club: ClubInfo) => {
    toggleJoinClub(club.id);
    if (!club.isMember) {
      setBadgeModal({ ...club, isMember: true });
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.5 },
        });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER HUD */}
      <div className="p-6 sm:p-8 glass-container rounded-[32px] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 text-[10px] font-mono bg-teal-100 text-teal-900 rounded-full border border-teal-200 flex items-center gap-1.5 font-bold">
              <Users2 className="w-3.5 h-3.5 text-teal-700" />
              CO-CURRICULAR &amp; BRANCH HUBS
            </span>
            <span className="text-xs text-slate-600 font-mono font-medium">Autonomous Student Guilds</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-teal-950 mt-1">
            Dynamic Club Pavilions &amp; Class Branches
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-normal">
            Join dynamic research and creative societies, earn verified digital badges, and collaborate within your class branch.
          </p>
        </div>

        <Link
          href="/portal/settings"
          className="inline-flex items-center gap-2 px-5 py-2.5 glass-card-crystal text-xs font-mono font-bold text-amber-900 hover:text-amber-950 rounded-full transition self-start md:self-center border border-amber-300 shadow-sm"
        >
          <Plus className="w-4 h-4 text-amber-600" />
          Create New Club (Admin)
        </Link>
      </div>

      {/* CLUBS DIRECTORY GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-teal-950 flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-700" />
            Active School Societies &amp; Guilds
          </h2>
          <span className="text-xs font-mono font-bold text-teal-800">{clubs.length} Registered Hubs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className={`glass-card-crystal rounded-[28px] border overflow-hidden flex flex-col justify-between transition-all shadow-md ${
                club.isMember
                  ? 'border-teal-500 shadow-glow-teal/30 bg-teal-50/40'
                  : 'border-teal-100'
              }`}
            >
              {/* Cover Image & Avatar Banner */}
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={club.coverImage || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80'}
                  alt={club.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-950/40 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                  <span className="text-2xl p-2 rounded-xl bg-white/90 border border-white/50 shadow-sm text-teal-950">
                    {club.avatar}
                  </span>
                  <div>
                    <span className="px-2.5 py-0.5 text-[9px] font-mono rounded-full bg-white/90 text-teal-950 font-bold border border-white/40 shadow-sm">
                      {club.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Club Info Content */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-teal-950">{club.name}</h3>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed line-clamp-2 font-normal">
                    {club.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-teal-900/10 space-y-1.5 text-[11px] font-mono text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-teal-700" />
                      Mentor: <span className="text-teal-950 font-bold">{club.leadTeacher}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-700" />
                      {club.meetingTime}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-teal-900/10 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-600 font-medium">
                    <span className="text-teal-950 font-bold">{club.membersCount}</span> Members
                  </div>

                  <button
                    onClick={() => handleJoin(club)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                      club.isMember
                        ? 'bg-teal-100 text-teal-900 border border-teal-300'
                        : 'bg-gradient-to-r from-teal-700 to-cyan-600 text-white hover:from-teal-800 hover:to-cyan-700'
                    }`}
                  >
                    {club.isMember ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-teal-700" />
                        Member Active
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Join Guild
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLASS & BRANCH GROUPING SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-teal-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-700" />
            Class &amp; Branch Groupings
          </h2>
          <span className="text-xs font-mono text-slate-600 font-medium">Section-based broadcasts &amp; study</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.slice(0, 6).map((branch) => (
            <div
              key={branch.id}
              className="glass-card-crystal p-5 sm:p-6 rounded-[28px] space-y-4 flex flex-col justify-between border border-teal-100 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                    {branch.sections[0] || 'Section Alpha'}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">
                    {branch.sections.length} Sections Active
                  </span>
                </div>

                <h3 className="text-base font-bold text-teal-950">{branch.name}</h3>
                <p className="text-xs text-slate-600 mt-1 font-mono">
                  Faculty Mentor: {branch.classTeacher}
                </p>

                <div className="mt-4 p-3.5 rounded-2xl bg-white border border-teal-100 text-xs text-slate-700 space-y-1 shadow-sm">
                  <span className="text-[10px] font-mono text-teal-800 uppercase tracking-wider block font-bold flex items-center gap-1">
                    <Radio className="w-3 h-3 text-teal-600 animate-pulse" />
                    Channel Broadcasting
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Assigned: {branch.sections.join(', ')}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-teal-900/10 flex items-center justify-between">
                <Link
                  href="/portal/feed"
                  className="text-xs font-mono font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1 group"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  View Channel Feed
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
