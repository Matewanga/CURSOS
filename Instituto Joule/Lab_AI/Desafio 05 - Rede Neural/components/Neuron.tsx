
import React from 'react';

interface NeuronProps {
  label: string;
  activation: number;
  className?: string;
}

const Neuron: React.FC<NeuronProps> = ({ label, activation, className }) => {
  const activationColor = `rgba(74, 222, 128, ${activation})`; // Green-400 with opacity
  const borderColor = activation > 0.5 ? 'border-green-400' : 'border-slate-600';

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${borderColor}`}
        style={{ backgroundColor: activationColor, boxShadow: `0 0 15px ${activationColor}` }}
      >
        <span className="font-mono text-sm text-white font-bold" style={{textShadow: '0 0 5px black'}}>{activation.toFixed(2)}</span>
      </div>
      <span className="mt-2 text-xs font-semibold text-slate-400">{label}</span>
    </div>
  );
};

export default Neuron;
