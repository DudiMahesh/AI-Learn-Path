import React from 'react';
import { CheckCircle, Lock, Clock, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const LearningPathItem = ({ item, isLast }) => {
  const navigate = useNavigate();
  const isLocked = !item.isUnlocked;
  
  // Status definitions
  const statusColors = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
    not_started: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  
  const statusLabels = {
    completed: 'Completed',
    in_progress: 'In Progress',
    not_started: 'Not Started',
  };

  const priorityColors = {
    Critical: 'bg-red-50 text-red-600 border-red-100',
    High: 'bg-orange-50 text-orange-600 border-orange-100',
    Normal: 'bg-slate-50 text-slate-500 border-slate-100',
  };

  return (
    <div className="flex relative">
      {/* Timeline line */}
      {!isLast && (
        <div className={clsx("absolute top-10 left-5 bottom-0 w-0.5 -ml-px", item.status === 'completed' ? 'bg-green-400' : 'bg-slate-200')}></div>
      )}
      
      {/* Node circle */}
      <div className="relative mr-6 mt-1 flex-shrink-0 z-10">
        <div className={clsx(
          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2",
          item.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 
          item.status === 'in_progress' ? 'bg-white border-brand-blue text-brand-blue ring-4 ring-blue-50' :
          'bg-slate-50 border-slate-300 text-slate-400'
        )}>
          {item.status === 'completed' ? <CheckCircle size={20} /> : item.orderIndex}
        </div>
      </div>
      
      {/* Content Card */}
      <div 
        onClick={() => !isLocked && navigate(`/courses/${item.courseId}/topics/${item.topicId}`)}
        className={clsx(
          "flex-1 mb-8 rounded-2xl p-5 border transition-all",
          isLocked ? "bg-slate-50 border-slate-200 opacity-70" : 
          "bg-white border-slate-200 shadow-sm hover:shadow-md cursor-pointer hover:border-brand-blue/50"
        )}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {isLocked && <Lock size={16} className="text-slate-400" />}
            <h4 className={clsx("font-bold text-lg", isLocked ? "text-slate-600" : "text-slate-900")}>
              {item.title}
            </h4>
          </div>
          <div className="flex space-x-2">
            <span className={clsx("px-2.5 py-1 rounded-full text-xs font-semibold border", priorityColors[item.priority] || priorityColors.Normal)}>
              {item.priority} Priority
            </span>
            <span className={clsx("px-2.5 py-1 rounded-full text-xs font-semibold border", statusColors[item.status])}>
              {statusLabels[item.status]}
            </span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-slate-500 font-medium">
            <Clock size={16} className="mr-1.5" />
            {item.estimatedTime}
          </div>
          
          {item.status === 'in_progress' && (
            <div className="flex items-center w-48">
              <span className="text-xs font-semibold text-brand-blue w-10">{item.progress}%</span>
              <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden ml-2">
                <div className="bg-brand-blue h-full rounded-full" style={{ width: `${item.progress}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPathItem;
