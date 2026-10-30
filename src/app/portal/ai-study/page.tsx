'use client';

import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  BookOpen,
  Send,
  HelpCircle,
  TrendingUp,
  Cpu,
  Copy,
  Check,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function AiStudyPage() {
  const [activeTab, setActiveTab] = useState<'notes' | 'predict' | 'chat'>('notes');

  // Tab 1: AI Note Generator State
  const [noteTopic, setNoteTopic] = useState('Quantum Tunneling & Wave-Particle Duality');
  const [noteSubject, setNoteSubject] = useState('Physics');
  const [isGeneratingNote, setIsGeneratingNote] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<string | null>(null);

  // Tab 2: Question Predictor State
  const [predictSubject, setPredictSubject] = useState('Physics');
  const [predictGrade, setPredictGrade] = useState('Class 10');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictedQuestions, setPredictedQuestions] = useState<any[] | null>(null);

  // Tab 3: Chatbot State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'ai'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: 'Greetings, Scholar. I am your Curriculum AI Assistant. Ask any doubts regarding physics, chemistry, mathematics, or biology.',
      time: 'Just now',
    },
  ]);

  // Handle Note Generation
  const handleGenerateNote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingNote(true);

    setTimeout(() => {
      setGeneratedNote(`
### 🌌 Core Principle: ${noteTopic}
In quantum mechanics, particles exhibit both wave-like and corpuscular behaviors simultaneously. Wave-particle duality implies that matter can behave like a wave with de Broglie wavelength:

$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$

### 🔑 Essential Board Formulae
1. **Planck-Einstein Relation:** $E = h\\nu = \\frac{hc}{\\lambda}$
2. **Heisenberg Uncertainty Principle:** $\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$
3. **Transmission Coefficient (Tunneling Probability):** $T \\approx e^{-2\\kappa a}$

### 🎯 High-Yield Exam Takeaways
- The probability density is given by $|\\psi(x,t)|^2$, representing the likelihood of finding an electron in a given space.
- Quantum tunneling enables alpha decay in radioactive nuclei and powers modern Scanning Tunneling Microscopes (STM).
- When solving board numericals, always verify units: $h \\approx 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$.
      `);
      setIsGeneratingNote(false);
    }, 1200);
  };

  // Handle Question Prediction
  const handlePredictQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);

    setTimeout(() => {
      setPredictedQuestions([
        {
          id: 1,
          question: 'Derive the mirror formula 1/f = 1/v + 1/u for a concave mirror forming a real image, citing Cartesian sign conventions.',
          probability: '96%',
          difficulty: 'Hard (5 Marks)',
          blueprint: '1. Ray diagram with object beyond Center of Curvature. 2. Similar triangles ratio proof. 3. Final algebraic substitution.',
        },
        {
          id: 2,
          question: 'State Fleming\'s Left-Hand Rule and explain its fundamental operation in an electric armature motor.',
          probability: '89%',
          difficulty: 'Medium (3 Marks)',
          blueprint: '1. Definition of thumb, index, and center fingers. 2. Magnetic field vs current direction vector. 3. Mechanical torque creation.',
        },
        {
          id: 3,
          question: 'Calculate the total equivalent resistance and heat dissipated across three 6-ohm resistors arranged in parallel.',
          probability: '84%',
          difficulty: 'Medium (3 Marks)',
          blueprint: '1. 1/R_eq = 1/R1 + 1/R2 + 1/R3 formula. 2. Joule\'s Law of Heating H = I^2*R*t.',
        },
      ]);
      setIsPredicting(false);
    }, 1000);
  };

  // Handle Chat Submit
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMsg = { sender: 'user' as const, text: userText, time: 'Now' };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      let aiReply = `That is a fundamental question in ${noteSubject}! Based on national curriculum standards, remember that the core relationship governs the conservation of energy and momentum.`;

      if (userText.toLowerCase().includes('planck')) {
        aiReply = `Planck's constant ($h \\approx 6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}$) is the fundamental quantum of electromagnetic action. It relates the energy of a photon directly to its frequency ($E = h\\nu$).`;
      } else if (userText.toLowerCase().includes('diff') || userText.toLowerCase().includes('calculus')) {
        aiReply = `In calculus, differentiation measures the instantaneous rate of change of a function. The power rule states: $\\frac{d}{dx}[x^n] = n x^{n-1}$.`;
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiReply, time: 'Now' },
      ]);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="p-6 glass-card-crystal rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-[11px] font-mono bg-seagreen-100 text-seagreen-800 rounded-full border border-seagreen-300 font-semibold flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-seagreen-700" />
            DUAL AI COGNITIVE HUB
          </span>
          <span className="text-xs text-slate-500 font-mono">Curriculum Intelligence Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1">
          AI Study Assistant & Exam Predictor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Harness neural models trained on textbook syllabi and decades of past board questions to accelerate learning.
        </p>

        {/* TAB CONTROLS */}
        <div className="flex items-center gap-2 mt-6 border-b border-seagreen-100 pb-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'notes'
                ? 'bg-seagreen-600 text-white font-bold shadow-md'
                : 'text-slate-600 hover:text-teal-950 hover:bg-white/60'
            }`}
          >
            📝 Generate Revision Notes
          </button>
          <button
            onClick={() => setActiveTab('predict')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'predict'
                ? 'bg-seagreen-600 text-white font-bold shadow-md'
                : 'text-slate-600 hover:text-teal-950 hover:bg-white/60'
            }`}
          >
            🎯 Predict Board Questions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'chat'
                ? 'bg-seagreen-600 text-white font-bold shadow-md'
                : 'text-slate-600 hover:text-teal-950 hover:bg-white/60'
            }`}
          >
            💬 Doubt Clearing Chatbot
          </button>
        </div>
      </div>

      {/* TAB 1: GENERATE NOTES */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="glass-card-crystal p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass space-y-4">
            <h3 className="text-sm font-bold text-teal-950 font-mono uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-seagreen-600" />
              Note Configuration
            </h3>

            <form onSubmit={handleGenerateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Subject</label>
                <select
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-seagreen-200 rounded-xl text-xs text-teal-950 focus:outline-none focus:border-seagreen-500 font-mono shadow-sm"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Target Topic</label>
                <input
                  type="text"
                  value={noteTopic}
                  onChange={(e) => setNoteTopic(e.target.value)}
                  placeholder="e.g. Nernst Equation, Wave Optics"
                  className="w-full px-3 py-2 bg-white border border-seagreen-200 rounded-xl text-xs text-teal-950 placeholder-slate-400 focus:outline-none focus:border-seagreen-500 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingNote}
                className="w-full py-2.5 bg-gradient-to-r from-seagreen-600 to-teal-700 hover:from-seagreen-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isGeneratingNote ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-white" />
                    Generating Neural Summary...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Exam-Ready Notes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Generated Result Output */}
          <div className="lg:col-span-2 glass-card-crystal p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass space-y-4">
            <div className="flex items-center justify-between border-b border-seagreen-100 pb-3">
              <span className="text-xs font-mono text-seagreen-700 font-bold uppercase">
                Neural Summary Terminal
              </span>
              <span className="text-xs font-mono text-slate-500">
                {generatedNote ? 'Synthesis Complete' : 'Awaiting prompt'}
              </span>
            </div>

            {generatedNote ? (
              <div className="prose max-w-none text-xs sm:text-sm text-slate-800 font-sans space-y-3 leading-relaxed whitespace-pre-line bg-white/60 p-4 rounded-2xl border border-seagreen-100">
                {generatedNote}
              </div>
            ) : (
              <div className="text-center py-16 space-y-3">
                <Bot className="w-12 h-12 text-seagreen-600/40 mx-auto animate-pulse" />
                <p className="text-sm text-slate-500">
                  Select a topic and click &apos;Generate Exam-Ready Notes&apos; to watch the AI build formulae, diagrams, and summary points.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PREDICT QUESTIONS */}
      {activeTab === 'predict' && (
        <div className="space-y-6">
          <div className="glass-card-crystal p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-teal-950">Board Exam Pattern Synthesizer</h3>
              <p className="text-xs text-slate-600">
                Predict high-probability questions calculated by analyzing 10 years of regional board examinations.
              </p>
            </div>

            <form onSubmit={handlePredictQuestions} className="flex items-center gap-3">
              <select
                value={predictSubject}
                onChange={(e) => setPredictSubject(e.target.value)}
                className="px-3 py-2 bg-white border border-seagreen-200 rounded-xl text-xs text-teal-950 font-mono shadow-sm"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>

              <button
                type="submit"
                disabled={isPredicting}
                className="px-5 py-2 bg-gradient-to-r from-seagreen-600 to-teal-700 hover:from-seagreen-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs font-mono shadow-md transition disabled:opacity-50 flex items-center gap-1.5"
              >
                {isPredicting ? 'Analyzing...' : 'Predict Questions'}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(predictedQuestions || [
              {
                id: 1,
                question: 'Derive the mirror formula 1/f = 1/v + 1/u for a concave mirror forming a real image, citing Cartesian sign conventions.',
                probability: '96%',
                difficulty: 'Hard (5 Marks)',
                blueprint: '1. Ray diagram with object beyond C. 2. Similar triangles ratio proof. 3. Final algebraic substitution.',
              },
              {
                id: 2,
                question: 'State Fleming\'s Left-Hand Rule and explain its fundamental operation in an electric armature motor.',
                probability: '89%',
                difficulty: 'Medium (3 Marks)',
                blueprint: '1. Definition of thumb, index, and center fingers. 2. Magnetic field vs current direction vector. 3. Mechanical torque creation.',
              },
              {
                id: 3,
                question: 'Calculate the total equivalent resistance and heat dissipated across three 6-ohm resistors arranged in parallel.',
                probability: '84%',
                difficulty: 'Medium (3 Marks)',
                blueprint: '1. 1/R_eq = 1/R1 + 1/R2 + 1/R3 formula. 2. Joule\'s Law of Heating H = I^2*R*t.',
              },
            ]).map((q) => (
              <div
                key={q.id}
                className="glass-card-crystal p-5 sm:p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      {q.probability} Probable
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-medium">
                      {q.difficulty}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-teal-950 leading-relaxed">
                    {q.question}
                  </h4>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-seagreen-100 text-[11px] font-mono text-slate-700 space-y-1 shadow-inner">
                  <span className="text-seagreen-800 font-bold block">Answer Blueprint:</span>
                  <p>{q.blueprint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DOUBT CHATBOT */}
      {activeTab === 'chat' && (
        <div className="glass-card-crystal rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass overflow-hidden flex flex-col h-[520px]">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'bg-seagreen-100 text-seagreen-800 border border-seagreen-300 shadow-sm'
                  }`}
                >
                  {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4 text-seagreen-700" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                      : 'bg-white/85 border border-seagreen-100 text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendChat}
            className="p-4 border-t border-seagreen-100 bg-white/70 flex items-center gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask any doubt about equations, theory, or syllabus concepts..."
              className="flex-1 px-4 py-2.5 bg-white border border-seagreen-200 rounded-xl text-xs sm:text-sm text-teal-950 placeholder-slate-400 focus:outline-none focus:border-seagreen-500 shadow-inner"
            />
            <button
              type="submit"
              className="p-2.5 bg-gradient-to-r from-seagreen-600 to-teal-700 hover:from-seagreen-500 hover:to-teal-600 text-white rounded-xl font-bold transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
