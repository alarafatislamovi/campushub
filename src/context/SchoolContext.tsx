'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PUBLIC_NOTICES, SchoolNotice, INITIAL_CLUBS, ClubInfo } from '@/data/mockData';

export type { SchoolNotice, ClubInfo };

export interface SchoolClass {
  id: string;
  name: string; // e.g. "Class 6", "Class 10"
  sections: string[]; // e.g. ["Section Alpha", "Section Beta"]
  classTeacher: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'staff' | 'admin';
  classSection?: string;
  status: 'active' | 'deactivated';
  avatar: string;
  phone?: string;
  guardianName?: string;
}

export interface BroadcastChannel {
  id: string;
  name: string;
  targetAudience: string;
  type: 'broadcast' | 'discussion';
  activeSubscribers: number;
  lastBroadcast?: string;
}

export interface SchoolShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  lateCutoffMins: number;
  isActive: boolean;
}

export interface AttendanceRules {
  gracePeriodMinutes: number;
  autoParentSms: boolean;
  autoPushAlert: boolean;
  strictBioVerification: boolean;
  minimumAttendanceRate: number;
}

export interface SchoolBranding {
  schoolName: string;
  schoolTagline: string;
  schoolLogoIcon: string;
  accentTheme: 'cyan' | 'purple' | 'amber' | 'emerald' | 'rose';
  establishedYear: string;
  campusCode: string;
}

export interface SchoolModules {
  attendance: boolean;
  aiStudy: boolean;
  clubs: boolean;
  socialFeed: boolean;
  notesVault: boolean;
  gpaCalculator: boolean;
  admissions: boolean;
}

export interface SchoolContent {
  heroHeadline: string;
  heroSubheadline: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  accreditation: string;
}

interface SchoolContextType {
  branding: SchoolBranding;
  classes: SchoolClass[];
  clubs: ClubInfo[];
  users: ManagedUser[];
  channels: BroadcastChannel[];
  shifts: SchoolShift[];
  attendanceRules: AttendanceRules;
  modules: SchoolModules;
  content: SchoolContent;
  notices: SchoolNotice[];

  // Branding
  updateBranding: (newBranding: Partial<SchoolBranding>) => void;

  // Classes & Sections
  addClass: (name: string, sections: string[], classTeacher: string) => void;
  updateClass: (id: string, updates: Partial<SchoolClass>) => void;
  removeClass: (id: string) => void;
  addSection: (classId: string, sectionName: string) => void;
  removeSection: (classId: string, sectionName: string) => void;

  // Custom Clubs & Teams
  addClub: (newClub: Omit<ClubInfo, 'id'>) => void;
  updateClub: (id: string, updates: Partial<ClubInfo>) => void;
  removeClub: (id: string) => void;
  toggleJoinClub: (id: string) => void;

