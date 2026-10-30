'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIG } from '@/lib/rbac';
import {
  BookOpen,
  Lock,
  Unlock,
  ShieldCheck,
  Edit3,
  Save,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface GradeEntry {
  id: string;
  student: string;
  class: string;
  subject: string;
  marks: number;
  maxMarks: number;
  status: 'draft' | 'finalized';
  gradedBy: string;
  lastModified: string;
}

const INITIAL_GRADES: GradeEntry[] = [
  { id: 'g1', student: 'Zara Neon', class: '10-A', subject: 'Physics', marks: 87, maxMarks: 100, status: 'draft', gradedBy: 'Ms. Lyra Sinclair', lastModified: '2026-10-30 09:12 AM' },
  { id: 'g2', student: 'Kai Stellar', class: '10-A', subject: 'Physics', marks: 91, maxMarks: 100, status: 'draft', gradedBy: 'Ms. Lyra Sinclair', lastModified: '2026-10-30 09:15 AM' },
  { id: 'g3', student: 'Mia Cosmos', class: '10-A', subject: 'Physics', marks: 74, maxMarks: 100, status: 'draft', gradedBy: 'Ms. Lyra Sinclair', lastModified: '2026-10-30 09:18 AM' },
  { id: 'g4', student: 'Leo Qubit', class: '10-A', subject: 'Physics', marks: 96, maxMarks: 100, status: 'finalized', gradedBy: 'Ms. Lyra Sinclair', lastModified: '2026-10-29 04:00 PM' },
  { id: 'g5', student: 'Nova Flux', class: '10-B', subject: 'Mathematics', marks: 88, maxMarks: 100, status: 'draft', gradedBy: 'Mr. Theo Wright', lastModified: '2026-10-30 10:00 AM' },
];

function gradeLabel(marks: number, max: number): { letter: string; color: string } {
  const pct = (marks / max) * 100;
  if (pct >= 90) return { letter: 'A+', color: 'text-emerald-700' };
  if (pct >= 80) return { letter: 'A', color: 'text-teal-700' };
  if (pct >= 70) return { letter: 'B', color: 'text-blue-700' };
  if (pct >= 60) return { letter: 'C', color: 'text-amber-700' };
  return { letter: 'D', color: 'text-rose-700' };
}

export default function InternalGradebookPage() {
  const { role } = useAuth();
  const cfg = ROLE_CONFIG[role];
  const [grades, setGrades] = useState<GradeEntry[]>(INITIAL_GRADES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMarks, setEditMarks] = useState(0);

  const canEdit = role === 'teacher' || role === 'school_admin' || role === 'super_admin';

  const handleFinalize = (id: string) => {
    setGrades((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, status: 'finalized', lastModified: new Date().toLocaleString() } : g
      )
    );
  };

  const handleSaveEdit = (id: string) => {
    setGrades((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, marks: editMarks, lastModified: new Date().toLocaleString() } : g
      )
    );
    setEditingId(null);
  };

  const draftCount = grades.filter((g) => g.status === 'draft').length;
  const finalizedCount = grades.filter((g) => g.status === 'finalized').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-welcome-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-2xl shadow-inner text-white">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-white">Internal Gradebook</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/20 border border-white/30 text-white flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> STAFF ONLY
              </span>
            </div>
            <p className="text-white/90 text-sm font-medium">Pre-publication grade management — confidential faculty workspace</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/20 text-xs font-mono font-bold text-white shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          {cfg.icon} {cfg.label}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card-crystal rounded-2xl p-4 text-center border border-teal-100 shadow-sm">
          <p className="text-2xl font-black text-teal-950">{grades.length}</p>
          <p className="text-[10px] font-mono text-slate-500 font-bold mt-0.5">Total Entries</p>
        </div>
        <div className="glass-card-crystal rounded-2xl p-4 text-center border border-teal-100 shadow-sm">
          <p className="text-2xl font-black text-amber-700">{draftCount}</p>
          <p className="text-[10px] font-mono text-slate-500 font-bold mt-0.5">Drafts</p>
        </div>
        <div className="glass-card-crystal rounded-2xl p-4 text-center border border-teal-100 shadow-sm">
          <p className="text-2xl font-black text-emerald-700">{finalizedCount}</p>
          <p className="text-[10px] font-mono text-slate-500 font-bold mt-0.5">Finalized</p>
        </div>
      </div>

      {/* Confidentiality notice */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-teal-50 border border-teal-200 text-xs font-mono text-teal-900 shadow-sm">
        <AlertTriangle className="w-4 h-4 shrink-0 text-teal-700" />
        <span>
          Grades marked as <strong>Draft</strong> are strictly confidential. Finalized marks synchronize with
          the student GPA Simulator upon publication.
        </span>
      </div>

      {/* Grade Table */}
      <div className="glass-card-crystal rounded-3xl overflow-hidden border border-teal-100 shadow-md">
        <div className="p-5 border-b border-teal-900/10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-teal-950">Grade Entries &amp; Scores</h2>
          {canEdit && (
            <span className="text-[10px] font-mono text-slate-500 font-bold">Click marks to edit draft entries</span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-teal-900/10 bg-white/60">
                {['Student', 'Class', 'Subject', 'Marks', 'Grade', 'Status', 'Graded By', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10px] font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-900/10">
              {grades.map((g) => {
                const { letter, color } = gradeLabel(g.marks, g.maxMarks);
                const isEditing = editingId === g.id;
                const isLocked = g.status === 'finalized';
                return (
                  <tr key={g.id} className="hover:bg-teal-50/50 transition">
                    <td className="px-4 py-3 text-sm font-bold text-teal-950 whitespace-nowrap">{g.student}</td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-600 font-bold">{g.class}</td>
                    <td className="px-4 py-3 text-xs text-slate-800 font-medium">{g.subject}</td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editMarks}
                          onChange={(e) => setEditMarks(Number(e.target.value))}
                          className="w-16 px-2 py-1 rounded-lg bg-white border border-teal-400 text-sm text-teal-950 text-center outline-none font-bold"
                          min={0}
                          max={g.maxMarks}
                        />
                      ) : (
                        <span className="text-sm font-bold text-teal-950">
                          {g.marks}/{g.maxMarks}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-black ${color}`}>{letter}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 w-fit ${
                          isLocked
                            ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                            : 'bg-amber-100 border border-amber-300 text-amber-900'
                        }`}
                      >
                        {isLocked ? <Lock className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                        {isLocked ? 'Finalized' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[10px] font-mono text-slate-600 whitespace-nowrap">{g.gradedBy}</td>
                    <td className="px-4 py-3">
                      {canEdit && !isLocked && (
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <button
                              onClick={() => handleSaveEdit(g.id)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-100 border border-teal-300 text-[10px] text-teal-900 font-mono font-bold hover:bg-teal-200 transition"
                            >
                              <Save className="w-2.5 h-2.5" /> Save
                            </button>
                          ) : (
                            <button
                              onClick={() => { setEditingId(g.id); setEditMarks(g.marks); }}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-teal-200 text-[10px] text-slate-700 font-mono font-bold hover:bg-teal-50 transition"
                            >
                              <Edit3 className="w-2.5 h-2.5" /> Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleFinalize(g.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-300 text-[10px] text-emerald-900 font-mono font-bold hover:bg-emerald-200 transition"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5" /> Finalize
                          </button>
                        </div>
                      )}
                      {isLocked && (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-bold">
                          <Lock className="w-2.5 h-2.5" /> Immutable
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
