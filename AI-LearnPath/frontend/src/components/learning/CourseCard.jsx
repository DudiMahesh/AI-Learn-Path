import React from 'react';
import { Clock, ChevronRight, Layers, BookOpen, Play, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCourseImage } from '../../utils/courseImages';
import { courseService } from '../../services/courseService';

const DIFF_BADGES = {
  beginner: 'bg-emerald-600/90 text-white border-emerald-400/30',
  intermediate: 'bg-teal-600/90 text-white border-teal-400/30',
  advanced: 'bg-emerald-700/90 text-white border-emerald-400/30',
};

export default function CourseCard({ course, index = 0, listMode = false }) {
  const navigate = useNavigate();
  const progress = course.progress || 0;
  const isPdf = !!course.pdf_url || course.format === 'PDF' || (course.title || '').toLowerCase().includes('study guide');
  const titleLower = (course.title || '').toLowerCase();
  const defaultPdf = titleLower.includes('biology')
    ? '/materials/NEET_UG_2026_Biology_Complete_Study_Guide.pdf'
    : titleLower.includes('chemistry')
    ? '/materials/NEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf'
    : '/materials/NEET_UG_2026_Physics_Expanded_Study_Guide.pdf';
  const pdfUrl = course.pdf_url || defaultPdf;
  const imageUrl = course.image_url || getCourseImage(course.title, course.category, index);
  const topicsCount = course.topics_count !== undefined ? course.topics_count : (course.topics?.length || 20);
  const duration = course.duration_hours || Math.max(3, topicsCount * 2);

  const handleOpenCourse = async (e) => {
    if (e && e.defaultPrevented) return;
    if (isPdf) {
      navigate(`/courses/pdf-viewer?file=${encodeURIComponent(pdfUrl)}&title=${encodeURIComponent(course.title)}&pages=${course.pages || ''}`);
      return;
    }
    if (course.topics && course.topics.length > 0) {
      const t = course.topics[0];
      const l = t.lessons?.[0];
      if (l) {
        navigate(`/courses/${course.id}/topics/${t.id}/lessons/${l.id}`);
        return;
      }
    }
    try {
      const res = await courseService.getCourse(course.id);
      const data = res?.data !== undefined ? res.data : res;
      if (data?.topics?.[0]?.lessons?.[0]) {
        const t = data.topics[0];
        const l = t.lessons[0];
        navigate(`/courses/${course.id}/topics/${t.id}/lessons/${l.id}`);
        return;
      }
    } catch (e) {
      console.error('Failed to resolve lesson:', e);
    }
    navigate('/courses');
  };

  if (listMode) {
    return (
      <div
        onClick={handleOpenCourse}
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-row items-stretch"
      >
        {/* Thumbnail */}
        <div className="w-40 sm:w-52 flex-shrink-0 relative overflow-hidden bg-zinc-950">
          <img
            src={imageUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 to-transparent" />
          {/* Difficulty / Format badge */}
          <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize backdrop-blur-sm ${isPdf ? 'bg-emerald-600 text-white border-emerald-400/40' : (DIFF_BADGES[course.difficulty] || DIFF_BADGES.beginner)}`}>
            {isPdf ? 'PDF Format' : (course.difficulty || 'Beginner')}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between p-5 min-w-0">
          <div className="space-y-2">
            {/* Category + stats */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
              {course.category && (
                <span className="font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {course.category}
                </span>
              )}
              {isPdf ? (
                <span className="flex items-center gap-1 font-semibold text-emerald-500">
                  <FileText size={12} /> {course.pages || (titleLower.includes('biology') ? 84 : titleLower.includes('chemistry') ? 111 : 76)} Pages ({titleLower.includes('biology') ? 'Units 1–10' : 'Units 1–20'})
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Layers size={12} className="text-emerald-400" /> {topicsCount} Modules
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-amber-400" /> {duration}h
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base leading-snug line-clamp-2 group-hover:text-emerald-500 transition-colors">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {course.description || 'Master practical concepts with official textbook-style expanded study guide in PDF format.'}
            </p>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
              <FileText size={12} className="text-emerald-500" />
              {isPdf ? 'Complete PDF Document' : 'Self-paced course'}
            </span>

            <div className="flex items-center gap-2">
              {isPdf && (
                <a
                  href={pdfUrl}
                  download="NEET_UG_2026_Physics_Expanded_Study_Guide.pdf"
                  onClick={e => e.stopPropagation()}
                  title="Download PDF directly"
                  className="p-2 text-zinc-500 hover:text-emerald-500 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
                >
                  <Download size={14} />
                </a>
              )}
              <button 
                onClick={handleOpenCourse}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 group-hover:bg-emerald-600 group-hover:text-white border border-emerald-200 dark:border-emerald-800/40 rounded-xl transition-all shadow-sm flex-shrink-0"
              >
                {isPdf ? 'Open PDF Material' : progress > 0 ? 'Continue' : 'Start Learning'}
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid card
  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
      onClick={handleOpenCourse}
    >
      {/* Course Thumbnail */}
      <div>
        <div className="h-44 relative overflow-hidden bg-zinc-950">
          <img
            src={imageUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow border capitalize ${isPdf ? 'bg-emerald-600 text-white border-emerald-400/40' : (DIFF_BADGES[course.difficulty] || DIFF_BADGES.beginner)}`}>
              {isPdf ? 'PDF Format' : (course.difficulty || 'Beginner')}
            </span>

            {course.category && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 text-zinc-200 backdrop-blur-md border border-white/10">
                {course.category}
              </span>
            )}
          </div>

          {/* Bottom Module / Stats inside Image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-zinc-200 font-medium">
            <span className="flex items-center gap-1.5 backdrop-blur-sm bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
              <FileText size={13} className="text-emerald-400" /> {isPdf ? `${course.pages || (titleLower.includes('biology') ? 84 : titleLower.includes('chemistry') ? 111 : 76)} Pages` : `${topicsCount} Modules`}
            </span>
            <span className="flex items-center gap-1.5 backdrop-blur-sm bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
              <Clock size={13} className="text-amber-400" /> {duration}h
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base leading-snug line-clamp-2 group-hover:text-emerald-500 transition-colors">
            {course.title}
          </h3>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {course.description || 'Master practical concepts with official textbook-style study guide in PDF format.'}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-0 flex items-center gap-2">
        {isPdf && (
          <a
            href={pdfUrl}
            download="NEET_UG_2026_Physics_Expanded_Study_Guide.pdf"
            onClick={e => e.stopPropagation()}
            title="Download PDF directly"
            className="p-2.5 text-zinc-500 hover:text-emerald-500 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
          >
            <Download size={15} />
          </a>
        )}
        <button 
          onClick={handleOpenCourse}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 group-hover:bg-emerald-600 group-hover:text-white border border-emerald-200 dark:border-emerald-800/40 rounded-xl transition-all shadow-sm"
        >
          <span>{isPdf ? 'Open PDF Material' : progress > 0 ? 'Continue Course' : 'Start Learning'}</span>
          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
