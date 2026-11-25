import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full h-full space-y-4">
      <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
      <p className="text-slate-500 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