  // User Management (CRUD)
  addUser: (user: Omit<ManagedUser, 'id'>) => void;
  updateUser: (id: string, updates: Partial<ManagedUser>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;

  // Group & Broadcast Channel Manager
  addChannel: (channel: Omit<BroadcastChannel, 'id'>) => void;
  removeChannel: (id: string) => void;

  // Shift & Attendance Customization
  addShift: (shift: Omit<SchoolShift, 'id'>) => void;
  updateShift: (id: string, updates: Partial<SchoolShift>) => void;
  removeShift: (id: string) => void;
  toggleShiftActive: (id: string) => void;
  updateAttendanceRules: (rules: Partial<AttendanceRules>) => void;

  // Modules & Content
  toggleModule: (moduleKey: keyof SchoolModules) => void;
  updateContent: (newContent: Partial<SchoolContent>) => void;
  addNotice: (title: string, description: string, category: SchoolNotice['category']) => void;
  removeNotice: (id: string) => void;
  resetToDefaults: () => void;
}

const DEFAULT_BRANDING: SchoolBranding = {
  schoolName: 'CampusHub Academy',
  schoolTagline: '100-Years-Ahead Cyber-School OS',
  schoolLogoIcon: '⚛️',
  accentTheme: 'cyan',
  establishedYear: '2026',
  campusCode: 'NODE-CYB-01',
};

const DEFAULT_CLASSES: SchoolClass[] = [
  {
    id: 'cls-6',
    name: 'Class 6 - Foundational Cybernetics',
    sections: ['Section Alpha', 'Section Beta'],
    classTeacher: 'Dr. Carl Sagan II',
  },
  {
    id: 'cls-7',
    name: 'Class 7 - Digital Logic & Bio-Sensors',
    sections: ['Section Alpha', 'Section Beta'],
    classTeacher: 'Prof. Maya Lin',
  },
  {
    id: 'cls-8',
    name: 'Class 8 - Applied Algorithms',
    sections: ['Section Alpha', 'Section Gamma'],
    classTeacher: 'Eng. Linus Vance',
  },
  {
    id: 'cls-9',
    name: 'Class 9 - Quantum Mechanics Track',
    sections: ['Section A (Physics)', 'Section B (Bio-Tech)'],
    classTeacher: 'Dr. Evelyn Sterling',
  },
  {
    id: 'cls-10',
    name: 'Class 10 - Alpha Cybernetics',
    sections: ['Section Alpha (Flagship)', 'Section Beta'],
    classTeacher: 'Prof. Marcus Vance',
  },
  {
    id: 'cls-11',
    name: 'Class 11 - Advanced Astrophysics',
    sections: ['Section Deep-Space', 'Section Orbital'],
    classTeacher: 'Judge Eleanor Vance',
  },
  {
    id: 'cls-12',
    name: 'Class 12 - Neural AI & Ethics',
    sections: ['Section Sigma'],
    classTeacher: 'Director Alan Turing Jr.',
  },
];

const DEFAULT_USERS: ManagedUser[] = [
  {
    id: 'usr-101',
    name: 'Aria Thorne',
    email: 'aria.thorne@student.campushub.school',
    role: 'student',
    classSection: 'Class 10 - Alpha Cybernetics',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (555) 902-1101',
    guardianName: 'Helena Thorne',
  },
  {
    id: 'usr-102',
    name: 'Zane Kaelen',
    email: 'zane.kaelen@student.campushub.school',
    role: 'student',
    classSection: 'Class 10 - Alpha Cybernetics',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (555) 902-1102',
    guardianName: 'Doran Kaelen',
  },
  {
    id: 'usr-103',
    name: 'Prof. Marcus Vance',
    email: 'marcus.vance@campushub.school',
    role: 'teacher',
    classSection: 'Class 10 - Alpha Cybernetics',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (555) 902-2001',
  },
  {
    id: 'usr-104',
    name: 'Dr. Evelyn Sterling',
    email: 'evelyn.sterling@campushub.school',
    role: 'teacher',
    classSection: 'Class 9 - Quantum Mechanics Track',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (555) 902-2002',
  },
  {
    id: 'usr-105',
    name: 'Commander Sarah Jenkins',
    email: 'admin.jenkins@campushub.school',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (555) 902-9901',
  },
  {
    id: 'usr-106',
    name: 'Eng. Linus Vance',
    email: 'linus.vance@campushub.school',
    role: 'staff',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (555) 902-3001',
  },
];

const DEFAULT_CHANNELS: BroadcastChannel[] = [
  {
    id: 'chan-1',
    name: 'Class 10 Alpha Official Broadcast',
    targetAudience: 'Class 10 - Alpha Cybernetics',
    type: 'broadcast',
    activeSubscribers: 34,
    lastBroadcast: '15m ago: Photonics lab evaluation notice',
  },
  {
    id: 'chan-2',
    name: 'Faculty All-Hands Neural Channel',
    targetAudience: 'All Faculty & Staff',
    type: 'discussion',
    activeSubscribers: 28,
    lastBroadcast: '2h ago: Term 1 gradebook submission open',
  },
  {
    id: 'chan-3',
    name: 'Robotics & Science Society Council',
    targetAudience: 'Quantum Robotics Society',
    type: 'discussion',
    activeSubscribers: 86,
    lastBroadcast: 'Yesterday: Autonomous Rover calibration files beamed',
  },
];

const DEFAULT_SHIFTS: SchoolShift[] = [
  {
    id: 'shift-1',
    name: 'Morning Shift (Quantum Alpha)',
    startTime: '07:30 AM',
    endTime: '12:45 PM',
    lateCutoffMins: 15,
    isActive: true,
  },
  {
    id: 'shift-2',
    name: 'Day Shift (Cyber Beta)',
    startTime: '01:00 PM',
    endTime: '05:45 PM',
    lateCutoffMins: 15,
    isActive: true,
  },
  {
    id: 'shift-3',
    name: 'Evening AI Research Cohort',
    startTime: '06:00 PM',
    endTime: '09:30 PM',
    lateCutoffMins: 10,
    isActive: false,
  },
];

const DEFAULT_ATTENDANCE_RULES: AttendanceRules = {
  gracePeriodMinutes: 15,
  autoParentSms: true,
  autoPushAlert: true,
  strictBioVerification: true,
  minimumAttendanceRate: 85,
};

const DEFAULT_MODULES: SchoolModules = {
  attendance: true,
  aiStudy: true,
  clubs: true,
  socialFeed: true,
  notesVault: true,
  gpaCalculator: true,
  admissions: true,
};

const DEFAULT_CONTENT: SchoolContent = {
  heroHeadline: 'The 100-Years-Ahead Cyber-School Holographic OS',
  heroSubheadline:
    'Engineered with crystalline frosted glassmorphism, multi-spectral ambient lighting, 30-second 1-tap attendance, and dual AI cognitive co-pilots.',
  address: 'Orbital Sector 4, Neo-Metropolis Education Hub',
  contactEmail: 'admissions@campushub.school',
  contactPhone: '+1 (800) 2026-CH-EDGE',
  accreditation: 'Global Quantum Education Syndicate (GQES-2026)',
};

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<SchoolBranding>(DEFAULT_BRANDING);
  const [classes, setClasses] = useState<SchoolClass[]>(DEFAULT_CLASSES);
  const [clubs, setClubs] = useState<ClubInfo[]>(INITIAL_CLUBS);
  const [users, setUsers] = useState<ManagedUser[]>(DEFAULT_USERS);
  const [channels, setChannels] = useState<BroadcastChannel[]>(DEFAULT_CHANNELS);
  const [shifts, setShifts] = useState<SchoolShift[]>(DEFAULT_SHIFTS);
  const [attendanceRules, setAttendanceRules] = useState<AttendanceRules>(DEFAULT_ATTENDANCE_RULES);
  const [modules, setModules] = useState<SchoolModules>(DEFAULT_MODULES);
  const [content, setContent] = useState<SchoolContent>(DEFAULT_CONTENT);
  const [notices, setNotices] = useState<SchoolNotice[]>(PUBLIC_NOTICES);

