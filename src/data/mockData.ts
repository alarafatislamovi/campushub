export interface UserProfile {
  id: string;
  name: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  email: string;
  avatar: string;
  classSection?: string;
  grade?: string;
  xpPoints?: number;
  quantumRank?: string;
}

export const CURRENT_USER: UserProfile = {
  id: 'usr-001',
  name: 'Marcus Vance',
  role: 'teacher',
  email: 'prof.vance@campushub.school',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  classSection: 'Class 10 - Alpha Cybernetics',
  xpPoints: 14250,
  quantumRank: 'Quantum Vanguard ⭐⭐⭐',
};

export interface StudentAttendance {
  id: string;
  rollNo: string;
  name: string;
  avatar: string;
  status: 'present' | 'absent' | 'late';
  streak: number;
  guardianName: string;
  guardianPhone: string;
}

export const INITIAL_STUDENTS_ATTENDANCE: StudentAttendance[] = [
  {
    id: 'std-101',
    rollNo: 'CYB-01',
    name: 'Aria Thorne',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 18,
    guardianName: 'Helena Thorne',
    guardianPhone: '+1 (555) 902-1101',
  },
  {
    id: 'std-102',
    rollNo: 'CYB-02',
    name: 'Zane Kaelen',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 12,
    guardianName: 'Doran Kaelen',
    guardianPhone: '+1 (555) 902-1102',
  },
  {
    id: 'std-103',
    rollNo: 'CYB-03',
    name: 'Lyra Mercer',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 25,
    guardianName: 'Robert Mercer',
    guardianPhone: '+1 (555) 902-1103',
  },
  {
    id: 'std-104',
    rollNo: 'CYB-04',
    name: 'Kaelen Voss',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 9,
    guardianName: 'Evelyn Voss',
    guardianPhone: '+1 (555) 902-1104',
  },
  {
    id: 'std-105',
    rollNo: 'CYB-05',
    name: 'Seraphina Cruz',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 31,
    guardianName: 'Carlos Cruz',
    guardianPhone: '+1 (555) 902-1105',
  },
  {
    id: 'std-106',
    rollNo: 'CYB-06',
    name: 'Orion Drake',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 15,
    guardianName: 'Victoria Drake',
    guardianPhone: '+1 (555) 902-1106',
  },
  {
    id: 'std-107',
    rollNo: 'CYB-07',
    name: 'Nova Valerius',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 22,
    guardianName: 'Damian Valerius',
    guardianPhone: '+1 (555) 902-1107',
  },
  {
    id: 'std-108',
    rollNo: 'CYB-08',
    name: 'Caspian Ray',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 19,
    guardianName: 'Selena Ray',
    guardianPhone: '+1 (555) 902-1108',
  },
  {
    id: 'std-109',
    rollNo: 'CYB-09',
    name: 'Elysia Sterling',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 28,
    guardianName: 'Julian Sterling',
    guardianPhone: '+1 (555) 902-1109',
  },
  {
    id: 'std-110',
    rollNo: 'CYB-10',
    name: 'Jaxson Reed',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 14,
    guardianName: 'Nora Reed',
    guardianPhone: '+1 (555) 902-1110',
  },
  {
    id: 'std-111',
    rollNo: 'CYB-11',
    name: 'Mira Solis',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 17,
    guardianName: 'Hector Solis',
    guardianPhone: '+1 (555) 902-1111',
  },
  {
    id: 'std-112',
    rollNo: 'CYB-12',
    name: 'Thorne Sterling',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    status: 'present',
    streak: 20,
    guardianName: 'Claire Sterling',
    guardianPhone: '+1 (555) 902-1112',
  },
];

export interface FeedPost {
  id: string;
  authorName: string;
  authorRole: 'teacher' | 'student' | 'admin';
  authorAvatar: string;
  timeAgo: string;
  subjectTag: string;
  content: string;
  likes: number;
  userLiked?: boolean;
  commentsCount: number;
  attachment?: {
    type: 'simulation' | 'image' | 'chart';
    title: string;
    url: string;
  };
}

export const INITIAL_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    authorName: 'Prof. Marcus Vance',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    timeAgo: '12m ago',
    subjectTag: 'Quantum Physics',
    content: 'Just deployed the Quantum Wave-Particle Superposition Lab for Class 10! Students can now manipulate the photon diffraction barrier inside the Virtual Holo-Chamber.',
    likes: 38,
    userLiked: true,
    commentsCount: 9,
    attachment: {
      type: 'image',
      title: 'Holographic Photon Simulation Grid',
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: 'post-2',
    authorName: 'Aria Thorne',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    timeAgo: '1h ago',
    subjectTag: 'AI & Robotics',
    content: 'Our Robotics Society rover just finished obstacle navigation mapping with 99.8% path fidelity! Check out the autonomous lidar trajectory log.',
    likes: 64,
    userLiked: false,
    commentsCount: 14,
    attachment: {
      type: 'image',
      title: 'Autonomous Rover Sensor Telemetry',
      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: 'post-3',
    authorName: 'Dr. Evelyn Sterling',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    timeAgo: '3h ago',
    subjectTag: 'Biochemistry',
    content: 'Reminder for tomorrow: The 3D CRISPR gene-splicing simulator will be evaluated live. Ensure all group hypothesis matrices are linked to your bio-portfolio.',
    likes: 29,
    userLiked: false,
    commentsCount: 5,
  },
];

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  badge: string;
  role: string;
}

