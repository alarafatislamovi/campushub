'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIG } from '@/lib/rbac';
import {
  Coffee,
  MessageSquare,
  FileText,
  Bell,
  Lock,
  ShieldCheck,
  Megaphone,
  Users,
  Calendar,
  BookOpen,
  PinIcon,
  Send,
  Plus,
} from 'lucide-react';

const STAFF_POSTS = [
  {
    id: 1,
    author: 'Ms. Lyra Sinclair',
    role: 'teacher',
    time: '2h ago',
    content:
      'Reminder: Pre-publication Physics Grade entries are due by Friday. Please submit to the internal gradebook before 5 PM.',
    pinned: true,
    tags: ['grades', 'deadline'],
  },
  {
    id: 2,
    author: 'Prof. Nova Chen',
    role: 'school_admin',
    time: '5h ago',
    content:
      'Staff meeting scheduled for tomorrow at 11 AM — Agenda: Q3 curriculum review, new module toggles, and attendance rule updates.',
    pinned: false,
    tags: ['meeting', 'curriculum'],
  },
  {
    id: 3,
    author: 'Mr. Theo Wright',
    role: 'teacher',
    time: '1d ago',
    content:
      'Class 10-A showing excellent engagement with the AI Study Assistant. 87% completion on Physics notes generation this week!',
    pinned: false,
    tags: ['analytics', 'ai-study'],
  },
  {
    id: 4,
    author: 'Ms. Lyra Sinclair',
    role: 'teacher',
    time: '2d ago',
    content:
      'Internal note: Student Zara Neon (ID: S-042) may need additional support in Mathematics. Please flag for parent consultation.',
    pinned: false,
    tags: ['student-support', 'confidential'],
  },
];

const ANNOUNCEMENTS = [
  { id: 1, title: 'Term 3 Exam Schedule Finalized', priority: 'high', date: 'Oct 30, 2026' },
  { id: 2, title: 'Staff Professional Development Day — Nov 5', priority: 'medium', date: 'Nov 5, 2026' },
  { id: 3, title: 'New Module: Parent Portal Beta Launch', priority: 'low', date: 'Nov 10, 2026' },
];

export default function StaffLoungePage() {
  const { currentUser, role } = useAuth();
  const cfg = ROLE_CONFIG[role];
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(STAFF_POSTS);
  const [activeTab, setActiveTab] = useState<'feed' | 'announcements' | 'notes'>('feed');

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts((prev) => [
      {
        id: Date.now(),
        author: currentUser.name,
        role,
        time: 'just now',
        content: newPost,
        pinned: false,
        tags: ['staff'],
      },
      ...prev,
    ]);
    setNewPost('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-welcome-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-2xl shadow-inner text-white">
            <Coffee className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-white">Staff Lounge</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/20 border border-white/30 text-white flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> CONFIDENTIAL
              </span>
            </div>
            <p className="text-white/90 text-sm font-medium">
              Private staff zone — strictly hidden from students &amp; parents
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/20 text-xs font-mono font-bold text-white shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          {cfg.icon} {cfg.label} Access
        </div>
      </div>

      {/* Access notice */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-300 text-xs font-mono text-amber-900 shadow-sm font-medium">
        <ShieldCheck className="w-4 h-4 shrink-0 text-amber-700" />
        <span>
          This zone is <strong>strictly inaccessible</strong> to Student and Parent accounts. All
          activity here is logged and confidential.
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'feed', label: 'Staff Feed', icon: MessageSquare },
          { key: 'announcements', label: 'Admin Notices', icon: Megaphone },
          { key: 'notes', label: 'Internal Notes', icon: FileText },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm ${
              activeTab === key
                ? 'bg-teal-900 text-white'
                : 'glass-card-crystal text-slate-700 hover:text-teal-950 hover:bg-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {/* Post Composer */}
          <div className="glass-card-crystal rounded-3xl p-5 border border-teal-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full border border-teal-200 bg-teal-50 flex items-center justify-center text-sm shadow-sm">
                {cfg.icon}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share a staff update, reminder, or internal note..."
                  rows={3}
                  className="w-full bg-transparent text-sm text-teal-950 placeholder-slate-400 outline-none resize-none font-medium"
                />
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-teal-900/10">
                  <p className="text-[10px] font-mono text-slate-500 font-bold">Visible to staff only</p>
                  <button
                    onClick={handlePost}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-700 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white text-xs font-bold transition shadow-md"
                  >
                    <Send className="w-3 h-3" />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => {
            const postCfg = ROLE_CONFIG[post.role as keyof typeof ROLE_CONFIG] || ROLE_CONFIG.teacher;
            return (
              <div
                key={post.id}
                className={`glass-card-crystal rounded-3xl p-5 border ${
                  post.pinned ? 'border-amber-400 bg-amber-50/40' : 'border-teal-100'
                } shadow-sm`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full border border-teal-200 bg-teal-50 flex items-center justify-center text-sm shadow-sm">
                      {postCfg.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-teal-950">{post.author}</p>
                      <p className="text-[10px] font-mono text-teal-700 font-bold">
                        {postCfg.label} · {post.time}
                      </p>
                    </div>
                  </div>
                  {post.pinned && (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[9px] font-mono font-bold text-amber-900">
                      <PinIcon className="w-2.5 h-2.5" /> Pinned
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-3 font-normal">{post.content}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white border border-teal-100 text-[9px] font-mono text-teal-900 font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="space-y-3">
          {ANNOUNCEMENTS.map((ann) => (
            <div key={ann.id} className="glass-card-crystal rounded-2xl p-5 flex items-center gap-4 border border-teal-100 shadow-sm">
              <div
                className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                  ann.priority === 'high'
                    ? 'bg-rose-500 shadow-sm'
                    : ann.priority === 'medium'
                    ? 'bg-amber-500 shadow-sm'
                    : 'bg-emerald-500 shadow-sm'
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-teal-950">{ann.title}</p>
                <p className="text-[10px] font-mono text-slate-500 font-bold">{ann.date}</p>
              </div>
              <Bell className="w-4 h-4 text-slate-400" />
            </div>
          ))}

          {(role === 'school_admin' || role === 'super_admin') && (
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl glass-card-crystal text-xs font-bold text-teal-800 hover:bg-white transition border-dashed border border-teal-300 shadow-sm">
              <Plus className="w-3.5 h-3.5" />
              Add New Announcement
            </button>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="glass-card-crystal rounded-3xl p-8 text-center border border-teal-100 shadow-sm">
          <BookOpen className="w-10 h-10 text-teal-600 mx-auto mb-3" />
          <p className="text-teal-950 text-sm font-bold">Internal Staff Notes</p>
          <p className="text-[10px] font-mono text-slate-500 mt-1">
            Synchronized with private PostgreSQL tables
          </p>
        </div>
      )}
    </div>
  );
}
