import React, { useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { getUnitStudyData } from '../../data/neetUnitStudyData';

// Render custom SVG diagrams matching the study material specification
function RenderUnitDiagram({ type, caption }) {
  if (type === 'dimensional_balance') {
    return (
      <div className="flex flex-col items-center justify-center my-5 py-2">
        <svg
          viewBox="0 0 540 70"
          className="w-full max-w-[500px] h-auto select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left term box */}
          <rect x="20" y="8" width="180" height="48" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="110" y="38" textAnchor="middle" fill="#1f3a63" fontFamily="DejaVu Sans, Verdana, sans-serif" fontSize="14" fontWeight="bold">
            v : [L T⁻¹]
          </text>

          {/* Equal sign */}
          <text x="235" y="40" textAnchor="middle" fill="#1f3a63" fontFamily="DejaVu Sans, Verdana, sans-serif" fontSize="22" fontWeight="bold">
            =
          </text>

          {/* Right term box */}
          <rect x="270" y="8" width="220" height="48" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="380" y="38" textAnchor="middle" fill="#1f3a63" fontFamily="DejaVu Sans, Verdana, sans-serif" fontSize="14" fontWeight="bold">
            u + at : [L T⁻¹]
          </text>
        </svg>
        <p className="text-center text-[12px] text-slate-500 font-sans mt-2">
          {caption}
        </p>
      </div>
    );
  }

  if (type === 'projectile_motion') {
    return (
      <div className="flex flex-col items-center justify-center my-5 py-2">
        <svg viewBox="0 0 500 120" className="w-full max-w-[460px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="40" y1="100" x2="460" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 50 100 Q 250 -10 450 100" fill="none" stroke="#2563eb" strokeWidth="2" />
          <line x1="50" y1="100" x2="110" y2="50" stroke="#059669" strokeWidth="2" />
          <text x="120" y="52" fill="#059669" fontSize="11" fontWeight="bold">u</text>
          <text x="75" y="96" fill="#64748b" fontSize="10">θ</text>
          <circle cx="250" cy="45" r="3.5" fill="#ef4444" />
          <line x1="250" y1="45" x2="300" y2="45" stroke="#ef4444" strokeWidth="1.5" />
          <text x="306" y="49" fill="#ef4444" fontSize="10" fontWeight="bold">v = u cos θ</text>
          <line x1="250" y1="45" x2="250" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="225" y="75" fill="#475569" fontSize="10" fontWeight="bold">H_max</text>
          <text x="250" y="115" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">Range (R)</text>
        </svg>
        <p className="text-center text-[12px] text-slate-500 font-sans mt-2">
          {caption}
        </p>
      </div>
    );
  }

  // Default schematic
  return (
    <div className="flex flex-col items-center justify-center my-4 py-2">
      <svg viewBox="0 0 460 70" className="w-full max-w-[420px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="120" height="40" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
        <text x="80" y="39" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">Foundations</text>
        <line x1="140" y1="35" x2="175" y2="35" stroke="#64748b" strokeWidth="1.5" />
        <rect x="175" y="15" width="120" height="40" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
        <text x="235" y="39" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Governing Laws</text>
        <line x1="295" y1="35" x2="330" y2="35" stroke="#64748b" strokeWidth="1.5" />
        <rect x="330" y="15" width="110" height="40" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.2" />
        <text x="385" y="39" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Analysis</text>
      </svg>
      <p className="text-center text-[12px] text-slate-500 font-sans mt-2">
        {caption}
      </p>
    </div>
  );
}

export default function SinglePageStudySheet({
  subject = 'physics',
  pageNum = 1,
  unitNumber = 1,
  zoom = 1.0
}) {
  const data = getUnitStudyData(subject, unitNumber);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showSolutions, setShowSolutions] = useState({});

  const handleSelectOption = (mcqId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [mcqId]: optionIdx }));
    setShowSolutions(prev => ({ ...prev, [mcqId]: true }));
  };

  // Base A4 dimensions in CSS pixels (794 x 1123 px)
  const A4_WIDTH_PX = 794;
  const A4_HEIGHT_PX = 1123;

  return (
    <div
      className="relative bg-white shadow-[0_12px_45px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden my-4 mx-auto select-text text-slate-800 transition-all origin-top"
      style={{
        width: `${Math.floor(A4_WIDTH_PX * zoom)}px`,
        minHeight: `${Math.floor(A4_HEIGHT_PX * zoom)}px`,
        marginBottom: '60px',
        borderColor: '#3a3d45',
        borderWidth: '1px',
        fontFamily: "'DejaVu Sans', 'Verdana', sans-serif",
        fontSize: `${13 * zoom}px`
      }}
    >
      {/* ── 1. Header Strip (NEET (UG) 2026 · Physics on left, Unit 1 on right) ── */}
      <div
        className="flex items-center justify-between px-10 pt-8 pb-3 text-slate-500"
        style={{ fontSize: `${11 * zoom}px` }}
      >
        <span>{data.headerLeft}</span>
        <span>{data.headerRight}</span>
      </div>

      {/* Main Sheet Body */}
      <div className="px-10 pb-8 flex flex-col gap-4">
        {/* ── 2. Unit Title & Metadata Line ── */}
        <div>
          <h1
            className="font-bold tracking-tight mb-1"
            style={{
              color: '#1f3a63',
              fontSize: `${22 * zoom}px`
            }}
          >
            {data.title}
          </h1>
          <p
            className="text-slate-500 font-sans"
            style={{ fontSize: `${11.5 * zoom}px` }}
          >
            Weightage: [ADD] · Difficulty: Easy · Prerequisite: none
          </p>
        </div>

        {/* ── 3. Core Concepts ── */}
        <div>
          <h2
            className="font-bold mb-1.5"
            style={{
              color: '#1f3a63',
              fontSize: `${14.5 * zoom}px`
            }}
          >
            {data.coreConcept.heading}
          </h2>
          <p
            className="text-slate-700 leading-relaxed"
            style={{ fontSize: `${12.5 * zoom}px` }}
          >
            {data.coreConcept.text}
          </p>
        </div>

        {/* ── 4. Key Formulas Box (Light blue background #eaf1fb with blue border) ── */}
        <section
          className="p-4 rounded-xl border text-slate-800"
          style={{
            backgroundColor: '#eaf1fb',
            borderColor: '#b4c9e8'
          }}
          aria-label="Key Formulas"
        >
          <h3
            className="font-bold mb-2"
            style={{
              color: '#1f3a63',
              fontSize: `${13 * zoom}px`
            }}
          >
            Key formulas
          </h3>
          <div
            className="space-y-1 font-mono text-slate-800"
            style={{ fontSize: `${12 * zoom}px` }}
          >
            {data.keyFormulas.map((f, i) => (
              <p key={i}>
                <span className="font-semibold text-slate-900">{f.label}</span> = {f.formula}
              </p>
            ))}
          </div>
        </section>

        {/* ── 5. Labeled Diagram with Figure Caption (SVG) ── */}
        {data.diagram && (
          <RenderUnitDiagram
            type={data.diagram.type}
            caption={data.diagram.caption}
          />
        )}

        {/* ── 6. Worked Example ── */}
        <section>
          <h3
            className="font-bold mb-1.5"
            style={{
              color: '#1f3a63',
              fontSize: `${14.5 * zoom}px`
            }}
          >
            {data.workedExample.heading}
          </h3>
          <p
            className="font-medium text-slate-800 mb-1"
            style={{ fontSize: `${12.5 * zoom}px` }}
          >
            <span className="font-bold text-[#1f3a63]">Q.</span> {data.workedExample.question}
          </p>
          <p
            className="text-slate-700 mb-1"
            style={{ fontSize: `${12 * zoom}px` }}
          >
            {data.workedExample.steps.map((st, i) => (
              <span key={i} className="mr-3">
                <span className="font-semibold text-slate-900">{st.label}.</span> {st.text}
              </span>
            ))}
          </p>
          <p
            className="text-slate-800"
            style={{ fontSize: `${12 * zoom}px` }}
          >
            <span className="font-bold text-[#1f3a63]">Result.</span> {data.workedExample.result}
          </p>
        </section>

        {/* ── 7. Common Trap Box (Light amber background #fff4dc with amber border) ── */}
        <aside
          className="p-3.5 rounded-lg border leading-relaxed"
          style={{
            backgroundColor: '#fff4dc',
            borderColor: '#fde68a',
            fontSize: `${12 * zoom}px`
          }}
          aria-label="Common Trap"
        >
          <p className="text-amber-950">
            <span className="font-bold text-amber-900">{data.commonTrap.title}</span> {data.commonTrap.text}
          </p>
        </aside>

        {/* ── 8. Practice MCQs with answer and short solution (green text) ── */}
        <section className="mt-1">
          <h3
            className="font-bold mb-2"
            style={{
              color: '#1f3a63',
              fontSize: `${14.5 * zoom}px`
            }}
          >
            1.3 Practice MCQs
          </h3>
          <div className="space-y-3">
            {data.practiceMCQs.map((mcq, qIdx) => {
              const selected = selectedAnswers[mcq.id];
              const isAnswered = selected !== undefined;

              return (
                <div key={mcq.id} className="p-3 rounded-lg border border-slate-200 bg-white">
                  <p
                    className="font-semibold text-slate-900 mb-2"
                    style={{ fontSize: `${12 * zoom}px` }}
                  >
                    <span className="font-bold text-[#1f3a63]">Q{qIdx + 1}.</span> {mcq.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
                    {mcq.options.map((opt, optIdx) => {
                      let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                      if (isAnswered) {
                        if (optIdx === mcq.correct) {
                          btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                        } else if (selected === optIdx) {
                          btnStyle = "bg-rose-50 border-rose-300 text-rose-700";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(mcq.id, optIdx)}
                          className={`text-left px-2.5 py-1.5 rounded border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                          style={{ fontSize: `${11 * zoom}px` }}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === mcq.correct && (
                            <Check size={13} className="text-emerald-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution display in green text */}
                  {showSolutions[mcq.id] && (
                    <div
                      className="mt-2 pt-2 border-t border-slate-100 flex items-start gap-1.5 leading-relaxed"
                      style={{ color: '#059669', fontSize: `${11.5 * zoom}px` }}
                    >
                      <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold">Correct: {mcq.options[mcq.correct]}</span>
                        <p className="text-slate-600 mt-0.5">{mcq.solution}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── 9. Footer with Page Number ── */}
      <footer
        className="px-10 py-4 mt-auto flex items-center justify-between text-slate-400 border-t border-slate-100"
        style={{ fontSize: `${11 * zoom}px` }}
      >
        <span>NEET (UG) 2026 {data.headerLeft.split('·')[1]?.trim()} · Study Guide</span>
        <span className="font-mono font-bold text-slate-600">Page {pageNum}</span>
      </footer>
    </div>
  );
}
