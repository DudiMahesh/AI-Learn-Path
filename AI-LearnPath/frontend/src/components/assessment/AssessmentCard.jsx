import React from 'react';
import { ClipboardList, Clock, Star, ChevronRight, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAssessmentImage } from '../../utils/courseImages';

const TYPE_BADGES = {
  diagnostic: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40',
  topic: 'bg-teal-950/90 text-teal-300 border-teal-500/40',
  career: 'bg-blue-950/90 text-blue-300 border-blue-500/40',
  practice: 'bg-purple-950/90 text-purple-300 border-purple-500/40',
};

export default function AssessmentCard({ assessment, index = 0 }) {
  const navigate = useNavigate();
  const {
    id,
    title = 'Diagnostic Skill Assessment',
    description,
    assessment_type = 'diagnostic',
    time_limit_minutes = 30,
    question_count = 10,
    last_score,
    attempt_count = 0,
    image_url
  } = assessment;

  const imageUrl = image_url || getAssessmentImage(title, assessment_type, index);

  const handleStart = () => {
    navigate('/assessments/test', { state: { assessment } });
  };

  return (
    <div
      onClick={handleStart}
      className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
    >
      {/* Assessment Image Thumbnail Header */}
      <div>
        <div className="h-44 relative overflow-hidden bg-zinc-950">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
            }}
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md shadow border capitalize ${TYPE_BADGES[assessment_type] || TYPE_BADGES.diagnostic}`}>
              {assessment_type}
            </span>

            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 text-zinc-200 backdrop-blur-md border border-white/10 flex items-center gap-1">
              <Clock size={12} className="text-emerald-400" /> {time_limit_minutes >= 60 ? `${Math.floor(time_limit_minutes / 60)}h ${time_limit_minutes % 60 ? (time_limit_minutes % 60) + 'm' : ''} (${time_limit_minutes} min)` : `${time_limit_minutes} min`}
            </span>
          </div>

          {/* Bottom Module / Question Stats inside Image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-zinc-200 font-medium">
            <span className="flex items-center gap-1.5 backdrop-blur-sm bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
              <ClipboardList size={13} className="text-emerald-400" /> {question_count === 180 ? '180 to attempt (720M)' : `${question_count || 10} Questions`}
            </span>
            {attempt_count > 0 && (
              <span className="flex items-center gap-1.5 backdrop-blur-sm bg-black/40 px-2 py-0.5 rounded-md border border-white/10 text-emerald-300">
                <Star size={12} className="fill-emerald-400 text-emerald-400" /> {attempt_count} attempt{attempt_count > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-2">
          <h3 className="font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {description || 'Evaluate core competencies, algorithmic knowledge, and career readiness with machine learning scoring.'}
          </p>

          {/* Score progress bar if previously attempted */}
          {last_score !== undefined && last_score !== null && (
            <div className="pt-2">
              <div className="flex justify-between text-xs text-zinc-400 mb-1 font-medium">
                <span>Last Score</span>
                <span className="text-emerald-400 font-bold">{Math.round(last_score)}%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${last_score >= 75 ? 'bg-emerald-500' : last_score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${last_score}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-0">
        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-600/20 group-hover:shadow-emerald-600/40"
        >
          <span>{attempt_count > 0 ? 'Retake Assessment' : 'Start Assessment'}</span>
          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
