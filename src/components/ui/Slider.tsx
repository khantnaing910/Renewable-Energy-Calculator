import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  icon?: React.ReactNode;
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step = 1, unit = "", onChange, icon }) => {
  return (
    <div className="space-y-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          {icon}
          {label}
        </label>
        <div className="px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
          <span className="text-sm font-bold text-emerald-600">{value}{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-600 transition-all"
      />
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};
