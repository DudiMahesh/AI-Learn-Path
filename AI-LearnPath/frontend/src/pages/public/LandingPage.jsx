import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  ChevronDown, ArrowRight, Brain, Target,
  BookOpen, Check, ShieldCheck,
  Terminal, Layers, MessageSquare, ChevronRight, FileText, Sparkles
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Radiant dark-mode constellation particles
  const particles = useMemoParticles();

  const handleAssessmentClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLearningPathClick = () => {
    if (isAuthenticated) {
      navigate('/learning-path');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-zinc-100 font-sans selection:bg-emerald-600 selection:text-white relative overflow-x-hidden">
      {/* ================= TOP NAVBAR (FIXED ON SCROLL) ================= */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0a0e14]/95 backdrop-blur-md border-b border-[#1e2530] shadow-xl shadow-black/50'
          : 'bg-[#0a0e14]/90 backdrop-blur-md border-b border-[#1e2530]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 shadow-sm shadow-emerald-500/20">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M12 3L2 21H22L12 3Z" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M12 8L6 19H18L12 8Z" fill="#10b981" fillOpacity="0.3" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              <span className="font-extrabold text-emerald-400">AI</span> LearnPath
            </span>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <div
              onClick={() => navigate('/courses')}
              className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
            >
              <span>Courses</span>
              <ChevronDown size={14} className="opacity-60" />
            </div>
            <div
              onClick={handleLearningPathClick}
              className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
            >
              <span>Learning Paths</span>
            </div>
            <div
              onClick={() => navigate('/assessments')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              <span>Assessments</span>
            </div>
            <div
              onClick={() => navigate('/ai-assistant')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              <span>AI Tutor</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <span className="text-lg hidden sm:inline" title="Accelerate Learning">🚀</span>

            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-zinc-300 hover:text-white px-4 py-2 rounded-full hover:bg-[#151b23] transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-full shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Top Navbar Spacer to preserve document flow height for fixed navbar */}
      <div className="h-20 w-full flex-shrink-0" aria-hidden="true" />

      {/* ================= HERO SECTION (WITH PROMINENT DOCTOR & RESEARCH BACKGROUND) ================= */}
      <section className="relative w-full pt-16 pb-24 sm:pt-24 sm:pb-32 px-6 overflow-hidden flex flex-col items-center text-center border-b border-[#1e2530]/60">
        {/* Full-width Doctor / Research Background Image (Properly Layered at z-0 with Balanced Visibility) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/images/doctor-research.jpg"
            alt="Doctor & Clinical Medical Research"
            className="w-full h-full object-cover object-center scale-105 opacity-65 brightness-95 contrast-105"
          />
          {/* Subtle gradient transitions for soft bottom blend and text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14]/50 via-[#0a0e14]/30 to-[#0a0e14]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0e14]/25 to-[#0a0e14]/70" />
        </div>

        {/* Constellation Particle Burst (Layered at z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[650px]">
            {particles.map((p, i) => (
              <span
                key={i}
                className="absolute rounded-full transition-opacity duration-1000"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  opacity: p.opacity * 0.5,
                  filter: p.blur ? 'blur(1.5px)' : 'none',
                  boxShadow: p.glow ? `0 0 8px ${p.color}` : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Foreground Content (Properly Layered at z-10) */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Small Centered Brand Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#151b23]/90 backdrop-blur-md border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M12 3L2 21H22L12 3Z" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-bold tracking-tight text-white">
              AI LearnPath
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs font-medium text-emerald-400">NEET (UG) 2026 · AI Medical Entrance Platform</span>
          </div>

          {/* Giant Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-6 drop-shadow-2xl">
            Accelerate your Medical Career with personalized AI NEET learning paths
          </h1>

          {/* Crisp Subtitle */}
          <p className="text-base sm:text-xl text-zinc-100 max-w-2xl leading-relaxed mb-10 font-medium drop-shadow-lg">
            Master the complete NMC/NTA NEET (UG) 2026 syllabus in Physics, Chemistry, and Biology with in-depth study guides, worked examples, and official PDF materials.
          </p>

          {/* Action Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <Target size={18} />
              <span>Start Learning Free</span>
            </button>

            <button
              onClick={() => navigate('/courses')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#151b23]/90 backdrop-blur-md hover:bg-[#1c232d] text-zinc-200 font-bold text-sm sm:text-base rounded-full border border-[#1e2530] hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Browse Medical Chapters</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-14 pt-8 border-t border-[#1e2530]/80 w-full flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Check size={14} className="text-emerald-400" /> Adaptive NEET Skill Gap Analysis
            </span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Check size={14} className="text-emerald-400" /> Official NTA & NCERT Syllabus
            </span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Check size={14} className="text-emerald-400" /> Interactive AI Medical Tutor
            </span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Check size={14} className="text-emerald-400" /> Real-time Progress Tracking
            </span>
          </div>
        </div>
      </section>

      {/* ================= CAPABILITIES SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#1e2530]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Built for Future Doctors & Medical Aspirants
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything you need to master medical concepts and score 700+ in NEET
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Personalized curriculum roadmaps, automated skill verification, and deep contextual NCERT guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            onClick={handleLearningPathClick}
            className="p-8 rounded-3xl bg-[#151b23] border border-[#1e2530] hover:border-emerald-500/50 cursor-pointer transition-all space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Brain size={24} />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Personalized Skill Roadmaps</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Step-by-step learning paths tailored to your NEET score goals with milestone tracking, high-yield topics, and curated NCERT modules.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-[#151b23] border border-[#1e2530] hover:border-zinc-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Complete NEET Curricula</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Complete study guides for NEET (UG) Physics, Chemistry, and Biology with verified derivations, high-yield formulae, diagrams, and practice questions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-[#151b23] border border-[#1e2530] hover:border-zinc-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Contextual AI Tutor (RAG)</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Ask questions anytime. The AI tutor retrieves answers grounded in official study guides, syllabus documents, and curated course modules.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-[#1e2530] space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm">
            Everything you need to know about AI LearnPath.
          </p>
        </div>

        <div className="divide-y divide-[#1e2530] border-y border-[#1e2530]">
          {[
            {
              q: "How does the diagnostic assessment create my learning path?",
              a: "Take a targeted diagnostic evaluation across core NEET Physics, Chemistry, and Biology competencies. Our AI analyzes your answers to detect specific conceptual gaps and automatically generates a customized milestone-based learning roadmap."
            },
            {
              q: "Which subjects are available?",
              a: "We offer complete comprehensive study guides and mock tests for NEET (UG) 2026 Physics, Chemistry, and Biology based strictly on NMC/NTA notified guidelines."
            },
            {
              q: "Can I update my career goals or track as I progress?",
              a: "Yes! You can adjust your target role anytime from your dashboard or profile settings. Your learning path and recommended modules will update dynamically to match your new goals."
            },
            {
              q: "How does the AI Tutor assist during courses?",
              a: "The AI Tutor utilizes Retrieval-Augmented Generation (RAG) powered by official NCERT textbooks and NTA syllabus guidelines. You can ask for formula derivations, step-by-step problem solutions, 3D anatomical and physical schematics, and concept breakdowns with exact citations."
            }
          ].map((item, idx) => (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-white hover:text-emerald-400 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown size={18} className={`transition-transform ${openFaq === idx ? 'rotate-180 text-emerald-400' : 'text-zinc-500'}`} />
              </button>
              {openFaq === idx && (
                <p className="text-zinc-400 text-sm leading-relaxed mt-3 pr-6">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#1e2530] bg-[#080b0f] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-5 h-5 rounded bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
                <path d="M12 3L2 21H22L12 3Z" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
              </svg>
            </div>
            <span>AI LearnPath</span>
          </div>

          <div className="flex items-center gap-6">
            <span onClick={() => navigate('/courses')} className="hover:text-white cursor-pointer">Courses</span>
            <span onClick={() => navigate('/assessments')} className="hover:text-white cursor-pointer">Assessments</span>
            <span onClick={() => navigate('/pyq-papers')} className="hover:text-white cursor-pointer">PYQ Papers</span>
            <span onClick={() => navigate('/login')} className="hover:text-white cursor-pointer">Sign In</span>
          </div>

          <p>© {new Date().getFullYear()} AI LearnPath. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Generate radiant colorful constellation particle points in dark mode
function useMemoParticles() {
  return useMemo(() => {
    const list = [];
    const colors = [
      '#10b981', '#34d399', '#059669', '#6ee7b7',
      '#60a5fa', '#818cf8', '#a855f7', '#38bdf8',
      '#fbbf24', '#f59e0b'
    ];

    const count = 120;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.2);
      const radius = 25 + Math.random() * 45;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle) * 0.65;

      list.push({
        top: Math.max(5, Math.min(95, y)),
        left: Math.max(5, Math.min(95, x)),
        size: Math.random() > 0.8 ? 3.5 : Math.random() > 0.4 ? 2.2 : 1.5,
        color: colors[i % colors.length],
        opacity: 0.25 + Math.random() * 0.6,
        blur: Math.random() > 0.7,
        glow: Math.random() > 0.6
      });
    }
    return list;
  }, []);
}
