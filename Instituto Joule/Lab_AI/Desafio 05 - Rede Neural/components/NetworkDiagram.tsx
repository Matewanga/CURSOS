import React from 'react';
import Neuron from './Neuron';
import { Activations, Biases, Weights } from '../types';

interface NetworkDiagramProps {
  inputs: [number, number];
  activations: Activations;
  weights: Weights;
}

const Connection: React.FC<{ weight: number; start: string; end: string; }> = ({ weight }) => {
  const opacity = Math.min(1, Math.abs(weight) * 0.5 + 0.1);
  const color = weight > 0 ? 'bg-cyan-400' : 'bg-red-400';
  return <div className={`absolute h-0.5 ${color} transition-all duration-200`} style={{ opacity, zIndex: -1 }}></div>
};

const NetworkDiagram: React.FC<NetworkDiagramProps> = ({ inputs, activations, weights }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col items-center justify-center space-y-12 min-h-[400px]">
      {/* This is a simplified visualization. For a real app, you might use SVG for precise line drawing. */}
      <div className="flex justify-around w-full">
        <Neuron label="Tem Açúcar?" activation={inputs[0]} />
        <Neuron label="É Forte?" activation={inputs[1]} />
      </div>
      <div className="flex justify-around w-full">
        <Neuron label="Neurônio Oculto 1" activation={activations.h1} />
        <Neuron label="Neurônio Oculto 2" activation={activations.h2} />
      </div>
      <div className="flex justify-around w-full">
        <Neuron label="Gosta?" activation={activations.output} />
      </div>

      <p className="text-xs text-slate-500 text-center mt-8">
        As linhas representam os pesos. <span className="text-cyan-400">Azul para positivo</span>, <span className="text-red-400">vermelho para negativo</span>. A opacidade representa a força.
      </p>
    </div>
  );
};

export default NetworkDiagram;
