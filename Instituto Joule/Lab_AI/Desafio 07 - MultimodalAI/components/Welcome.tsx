
import React from 'react';
import { Bot, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="animate-in fade-in duration-700 space-y-20 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-500/10 blur-[120px] -z-10 rounded-full" />
        <div className="inline-block px-4 py-1.5 mb-4 border border-brand-500/30 rounded-full bg-brand-500/5 text-brand-400 text-sm font-medium">
          LAB AI 2025 • Desafio 7
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
          O Futuro da IA é <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400">
            Multimodal por Natureza
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed font-light">
          Seja bem-vindo ao projeto do <strong>Instituto Joule</strong>. 
          Aqui, combinamos visão computacional e processamento de áudio em tempo real para extrair insights profundos através da multimodalidade.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-brand-50 transition-all hover:scale-105"
          >
            Começar Experiência
            <ArrowRight size={20} />
          </button>
          <a 
            href="https://institutojoule.org.br/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-slate-800/50 text-white font-bold rounded-2xl border border-white/10 hover:bg-slate-700/50 transition-all"
          >
            Sobre o Instituto
          </a>
        </div>
      </section>

      {/* Grid de Características */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-colors group">
          <div className="w-12 h-12 bg-brand-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Bot className="text-brand-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Inteligência Coletiva</h3>
          <p className="text-slate-400 font-light">Análise simultânea de múltiplos sensores usando a arquitetura avançada Gemini da Google.</p>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors group">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Rapidez & Precisão</h3>
          <p className="text-slate-400 font-light">Processamento otimizado para respostas imediatas, unindo transcrição e descrição visual.</p>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck className="text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Lab AI 2025</h3>
          <p className="text-slate-400 font-light">Desenvolvido como parte do currículo prático de IA, focado em aplicações reais e éticas.</p>
        </div>
      </section>

      {/* Footer da Welcome */}
      <div className="rounded-[40px] bg-gradient-to-br from-brand-900/40 via-black to-indigo-900/40 border border-white/5 p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Instituto Joule</h2>
        <p className="text-slate-400 max-w-xl mx-auto italic font-light">
          "Capacitando talentos para o futuro da tecnologia através da inteligência artificial aplicada."
        </p>
        <div className="flex justify-center items-center gap-8 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">2025</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest">Ano Letivo</span>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">#07</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest">Desafio</span>
          </div>
        </div>
      </div>
    </div>
  );
};
