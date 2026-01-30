import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children, className, ...props }) => {
  return (
    <div className={cn("bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-6", className)} {...props}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-bold text-slate-800">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export const Stat: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}> = ({ label, value, icon, trend, color = "bg-emerald-500" }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-white/40 shadow-sm">
    <div className={cn("p-3 rounded-xl text-white shadow-lg", color)}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        {trend && <span className="text-xs font-bold text-emerald-600">{trend}</span>}
      </div>
    </div>
  </div>
);
