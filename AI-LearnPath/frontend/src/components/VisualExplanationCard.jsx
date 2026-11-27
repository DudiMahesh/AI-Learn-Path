import React, { useState } from 'react';
import {
  Image as ImageIcon, RefreshCw, Download, Maximize2, X,
  BookOpen, Sparkles, Info, CheckCircle2, AlertTriangle, ZoomIn, ZoomOut, Loader2
} from 'lucide-react';
import { synthesizeVectorDiagram } from '../utils/vectorDiagramSynthesizer';

export default function VisualExplanationCard({
  visual,
  question = '',
  answer = '',
  subject = '',
  onVisualUpdate
}) {
  const [loading, setLoading] = useState(false);
  const [fullViewOpen, setFullViewOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState(null);

  const handleRequestVisual = async (regenerate = false) => {
    if (loading || !question) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${apiBase}/api/visual/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ question, subject, answer, regenerate })
      });
      if (!res.ok) throw new Error('Visual generation failed');
      const payload = await res.json();
      const nextVisual = payload?.data || payload;
      if (nextVisual && onVisualUpdate) {
        onVisualUpdate(nextVisual);
      }
    } catch (e) {
      setError('Could not generate visual right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If no visual yet, show "Generate Image" button so students can request one on demand
  if (!visual) {
    return (
      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <ImageIcon size={14} className="text-emerald-500" />
          Need a labelled scientific diagram or infographic for this answer?
        </span>
        <button
          onClick={() => handleRequestVisual(false)}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
          <span>{loading ? 'Generating Visual...' : 'Generate Image'}</span>
        </button>
        {error && <p className="w-full text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }

  const displaySvg = visual.image_svg || synthesizeVectorDiagram('', `${visual.topic || ''} ${question}`, visual.subject || subject);

  const handleDownload = () => {
    if (!displaySvg) return;
    const svgBlob = new Blob([displaySvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1600;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${(visual.topic || 'neet-diagram').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
        a.click();
      } catch {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(visual.topic || 'neet-diagram').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`;
        a.click();
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(visual.topic || 'neet-diagram').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-slate-950/90 text-slate-100 overflow-hidden shadow-lg">
      {/* Header & User Controls */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[11px] font-extrabold uppercase tracking-wider">
            B. Visual Explanation
          </span>
          <span className="text-xs font-bold text-slate-200">{visual.image_type}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleRequestVisual(true)}
            disabled={loading}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            title="Regenerate Educational Visual"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
            <span>Regenerate Image</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 cursor-pointer"
            title="Download Diagram as PNG"
          >
            <Download size={12} />
            <span>Download Image</span>
          </button>

          <button
            onClick={() => { setZoom(1); setFullViewOpen(true); }}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 cursor-pointer"
            title="View Full Image"
          >
            <Maximize2 size={12} />
            <span>View Full Image</span>
          </button>
        </div>
      </div>

      {/* Rendered Educational Diagram (Clean Textbook Canvas) */}
      <div className="p-3 sm:p-5 flex justify-center bg-white">
        <div
          className="w-full max-w-3xl rounded-xl overflow-hidden shadow-sm border border-slate-200"
          dangerouslySetInnerHTML={{ __html: displaySvg }}
        />
      </div>

      {error && <p className="px-4 py-1 text-xs text-rose-400">{error}</p>}

      {/* C. Important Concepts & D. NEET Exam Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-900/60 border-t border-slate-800/80">
        <div className="rounded-xl bg-slate-900/90 border border-sky-500/25 p-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-1.5 mb-2">
            <BookOpen size={13} /> C. Important Concepts
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {(visual.important_concepts || []).map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-sky-400 font-bold mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-amber-500/25 p-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
            <Sparkles size={13} /> D. NEET Exam Notes
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {(visual.neet_exam_notes || []).map((note, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold mt-0.5">★</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* E. Image Information */}
      <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 text-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
          <span className="font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Info size={13} /> E. Image Information
          </span>
          {visual.syllabus_grounded ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-semibold">
              <CheckCircle2 size={11} /> Grounded in NEET Syllabus RAG
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-semibold">
              <AlertTriangle size={11} /> General NCERT Reference
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
          <div><span className="text-slate-500 font-semibold">Image Type:</span> {visual.image_type}</div>
          <div><span className="text-slate-500 font-semibold">Subject:</span> {visual.subject}</div>
          <div><span className="text-slate-500 font-semibold">Topic:</span> {visual.topic}</div>
        </div>
        <p className="mt-1.5 text-slate-400">
          <span className="text-slate-500 font-semibold">Explanation:</span> {visual.short_explanation}
        </p>
        {visual.limitation_note && (
          <p className="mt-1 text-amber-300/90 text-[11px]">
            Note: {visual.limitation_note}
          </p>
        )}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {fullViewOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">{visual.topic}</h3>
              <p className="text-xs text-slate-400">{visual.subject} · {visual.image_type}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(z => Math.max(0.6, +(z - 0.2).toFixed(1)))}
                className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="text-xs font-mono text-slate-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(z => Math.min(2.2, +(z + 0.2).toFixed(1)))}
                className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Download size={14} /> Download
              </button>
              <button
                onClick={() => setFullViewOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-rose-600 cursor-pointer"
                title="Close Full View"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-6">
            <div
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
              className="w-full max-w-4xl transition-transform duration-200"
              dangerouslySetInnerHTML={{ __html: displaySvg }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

