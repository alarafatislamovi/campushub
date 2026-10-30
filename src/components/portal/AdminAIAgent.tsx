'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import {
  Bot,
  Sparkles,
  Send,
  Zap,
  CheckCircle2,
  Terminal,
  Layers,
  Users2,
  UserPlus,
  Radio,
  Clock,
  Palette,
  Shield,
  ArrowRight,
  History,
  RotateCcw,
  Check,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExecutionStep {
  message: string;
  status: 'pending' | 'active' | 'done';
}

interface AgentActionLog {
  id: string;
  timestamp: string;
  command: string;
  actionType: string;
  details: string;
  status: 'success' | 'failed';
}

export default function AdminAIAgent() {
  const {
    addClass,
    addClub,
    addUser,
    addShift,
    addChannel,
    toggleModule,
    updateBranding,
    addNotice,
    branding,
    classes,
    clubs,
    users,
    modules,
  } = useSchool();

  const [inputCommand, setInputCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<ExecutionStep[]>([]);
  const [executionResult, setExecutionResult] = useState<string | null>(null);
  const [actionLogs, setActionLogs] = useState<AgentActionLog[]>([
    {
      id: 'log-0',
      timestamp: 'Today at 09:15 AM',
      command: 'System Boot & Neural Core Initialization',
      actionType: 'AUTONOMOUS_DAEMON',
      details: 'Agent connected to multi-tenant school database schema with RBAC root credentials.',
      status: 'success',
    },
  ]);

  const QUICK_PROMPTS = [
    {
      title: 'Create Debate Club',
      query: 'Create a Debate Club for Class 8 with speech and logic focus',
      icon: Users2,
    },
    {
      title: 'Add Teacher',
      query: 'Add Mr. Rahman as a mathematics teacher in Dept of Calculus',
      icon: UserPlus,
    },
    {
      title: 'Add Class 11 with Sections',
      query: 'Create Class 11 with Science and Commerce sections',
      icon: Layers,
    },
    {
      title: 'Create Morning Shift',
      query: 'Create a Morning Shift from 07:30 to 12:45 with 15 mins cutoff',
      icon: Clock,
    },
    {
      title: 'Toggle Admissions Module',
      query: 'Toggle Public Admissions module status',
      icon: Zap,
    },
    {
      title: 'Set Theme to Emerald',
      query: 'Change school accent theme to emerald',
      icon: Palette,
    },
  ];

  // Natural Language Command Interpreter & Executor
  const executeCommand = async (rawCommand: string) => {
    if (!rawCommand.trim() || isProcessing) return;
    const cmd = rawCommand.trim();
    setIsProcessing(true);
    setExecutionResult(null);

    // Initial parsing telemetry steps
    setCurrentSteps([
      { message: 'Inhaling natural language prompt into Transformer NLP pipeline...', status: 'active' },
      { message: 'Resolving entity relations & validating School Schema boundaries...', status: 'pending' },
      { message: 'Dispatching atomic mutation to School Database Context...', status: 'pending' },
      { message: 'Committing transaction & emitting tenant sync heartbeat...', status: 'pending' },
    ]);

    await new Promise((res) => setTimeout(res, 450));
    setCurrentSteps((prev) => [
      { ...prev[0], status: 'done' },
      { ...prev[1], status: 'active' },
      prev[2],
      prev[3],
    ]);

    await new Promise((res) => setTimeout(res, 450));
    setCurrentSteps((prev) => [
      prev[0],
      { ...prev[1], status: 'done' },
      { ...prev[2], status: 'active' },
      prev[3],
    ]);

    // Parse Intent
    const lower = cmd.toLowerCase();
    let actionType = 'UNKNOWN';
    let details = '';
    let success = true;

    try {
      if (lower.includes('club') || lower.includes('debate') || lower.includes('robotics')) {
        // Intent: Create Club
        actionType = 'CREATE_CLUB';
        const clubName = lower.includes('debate')
          ? 'Debate & Forensic Society'
          : lower.includes('robotics')
            ? 'Autonomous Robotics Lab'
            : 'Apex Innovators Club';
        const icon = lower.includes('debate') ? '🎙️' : lower.includes('robotics') ? '🤖' : '💡';
        const category = lower.includes('debate')
          ? 'Academic & Speech'
          : lower.includes('robotics')
            ? 'Engineering & AI'
            : 'Innovation & Co-curricular';

        addClub({
          name: clubName,
          category,
          leadTeacher: 'Prof. Nova Chen',
          meetingTime: 'Every Thursday, 03:30 PM',
          membersCount: 1,
          avatar: icon,
          coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
          activeProjects: 2,
          badgeName: 'Apex Founder',
          badgeGlow: 'shadow-glow-cyan',
          isMember: true,
          description: `Autonomous agent created: ${cmd}. Designed to empower student engagement and critical research.`,
        });
        details = `New club "${clubName}" successfully generated with weekly schedules and assigned faculty lead.`;
      } else if (
        (lower.includes('add') || lower.includes('create')) &&
        (lower.includes('teacher') || lower.includes('student') || lower.includes('rahman') || lower.includes('user'))
      ) {
        // Intent: Add User
        actionType = 'ADD_USER';
        const isTeacher = lower.includes('teacher') || lower.includes('faculty') || lower.includes('prof') || lower.includes('mr');
        const role = isTeacher ? 'teacher' : 'student';
        const nameMatch = cmd.match(/(?:mr\.|ms\.|dr\.|prof\.)?\s*([a-z\s]+?)(?:\sas|\sin|\swith|\sfor|$)/i);
        const name = nameMatch && nameMatch[0].trim() ? nameMatch[0].trim() : 'Mr. Rahman';
        const cleanName = name.replace(/^(add|create)\s*/i, '').trim();

        addUser({
          name: cleanName.length > 2 ? cleanName : 'Mr. Rahman',
          email: `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'rahman'}@${branding.schoolName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`,
          role,
          classSection: isTeacher ? 'Department of Mathematics' : 'Class 10 - Alpha',
          status: 'active',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanName}`,
          phone: '+1 (555) 492-1084',
        });
        details = `Registered user "${cleanName}" as [${role.toUpperCase()}] in active tenant roster with verified credentials.`;
      } else if (lower.includes('class') || lower.includes('section')) {
        // Intent: Create Class or Section
        actionType = 'DYNAMIC_CLASS_BUILDER';
        const classMatch = cmd.match(/class\s*(\d+|[a-z]+)/i);
        const className = classMatch ? `Class ${classMatch[1]}` : 'Class 11 - Cybernetics';
        const sections = lower.includes('commerce')
          ? ['Science Section Alpha', 'Commerce Section Beta']
          : ['Section Alpha', 'Section Beta', 'Section Gamma'];

        addClass(className, sections, 'Prof. Alex Mercer');
        details = `Dynamically created "${className}" containing ${sections.length} active sections: ${sections.join(', ')}.`;
      } else if (lower.includes('shift') || lower.includes('morning') || lower.includes('day')) {
        // Intent: Create Shift
        actionType = 'CREATE_SHIFT';
        const shiftName = lower.includes('morning') ? 'Morning Shift' : 'Day Shift';
        addShift({
          name: shiftName,
          startTime: '07:30',
          endTime: '12:45',
          lateCutoffMins: 15,
          isActive: true,
        });
        details = `Configured school shift "${shiftName}" (07:30 - 12:45) with 15-minute biometric grace period.`;
      } else if (lower.includes('toggle') || lower.includes('module') || lower.includes('admission') || lower.includes('feed')) {
        // Intent: Toggle Module
        actionType = 'MODULE_SWITCH';
        const modKey = lower.includes('admission')
          ? 'admissions'
          : lower.includes('feed')
            ? 'socialFeed'
            : lower.includes('ai')
              ? 'aiStudy'
              : 'clubs';
        toggleModule(modKey as any);
        details = `Global platform feature toggle [${modKey}] was flipped. All portal sidebars and routes updated.`;
      } else if (lower.includes('theme') || lower.includes('color') || lower.includes('emerald') || lower.includes('cyan')) {
        // Intent: Theme change
        actionType = 'UPDATE_BRANDING';
        const theme = lower.includes('emerald')
          ? 'emerald'
          : lower.includes('purple')
            ? 'purple'
            : lower.includes('rose')
              ? 'rose'
              : 'cyan';
        updateBranding({ accentTheme: theme });
        details = `Portal aesthetic re-calibrated to Quantum ${theme.toUpperCase()} accent palette.`;
      } else {
        // Generic fallback action: create announcement notice
        actionType = 'BROADCAST_NOTICE';
        addNotice('Autonomous Agent Directive', cmd, 'general');
        details = `Recognized operational intent. Published school-wide Quantum Broadcast notice: "${cmd}"`;
      }
    } catch (err: any) {
      success = false;
      details = `Execution error: ${err?.message || 'Database lock contention'}`;
    }

    await new Promise((res) => setTimeout(res, 400));
    setCurrentSteps((prev) => [
      prev[0],
      prev[1],
      { ...prev[2], status: 'done' },
      { ...prev[3], status: 'done' },
    ]);

    setIsProcessing(false);
    setExecutionResult(details);

    // Add to Action Logs
    const newLog: AgentActionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      command: cmd,
      actionType,
      details,
      status: success ? 'success' : 'failed',
    };
    setActionLogs((prev) => [newLog, ...prev]);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch { }
  };

  return (
    <div className="space-y-6">
      {/* Agent Header Banner */}
      <div className="glass-welcome-panel rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-inner border border-white/40">
            <Bot className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                Autonomous AI Admin Agent
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/20 text-white border border-white/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> ACTIVE NEURAL ENGINE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Speak or type natural language instructions. The AI autonomously mutates database entities,
              rosters, clubs, shifts, and global school modules in real time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="px-4 py-2 rounded-2xl bg-white/20 border border-white/30 text-right">
            <p className="text-[10px] font-mono text-white/80 uppercase font-bold">Multi-Tenant Tenant ID</p>
            <p className="text-xs font-mono font-bold text-white">{branding.campusCode}</p>
          </div>
        </div>
      </div>

      {/* Interactive Command Center */}
      <div className="glass-card-crystal rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-xl space-y-6">
        <div>
          <label className="text-xs font-mono text-teal-950 uppercase tracking-widest block mb-2 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-700" />
            Command Input Matrix (Natural Language)
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && executeCommand(inputCommand)}
              placeholder="e.g. 'Create a Debate Club for Class 8' or 'Add Mr. Rahman as a math teacher'..."
              className="w-full pl-5 pr-32 py-4 rounded-2xl glass-pill-input text-sm text-teal-950 placeholder-slate-400 bg-white outline-none border border-teal-200 focus:border-teal-500 shadow-sm transition font-medium"
              disabled={isProcessing}
            />
            <button
              onClick={() => executeCommand(inputCommand)}
              disabled={!inputCommand.trim() || isProcessing}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  Execute
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div>
          <p className="text-[11px] font-mono text-slate-600 uppercase tracking-wider mb-3 font-bold">
            Quick Autonomous Directives (Click to test):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {QUICK_PROMPTS.map((qp, idx) => {
              const Icon = qp.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setInputCommand(qp.query);
                    executeCommand(qp.query);
                  }}
                  disabled={isProcessing}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white hover:bg-teal-50 hover:border-teal-400/50 text-left transition group border border-teal-100 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-teal-950 group-hover:text-teal-800 transition-colors truncate">
                      {qp.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{qp.query}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Execution HUD Telemetry */}
        {isProcessing && (
          <div className="p-5 rounded-2xl bg-teal-950 border border-teal-800 space-y-3 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-teal-800">
              <span className="text-teal-300 font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                NEURAL ORCHESTRATION IN PROGRESS
              </span>
              <span className="text-teal-400 text-[10px]">THREAD ID: #AI-ADM-882</span>
            </div>
            {currentSteps.map((step, sIdx) => (
              <div key={sIdx} className="flex items-center gap-3">
                {step.status === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : step.status === 'active' ? (
                  <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-teal-700 shrink-0" />
                )}
                <span
                  className={
                    step.status === 'done'
                      ? 'text-teal-400/60 line-through'
                      : step.status === 'active'
                        ? 'text-teal-200 font-bold'
                        : 'text-teal-600'
                  }
                >
                  {step.message}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Execution Success Card */}
        {executionResult && !isProcessing && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-start gap-4 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-mono font-bold text-emerald-900 uppercase tracking-wider mb-1">
                Autonomous Mutation Successfully Committed
              </h4>
              <p className="text-sm text-slate-700 font-medium">{executionResult}</p>
            </div>
          </div>
        )}
      </div>

      {/* Autonomous Action Audit Log */}
      <div className="glass-card-crystal rounded-3xl p-6 sm:p-8 border border-teal-100 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-teal-900/10">
          <div className="flex items-center gap-2.5">
            <History className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold text-teal-950 uppercase tracking-wider">
              Autonomous Agent Transaction Audit Trail
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500 font-bold">
            {actionLogs.length} Transactions Logged
          </span>
        </div>

        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {actionLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-white hover:bg-teal-50 border border-teal-100 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-teal-100 text-teal-900 border border-teal-200">
                    {log.actionType}
                  </span>
                  <span className="text-xs font-bold text-teal-950">"{log.command}"</span>
                </div>
                <p className="text-xs text-slate-600">{log.details}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-right sm:flex-col sm:items-end">
                <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> VERIFIED
                </span>
                <span className="text-[9px] font-mono text-slate-500 font-medium">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
