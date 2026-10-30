'use client';

import React, { useState } from 'react';
import { INITIAL_NOTES, StudyNote } from '@/data/mockData';
import {
  BookOpen,
  Download,
  Upload,
  Search,
  Filter,
  Star,
  FileText,
  Sparkles,
  CheckCircle,
  Tag,
  GraduationCap,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function NotesPage() {
  const [notes, setNotes] = useState<StudyNote[]>(INITIAL_NOTES);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Form State for new upload
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newGrade, setNewGrade] = useState('Class 10');
  const [newSummary, setNewSummary] = useState('');

  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'Biology'];

  const filteredNotes = notes.filter((note) => {
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const handleDownload = (note: StudyNote) => {
    setDownloadSuccess(`Downloaded "${note.title}" to local drive.`);
    setTimeout(() => setDownloadSuccess(null), 3500);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNote: StudyNote = {
      id: `note-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      gradeLevel: newGrade,
      author: 'Faculty Member',
      fileSize: '3.2 MB',
      downloads: 1,
      rating: 5.0,
      tags: ['Curriculum', newSubject.toLowerCase()],
      summary: newSummary || 'Comprehensive lecture summary with formulas.',
    };

    setNotes([newNote, ...notes]);
    setUploadModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    setDownloadSuccess(`Successfully published "${newTitle}" to notes vault!`);
    setTimeout(() => setDownloadSuccess(null), 3500);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
      });
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      {/* HEADER HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 glass-container rounded-[32px] shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 text-[10px] font-mono bg-teal-100 text-teal-900 rounded-full border border-teal-200 flex items-center gap-1.5 font-bold">
              <BookOpen className="w-3.5 h-3.5 text-teal-700" />
              CURRICULUM ARCHIVE &amp; VAULT
            </span>
            <span className="text-xs text-slate-600 font-mono font-medium">Verified PDF Storage Node</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-teal-950 mt-1">
            Study Notes &amp; Revision Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-normal">
            Access board-certified summaries, interactive formulae cheat-sheets, and AI-verified lecture diagrams.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-700 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(13,148,136,0.35)] transition text-xs sm:text-sm self-start md:self-center"
        >
          <Upload className="w-4 h-4" />
          Upload Study Material
        </button>
      </div>

      {/* DOWNLOAD TOAST NOTIFICATION */}
      {downloadSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-mono text-emerald-900 shadow-sm animate-pulse font-bold">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* SEARCH & SUBJECT FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, topics, or formulas..."
            className="w-full pl-10 pr-4 py-2.5 glass-pill-input rounded-2xl text-xs sm:text-sm text-teal-950 placeholder-slate-400 outline-none transition font-medium"
          />
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs font-mono">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-bold shadow-sm ${
                selectedSubject === sub
                  ? 'bg-teal-900 text-white'
                  : 'glass-card-crystal text-slate-700 hover:text-teal-950 hover:bg-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* NOTES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="glass-card-crystal p-5 sm:p-6 rounded-[28px] border border-teal-100 hover:border-teal-400/50 transition-all flex flex-col justify-between group space-y-4 shadow-md hover:shadow-lg"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-teal-100 text-teal-900 border border-teal-200 font-bold">
                  {note.subject}
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  {note.gradeLevel}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-teal-950 group-hover:text-teal-700 transition-colors line-clamp-2">
                {note.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-slate-700 mt-2 line-clamp-3 leading-relaxed font-normal">
                {note.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-[9px] font-mono rounded-full bg-white text-slate-600 border border-teal-100 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Metrics & Download Button */}
            <div className="pt-4 border-t border-teal-900/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3 text-slate-600 font-bold">
                <span className="flex items-center gap-1 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {note.rating}
                </span>
                <span>•</span>
                <span>{note.downloads} reads</span>
              </div>

              <button
                onClick={() => handleDownload(note)}
                className="px-4 py-2 bg-gradient-to-r from-teal-700 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white rounded-xl transition flex items-center gap-1.5 font-bold shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/40 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-container rounded-[28px] shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-teal-900/10 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-teal-950 text-base">
                  Upload Curriculum Note
                </h3>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-500 hover:text-teal-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-bold">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Wave Optics & Superposition Principle"
                  className="w-full px-4 py-2.5 glass-pill-input rounded-2xl text-xs sm:text-sm text-teal-950 placeholder-slate-400 outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-bold">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-4 py-2.5 glass-pill-input rounded-2xl text-xs sm:text-sm text-teal-950 outline-none font-medium"
                  >
                    {subjects.filter((s) => s !== 'All').map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-bold">
                    Grade Level
                  </label>
                  <input
                    type="text"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-4 py-2.5 glass-pill-input rounded-2xl text-xs sm:text-sm text-teal-950 outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-bold">
                  Summary / Overview
                </label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Key concepts, formula sheet highlights..."
                  className="w-full px-4 py-2.5 glass-pill-input rounded-2xl text-xs sm:text-sm text-teal-950 placeholder-slate-400 outline-none font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono text-slate-600 hover:text-teal-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-700 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white rounded-full text-xs font-bold shadow-md"
                >
                  Upload &amp; Distribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
