'use client';

import React, { useState } from 'react';
import {
  useSchool,
  SchoolBranding,
  SchoolClass,
  ClubInfo,
  ManagedUser,
  BroadcastChannel,
  SchoolShift,
  AttendanceRules,
  SchoolNotice,
} from '@/context/SchoolContext';
import AdminAIAgent from '@/components/portal/AdminAIAgent';
import {
  Palette,
  Layers,
  ToggleLeft,
  ToggleRight,
  FileEdit,
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Zap,
  Bot,
  Users2,
  UserPlus,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Radio,
  Clock,
  Sliders,
  Check,
  Search,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Calendar,
  Award,
  Shield,
  Eye,
  AlertTriangle,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminSettingsPage() {
  const {
    branding,
    classes,
    clubs,
    users,
    channels,
    shifts,
    attendanceRules,
    modules,
    content,
    notices,
    updateBranding,
    addClass,
    updateClass,
    removeClass,
    addSection,
    removeSection,
    addClub,
    updateClub,
    removeClub,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    addChannel,
    removeChannel,
    addShift,
    updateShift,
    removeShift,
    toggleShiftActive,
    updateAttendanceRules,
    toggleModule,
    updateContent,
    addNotice,
    removeNotice,
    resetToDefaults,
  } = useSchool();

  // Active Tab: 9 Control Areas (Including AI Autonomous Agent)
  const [activeTab, setActiveTab] = useState<
    'ai-agent' | 'classes' | 'users' | 'clubs' | 'channels' | 'shifts' | 'branding' | 'modules' | 'content'
  >('ai-agent');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // fallback
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ==========================================
  // 1. CLASS & SECTION BUILDER STATE
  // ==========================================
  const [newClassName, setNewClassName] = useState('');
  const [newClassTeacher, setNewClassTeacher] = useState('');
  const [newClassSections, setNewClassSections] = useState('Science Section A, Commerce Section B');
  const [sectionInputs, setSectionInputs] = useState<{ [key: string]: string }>({});
  const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const sectionsArray = newClassSections
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addClass(newClassName, sectionsArray, newClassTeacher);
    setNewClassName('');
    setNewClassTeacher('');
    setNewClassSections('Science Section A, Commerce Section B');
    triggerToast(`Added ${newClassName} with ${sectionsArray.length} dynamic sections!`);
  };

  const handleAddSection = (classId: string) => {
    const text = sectionInputs[classId]?.trim();
    if (!text) return;

    addSection(classId, text);
    setSectionInputs({ ...sectionInputs, [classId]: '' });
    triggerToast(`Added section "${text}"!`);
  };

  // ==========================================
  // 2. STUDENT & USER MANAGEMENT (CRUD) STATE
  // ==========================================
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'teacher' | 'staff' | 'admin'>('all');
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    role: 'student' as ManagedUser['role'],
    classSection: 'Class 10 - Alpha Cybernetics',
    phone: '',
    guardianName: '',
  });

  const handleOpenAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      name: '',
      email: '',
      role: 'student',
      classSection: 'Class 10 - Alpha Cybernetics',
      phone: '',
      guardianName: '',
    });
    setUserModalOpen(true);
  };

  const handleOpenEditUser = (u: ManagedUser) => {
    setEditingUser(u);
    setUserFormData({
      name: u.name,
      email: u.email,
      role: u.role,
      classSection: u.classSection || '',
      phone: u.phone || '',
      guardianName: u.guardianName || '',
    });
    setUserModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email) return;

    if (editingUser) {
      updateUser(editingUser.id, userFormData);
      triggerToast(`Updated profile for ${userFormData.name}`);
    } else {
      addUser({
        ...userFormData,
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      });
      triggerToast(`Added new ${userFormData.role}: ${userFormData.name}`);
    }
    setUserModalOpen(false);
  };

  const filteredUsers = users.filter((u) => {
    const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.classSection && u.classSection.toLowerCase().includes(userSearch.toLowerCase()));
    return matchRole && matchSearch;
  });

  // ==========================================
  // 3. CUSTOM CLUB & TEAM CREATOR STATE
  // ==========================================
  const [clubModalOpen, setClubModalOpen] = useState(false);
  const [clubFormData, setClubFormData] = useState({
    name: '',
    category: 'Engineering & Robotics',
    leadTeacher: 'Prof. Marcus Vance',
    avatar: '🤖',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    description: '',
    meetingTime: 'Tuesdays & Thursdays • 4:00 PM (Lab 4)',
    badgeName: 'Master Member Core',
    badgeGlow: 'border-cyan-500 shadow-glow-cyan',
    activeProjects: 3,
    membersCount: 15,
  });

  const handleCreateClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubFormData.name) return;

    addClub(clubFormData);
    triggerToast(`Created new society: ${clubFormData.name}!`);
    setClubModalOpen(false);
    setClubFormData({
      name: '',
      category: 'Engineering & Robotics',
      leadTeacher: 'Prof. Marcus Vance',
      avatar: '🤖',
      coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      description: '',
      meetingTime: 'Tuesdays & Thursdays • 4:00 PM (Lab 4)',
      badgeName: 'Master Member Core',
      badgeGlow: 'border-cyan-500 shadow-glow-cyan',
      activeProjects: 3,
      membersCount: 15,
    });
  };

  // ==========================================
  // 4. GROUP & BROADCAST CHANNELS STATE
  // ==========================================
  const [chanName, setChanName] = useState('');
  const [chanAudience, setChanAudience] = useState('Class 10 - Alpha Cybernetics');
  const [chanType, setChanType] = useState<BroadcastChannel['type']>('broadcast');

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chanName.trim()) return;

    addChannel({
      name: chanName,
      targetAudience: chanAudience,
      type: chanType,
      activeSubscribers: 30,
      lastBroadcast: 'Channel activated just now by school administration.',
    });
    setChanName('');
    triggerToast(`Created broadcast channel: ${chanName}!`);
  };

  // ==========================================
  // 5. SHIFT & ATTENDANCE CUSTOMIZATION STATE
  // ==========================================
  const [shiftName, setShiftName] = useState('');
  const [shiftStart, setShiftStart] = useState('08:00 AM');
  const [shiftEnd, setShiftEnd] = useState('01:30 PM');
  const [shiftCutoff, setShiftCutoff] = useState(15);

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shiftName.trim()) return;

    addShift({
      name: shiftName,
      startTime: shiftStart,
      endTime: shiftEnd,
      lateCutoffMins: shiftCutoff,
      isActive: true,
    });
    setShiftName('');
    triggerToast(`Created school shift: ${shiftName}!`);
  };

  // Branding themes
  const themes: { id: SchoolBranding['accentTheme']; label: string; color: string; border: string }[] = [
    { id: 'cyan', label: 'Quantum Cyan', color: 'bg-cyan-500', border: 'border-cyan-400' },
    { id: 'purple', label: 'Cyber Violet', color: 'bg-purple-500', border: 'border-purple-400' },
    { id: 'amber', label: 'Solar Amber', color: 'bg-amber-500', border: 'border-amber-400' },
    { id: 'emerald', label: 'Matrix Emerald', color: 'bg-emerald-500', border: 'border-emerald-400' },
    { id: 'rose', label: 'Neon Rose', color: 'bg-rose-500', border: 'border-rose-400' },
  ];

  const logoPresets = ['⚛️', '🪐', '🛡️', '⚡', '🏛️', '🔬', '🎓', '🌐'];

  return (
    <div className="space-y-8">
      {/* HEADER HUD */}
      <div className="p-6 sm:p-8 glass-container rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 text-[10px] font-mono bg-amber-100 text-amber-900 rounded-full border border-amber-300 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              DYNAMIC SCHOOL CONTROL &amp; CUSTOMIZATION ENGINE
            </span>
            <span className="text-xs text-slate-600 font-mono font-medium">
              Active: {branding.schoolName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-teal-950 mt-1">
            School Administrative Autonomy Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-normal">
            Configure dynamic classes &amp; sections, manage student profiles, create custom clubs, set shifts &amp; attendance rules, and broadcast to classes—all without code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetToDefaults();
              triggerToast('System reset to original template defaults!');
            }}
            className="px-4 py-2.5 glass-card-crystal text-slate-700 hover:text-rose-700 text-xs font-mono font-bold rounded-full transition flex items-center gap-1.5 border border-teal-200"
            title="Reset to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* SAVE NOTIFICATION TOAST */}
      {toastMessage && (
        <div className="p-3.5 glass-welcome-panel rounded-2xl flex items-center gap-2 text-xs font-mono text-white shadow-xl animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HORIZONTAL PILL DOCK TABS */}
      <div className="flex items-center gap-2 p-1.5 glass-pill-dock rounded-full overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('ai-agent')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'ai-agent'
              ? 'bg-gradient-to-r from-teal-700 to-cyan-600 text-white shadow-md'
              : 'text-teal-900 hover:text-teal-950 bg-teal-50 border border-teal-200'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-teal-600" />
          <span>⚡ AI Admin Agent</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'classes' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Classes &amp; Sections ({classes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'users' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <Users2 className="w-3.5 h-3.5" />
          <span>2. User / Student CRUD ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('clubs')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'clubs' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>3. Custom Clubs ({clubs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('channels')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'channels' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>4. Broadcast Channels ({channels.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('shifts')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'shifts' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>5. Shifts &amp; Attendance Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'branding' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>6. Branding</span>
        </button>

        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'modules' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <ToggleRight className="w-3.5 h-3.5" />
          <span>7. Module Flags</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
            activeTab === 'content' ? 'glass-pill-item-active' : 'text-slate-700 hover:text-teal-950'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>8. Public CMS</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 0: AI AUTONOMOUS ADMIN AGENT
          ========================================================================= */}
      {activeTab === 'ai-agent' && <AdminAIAgent />}

      {/* =========================================================================
          TAB 1: DYNAMIC CLASS & SECTION BUILDER
          ========================================================================= */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          {/* Add New Class Form */}
          <div className="glass-card-crystal p-6 rounded-[28px]">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Dynamic Class & Section Builder
            </h3>

            <form onSubmit={handleAddClass} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Class Name
                </label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. Class 7 - Cyber Track"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Dynamic Sections (comma separated)
                </label>
                <input
                  type="text"
                  value={newClassSections}
                  onChange={(e) => setNewClassSections(e.target.value)}
                  placeholder="Science Section A, Commerce Section B"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Faculty Mentor
                </label>
                <input
                  type="text"
                  value={newClassTeacher}
                  onChange={(e) => setNewClassTeacher(e.target.value)}
                  placeholder="e.g. Dr. Carl Sagan II"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Class
              </button>
            </form>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="glass-card-crystal p-6 rounded-[28px] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-white">{cls.name}</h4>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          const updated = prompt('Edit class title:', cls.name);
                          if (updated && updated.trim()) {
                            updateClass(cls.id, { name: updated.trim() });
                            triggerToast(`Updated class name to "${updated.trim()}"`);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-cyan-400 transition"
                        title="Edit Class Name"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${cls.name}?`)) {
                            removeClass(cls.id);
                            triggerToast(`Deleted ${cls.name}`);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-400 transition"
                        title="Delete Class"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-mono">
                    Faculty Mentor: <span className="text-slate-200">{cls.classTeacher}</span>
                  </p>

                  {/* Sections List */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                      Dynamic Sections ({cls.sections.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cls.sections.map((sec) => (
                        <span
                          key={sec}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                        >
                          {sec}
                          <button
                            type="button"
                            onClick={() => removeSection(cls.id, sec)}
                            className="text-slate-400 hover:text-rose-400"
                            title="Remove section"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Inline Add Section Input */}
                <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                  <input
                    type="text"
                    value={sectionInputs[cls.id] || ''}
                    onChange={(e) =>
                      setSectionInputs({ ...sectionInputs, [cls.id]: e.target.value })
                    }
                    placeholder="Add section (e.g. Science Sec A)..."
                    className="flex-1 px-3 py-1.5 glass-pill-input rounded-lg text-xs"
                  />
                  <button
                    onClick={() => handleAddSection(cls.id)}
                    className="px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-xs font-mono transition"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: FLEXIBLE STUDENT & USER MANAGEMENT (CRUD)
          ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Action & Filter Bar */}
          <div className="glass-card-crystal p-6 rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name, email, roll..."
                  className="w-full pl-10 pr-4 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              {/* Role filter pills */}
              <div className="flex items-center gap-1 p-1 glass-pill-dock rounded-full text-xs font-mono w-full sm:w-auto overflow-x-auto">
                {(['all', 'student', 'teacher', 'staff', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setUserRoleFilter(r)}
                    className={`px-3 py-1 rounded-full capitalize transition ${
                      userRoleFilter === r ? 'glass-pill-item-active' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleOpenAddUser}
              className="px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-100 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center gap-1.5 shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              Enroll New User
            </button>
          </div>

          {/* User Roster Table / Cards */}
          <div className="glass-card-crystal rounded-[28px] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Showing {filteredUsers.length} Enrolled Profiles</span>
              <span>PostgreSQL Identity Sync Active</span>
            </div>

            <div className="divide-y divide-white/5">
              {filteredUsers.map((u) => {
                const isActive = u.status === 'active';

                return (
                  <div
                    key={u.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl overflow-hidden border border-white/20 relative shrink-0">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{u.name}</h4>
                          <span
                            className={`px-2 py-0.2 text-[9px] font-mono font-bold uppercase rounded-full ${
                              u.role === 'teacher'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : u.role === 'student'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : u.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                            }`}
                          >
                            {u.role}
                          </span>
                          <span
                            className={`px-2 py-0.2 text-[9px] font-mono rounded-full ${
                              isActive
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {u.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 font-mono mt-0.5">{u.email}</p>
                        {u.classSection && (
                          <span className="text-[10px] text-cyan-400 font-mono">{u.classSection}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions: Edit, Toggle Active/Deactivate, Delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1 ${
                          isActive
                            ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
                        }`}
                        title="Toggle Active / Deactivated"
                      >
                        {isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        <span>{isActive ? 'Deactivate' : 'Activate'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditUser(u)}
                        className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition"
                        title="Edit Profile"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove profile for ${u.name}?`)) {
                            deleteUser(u.id);
                            triggerToast(`Removed profile for ${u.name}`);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5 transition"
                        title="Remove User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CUSTOM CLUB & TEAM CREATOR
          ========================================================================= */}
      {activeTab === 'clubs' && (
        <div className="space-y-6">
          <div className="glass-card-crystal p-6 rounded-[28px] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                Custom Co-Curricular Clubs & Research Teams
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Build new societies from scratch, assign faculty leads, and mint digital membership badges.
              </p>
            </div>

            <button
              onClick={() => setClubModalOpen(true)}
              className="px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-100 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Create Custom Club
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((c) => (
              <div
                key={c.id}
                className="glass-card-crystal p-5 rounded-[26px] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-2xl bg-white/5 border border-white/10">
                        {c.avatar}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{c.name}</h4>
                        <span className="text-[10px] text-cyan-400 font-mono">{c.category}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete club "${c.name}"?`)) {
                          removeClub(c.id);
                          triggerToast(`Deleted ${c.name}`);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                      title="Delete Club"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 line-clamp-2">{c.description}</p>

                  <div className="mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 space-y-1">
                    <p>Mentor: <span className="text-white">{c.leadTeacher}</span></p>
                    <p>Schedule: <span className="text-slate-300">{c.meetingTime}</span></p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold">{c.membersCount} Active Members</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-purple-300 text-[10px]">
                    {c.badgeName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: GROUP & BROADCAST CHANNELS MANAGER
          ========================================================================= */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          {/* Create Channel Form */}
          <div className="glass-card-crystal p-6 rounded-[28px]">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              Create Targeted Class or Faculty Broadcast Channel
            </h3>

            <form onSubmit={handleAddChannel} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Channel Name
                </label>
                <input
                  type="text"
                  required
                  value={chanName}
                  onChange={(e) => setChanName(e.target.value)}
                  placeholder="e.g. Class 10 Science Announcements"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Target Audience
                </label>
                <select
                  value={chanAudience}
                  onChange={(e) => setChanAudience(e.target.value)}
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.name} className="bg-obsidian-900 text-white">
                      {c.name}
                    </option>
                  ))}
                  <option value="All Faculty & Staff" className="bg-obsidian-900 text-white">All Faculty & Staff</option>
                  <option value="All Parents Guild" className="bg-obsidian-900 text-white">All Parents Guild</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Channel Type
                </label>
                <select
                  value={chanType}
                  onChange={(e) => setChanType(e.target.value as BroadcastChannel['type'])}
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                >
                  <option value="broadcast" className="bg-obsidian-900 text-white">One-Way Broadcast (Admin/Teacher only)</option>
                  <option value="discussion" className="bg-obsidian-900 text-white">Two-Way Group Discussion</option>
                </select>
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Create Channel
              </button>
            </form>
          </div>

          {/* Active Channels List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((ch) => (
              <div
                key={ch.id}
                className="glass-card-crystal p-5 rounded-[26px] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                        {ch.type}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{ch.name}</h4>
                    </div>
                    <button
                      onClick={() => {
                        removeChannel(ch.id);
                        triggerToast(`Deleted ${ch.name}`);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400 transition"
                      title="Delete Channel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 font-mono mt-2">
                    Target: <span className="text-slate-200">{ch.targetAudience}</span>
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-white/[0.04] text-[11px] font-mono text-slate-300 border border-white/10">
                    <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Latest Transmission:</p>
                    <p className="mt-0.5">{ch.lastBroadcast || 'No announcements yet.'}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{ch.activeSubscribers} Subscribers</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Active Node
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: SHIFT & ATTENDANCE CUSTOMIZATION
          ========================================================================= */}
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          {/* Attendance Global Rules */}
          <div className="glass-card-crystal p-6 rounded-[28px] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Global Attendance Policy & Timetable Rules
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <span className="text-xs font-mono text-slate-400 block">Late Grace Period (Mins)</span>
                <input
                  type="number"
                  value={attendanceRules.gracePeriodMinutes}
                  onChange={(e) =>
                    updateAttendanceRules({ gracePeriodMinutes: Number(e.target.value) })
                  }
                  className="w-full px-3 py-1.5 glass-pill-input rounded-xl text-sm font-bold font-mono text-cyan-300"
                />
                <span className="text-[10px] text-slate-500 font-mono">Taps after this mark Late</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <span className="text-xs font-mono text-slate-400 block">Minimum Attendance Rate</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={attendanceRules.minimumAttendanceRate}
                    onChange={(e) =>
                      updateAttendanceRules({ minimumAttendanceRate: Number(e.target.value) })
                    }
                    className="flex-1 accent-cyan-400"
                  />
                  <span className="text-sm font-mono font-bold text-cyan-300 w-12 text-right">
                    {attendanceRules.minimumAttendanceRate}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Required for Exam Admit</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-300 font-bold block">Auto SMS to Parents</span>
                  <span className="text-[10px] text-slate-400 font-mono">On absentee log</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateAttendanceRules({ autoParentSms: !attendanceRules.autoParentSms })
                  }
                  className={`px-3 py-1 text-xs font-mono rounded-full font-bold transition ${
                    attendanceRules.autoParentSms
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/10 text-slate-500'
                  }`}
                >
                  {attendanceRules.autoParentSms ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-300 font-bold block">Smart NFC Sensor Gate</span>
                  <span className="text-[10px] text-slate-400 font-mono">RFID Tap Verification</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateAttendanceRules({
                      strictBioVerification: !attendanceRules.strictBioVerification,
                    })
                  }
                  className={`px-3 py-1 text-xs font-mono rounded-full font-bold transition ${
                    attendanceRules.strictBioVerification
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/10 text-slate-500'
                  }`}
                >
                  {attendanceRules.strictBioVerification ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Add Shift Form */}
          <div className="glass-card-crystal p-6 rounded-[28px]">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Configure Institution Shifts (Morning, Day, Evening)
            </h3>

            <form onSubmit={handleAddShift} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Shift Name
                </label>
                <input
                  type="text"
                  required
                  value={shiftName}
                  onChange={(e) => setShiftName(e.target.value)}
                  placeholder="e.g. Morning Shift"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Start Time
                </label>
                <input
                  type="text"
                  value={shiftStart}
                  onChange={(e) => setShiftStart(e.target.value)}
                  placeholder="08:00 AM"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  End Time
                </label>
                <input
                  type="text"
                  value={shiftEnd}
                  onChange={(e) => setShiftEnd(e.target.value)}
                  placeholder="01:30 PM"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                  Late Cutoff (Mins)
                </label>
                <input
                  type="number"
                  value={shiftCutoff}
                  onChange={(e) => setShiftCutoff(Number(e.target.value))}
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Shift
              </button>
            </form>
          </div>

          {/* Shifts Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shifts.map((sh) => (
              <div
                key={sh.id}
                className="glass-card-crystal p-5 rounded-[26px] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{sh.name}</h4>
                      <p className="text-xs text-cyan-400 font-mono mt-1">
                        {sh.startTime} – {sh.endTime}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        removeShift(sh.id);
                        triggerToast(`Deleted shift: ${sh.name}`);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400 transition"
                      title="Delete Shift"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 font-mono mt-3">
                    Late Cutoff Tolerance: <span className="text-white font-bold">{sh.lateCutoffMins} Minutes</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Shift Status:</span>
                  <button
                    onClick={() => toggleShiftActive(sh.id)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition ${
                      sh.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/10 text-slate-500'
                    }`}
                  >
                    {sh.isActive ? 'Active Shift' : 'Inactive'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: BRANDING (STUDIO)
          ========================================================================= */}
      {activeTab === 'branding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-card-crystal p-6 sm:p-8 rounded-[30px] space-y-6">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                Institutional Identity & Colorway
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  School / Institution Name
                </label>
                <input
                  type="text"
                  value={branding.schoolName}
                  onChange={(e) => updateBranding({ schoolName: e.target.value })}
                  placeholder="e.g. St. Xavier's Cyber Academy"
                  className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  School Tagline / Motto
                </label>
                <input
                  type="text"
                  value={branding.schoolTagline}
                  onChange={(e) => updateBranding({ schoolTagline: e.target.value })}
                  placeholder="e.g. Pioneering Future Leaders in Quantum STEM"
                  className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Campus Node Code
                  </label>
                  <input
                    type="text"
                    value={branding.campusCode}
                    onChange={(e) => updateBranding({ campusCode: e.target.value })}
                    className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Established Year
                  </label>
                  <input
                    type="text"
                    value={branding.establishedYear}
                    onChange={(e) => updateBranding({ establishedYear: e.target.value })}
                    className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              {/* Logo Icon Picker */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  School Emblem / Hologram Icon
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {logoPresets.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => updateBranding({ schoolLogoIcon: icon })}
                      className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition border ${
                        branding.schoolLogoIcon === icon
                          ? 'bg-white/20 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Picker */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                  Glassmorphism Accent Color Scheme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {themes.map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => {
                        updateBranding({ accentTheme: th.id });
                        triggerToast(`Applied ${th.label} accent theme!`);
                      }}
                      className={`p-3 rounded-2xl glass-card-crystal flex items-center gap-2.5 transition border ${
                        branding.accentTheme === th.id
                          ? `${th.border} bg-white/10 shadow-lg`
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full ${th.color} shadow-sm`} />
                      <span className="text-xs font-mono text-slate-200">{th.label}</span>
                      {branding.accentTheme === th.id && (
                        <Check className="w-3.5 h-3.5 ml-auto text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card-crystal p-6 rounded-[30px] space-y-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block border-b border-white/10 pb-2">
                Live Dynamic Brand Preview
              </span>

              <div className="p-6 glass-welcome-panel rounded-[24px] text-white space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shadow-inner">
                    {branding.schoolLogoIcon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-wide leading-tight">
                      {branding.schoolName}
                    </h4>
                    <p className="text-xs text-white/80 font-mono">
                      {branding.campusCode} • Est. {branding.establishedYear}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/90 italic pt-1">
                  &ldquo;{branding.schoolTagline}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: MODULE FEATURE FLAGS / TOGGLES
          ========================================================================= */}
      {activeTab === 'modules' && (
        <div className="glass-card-crystal p-6 sm:p-8 rounded-[30px] space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ToggleRight className="w-5 h-5 text-purple-400" />
              Module Feature Flags
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enable or disable specific features to fit your school curriculum and operational policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                key: 'attendance' as const,
                title: '1-Minute Attendance System',
                desc: 'Teacher 1-tap grid, default present, 30-sec fast log, and instant parent push alerts.',
                icon: Zap,
              },
              {
                key: 'aiStudy' as const,
                title: 'Dual AI Study Assistant & Predictor',
                desc: 'Curriculum-grounded summary notes generator, board exam question predictor, and Hey-Clicky copilot.',
                icon: Bot,
              },
              {
                key: 'clubs' as const,
                title: 'Co-Curricular Club Hubs & Badges',
                desc: 'Robotics, Astrophysics, Debate & Coding societies with verifiable digital badges.',
                icon: Users2,
              },
              {
                key: 'socialFeed' as const,
                title: 'Social Feed & Campus Wall',
                desc: 'Student and teacher public wall, project showcase, like counters, and Top Contributors leaderboard.',
                icon: MessageSquare,
              },
              {
                key: 'notesVault' as const,
                title: 'Study Notes & Revision Vault',
                desc: 'Centralized repository for PDF study guides, formula mindmaps, and teacher lecture uploads.',
                icon: BookOpen,
              },
              {
                key: 'gpaCalculator' as const,
                title: 'Interactive GPA Simulator & Results',
                desc: 'Real-time score slider grade simulator, CGPA calculations, and blockchain transcript export.',
                icon: GraduationCap,
              },
              {
                key: 'admissions' as const,
                title: 'Public Online Admissions Hub',
                desc: 'Online applicant onboarding form, instant tracking token generation, and prospective student queue.',
                icon: Building2,
              },
            ].map((mod) => {
              const Icon = mod.icon;
              const isEnabled = modules[mod.key];

              return (
                <div
                  key={mod.key}
                  className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                    isEnabled
                      ? 'bg-white/[0.05] border-white/20 shadow-md'
                      : 'bg-black/20 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isEnabled
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : 'bg-white/5 border-white/10 text-slate-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      toggleModule(mod.key);
                      triggerToast(`${mod.title} is now ${!isEnabled ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                      isEnabled
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald/30'
                        : 'bg-white/10 text-slate-400 border border-white/10'
                    }`}
                  >
                    {isEnabled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Enabled
                      </>
                    ) : (
                      'Disabled'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 8: CONTENT & PUBLIC CMS (HOMEPAGE & NOTICES)
          ========================================================================= */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          <div className="glass-card-crystal p-6 sm:p-8 rounded-[30px] space-y-6">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-amber-400" />
                Public Landing Page Headline & Contact Info
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Main Homepage Headline
                </label>
                <input
                  type="text"
                  value={content.heroHeadline}
                  onChange={(e) => updateContent({ heroHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-sm font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Subheadline / Vision Statement
                </label>
                <textarea
                  rows={2}
                  value={content.heroSubheadline}
                  onChange={(e) => updateContent({ heroSubheadline: e.target.value })}
                  className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Physical / Orbital Campus Address
                </label>
                <input
                  type="text"
                  value={content.address}
                  onChange={(e) => updateContent({ address: e.target.value })}
                  className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Admissions Contact Email
                </label>
                <input
                  type="email"
                  value={content.contactEmail}
                  onChange={(e) => updateContent({ contactEmail: e.target.value })}
                  className="w-full px-4 py-2.5 glass-pill-input rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          USER ENROLLMENT / EDIT MODAL
          ========================================================================= */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-container rounded-[32px] p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                {editingUser ? `Edit Profile: ${editingUser.name}` : 'Enroll New School User'}
              </h3>
              <button onClick={() => setUserModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  placeholder="e.g. Aria Thorne"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                    placeholder="student@school.edu"
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Institutional Role
                  </label>
                  <select
                    value={userFormData.role}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, role: e.target.value as ManagedUser['role'] })
                    }
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                  >
                    <option value="student" className="bg-obsidian-900 text-white">Student</option>
                    <option value="teacher" className="bg-obsidian-900 text-white">Teacher / Faculty</option>
                    <option value="staff" className="bg-obsidian-900 text-white">Staff</option>
                    <option value="admin" className="bg-obsidian-900 text-white">Administrator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Class & Section Assignment
                  </label>
                  <select
                    value={userFormData.classSection}
                    onChange={(e) => setUserFormData({ ...userFormData, classSection: e.target.value })}
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.name} className="bg-obsidian-900 text-white">
                        {c.name}
                      </option>
                    ))}
                    <option value="General Faculty Staff" className="bg-obsidian-900 text-white">General Faculty Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    value={userFormData.phone}
                    onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Parent / Guardian Name (For Students)
                </label>
                <input
                  type="text"
                  value={userFormData.guardianName}
                  onChange={(e) => setUserFormData({ ...userFormData, guardianName: e.target.value })}
                  placeholder="e.g. Helena Thorne"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2 glass-card-crystal text-xs font-mono rounded-xl text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-white text-slate-950 hover:bg-slate-100 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md"
                >
                  {editingUser ? 'Save Updates' : 'Confirm Enrollment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          CUSTOM CLUB CREATOR MODAL
          ========================================================================= */}
      {clubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-container rounded-[32px] p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                Create Custom Co-Curricular Club
              </h3>
              <button onClick={() => setClubModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClub} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Society / Club Name
                </label>
                <input
                  type="text"
                  required
                  value={clubFormData.name}
                  onChange={(e) => setClubFormData({ ...clubFormData, name: e.target.value })}
                  placeholder="e.g. Quantum AI & Cybersecurity Society"
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={clubFormData.category}
                    onChange={(e) => setClubFormData({ ...clubFormData, category: e.target.value })}
                    placeholder="e.g. Engineering & AI"
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Avatar Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={clubFormData.avatar}
                    onChange={(e) => setClubFormData({ ...clubFormData, avatar: e.target.value })}
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Faculty Mentor
                  </label>
                  <input
                    type="text"
                    value={clubFormData.leadTeacher}
                    onChange={(e) => setClubFormData({ ...clubFormData, leadTeacher: e.target.value })}
                    placeholder="e.g. Prof. Marcus Vance"
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Meeting Schedule
                  </label>
                  <input
                    type="text"
                    value={clubFormData.meetingTime}
                    onChange={(e) => setClubFormData({ ...clubFormData, meetingTime: e.target.value })}
                    placeholder="Mondays • 4:00 PM"
                    className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Society Vision / Description
                </label>
                <textarea
                  rows={2}
                  value={clubFormData.description}
                  onChange={(e) => setClubFormData({ ...clubFormData, description: e.target.value })}
                  placeholder="Hands-on experiments, hackathons, and research projects..."
                  className="w-full px-3.5 py-2 glass-pill-input rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setClubModalOpen(false)}
                  className="px-4 py-2 glass-card-crystal text-xs font-mono rounded-xl text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-white text-slate-950 hover:bg-slate-100 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md"
                >
                  Mint Club Society
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