export const TOP_CONTRIBUTORS: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Aria Thorne',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    xp: 28400,
    badge: 'Neural Architect 🏆',
    role: 'Student',
  },
  {
    rank: 2,
    name: 'Prof. Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    xp: 24900,
    badge: 'Grand Mentor 🎖️',
    role: 'Teacher',
  },
  {
    rank: 3,
    name: 'Seraphina Cruz',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    xp: 21850,
    badge: 'Quantum Solver ⚡',
    role: 'Student',
  },
  {
    rank: 4,
    name: 'Nova Valerius',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=256&q=80',
    xp: 19400,
    badge: 'Cyber Pioneer 🌐',
    role: 'Student',
  },
  {
    rank: 5,
    name: 'Kaelen Voss',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    xp: 17200,
    badge: 'Lab Strategist 🧪',
    role: 'Student',
  },
];

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  author: string;
  gradeLevel: string;
  fileSize: string;
  downloads: number;
  rating: number;
  summary: string;
  tags: string[];
}

export const INITIAL_STUDY_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    title: 'Quantum Electro-Dynamics & Photon Kinetics',
    subject: 'Physics',
    author: 'Prof. Marcus Vance',
    gradeLevel: 'Class 10',
    fileSize: '4.8 MB',
    downloads: 342,
    rating: 4.9,
    summary: 'Comprehensive visual summary on wave interference, Planck constants, and energy packet calculations for board revision.',
    tags: ['Board Exam', 'Summary', 'Formulas'],
  },
  {
    id: 'note-2',
    title: 'CRISPR Cas9 Gene Editing & Molecular Genetics',
    subject: 'Biology',
    author: 'Dr. Evelyn Sterling',
    gradeLevel: 'Class 11',
    fileSize: '6.2 MB',
    downloads: 289,
    rating: 4.8,
    summary: 'Detailed holographic breakdown of recombinant DNA technologies, gRNA design vectors, and high-yield diagram guides.',
    tags: ['Diagrams', 'Lab Ready', 'High Yield'],
  },
  {
    id: 'note-3',
    title: 'Advanced Calculus: Differential Equations & Limits',
    subject: 'Mathematics',
    author: 'Prof. Alan Turing Jr.',
    gradeLevel: 'Class 10',
    fileSize: '3.5 MB',
    downloads: 512,
    rating: 5.0,
    summary: 'Step-by-step shortcuts to conquer second-order homogeneous differential solutions with predicted board questions.',
    tags: ['Shortcuts', 'Solvers', 'Class 10'],
  },
  {
    id: 'note-4',
    title: 'Autonomous Neural Networks & Tensor Math',
    subject: 'Computer Science',
    author: 'Cybernetics Department',
    gradeLevel: 'Class 12',
    fileSize: '8.1 MB',
    downloads: 418,
    rating: 4.9,
    summary: 'Foundational guide to backpropagation algorithms, vector matrices, and PyTorch architecture fundamentals.',
    tags: ['AI', 'Python', 'Neural Nets'],
  },
  {
    id: 'note-5',
    title: 'Electrochemical Kinetics & Nernst Equation Guide',
    subject: 'Chemistry',
    author: 'Dr. Maya Lin',
    gradeLevel: 'Class 10',
    fileSize: '2.9 MB',
    downloads: 198,
    rating: 4.7,
    summary: 'Electromotive force calculation tables, electrode potentials, and redox thermodynamics cheat-sheets.',
    tags: ['Electrochemistry', 'Formulas', 'Quick Review'],
  },
];

export const INITIAL_NOTES = INITIAL_STUDY_NOTES;

export interface ClubInfo {
  id: string;
  name: string;
  category: string;
  leadTeacher: string;
  membersCount: number;
  avatar: string;
  coverImage: string;
  description: string;
  activeProjects: number;
  meetingTime: string;
  badgeName: string;
  badgeGlow: string;
  isMember?: boolean;
}

