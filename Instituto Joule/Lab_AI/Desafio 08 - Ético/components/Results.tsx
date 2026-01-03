
import React from 'react';
import { RefreshCcw, Award, Trophy } from 'lucide-react';
import { Button } from './Button';
import { UserChoice, Scenario } from '../types';
import { SCENARIOS } from '../constants';

interface ResultsProps {
  choices: Record<string, UserChoice>;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ choices, onRestart }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fadeIn">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 rounded-full mb-6 ring-1 ring-emerald-500/50">
          <Trophy size={48} className="text-emerald-400" />
        </div>
        <div className="mb-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            Desafio Final 08 Concluído
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Jornada Concluída</h1>
        <p className="text-xl text-slate-300">
          Você finalizou o <strong>Desafio 08</strong> do curso Lab AI. Aqui está o resumo das suas decisões éticas.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {SCENARIOS.map((scenario) => {
          const choice = choices[scenario.id];
          if (!choice) return null;
          
          const optionLabel = scenario.options.find(o => o.id === choice.optionId)?.label;

          return (
            <div key={scenario.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700 bg-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    {scenario.category}
                  </h3>
                  <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
                </div>
                <div className="px-4 py-2 bg-slate-700 rounded-lg border border-slate-600">
                  <span className="text-slate-400 text-xs block">Sua Escolha</span>
                  <span className="text-white font-medium">{optionLabel}</span>
                </div>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Sua Justificativa</h4>
                  <p className="text-slate-300 text-sm italic border-l-2 border-slate-600 pl-4 py-1">
                    "{choice.justification}"
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-indigo-400 uppercase mb-2">Síntese da IA</h4>
                  <div className="text-slate-300 text-sm line-clamp-4 hover:line-clamp-none transition-all">
                    {choice.analysis?.split('\n\n')[0] || "Análise não disponível."}
                    ...
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="text-slate-500 text-sm italic">
          Parabéns pela conclusão do curso no Lab AI do Instituto Joule!
        </div>
        <Button onClick={onRestart} variant="outline" className="gap-2">
          <RefreshCcw size={18} /> Reiniciar Desafio Final
        </Button>
      </div>
    </div>
  );
};
