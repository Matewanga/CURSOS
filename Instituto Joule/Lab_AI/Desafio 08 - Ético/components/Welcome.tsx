
import React from 'react';
import { ChevronRight, Scale, Rocket, Microscope, Users, Trophy } from 'lucide-react';
import { Button } from './Button';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="max-w-5xl mx-auto text-center py-20 px-4 animate-fadeIn">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <Trophy size={14} className="animate-pulse" /> Desafio Final • 08
        </div>
        <div className="inline-flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-widest">
          <Microscope size={12} /> Lab AI • Instituto Joule
        </div>
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
        ETHOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
        Explore a fronteira da ética tecnológica no seu <strong>desafio final</strong>. Enfrente dilemas complexos criados para desafiar sua percepção sobre o futuro da Inteligência Artificial.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
        <div className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-800 p-8 rounded-2xl transition-all duration-300">
          <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
             <Rocket size={24} />
          </div>
          <h3 className="text-white text-xl font-bold mb-3">Simulação Realista</h3>
          <p className="text-slate-500 leading-relaxed">Desenvolvido como o <strong>ápice do curso</strong> no Lab AI, este simulador traz problemas éticos reais da indústria tech.</p>
        </div>

        <div className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-800 p-8 rounded-2xl transition-all duration-300">
          <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
             <Scale size={24} />
          </div>
          <h3 className="text-white text-xl font-bold mb-3">Pesagem de Valores</h3>
          <p className="text-slate-500 leading-relaxed">Suas decisões são confrontadas com correntes filosóficas para entender seu impacto social.</p>
        </div>

        <div className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-800 p-8 rounded-2xl transition-all duration-300">
          <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
             <Users size={24} />
          </div>
          <h3 className="text-white text-xl font-bold mb-3">Conclusão de Jornada</h3>
          <p className="text-slate-500 leading-relaxed">Este projeto marca a entrega do seu <strong>Desafio 08</strong>, consolidando o aprendizado no ecossistema Joule.</p>
        </div>
      </div>

      <div id="about" className="mb-16 p-8 bg-slate-900/40 border border-slate-800 rounded-3xl relative overflow-hidden text-left">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px]"></div>
         <h2 className="text-2xl font-bold text-white mb-4">Sobre o Projeto Final</h2>
         <p className="text-slate-400 leading-relaxed">
            O <strong>Ethos AI</strong> é o desafio culminante que utiliza a API do Google Gemini para analisar decisões humanas. Como o <strong>Desafio 08</strong> do currículo do <strong>Lab AI do Instituto Joule</strong>, ele representa a aplicação prática final de ética e tecnologia.
         </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <Button onClick={onStart} className="text-xl px-12 py-5 shadow-2xl shadow-emerald-500/20 group">
          Iniciar Desafio Final <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
