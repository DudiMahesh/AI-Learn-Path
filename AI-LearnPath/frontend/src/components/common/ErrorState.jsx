import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorState = ({ message = 'Something went wrong while fetching data.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-red-50/50 rounded-xl border border-red-100 p-8 text-center space-y-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-red-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Error Loading Data</h3>
        <p className="text-slate-500 mt-1 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
