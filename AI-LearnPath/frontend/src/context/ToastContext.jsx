import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  
  const icons = { success: CheckCircle, error: AlertCircle, warning: AlertTriangle, info: Info };
  const colors = { 
    success: 'bg-green-50 border-green-200 text-green-800', 
    error: 'bg-red-50 border-red-200 text-red-800', 
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800', 
    info: 'bg-blue-50 border-blue-200 text-blue-800' 
  };
  
  return (
    <ToastContext.Provider value={{ 
      addToast, 
      success: (m) => addToast(m,'success'), 
      error: (m) => addToast(m,'error'), 
      warning: (m) => addToast(m,'warning'), 
      info: (m) => addToast(m,'info') 
    }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => {
          const Icon = icons[toast.type] || Info;
          return (
            <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm ${colors[toast.type]} animate-in slide-in-from-right`}>
              <Icon size={18} />
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100">
                <X size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  );
};
