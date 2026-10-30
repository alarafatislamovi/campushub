'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSchool } from '@/context/SchoolContext';
import { ROLE_CONFIG } from '@/lib/rbac';
import {
  Users,
  ShieldCheck,
  Lock,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Search,
  Filter,
  Download,
  Fingerprint,
  Radio,
  Sparkles,
} from 'lucide-react';

interface StaffAttendanceRecord {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  shift: string;
  checkInTime: string | null;
  status: 'present' | 'absent' | 'late' | 'on_leave';
  verificationMethod: 'Biometric Iris' | 'Smart NFC Card' | 'Manual Override';
}

const INITIAL_STAFF_RECORDS: StaffAttendanceRecord[] = [
  {
    id: 'st-1',
    name: 'Prof. Nova Chen',
    role: 'School Administrator',
    department: 'Executive Administration',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nova',
    shift: 'Morning Core (07:30 - 15:30)',
    checkInTime: '07:22 AM',
    status: 'present',
    verificationMethod: 'Biometric Iris',
  },
  {
    id: 'st-2',
    name: 'Ms. Lyra Sinclair',
    role: 'Lead Physics Teacher',
    department: 'Applied Sciences',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lyra',
    shift: 'Morning Core (07:30 - 15:30)',
    checkInTime: '07:28 AM',
    status: 'present',
    verificationMethod: 'Smart NFC Card',
  },
  {
    id: 'st-3',
    name: 'Mr. Theo Wright',
    role: 'Senior Mathematics Teacher',
    department: 'Mathematics & Computing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=theo',
    shift: 'Morning Core (07:30 - 15:30)',
    checkInTime: '07:44 AM',
    status: 'late',
    verificationMethod: 'Biometric Iris',
  },
  {
    id: 'st-4',
    name: 'Dr. Carl Sagan II',
    role: 'Cybernetics Professor',
    department: 'Robotics & AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carl',
    shift: 'Day Shift (11:00 - 17:30)',
    checkInTime: null,
    status: 'on_leave',
    verificationMethod: 'Manual Override',
  },
  {
    id: 'st-5',
    name: 'Eng. Linus Vance',
    role: 'Lab Director & Systems Engineer',
    department: 'Cyberinfrastructure',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linus',
    shift: 'Morning Core (07:30 - 15:30)',
    checkInTime: '07:15 AM',
    status: 'present',
    verificationMethod: 'Smart NFC Card',
  },
];