export const INITIAL_CLUBS: ClubInfo[] = [
  {
    id: 'club-1',
    name: 'Quantum Robotics Society',
    category: 'Engineering & AI',
    leadTeacher: 'Prof. Marcus Vance',
    membersCount: 84,
    avatar: '🤖',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    description: 'Autonomous drones, cybernetic bipedal rovers, and neural computer vision programming for national robotics olympiads.',
    activeProjects: 6,
    meetingTime: 'Tuesdays & Thursdays • 4:00 PM (Lab 4)',
    badgeName: 'Robo-Master Core',
    badgeGlow: 'border-cyan-500 shadow-glow-cyan',
    isMember: true,
  },
  {
    id: 'club-2',
    name: 'Astrophysics & Space Colony Guild',
    category: 'Science',
    leadTeacher: 'Dr. Carl Sagan II',
    membersCount: 112,
    avatar: '🚀',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    description: 'Simulating orbital mechanics, exoplanet atmospheric models, and operating the school radio telescope arrays.',
    activeProjects: 4,
    meetingTime: 'Mondays • 5:00 PM (Observatory Deck)',
    badgeName: 'Starfleet Astro-Nav',
    badgeGlow: 'border-blue-500 shadow-glow-blue',
    isMember: false,
  },
  {
    id: 'club-3',
    name: 'Cybernetic Debate & Global Council',
    category: 'Humanities & Policy',
    leadTeacher: 'Judge Eleanor Vance',
    membersCount: 65,
    avatar: '⚖️',
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    description: 'Debating AI ethics, interstellar resource treaties, climate geo-engineering, and parliamentary policy drafting.',
    activeProjects: 3,
    meetingTime: 'Wednesdays • 3:30 PM (Council Hall)',
    badgeName: 'Orator Laureate',
    badgeGlow: 'border-purple-500 shadow-glow-purple',
    isMember: false,
  },
  {
    id: 'club-4',
    name: 'Holographic & Generative Art Guild',
    category: 'Creative Arts',
    leadTeacher: 'Artist Kaori Sato',
    membersCount: 78,
    avatar: '🎨',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description: 'Immersive VR canvas painting, generative 3D fractal sculptures, and cyber-aesthetic digital installations.',
    activeProjects: 8,
    meetingTime: 'Fridays • 4:00 PM (VR Studio)',
    badgeName: 'Holo-Aesthetician',
    badgeGlow: 'border-pink-500 shadow-glow-rose',
    isMember: true,
  },
  {
    id: 'club-5',
    name: 'Competitive Algorithmic Coders',
    category: 'Computer Science',
    leadTeacher: 'Eng. Linus Vance',
    membersCount: 95,
    avatar: '💻',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    description: 'Mastering dynamic programming, graph theory, distributed systems, and preparing for global hackathons.',
    activeProjects: 5,
    meetingTime: 'Saturdays • 10:00 AM (Cyber Lab 1)',
    badgeName: 'Algorithmic Grandmaster',
    badgeGlow: 'border-emerald-500 shadow-glow-emerald',
    isMember: false,
  },
];

export interface GradeSubject {
  id: string;
  code: string;
  name: string;
  credits: number;
  score: number; // 0 - 100
  letterGrade: string;
  gradePoint: number; // 0 - 4.0 or 0 - 5.0 scale
}

export const INITIAL_GRADE_SUBJECTS: GradeSubject[] = [
  { id: 'sub-1', code: 'PHY-101', name: 'Quantum Physics & Relativity', credits: 4, score: 96, letterGrade: 'A+', gradePoint: 5.0 },
  { id: 'sub-2', code: 'MTH-101', name: 'Multivariate Calculus & Matrices', credits: 4, score: 92, letterGrade: 'A+', gradePoint: 5.0 },
  { id: 'sub-3', code: 'CHM-101', name: 'Electrochemistry & Kinetics', credits: 3, score: 88, letterGrade: 'A', gradePoint: 4.5 },
  { id: 'sub-4', code: 'BIO-101', name: 'Genetics & Bio-Engineering', credits: 3, score: 94, letterGrade: 'A+', gradePoint: 5.0 },
  { id: 'sub-5', code: 'CSE-101', name: 'Neural Networks & Algorithms', credits: 4, score: 98, letterGrade: 'A+', gradePoint: 5.0 },
  { id: 'sub-6', code: 'ENG-101', name: 'Futuristic Literature & Ethics', credits: 2, score: 85, letterGrade: 'A', gradePoint: 4.5 },
];

export interface SchoolNotice {
  id: string;
  title: string;
  date: string;
  category: 'urgent' | 'exam' | 'general';
  description: string;
}

export const PUBLIC_NOTICES: SchoolNotice[] = [
  {
    id: 'not-1',
    title: 'Annual Inter-Planetary Science & Cyber-Expo Registration',
    date: 'Oct 30, 2026',
    category: 'general',
    description: 'All clubs and student project teams must submit their booth blueprints and virtual reality simulation links before the holographic cutoff date.',
  },
  {
    id: 'not-2',
    title: 'Term 1 Final Examination Schedule Released',
    date: 'Oct 28, 2026',
    category: 'exam',
    description: 'Examination dates, seat plans, and quantum terminal workstation allocations for Class 10 & 12 are now officially live in the student portal.',
  },
  {
    id: 'not-3',
    title: 'Emergency Cloud Server Micro-Sync (Tonight 02:00 UTC)',
    date: 'Oct 27, 2026',
    category: 'urgent',
    description: 'Central portal services will undergo an automated 10-minute quantum encryption upgrade. No user action is required.',
  },
];

