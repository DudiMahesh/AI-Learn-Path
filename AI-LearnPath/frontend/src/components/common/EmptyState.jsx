import React from 'react';

const EmptyState = ({ icon: Icon, title, message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
      {Icon && (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-500 mt-2 max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="mt-6 px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-blue-600 shadow-sm transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