export default function StaffAttendancePage() {
  const { role, currentUser } = useAuth();
  const { shifts, branding } = useSchool();
  const cfg = ROLE_CONFIG[role];

  const [records, setRecords] = useState<StaffAttendanceRecord[]>(INITIAL_STAFF_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const totalStaff = records.length;
  const presentCount = records.filter((r) => r.status === 'present').length;
  const lateCount = records.filter((r) => r.status === 'late').length;
  const leaveCount = records.filter((r) => r.status === 'on_leave').length;

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSimulateSelfCheckIn = () => {
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSuccessToast(`Biometric Iris Scan Verified! Check-in confirmed at ${currentTime}`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 1200);
  };

  const handleToggleStatus = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const nextMap: Record<StaffAttendanceRecord['status'], StaffAttendanceRecord['status']> = {
          present: 'late',
          late: 'on_leave',
          on_leave: 'absent',
          absent: 'present',
        };
        const next = nextMap[r.status];
        return {
          ...r,
          status: next,
          checkInTime: next === 'absent' || next === 'on_leave' ? null : r.checkInTime || '07:30 AM',
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-welcome-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-inner">
            <Fingerprint className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-white">Staff Attendance Hub</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/20 border border-white/30 text-white flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> ADMIN RESTRICTED
              </span>
            </div>
            <p className="text-white/90 text-sm font-medium">
              Confidential faculty clock-in metrics &amp; shift verification for {branding.schoolName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateSelfCheckIn}
            disabled={biometricScanning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-teal-950 text-xs font-bold shadow-md hover:bg-slate-50 transition disabled:opacity-50"
          >
            {biometricScanning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-teal-800 border-t-transparent rounded-full animate-spin" />
                Scanning Iris...
              </>
            ) : (
              <>
                <Fingerprint className="w-4 h-4 text-teal-700" />
                Clock-In Scanner
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono shadow-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
          <span>{successToast}</span>
        </div>
      )}

      {/* High-Level Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card-crystal rounded-2xl p-5 border border-teal-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2 font-bold">
            <span className="text-[10px] font-mono uppercase tracking-wider">Total Faculty</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-teal-950">{totalStaff}</div>
          <p className="text-[10px] font-mono text-teal-700 font-bold mt-1">100% Configured</p>
        </div>

        <div className="glass-card-crystal rounded-2xl p-5 border border-teal-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2 font-bold">
            <span className="text-[10px] font-mono uppercase tracking-wider">Present On-Duty</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{presentCount}</div>
          <p className="text-[10px] font-mono text-emerald-700 font-bold mt-1">
            {Math.round((presentCount / totalStaff) * 100)}% Faculty Quorum
          </p>
        </div>

        <div className="glass-card-crystal rounded-2xl p-5 border border-teal-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2 font-bold">
            <span className="text-[10px] font-mono uppercase tracking-wider">Late Arrivals</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-700">{lateCount}</div>
          <p className="text-[10px] font-mono text-amber-700 font-bold mt-1">Exceeding shift cutoff</p>
        </div>

        <div className="glass-card-crystal rounded-2xl p-5 border border-teal-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2 font-bold">
            <span className="text-[10px] font-mono uppercase tracking-wider">Official Leave</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-800">{leaveCount}</div>
          <p className="text-[10px] font-mono text-purple-700 font-bold mt-1">Authorized absence</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher, staff, or department..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-pill-input text-xs text-teal-950 placeholder-slate-400 outline-none transition font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'present', 'late', 'on_leave', 'absent'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold capitalize transition shadow-sm ${
                filterStatus === st
                  ? 'bg-teal-900 text-white'
                  : 'glass-card-crystal text-slate-700 hover:text-teal-950 hover:bg-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Attendance Grid Table */}
      <div className="glass-card-crystal rounded-3xl overflow-hidden border border-teal-100 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-teal-900/10 bg-white/60">
                <th className="p-4 text-[10px] font-mono uppercase text-slate-600 tracking-wider font-bold">Faculty Member</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-600 tracking-wider font-bold">Department</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-600 tracking-wider font-bold">Assigned Shift</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-600 tracking-wider font-bold">Clock-In Time</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-600 tracking-wider font-bold">Status</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-600 tracking-wider font-bold">Verification</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-600 tracking-wider font-bold">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-900/10">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-teal-50/50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.avatar}
                        alt={rec.name}
                        className="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-teal-950">{rec.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{rec.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-800 font-mono font-medium">{rec.department}</td>
                  <td className="p-4 text-xs text-slate-600 font-mono font-medium">{rec.shift}</td>
                  <td className="p-4">
                    <span className="text-xs font-mono text-teal-900 font-bold">
                      {rec.checkInTime || '—'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                        rec.status === 'present'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : rec.status === 'late'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : rec.status === 'on_leave'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {rec.status === 'present' && <CheckCircle2 className="w-3 h-3" />}
                      {rec.status === 'late' && <Clock className="w-3 h-3" />}
                      {rec.status === 'on_leave' && <Calendar className="w-3 h-3" />}
                      {rec.status === 'absent' && <XCircle className="w-3 h-3" />}
                      {rec.status.toUpperCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1.5 font-bold">
                      <Radio className="w-3 h-3 text-teal-600" />
                      {rec.verificationMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(rec.id)}
                      className="px-3 py-1 rounded-xl text-[10px] font-mono font-bold bg-white hover:bg-teal-50 text-teal-900 border border-teal-200 transition shadow-sm"
                      title="Cycle status: Present -> Late -> Leave -> Absent"
                    >
                      Cycle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
