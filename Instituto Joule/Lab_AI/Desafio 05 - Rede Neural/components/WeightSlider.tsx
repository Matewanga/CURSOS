
import React from 'react';

interface WeightSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const WeightSlider: React.FC<WeightSliderProps> = ({ label, value, onChange, min = -2, max = 2, step = 0.1 }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const bgColor = value > 0 
    ? `linear-gradient(to right, rgb(96 165 250 / 0.2), rgb(34 211 238 / 0.7) ${percentage}%, rgb(96 165 250 / 0.2) ${percentage}%)`
    : `linear-gradient(to right, rgb(248 113 113 / 0.7) ${percentage}%, rgb(96 165 250 / 0.2) ${percentage}%)`;

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between items-center text-sm">
        <label htmlFor={label} className="font-medium text-slate-300">{label}</label>
        <span className="font-mono text-cyan-300 w-12 text-right">{value.toFixed(1)}</span>
      </div>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        style={{ background: bgColor }}
      />
    </div>
  );
};

export default WeightSlider;
