import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Calendar, Clock, Award, CheckCircle2, ChevronRight,
  BookOpen, Eye, Play, Sparkles, Filter, Search, ArrowRight,
  Atom, FlaskConical, Dna, HelpCircle, X, Download
} from 'lucide-react';
import { NEET_PYQ_PAPERS, NEET_PYQ_STATS } from '../../data/neetPYQPapersData';

export default function NEETPYQPapersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pyq' | 'model'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaperForReview, setSelectedPaperForReview] = useState(null);
  const [reviewSubjectFilter, setReviewSubjectFilter] = useState('All');

  // Filter papers
  const filteredPapers = NEET_PYQ_PAPERS.filter(paper => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'grand' && paper.type === 'Grand Full Mock') ||
      (activeTab === 'subject' && paper.type === 'Subject Model Paper') ||
      (activeTab === 'pyq' && paper.type === 'Official PYQ') ||
      (activeTab === 'model' && (paper.type === 'Model Paper' || paper.type === 'Grand Full Mock'));

    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.year.includes(searchTerm) ||
      paper.paperCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.overview.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Launch test environment with paper questions
  const handleStartExam = (paper) => {
    // Transform paper sampleQuestions into assessment format
    const transformedQuestions = paper.sampleQuestions.map((q, idx) => ({
      id: q.id || `q_${idx + 1}`,
      text: q.question,
      options: {
        A: q.options[0],
        B: q.options[1],
        C: q.options[2],
        D: q.options[3]
      },
      correct: ['A', 'B', 'C', 'D'][q.correct] || 'A',
      subject: q.subject,
      section: q.section,
      explanation: q.explanation
    }));

    navigate('/assessments/test', {
      state: {
        assessment: {
          id: paper.id,
          title: paper.title,
          category: 'Full Mock',
          time_limit_minutes: paper.timeMinutes,
          totalQuestions: paper.totalQuestions,
          questionsToAttempt: paper.questionsToAttempt || 180,
          maxMarks: paper.maxMarks,
          customQuestions: transformedQuestions
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            <Award size={13} /> Official NTA Pattern
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            NEET (UG) Previous Years &amp; Model Question Papers
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Practice authentic NEET official question papers (2021–2024) and high-yield 2026 NTA Grand Mock Tests. Experience the exact NTA 3-hour 20-minute (200 minutes) format with 180 questions to attempt across Physics, Chemistry, Botany &amp; Zoology for 720 Total Marks (+4 / −1).
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { label: 'Exam Duration', val: '3h 20m (200 min)', icon: Clock },
              { label: 'Questions to Attempt', val: '180 to Attempt (200 Qs)', icon: Sparkles },
              { label: 'Exam Subjects', val: 'Physics, Chem, Botany, Zoology', icon: Calendar },
              { label: 'Total Marks', val: '🎯 720 Marks (+4 / −1)', icon: Award },
            ].map(m => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{m.val}</div>
                    <div className="text-[10px] text-zinc-400">{m.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab Filters */}
        <div className="flex gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Papers' },
            { id: 'grand', label: '🏆 Grand Mocks (720M / 200 min)' },
            { id: 'subject', label: 'Subject 50-Q Papers' },
            { id: 'pyq', label: 'Official PYQs (2021–2024)' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search year, paper code, topic..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            className="bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-zinc-700 p-6 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl group"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    paper.type === 'Official PYQ'
                      ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {paper.type}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Code {paper.paperCode}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-950 text-amber-400 border border-amber-500/30">
                    Year {paper.year}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-400 font-semibold bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                  <Clock size={13} className="text-emerald-400" /> {paper.timeMinutes}m
                </div>
              </div>

              {/* Title & Overview */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {paper.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                  {paper.overview}
                </p>
              </div>

              {/* Subject Breakdown Badges */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { name: 'Physics', marks: '180 M', icon: Atom, color: 'text-blue-400' },
                  { name: 'Chemistry', marks: '180 M', icon: FlaskConical, color: 'text-emerald-400' },
                  { name: 'Botany', marks: '180 M', icon: Dna, color: 'text-green-400' },
                  { name: 'Zoology', marks: '180 M', icon: Award, color: 'text-amber-400' },
                ].map(s => {
                  const SIcon = s.icon;
                  return (
                    <div key={s.name} className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-2 text-center">
                      <SIcon size={13} className={`mx-auto mb-1 ${s.color}`} />
                      <div className="text-[11px] font-bold text-white">{s.name}</div>
                      <div className="text-[9px] text-zinc-500">{s.marks}</div>
                    </div>
                  );
                })}
              </div>

              {/* Meta details */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                <span>Conducted: <strong className="text-zinc-400">{paper.dateConducted}</strong></span>
                <span>Max Marks: <strong className="text-emerald-400">{paper.maxMarks}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-5 mt-4 border-t border-zinc-800">
              <button
                onClick={() => setSelectedPaperForReview(paper)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700"
              >
                <Eye size={14} className="text-emerald-400" />
                <span>View Solutions</span>
              </button>

              <button
                onClick={() => handleStartExam(paper)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all group-hover:shadow-emerald-600/40"
              >
                <Play size={14} className="fill-white" />
                <span>Solve Online</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal / Paper Solutions Viewer */}
      {selectedPaperForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {selectedPaperForReview.type}
                  </span>
                  <span className="text-xs text-zinc-400">Code {selectedPaperForReview.paperCode} ({selectedPaperForReview.year})</span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">{selectedPaperForReview.title}</h2>
              </div>
              <button
                onClick={() => setSelectedPaperForReview(null)}
                className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Subject Filters inside modal */}
            <div className="px-6 py-3 border-b border-zinc-800 flex items-center justify-between gap-4 bg-zinc-900/50">
              <div className="flex gap-2">
                {['All', 'Physics', 'Chemistry', 'Biology'].map(sub => (
                  <button
                    key={sub}
                    onClick={() => setReviewSubjectFilter(sub)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      reviewSubjectFilter === sub
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
              <span className="text-xs text-zinc-400">
                {selectedPaperForReview.sampleQuestions.length} Questions Displayed with Verified Solutions
              </span>
            </div>

            {/* Questions List */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {selectedPaperForReview.sampleQuestions
                .filter(q => reviewSubjectFilter === 'All' || q.subject === reviewSubjectFilter)
                .map((q, idx) => (
                  <div key={q.id || idx} className="bg-zinc-950 rounded-2xl border border-zinc-800 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        Question {idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {q.subject}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {q.section}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold text-white leading-relaxed">
                      {q.question}
                    </h4>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = optIdx === q.correct;
                        const optLetter = ['A', 'B', 'C', 'D'][optIdx];
                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${
                              isCorrect
                                ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300 font-semibold'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                            }`}>
                              {optLetter}
                            </span>
                            <span>{opt}</span>
                            {isCorrect && (
                              <CheckCircle2 size={14} className="ml-auto text-emerald-400 flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-Step Explanation */}
                    {q.explanation && (
                      <div className="bg-zinc-900/80 rounded-xl p-3.5 border border-zinc-800 text-xs space-y-1">
                        <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 size={13} /> Step-by-step Solution:
                        </div>
                        <p className="text-zinc-300 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
              <button
                onClick={() => setSelectedPaperForReview(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800"
              >
                Close Viewer
              </button>
              <button
                onClick={() => {
                  const paper = selectedPaperForReview;
                  setSelectedPaperForReview(null);
                  handleStartExam(paper);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <Play size={14} className="fill-white" />
                <span>Launch This Exam Online</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

