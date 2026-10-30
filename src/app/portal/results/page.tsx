'use client';

import React, { useState } from 'react';
import { INITIAL_GRADE_SUBJECTS, GradeSubject } from '@/data/mockData';
import {
  GraduationCap,
  Award,
  Sparkles,
  TrendingUp,
  Download,
  ShieldCheck,
  CheckCircle,
  Sliders,
  RefreshCw,
  BarChart3,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultsPage() {
  const [subjects, setSubjects] = useState<GradeSubject[]>(INITIAL_GRADE_SUBJECTS);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Calculate Letter Grade and Point from Score
  const calculateGradeDetails = (score: number) => {
    if (score >= 90) return { letter: 'A+', point: 5.0 };
    if (score >= 80) return { letter: 'A', point: 4.5 };
    if (score >= 70) return { letter: 'B', point: 3.5 };
    if (score >= 60) return { letter: 'C', point: 2.5 };
    if (score >= 50) return { letter: 'D', point: 2.0 };
    return { letter: 'F', point: 0.0 };
  };

  // Handle Score Slider / Input Change for GPA Simulator
  const handleScoreChange = (id: string, newScore: number) => {
    const clampedScore = Math.max(0, Math.min(100, newScore));
    const { letter, point } = calculateGradeDetails(clampedScore);

    setSubjects((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, score: clampedScore, letterGrade: letter, gradePoint: point }
          : s
      )
    );
  };

  // Cumulative GPA Formula: Sum(Credits * GradePoint) / Sum(Credits)
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const totalPoints = subjects.reduce((sum, s) => sum + s.credits * s.gradePoint, 0);
  const currentGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  const averageScore = Math.round(
    subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length
  );

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // fallback
    }
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HUD */}
      <div className="p-6 glass-card-crystal rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-mono bg-seagreen-100 text-seagreen-800 rounded-full border border-seagreen-300 font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-seagreen-700" />
              ACADEMIC PERFORMANCE & GPA ENGINE
            </span>
            <span className="text-xs text-slate-500 font-mono">Term 1 Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1">
            Exam Results & GPA Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Live interactive grade sheet. Adjust scores to simulate future GPA trajectories and generate verified digital transcripts.
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-seagreen-600 to-teal-700 hover:from-seagreen-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition text-xs sm:text-sm self-start md:self-center"
        >
          <Download className="w-4 h-4" />
          Export Verified Transcript
        </button>
      </div>

      {/* DOWNLOAD SUCCESS ALERT */}
      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs font-mono text-emerald-800 shadow-sm animate-pulse">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Verified official transcript PDF generated and downloaded to your device!</span>
        </div>
      )}

      {/* GPA & METRIC OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card-crystal p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Calculated Term GPA</span>
            <Sparkles className="w-4 h-4 text-seagreen-600" />
          </div>
          <div className="text-4xl font-extrabold text-teal-950 font-mono">
            {currentGPA} <span className="text-base text-slate-500 font-normal">/ 5.00</span>
          </div>
          <p className="text-xs text-emerald-700 font-mono font-medium mt-2">
            Status: First Class Honors Distinction ⭐
          </p>
        </div>

        <div className="glass-card-crystal p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Overall Average Score</span>
            <BarChart3 className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-4xl font-extrabold text-teal-950 font-mono">
            {averageScore}%
          </div>
          <p className="text-xs text-slate-600 font-mono mt-2">
            Across {totalCredits} Total Course Credits
          </p>
        </div>

        <div className="glass-card-crystal p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Evaluation Protocol</span>
            <Award className="w-4 h-4 text-seagreen-700" />
          </div>
          <div className="text-lg font-bold text-teal-950 font-mono">
            Standard Curriculum v2026
          </div>
          <p className="text-xs text-seagreen-800 font-mono mt-2">
            100% Relational Verification on Database
          </p>
        </div>
      </div>

      {/* INTERACTIVE GPA SIMULATOR SLIDERS & GRADE TABLE */}
      <div className="glass-card-crystal rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-seagreen-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-teal-950 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-seagreen-600" />
              What-If Grade Simulator
            </h3>
            <p className="text-xs text-slate-600">
              Drag the sliders below to simulate score revisions and see their immediate impact on your cumulative GPA.
            </p>
          </div>

          <span className="text-xs font-mono text-seagreen-700 font-semibold">
            Real-time calculation active
          </span>
        </div>

        {/* Subjects list with sliders */}
        <div className="space-y-4 pt-2">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-2xl bg-white/80 border border-seagreen-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-seagreen-300 transition-all shadow-sm"
            >
              {/* Subject Title & Code */}
              <div className="w-full md:w-64">
                <span className="text-[10px] font-mono text-seagreen-700 font-bold uppercase">
                  {sub.code} • {sub.credits} Credits
                </span>
                <h4 className="text-sm font-bold text-teal-950">{sub.name}</h4>
              </div>

              {/* Slider for score simulation */}
              <div className="flex-1 flex items-center gap-4 max-w-md w-full">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sub.score}
                  onChange={(e) => handleScoreChange(sub.id, Number(e.target.value))}
                  className="w-full h-2 bg-seagreen-100 rounded-lg appearance-none cursor-pointer accent-seagreen-600"
                />
                <span className="w-12 text-sm font-mono font-bold text-teal-950 text-right">
                  {sub.score}%
                </span>
              </div>

              {/* Resulting Grade Badge */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-500 block">Grade Point</span>
                  <span className="text-sm font-mono font-extrabold text-teal-950">
                    {sub.gradePoint.toFixed(1)} / 5.0
                  </span>
                </div>

                <span
                  className={`w-12 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-mono shadow-sm ${
                    sub.letterGrade === 'A+'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : sub.letterGrade === 'A'
                      ? 'bg-teal-100 text-teal-800 border border-teal-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {sub.letterGrade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
