import React from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorStyles = {
  blue:   { icon: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 ring-1 ring-blue-400/20' },
  purple: { icon: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 ring-1 ring-purple-400/20' },
  green:  { icon: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 ring-1 ring-green-400/20' },
  orange: { icon: 'bg-orange-100 dark:bg-orange-900/50 text-orange-500 dark:text-orange-300 ring-1 ring-orange-400/20' },
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) => {
  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/70 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest">
          {title}
        </h3>
        {Icon && (
          <div className={clsx('p-2.5 rounded-xl', styles.icon)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
        {trend && (
          <span className={clsx('flex items-center text-xs font-bold px-2 py-0.5 rounded-full', trend > 0 ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-300')}>
            {trend > 0 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-300">{subtitle}</p>
    </div>
  );
};

export default StatCard;
