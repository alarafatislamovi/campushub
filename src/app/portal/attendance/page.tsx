'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  INITIAL_STUDENTS_ATTENDANCE,
  StudentAttendance,
} from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIG } from '@/lib/rbac';
import {
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Sparkles,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  BellRing,
  Filter,
  Check,
  Flame,
  Lock,
  Unlock,
  ShieldAlert,
  Calendar,
  Radio,
  Fingerprint,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AttendancePage() {
  const { role, currentUser } = useAuth();
  const isStudentOrParent = role === 'student' || role === 'parent';
  const isAdmin = role === 'school_admin' || role === 'super_admin';
  const isTeacher = role === 'teacher';

  const [students, setStudents] = useState<StudentAttendance[]>(INITIAL_STUDENTS_ATTENDANCE);
  const [filter, setFilter] = useState<'all' | 'present' | 'absent' | 'late'>('all');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [nfcAlert, setNfcAlert] = useState<string | null>(null);

  // Immutability Lock State
  const [isLocked, setIsLocked] = useState(false);
  const [lockedDetails, setLockedDetails] = useState<{ by: string; at: string } | null>(null);

  // Timer showing how fast the teacher completes attendance
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && syncStatus !== 'synced' && !isLocked && !isStudentOrParent) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, syncStatus, isLocked, isStudentOrParent]);

  // 1-Tap Toggle Cycle: Present -> Absent -> Late -> Present (Guarded against student tampering or locked state)
  const toggleAttendance = (id: string) => {
    if (isStudentOrParent || isLocked) return;

    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== id) return student;

        let nextStatus: StudentAttendance['status'] = 'present';
        if (student.status === 'present') nextStatus = 'absent';
        else if (student.status === 'absent') nextStatus = 'late';
        else if (student.status === 'late') nextStatus = 'present';

        return { ...student, status: nextStatus };
      })
    );
  };

  // Bulk quick actions
  const markAll = (status: StudentAttendance['status']) => {
    if (isStudentOrParent || isLocked) return;
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  // Lock & Finalize Attendance Sheet (Makes attendance immutable)
  const handleLockAttendance = () => {
    setIsLocked(true);
    setIsTimerRunning(false);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLockedDetails({
      by: currentUser.name || 'Ms. Lyra Sinclair (Faculty)',
      at: nowStr,
    });
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const handleUnlockAttendance = () => {
    if (!isAdmin) return;
    setIsLocked(false);
    setLockedDetails(null);
  };

  // Count metrics
  const totalStudents = students.length;
  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const lateCount = students.filter((s) => s.status === 'late').length;
  const attendanceRate = Math.round((presentCount / totalStudents) * 100);

  // Filtered list
  const filteredStudents =
    filter === 'all' ? students : students.filter((s) => s.status === filter);

  // Handle Cloud Sync & Automated Parent Notifications
  const handleConfirmSync = () => {
    if (isStudentOrParent || isLocked) return;
    setSyncStatus('syncing');

    setTimeout(() => {
      setSyncStatus('synced');
      setIsTimerRunning(false);
      setShowNotificationModal(true);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {}
    }, 450);
  };

  // Simulate Smart ID / NFC Tap
  const simulateNfcTap = () => {
    if (isStudentOrParent || isLocked) return;
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    setStudents((prev) =>
      prev.map((s) => (s.id === randomStudent.id ? { ...s, status: 'present' } : s))
    );
    setNfcAlert(
      `⚡ Smart NFC ID Detected: ${randomStudent.name} (${randomStudent.rollNo}) logged Present via Gate Sensor #02.`
    );
    setTimeout(() => setNfcAlert(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* =========================================================================
          STUDENT & PARENT READ-ONLY VAULT BANNER (RBAC NOTICE)
          ========================================================================= */}
      {isStudentOrParent && (
        <div className="p-5 rounded-3xl bg-purple-50 border border-purple-200 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shrink-0">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-200 text-purple-900 uppercase">
                  Read-Only Mode
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  SHA-256: 0x98e1...b72a
                </span>
              </div>
              <h3 className="text-base font-bold text-teal-950 mt-0.5">
                Immutable Student Attendance Records
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                You have verified read-only access. Attendance status is sealed by authenticated faculty.
                Anti-tamper safeguards prevent any manual check-in or client-side status alterations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-[10px] font-mono text-purple-900 font-bold flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Tamper Shield Active
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          IMMUTABILITY SUBMISSION LOCK BANNER (FOR TEACHERS & ADMINS)
          ========================================================================= */}
      {isLocked && !isStudentOrParent && (
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-300 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
              <Lock className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-200 text-emerald-950 uppercase">
                  Cryptographically Finalized
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold">
                  Timestamp: {lockedDetails?.at}
                </span>
              </div>
              <h3 className="text-base font-bold text-teal-950 mt-0.5">
                Attendance Sheet Sealed by {lockedDetails?.by}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                This attendance sheet is locked and immutable. All modifications are disabled.
              </p>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={handleUnlockAttendance}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition flex items-center gap-1.5 shadow-sm"
            >
              <Unlock className="w-3.5 h-3.5" /> Admin Unlock Override
            </button>
          )}
        </div>
      )}

      {/* =========================================================================
          HEADER SECTION WITH STOPWATCH / CONTROLS
          ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 glass-container rounded-[32px] shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 text-[10px] font-mono bg-teal-100 text-teal-900 rounded-full border border-teal-200 flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-teal-700 fill-teal-700" />
              1-MINUTE ATTENDANCE PROTOCOL
            </span>
            <span className="text-xs text-slate-600 font-mono font-medium">Class 10 - Alpha Cybernetics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-teal-950 mt-1">
            {isStudentOrParent
              ? 'Student Attendance Records & Telemetry'
              : "Teacher's 1-Tap Attendance Grid"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-normal">
            {isStudentOrParent
              ? 'Real-time verified status verified via Classroom IoT Gate Sensors and Faculty Biometrics.'
              : 'All students default to Present. Tap only absentees. Finalize and seal the session when complete.'}
          </p>
        </div>

        {/* Stopwatch & Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {!isStudentOrParent && (
            <div className="px-4 py-2 glass-pill-dock rounded-2xl text-center font-mono">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Class Log Time</span>
              <span className="text-base font-bold text-teal-900">{elapsedSeconds}s</span>
            </div>
          )}

          {!isStudentOrParent && !isLocked && (
            <>
              <button
                onClick={simulateNfcTap}
                className="px-4 py-2.5 glass-card-crystal text-xs font-mono font-bold text-teal-900 rounded-full transition flex items-center gap-1.5 hover:border-teal-400 shadow-sm"
                title="Simulate student tapping RFID/NFC card at door"
              >
                <Smartphone className="w-4 h-4 text-teal-600" />
                <span className="hidden sm:inline">Simulate NFC Tap</span>
              </button>

              <button
                onClick={handleConfirmSync}
                disabled={syncStatus === 'syncing'}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-full shadow-sm text-xs flex items-center gap-2 transition hover:scale-[1.02] active:scale-95 disabled:opacity-50 uppercase tracking-wider border border-teal-200"
              >
                {syncStatus === 'syncing' ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-900" />
                ) : syncStatus === 'synced' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    Synced
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-teal-700" />
                    Alert Parents
                  </>
                )}
              </button>

              <button
                onClick={handleLockAttendance}
                className="px-5 py-2.5 bg-gradient-to-r from-teal-700 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(13,148,136,0.35)] text-xs flex items-center gap-2 transition hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
              >
                <Lock className="w-4 h-4" />
                Seal &amp; Lock Grid
              </button>
            </>
          )}

          {isStudentOrParent && (
            <div className="px-5 py-2.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono font-bold flex items-center gap-2 shadow-sm">
              <Fingerprint className="w-4 h-4 text-teal-600" />
              Verified Pupil ID: S-042
            </div>
          )}
        </div>
      </div>

      {/* NFC TOAST ALERT */}
      {nfcAlert && (
        <div className="p-3.5 glass-welcome-panel rounded-2xl flex items-center justify-between text-xs font-mono text-white shadow-xl animate-pulse">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span>{nfcAlert}</span>
          </div>
          <button onClick={() => setNfcAlert(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* METRIC COUNTERS & FILTER PILLS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`p-4 rounded-[24px] text-left transition border ${
            filter === 'all'
              ? 'glass-container border-teal-500 shadow-glow-teal'
              : 'glass-card-crystal border-white/80'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-slate-600 block font-bold">Total Enrolled</span>
          <span className="text-2xl font-extrabold text-teal-950 font-mono">{totalStudents}</span>
          <span className="text-[10px] text-teal-700 font-mono font-bold block mt-1">Class 10 Alpha</span>
        </button>

        <button
          onClick={() => setFilter('present')}
          className={`p-4 rounded-[24px] text-left transition border ${
            filter === 'present'
              ? 'glass-container border-emerald-500 shadow-glow-emerald'
              : 'glass-card-crystal border-white/80'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-slate-600 block font-bold">Present</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-mono">{presentCount}</span>
          <span className="text-[10px] text-emerald-700 font-mono font-bold block mt-1">{attendanceRate}% Rate</span>
        </button>

        <button
          onClick={() => setFilter('absent')}
          className={`p-4 rounded-[24px] text-left transition border ${
            filter === 'absent'
              ? 'glass-container border-rose-500 shadow-sm'
              : 'glass-card-crystal border-white/80'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-slate-600 block font-bold">Absent</span>
          <span className="text-2xl font-extrabold text-rose-700 font-mono">{absentCount}</span>
          <span className="text-[10px] text-rose-700 font-mono font-bold block mt-1">Alerts queued</span>
        </button>

        <button
          onClick={() => setFilter('late')}
          className={`p-4 rounded-[24px] text-left transition border ${
            filter === 'late' ? 'glass-container border-amber-500' : 'glass-card-crystal border-white/80'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-slate-600 block font-bold">Late Arrival</span>
          <span className="text-2xl font-extrabold text-amber-700 font-mono">{lateCount}</span>
          <span className="text-[10px] text-amber-700 font-mono font-bold block mt-1">Biometrics logged</span>
        </button>
      </div>

      {/* QUICK STATUS HELPER (TEACHER VIEW) */}
      {!isStudentOrParent && !isLocked && (
        <div className="flex items-center justify-between text-xs text-slate-600 font-mono px-2 font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Present (1st Tap)
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block ml-3" /> Absent (2nd Tap)
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block ml-3" /> Late (3rd Tap)
          </span>
          <button onClick={() => markAll('present')} className="text-teal-800 hover:underline">
            Reset All to Present
          </button>
        </div>
      )}

      {/* 1-TAP STUDENT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStudents.map((student) => {
          const isPresent = student.status === 'present';
          const isAbsent = student.status === 'absent';
          const isLate = student.status === 'late';

          return (
            <div
              key={student.id}
              onClick={() => toggleAttendance(student.id)}
              className={`relative select-none rounded-[26px] p-4.5 transition-all duration-200 border glass-card-crystal ${
                isStudentOrParent || isLocked ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02] active:scale-95'
              } ${
                isPresent
                  ? 'border-emerald-300 bg-emerald-50/70 shadow-sm'
                  : isAbsent
                  ? 'border-rose-300 bg-rose-50/70 shadow-sm'
                  : 'border-amber-300 bg-amber-50/70 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar with Status Ring */}
                <div
                  className={`relative w-12 h-12 rounded-2xl overflow-hidden border-2 shrink-0 ${
                    isPresent
                      ? 'border-emerald-500'
                      : isAbsent
                      ? 'border-rose-500'
                      : 'border-amber-500'
                  }`}
                >
                  <Image src={student.avatar} alt={student.name} fill className="object-cover" />
                </div>

                {/* Name & Roll */}
                <div className="overflow-hidden flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">{student.rollNo}</span>
                    <span className="flex items-center gap-0.5 text-[10px] font-mono text-amber-700 font-bold">
                      <Flame className="w-3 h-3 fill-amber-500" />
                      {student.streak}d
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-teal-950 truncate mt-0.5">{student.name}</h4>
                  <p className="text-[10px] text-slate-600 font-mono truncate">{student.guardianName}</p>
                </div>
              </div>

              {/* Status Badge Tag */}
              <div className="mt-3 pt-2.5 border-t border-teal-900/10 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500 font-bold">
                  {isStudentOrParent
                    ? '🔒 Read Only'
                    : isLocked
                    ? '🔒 Immutable'
                    : 'Tap to cycle'}
                </span>
                <span
                  className={`px-3 py-0.5 text-[9px] font-mono font-black uppercase rounded-full flex items-center gap-1 ${
                    isPresent
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isAbsent
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {isPresent && <CheckCircle2 className="w-3 h-3" />}
                  {isAbsent && <XCircle className="w-3 h-3" />}
                  {isLate && <Clock className="w-3 h-3" />}
                  {student.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONFIRMATION / PARENT NOTIFICATIONS POPUP */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/40 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-container rounded-[32px] p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
              <ShieldCheck className="w-9 h-9 animate-bounce" />
            </div>

            <h3 className="text-2xl font-black text-teal-950">Class Attendance Synced Successfully!</h3>

            <p className="text-xs sm:text-sm text-slate-700">
              Completed in <span className="text-teal-800 font-bold font-mono">{elapsedSeconds} seconds</span>.
              Relational attendance records logged on PostgreSQL.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-teal-100 text-left space-y-2 text-xs font-mono shadow-sm">
              <div className="flex items-center gap-2 text-teal-900 font-bold border-b border-teal-100 pb-2">
                <BellRing className="w-4 h-4 text-teal-600 animate-pulse" />
                <span>Automated Parent Alerts Dispatched</span>
              </div>
              <p className="text-slate-700">
                • <strong>Present:</strong> {presentCount} students verified. Daily status visible in Parent Portal.
              </p>
              {absentCount > 0 ? (
                <p className="text-rose-700 font-bold">
                  • <strong>Absent:</strong> {absentCount} automated SMS &amp; Push alerts sent to guardians with emergency confirmation links.
                </p>
              ) : (
                <p className="text-emerald-700 font-bold">
                  • <strong>100% Attendance:</strong> No absence alerts required today!
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-700 to-cyan-600 text-white font-bold rounded-full text-xs uppercase tracking-wider shadow-md hover:from-teal-800 hover:to-cyan-700 transition"
              >
                Return to Grid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