  // Load persisted custom settings on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('campushub_school_control_engine');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (parsed.branding) setBranding(parsed.branding);
        if (parsed.classes) setClasses(parsed.classes);
        if (parsed.clubs) setClubs(parsed.clubs);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.channels) setChannels(parsed.channels);
        if (parsed.shifts) setShifts(parsed.shifts);
        if (parsed.attendanceRules) setAttendanceRules(parsed.attendanceRules);
        if (parsed.modules) setModules(parsed.modules);
        if (parsed.content) setContent(parsed.content);
        if (parsed.notices) setNotices(parsed.notices);
      }
    } catch (e) {
      console.warn('Could not load stored control engine settings', e);
    }
  }, []);

  const saveAll = (
    b: SchoolBranding,
    cls: SchoolClass[],
    clb: ClubInfo[],
    u: ManagedUser[],
    ch: BroadcastChannel[],
    sh: SchoolShift[],
    ar: AttendanceRules,
    m: SchoolModules,
    c: SchoolContent,
    n: SchoolNotice[]
  ) => {
    try {
      localStorage.setItem(
        'campushub_school_control_engine',
        JSON.stringify({
          branding: b,
          classes: cls,
          clubs: clb,
          users: u,
          channels: ch,
          shifts: sh,
          attendanceRules: ar,
          modules: m,
          content: c,
          notices: n,
        })
      );
    } catch (e) {
      // ignore
    }
  };

  // Branding
  const updateBranding = (newBranding: Partial<SchoolBranding>) => {
    setBranding((prev) => {
      const updated = { ...prev, ...newBranding };
      saveAll(updated, classes, clubs, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  // Classes & Sections
  const addClass = (name: string, sections: string[], classTeacher: string) => {
    setClasses((prev) => {
      const newClass: SchoolClass = {
        id: 'cls-' + Date.now(),
        name,
        sections: sections.length > 0 ? sections : ['Section Alpha'],
        classTeacher: classTeacher || 'Assigned Faculty',
      };
      const updated = [...prev, newClass];
      saveAll(branding, updated, clubs, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const updateClass = (id: string, updates: Partial<SchoolClass>) => {
    setClasses((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      saveAll(branding, updated, clubs, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const removeClass = (id: string) => {
    setClasses((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveAll(branding, updated, clubs, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const addSection = (classId: string, sectionName: string) => {
    setClasses((prev) => {
      const updated = prev.map((c) =>
        c.id === classId && !c.sections.includes(sectionName)
          ? { ...c, sections: [...c.sections, sectionName] }
          : c
      );
      saveAll(branding, updated, clubs, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const removeSection = (classId: string, sectionName: string) => {
    setClasses((prev) => {
      const updated = prev.map((c) =>
        c.id === classId
          ? { ...c, sections: c.sections.filter((s) => s !== sectionName) }
          : c
      );
      saveAll(branding, updated, clubs, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  // Custom Clubs & Teams
  const addClub = (newClub: Omit<ClubInfo, 'id'>) => {
    setClubs((prev) => {
      const createdClub: ClubInfo = {
        id: 'club-' + Date.now(),
        ...newClub,
      };
      const updated = [createdClub, ...prev];
      saveAll(branding, classes, updated, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const updateClub = (id: string, updates: Partial<ClubInfo>) => {
    setClubs((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      saveAll(branding, classes, updated, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const removeClub = (id: string) => {
    setClubs((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveAll(branding, classes, updated, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const toggleJoinClub = (id: string) => {
    setClubs((prev) => {
      const updated = prev.map((c) => {
        if (c.id !== id) return c;
        const joined = !c.isMember;
        return {
          ...c,
          isMember: joined,
          membersCount: joined ? c.membersCount + 1 : c.membersCount - 1,
        };
      });
      saveAll(branding, classes, updated, users, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  // Users (CRUD)
  const addUser = (userData: Omit<ManagedUser, 'id'>) => {
    setUsers((prev) => {
      const newUser: ManagedUser = {
        id: 'usr-' + Date.now(),
        ...userData,
      };
      const updated = [newUser, ...prev];
      saveAll(branding, classes, clubs, updated, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const updateUser = (id: string, updates: Partial<ManagedUser>) => {
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === id ? { ...u, ...updates } : u));
      saveAll(branding, classes, clubs, updated, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => {
      const updated = prev.filter((u) => u.id !== id);
      saveAll(branding, classes, clubs, updated, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) => {
      const updated = prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? ('deactivated' as const) : ('active' as const) } : u
      );
      saveAll(branding, classes, clubs, updated, channels, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  // Broadcast Channels
  const addChannel = (chanData: Omit<BroadcastChannel, 'id'>) => {
    setChannels((prev) => {
      const newChan: BroadcastChannel = {
        id: 'chan-' + Date.now(),
        ...chanData,
      };
      const updated = [newChan, ...prev];
      saveAll(branding, classes, clubs, users, updated, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const removeChannel = (id: string) => {
    setChannels((prev) => {
      const updated = prev.filter((ch) => ch.id !== id);
      saveAll(branding, classes, clubs, users, updated, shifts, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  // Shifts
  const addShift = (shiftData: Omit<SchoolShift, 'id'>) => {
    setShifts((prev) => {
      const newShift: SchoolShift = {
        id: 'shift-' + Date.now(),
        ...shiftData,
      };
      const updated = [...prev, newShift];
      saveAll(branding, classes, clubs, users, channels, updated, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const updateShift = (id: string, updates: Partial<SchoolShift>) => {
    setShifts((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...updates } : s));
      saveAll(branding, classes, clubs, users, channels, updated, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const removeShift = (id: string) => {
    setShifts((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveAll(branding, classes, clubs, users, channels, updated, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const toggleShiftActive = (id: string) => {
    setShifts((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s));
      saveAll(branding, classes, clubs, users, channels, updated, attendanceRules, modules, content, notices);
      return updated;
    });
  };

  const updateAttendanceRules = (rules: Partial<AttendanceRules>) => {
    setAttendanceRules((prev) => {
      const updated = { ...prev, ...rules };
      saveAll(branding, classes, clubs, users, channels, shifts, updated, modules, content, notices);
      return updated;
    });
  };

  // Modules & Content
  const toggleModule = (moduleKey: keyof SchoolModules) => {
    setModules((prev) => {
      const updated = { ...prev, [moduleKey]: !prev[moduleKey] };
      saveAll(branding, classes, clubs, users, channels, shifts, attendanceRules, updated, content, notices);
      return updated;
    });
  };

  const updateContent = (newContent: Partial<SchoolContent>) => {
    setContent((prev) => {
      const updated = { ...prev, ...newContent };
      saveAll(branding, classes, clubs, users, channels, shifts, attendanceRules, modules, updated, notices);
      return updated;
    });
  };

  const addNotice = (title: string, description: string, category: SchoolNotice['category']) => {
    setNotices((prev) => {
      const newNotice: SchoolNotice = {
        id: 'not-' + Date.now(),
        title,
        description,
        category,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
      const updated = [newNotice, ...prev];
      saveAll(branding, classes, clubs, users, channels, shifts, attendanceRules, modules, content, updated);
      return updated;
    });
  };

  const removeNotice = (id: string) => {
    setNotices((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveAll(branding, classes, clubs, users, channels, shifts, attendanceRules, modules, content, updated);
      return updated;
    });
  };

  const resetToDefaults = () => {
    setBranding(DEFAULT_BRANDING);
    setClasses(DEFAULT_CLASSES);
    setClubs(INITIAL_CLUBS);
    setUsers(DEFAULT_USERS);
    setChannels(DEFAULT_CHANNELS);
    setShifts(DEFAULT_SHIFTS);
    setAttendanceRules(DEFAULT_ATTENDANCE_RULES);
    setModules(DEFAULT_MODULES);
    setContent(DEFAULT_CONTENT);
    setNotices(PUBLIC_NOTICES);
    try {
      localStorage.removeItem('campushub_school_control_engine');
    } catch (e) {
      // ignore
    }
  };

  return (
    <SchoolContext.Provider
      value={{
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
        toggleJoinClub,
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
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
}
