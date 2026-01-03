import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, ArrowRight, Quote } from 'lucide-react';
import { Button } from './Button';
import { Option } from '../types';

interface AnalysisViewProps {
  analysis: string;
  userChoice: Option;
  onNext: () => void;
  isLast: boolean;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, userChoice, onNext, isLast }) => {
  return (
    <div className="max-w-3xl mx-auto w-full animate-fadeIn">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-full mb-4 ring-1 ring-indigo-500/50">
          <Bot size={32} className="text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Análise Ética</h2>
        <p className="text-slate-400">O feedback da IA sobre sua decisão.</p>
      </div>

      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl mb-8">
        {/* User Choice Recap */}
        <div className="bg-slate-900/50 p-6 border-b border-slate-700">
          <div className="flex items-start gap-3">
            <Quote className="text-slate-600 shrink-0" size={20} />
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-wide font-bold mb-1">Você escolheu</p>
              <p className="text-xl text-white font-medium">{userChoice.label}</p>
            </div>
          </div>
        </div>

        {/* AI Content */}
        <div className="p-8 prose prose-invert prose-emerald max-w-none">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
              h2: ({node, ...props}) => <h3 className="text-xl font-bold text-indigo-300 mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold text-emerald-300 mt-5 mb-2" {...props} />,
              strong: ({node, ...props}) => <span className="font-bold text-white" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 my-4 text-slate-300" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
              p: ({node, ...props}) => <p className="leading-relaxed text-slate-300 mb-4" {...props} />,
            }}
          >
            {analysis}
          </ReactMarkdown>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onNext} className="w-full md:w-auto min-w-[200px] text-lg">
          {isLast ? "Ver Resultado Final" : "Próximo Dilema"} <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};