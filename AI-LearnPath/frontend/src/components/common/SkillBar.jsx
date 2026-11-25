import React from 'react';
import clsx from 'clsx';

const SkillBar = ({ skillName, current, required }) => {
  // Determine color based on current vs required
  const getStatusColor = () => {
    if (!required) return 'bg-brand-blue';
    const ratio = current / required;
    if (ratio >= 1) return 'bg-green-500';
    if (ratio >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const statusColor = getStatusColor();
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-700">{skillName}</span>
        <div className="text-xs font-semibold text-slate-500">
          <span className={clsx("mr-1", 
            statusColor === 'bg-green-500' ? 'text-green-600' : 
            statusColor === 'bg-yellow-500' ? 'text-yellow-600' : 
            statusColor === 'bg-red-500' ? 'text-red-600' : 'text-brand-blue'
          )}>
            {current}%
          </span>
          {required && <span>/ {required}% req.</span>}
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 relative overflow-hidden">
        <div 
          className={clsx("h-2.5 rounded-full transition-all duration-500 ease-out", statusColor)} 
          style={{ width: `${current}%` }}
        ></div>
        {required && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-slate-800 z-10"
            style={{ left: `${required}%` }}
            title={`Required: ${required}%`}
          ></div>
        )}
      </div>
    </div>
  );
};

export default SkillBar;
