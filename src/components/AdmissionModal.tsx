'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, User, Mail, Phone, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdmissionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianEmail: '',
    phone: '',
    desiredGrade: 'Class 9 - Cybernetics & Space Track',
    previousSchool: '',
    statement: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedAppId = 'CH-ADM-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedId(generatedAppId);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // silent fallback
      }
    }, 800);
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFormData({
      studentName: '',
      guardianEmail: '',
      phone: '',
      desiredGrade: 'Class 9 - Cybernetics & Space Track',
      previousSchool: '',
      statement: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-cyan-500/30 rounded-2xl shadow-glow-cyan overflow-hidden p-6 sm:p-8">
        {/* Glow ambient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedId ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Autonomous Admission Portal 2026–2027
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Smart Onboarding Matrix • Automated Evaluation Pipeline
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    Applicant Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Liam Vance"
                    className="w-full px-3.5 py-2.5 bg-obsidian-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    Guardian Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.guardianEmail}
                    onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                    placeholder="guardian@domain.com"
                    className="w-full px-3.5 py-2.5 bg-obsidian-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-purple-400" />
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 bg-obsidian-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    Target Academic Stream
                  </label>
                  <select
                    value={formData.desiredGrade}
                    onChange={(e) => setFormData({ ...formData, desiredGrade: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-obsidian-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Class 9 - Cybernetics & Space Track">Class 9 - Cybernetics & Space Track</option>
                    <option value="Class 10 - AI & Quantum Engineering">Class 10 - AI & Quantum Engineering</option>
                    <option value="Class 11 - Bio-Synthetics & Nano-Tech">Class 11 - Bio-Synthetics & Nano-Tech</option>
                    <option value="Class 12 - Advanced Astrophysics & Ethics">Class 12 - Advanced Astrophysics & Ethics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Academic Passions / Statement of Intent
                </label>
                <textarea
                  rows={3}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Share your interests in science, robotics, or public leadership..."
                  className="w-full px-3.5 py-2.5 bg-obsidian-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Instant Verification Token Issued
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-glow-cyan transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Transmitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-glow-emerald">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-wide">
              Application Transmitted to Campus Node
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your application has been received into our automated assessment queue. An admission counsellor will reach out via quantum email shortly.
            </p>

            <div className="p-4 bg-obsidian-800/80 border border-cyan-500/30 rounded-xl max-w-sm mx-auto">
              <p className="text-xs font-mono text-slate-400 uppercase">Application Hologram Token</p>
              <p className="text-xl font-mono font-extrabold text-cyan-400 tracking-wider mt-1">
                {submittedId}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">Status: Automated Review Active</p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-600 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

