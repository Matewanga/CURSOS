
import React, { useState, useEffect, useRef } from 'react';
import { ImageInput } from './components/ImageInput';
import { AudioInput } from './components/AudioInput';
import { Navbar } from './components/Navbar';
import { Welcome } from './components/Welcome';
import { analyzeMultimodalInput } from './services/geminiService';
import { Sparkles, AlertCircle, Bot, ArrowRight, Github, Linkedin, ArrowUp, RotateCcw, Edit3, Send } from 'lucide-react';
import logo from './img/logo.png'; // ajuste o caminho relativo ao seu arquivo

export default function App() {
  const [view, setView] = useState<'welcome' | 'app'>('welcome');
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Estados para o recurso de "Editar/Refinar"
  const [isEditing, setIsEditing] = useState(false);
  const [refinementText, setRefinementText] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = async (refining = false) => {
    if (!image || !audio) {
      setError("Por favor, selecione uma imagem e um áudio para prosseguir.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const prompt = "Realize uma análise orquestrada multimodal completa destes arquivos.";
      const response = await analyzeMultimodalInput(
        image, 
        audio, 
        prompt, 
        refining ? refinementText : undefined
      );
      setResult(response);
      setIsEditing(false);
      setRefinementText("");
      
      // Rolar para o resultado após o carregamento
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setImage(null);
    setAudio(null);
    setResult(null);
    setError(null);
    setIsEditing(false);
    setRefinementText("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans flex flex-col relative">
      {/* Mesh Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <Navbar currentView={view} setView={setView} />

      <main className="flex-grow max-w-6xl mx-auto px-4 w-full">
        {view === 'welcome' ? (
          <Welcome onStart={() => setView('app')} />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 py-12 space-y-16">
            <header className="text-center space-y-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-brand-400">
                Orquestrador 07
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto italic">
                A fusão definitiva entre visão e audição em um único ambiente.
              </p>
            </header>

            {!result && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-brand-400 text-xs font-bold uppercase tracking-[0.3em] px-2">Entrada 01: Visão</p>
                  <ImageInput onImageSelected={setImage} selectedImage={image} />
                </div>
                <div className="space-y-4">
                  <p className="text-brand-400 text-xs font-bold uppercase tracking-[0.3em] px-2">Entrada 02: Som</p>
                  <AudioInput onAudioSelected={setAudio} selectedAudio={audio} />
                </div>
              </div>
            )}

            {!result && (
              <div className="flex flex-col items-center gap-8 pt-4">
                {error && (
                  <div className="flex items-center gap-3 text-red-400 bg-red-400/10 px-8 py-4 rounded-2xl border border-red-400/20 glass-card">
                    <AlertCircle size={20} />
                    <span className="font-medium">{error}</span>
                  </div>
                )}
                
                <button
                  onClick={() => handleAnalyze(false)}
                  disabled={loading || !image || !audio}
                  className={`
                    group flex items-center gap-4 px-14 py-6 rounded-[32px] text-2xl font-black transition-all duration-500
                    ${loading || !image || !audio 
                      ? 'bg-white/5 text-slate-700 cursor-not-allowed border border-white/5' 
                      : 'bg-white text-black hover:bg-brand-50 hover:scale-105 shadow-[0_0_50px_rgba(14,165,233,0.3)]'}
                  `}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                      <span>Orquestrando...</span>
                    </div>
                  ) : (
                    <>
                      <Bot size={28} />
                      <span>ANALISAR AGORA</span>
                      <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}

            {result && (
              <div ref={resultRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="glass-card rounded-[48px] p-8 md:p-16 shadow-3xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/10 pb-10">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-brand-500/20 rounded-3xl">
                        <Sparkles className="w-10 h-10 text-brand-400" />
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tight">Análise Gerada</h2>
                    </div>
                    
                    {/* Ações Rápidas */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all"
                      >
                        <Edit3 size={18} />
                        EDITAR ANÁLISE
                      </button>
                      <button 
                        onClick={handleNewAnalysis}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-brand-900/20"
                      >
                        <RotateCcw size={18} />
                        NOVA ANÁLISE
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mb-10 p-6 bg-brand-500/5 border border-brand-500/20 rounded-3xl animate-in zoom-in-95">
                      <p className="text-brand-400 text-sm font-bold mb-3 uppercase tracking-wider">O que deseja alterar na análise?</p>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={refinementText}
                          onChange={(e) => setRefinementText(e.target.value)}
                          placeholder="Ex: Refaça em tópicos curtos / Use um tom mais informal..."
                          className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze(true)}
                        />
                        <button 
                          onClick={() => handleAnalyze(true)}
                          disabled={loading || !refinementText.trim()}
                          className="bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white p-3 rounded-xl transition-all"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="prose prose-invert prose-xl max-w-none text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Botão Flutuante Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 z-[100] p-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-white shadow-3xl transition-all duration-500 hover:bg-brand-500 hover:scale-110 active:scale-95 group ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
        title="Voltar ao topo"
      >
        <ArrowUp size={28} className="group-hover:animate-bounce" />
      </button>

      <footer className="mt-24 border-t border-white/5 bg-black/80 backdrop-blur-xl py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-10">
          <div className="text-center space-y-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.5em]">Lab AI 2025 • Joule</p>
            <div className="flex items-center justify-center gap-4 text-3xl font-black text-white">
               {/* Rodapé também usando a logo local */}
               <img 
                 src="./img/logo.png" 
                 alt="Logo" 
                 className="w-10 h-10 rounded-full border border-white/20 object-cover" 
                 onError={(e) => {
                   e.currentTarget.style.display = 'none';
                 }} 
               />
               Rebeca Matewanga
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href="https://github.com/matewanga_" target="_blank" className="p-5 bg-white/5 rounded-3xl text-slate-400 hover:text-white transition-all hover:bg-white/10 border border-white/5">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/matewanga_" target="_blank" className="p-5 bg-white/5 rounded-3xl text-slate-400 hover:text-white transition-all hover:bg-white/10 border border-white/5">
              <Linkedin size={24} />
            </a>
          </div>
          
          <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em]">&copy; 2025 • Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
