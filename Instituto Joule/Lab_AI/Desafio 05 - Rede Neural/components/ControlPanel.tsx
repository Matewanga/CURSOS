
import React from 'react';
import { Biases, BiasKeys, TrainingSample, Weights, WeightKeys } from '../types';
import WeightSlider from './WeightSlider';

interface ControlPanelProps {
  weights: Weights;
  biases: Biases;
  trainingData: TrainingSample[];
  selectedInputIndex: number;
  onWeightChange: (key: WeightKeys, value: number) => void;
  onBiasChange: (key: BiasKeys, value: number) => void;
  onSelectedInputChange: (index: number) => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  weights,
  biases,
  trainingData,
  selectedInputIndex,
  onWeightChange,
  onBiasChange,
  onSelectedInputChange,
  onReset,
}) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-300">Entrada Atual</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {trainingData.map((sample, index) => (
            <button
              key={index}
              onClick={() => onSelectedInputChange(index)}
              className={`p-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                selectedInputIndex === index
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {sample.description}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-300">Pesos (Input &#8594; Oculta)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <WeightSlider label="w1" value={weights.w1} onChange={(v) => onWeightChange('w1', v)} />
          <WeightSlider label="w2" value={weights.w2} onChange={(v) => onWeightChange('w2', v)} />
          <WeightSlider label="w3" value={weights.w3} onChange={(v) => onWeightChange('w3', v)} />
          <WeightSlider label="w4" value={weights.w4} onChange={(v) => onWeightChange('w4', v)} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-300">Pesos (Oculta &#8594; Saída)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <WeightSlider label="w5" value={weights.w5} onChange={(v) => onWeightChange('w5', v)} />
          <WeightSlider label="w6" value={weights.w6} onChange={(v) => onWeightChange('w6', v)} />
        </div>
      </div>
      
       <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-300">Biases</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <WeightSlider label="b1" value={biases.b1} onChange={(v) => onBiasChange('b1', v)} />
          <WeightSlider label="b2" value={biases.b2} onChange={(v) => onBiasChange('b2', v)} />
          <WeightSlider label="b3" value={biases.b3} onChange={(v) => onBiasChange('b3', v)} />
        </div>
      </div>
      
      <button 
        onClick={onReset}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Resetar Pesos
      </button>
    </div>
  );
};

export default ControlPanel;
