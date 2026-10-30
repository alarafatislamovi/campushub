'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Mic, MicOff, Search, Sparkles, X, ArrowRight, Zap, BookOpen, Award, BarChart3, Users } from 'lucide-react';

interface HeyClickyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeyClickyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickActions = [
    { label: 'School Admin Customization & Settings Hub', icon: Sparkles, href: '/portal/settings' },
    { label: 'Take attendance for Class 10', icon: Zap, href: '/portal/attendance' },
    { label: 'Ask AI to generate Physics summary', icon: Sparkles, href: '/portal/ai-study' },
    { label: 'Check Semester GPA & Results', icon: BarChart3, href: '/portal/results' },
    { label: 'Browse Robotics & Space Clubs', icon: Users, href: '/portal/clubs' },
    { label: 'Download Quantum Revision Notes', icon: BookOpen, href: '/portal/notes' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const lower = query.toLowerCase();
    if (lower.includes('setting') || lower.includes('admin') || lower.includes('custom') || lower.includes('brand') || lower.includes('class')) {
      setResponseMsg('Routing you to School Admin Customization & Settings Hub...');
      setTimeout(() => {
        router.push('/portal/settings');
        onClose();
      }, 700);
    } else if (lower.includes('attend') || lower.includes('roll') || lower.includes('present')) {
      setResponseMsg('Routing you to the Revolutionary 1-Minute Attendance Grid...');
      setTimeout(() => {
        router.push('/portal/attendance');
        onClose();
      }, 700);
    } else if (lower.includes('ai') || lower.includes('study') || lower.includes('predict') || lower.includes('doubt')) {
      setResponseMsg('Activating AI Study Assistant & Question Predictor...');
      setTimeout(() => {
        router.push('/portal/ai-study');
        onClose();
      }, 700);
    } else if (lower.includes('gpa') || lower.includes('grade') || lower.includes('result') || lower.includes('exam')) {
      setResponseMsg('Opening Exam Gradebook & Interactive GPA Simulator...');
      setTimeout(() => {
        router.push('/portal/results');
        onClose();
      }, 700);
    } else if (lower.includes('club') || lower.includes('robot') || lower.includes('debate') || lower.includes('branch')) {
      setResponseMsg('Loading Dynamic Club Hubs & Branch Groupings...');
      setTimeout(() => {
        router.push('/portal/clubs');
        onClose();
      }, 700);
    } else if (lower.includes('note') || lower.includes('pdf') || lower.includes('book')) {
      setResponseMsg('Opening Curriculum Notes Vault...');
      setTimeout(() => {
        router.push('/portal/notes');
        onClose();
      }, 700);
    } else if (lower.includes('feed') || lower.includes('post') || lower.includes('wall') || lower.includes('social')) {
      setResponseMsg('Transporting to Campus Social Feed & Leaderboard...');
      setTimeout(() => {
        router.push('/portal/feed');
        onClose();
      }, 700);
    } else {
      setResponseMsg(`Neural query matched: Navigating to HUD Overview for "${query}"...`);
      setTimeout(() => {
        router.push('/portal/dashboard');
        onClose();
      }, 700);
    }
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      setResponseMsg('Listening for voice commands across neural microphone...');
      setTimeout(() => {
        setQuery('Take me to Class 10 Attendance');
        setIsListening(false);
        setResponseMsg('Understood: "Take me to Class 10 Attendance" — Routing now!');
        setTimeout(() => {
          router.push('/portal/attendance');
          onClose();
        }, 900);
      }, 2000);
    } else {
      setIsListening(false);
      setResponseMsg(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-obsidian-900 border border-cyan-500/40 rounded-2xl shadow-glow-cyan overflow-hidden p-6">
        {/* Holographic Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Hey-Clicky AI Omni-Navigator</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                  HUD Copilot
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Speak or type natural language instructions to jump anywhere
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input area */}
        <form onSubmit={handleSearch} className="mt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'Show me attendance', 'Study notes for Physics', 'Calculate GPA'..."
              className="w-full pl-11 pr-24 py-3 bg-obsidian-800/90 border border-cyan-500/30 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2 rounded-lg transition ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50'
                }`}
                title="Voice Navigation"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                type="submit"
                className="p-2 text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg font-bold transition shadow-glow-cyan"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Response Feedback */}
        {responseMsg && (
          <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-300 animate-fadeIn">
            <Sparkles className="w-4 h-4 shrink-0 text-cyan-400 animate-spin-slow" />
            <span>{responseMsg}</span>
          </div>
        )}

        {/* Quick Suggestions */}
        <div className="mt-6">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
            Quick Jump Coordinates
          </p>
          <div className="space-y-1.5">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    router.push(action.href);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-obsidian-800/40 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 text-left text-xs sm:text-sm text-slate-300 hover:text-cyan-400 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-400/80 group-hover:text-cyan-400" />
                    <span>{action.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

