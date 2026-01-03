import React, { useState } from 'react';
import { Scenario } from '../types';
import { Button } from './Button';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SCENARIOS, ICONS } from '../constants';

interface ScenarioViewProps {
  scenario: Scenario;
  onDecision: (optionId: string, justification: string) => void;
  isSubmitting: boolean;
}

export const ScenarioView: React.FC<ScenarioViewProps> = ({ scenario, onDecision, isSubmitting }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [justification, setJustification] = useState('');
  
  const Icon = ICONS[scenario.id] || AlertTriangle;
  const currentScenarioIndex = SCENARIOS.findIndex(s => s.id === scenario.id) + 1;

  const handleSubmit = () => {
    if (selectedOptionId && justification.trim().length > 10) {
      onDecision(selectedOptionId, justification);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-emerald-400 mb-2 uppercase tracking-wider text-xs font-bold">
          <span>Dilema {currentScenarioIndex} de {SCENARIOS.length}</span>
          <span>•</span>
          <span>{scenario.category}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-4">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <Icon size={32} className="text-emerald-400" />
          </div>
          {scenario.title}
        </h2>
        
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl mb-6 backdrop-blur-sm">
          <p className="text-lg text-slate-200 leading-relaxed mb-4">
            {scenario.description}
          </p>
          <div className="bg-amber-900/20 border border-amber-900/50 p-4 rounded-lg flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={20} />
            <p className="text-amber-200/90 text-sm italic">
              <span className="font-bold not-italic text-amber-500 block mb-1">Contexto Crítico:</span>
              {scenario.context}
            </p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {scenario.options.map((option) => (
          <div 
            key={option.id}
            onClick={() => setSelectedOptionId(option.id)}
            className={`cursor-pointer p-5 rounded-xl border-2 transition-all duration-300 relative group
              ${selectedOptionId === option.id 
                ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-750'
              }
            `}
          >
            {selectedOptionId === option.id && (
              <div className="absolute top-3 right-3 text-emerald-500">
                <CheckCircle2 size={24} fill="currentColor" className="text-emerald-950" />
              </div>
            )}
            <h3 className={`font-bold text-lg mb-2 ${selectedOptionId === option.id ? 'text-emerald-400' : 'text-white'}`}>
              {option.label}
            </h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              {option.shortDescription}
            </p>
            <div className="text-xs text-slate-500 border-t border-slate-700/50 pt-3 mt-auto">
              <strong className="text-slate-400">Risco:</strong> {option.risk}
            </div>
          </div>
        ))}
      </div>

      {/* Justification & Action */}
      <div className={`transition-all duration-500 overflow-hidden ${selectedOptionId ? 'opacity-100 max-h-[500px]' : 'opacity-50 max-h-0'}`}>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Por que você escolheu esta opção? (Justifique sua decisão ética)
          </label>
          <textarea
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Explique seu raciocínio. Considere quem é afetado e quais princípios você está priorizando..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none min-h-[120px] resize-none mb-4 placeholder:text-slate-600"
          />
          <div className="flex justify-end items-center gap-4">
            <span className={`text-sm ${justification.length < 10 ? 'text-slate-500' : 'text-emerald-500 transition-colors'}`}>
              {justification.length < 10 ? 'Mínimo 10 caracteres' : 'Pronto para enviar'}
            </span>
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedOptionId || justification.length < 10}
              isLoading={isSubmitting}
            >
              Confirmar Decisão
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};