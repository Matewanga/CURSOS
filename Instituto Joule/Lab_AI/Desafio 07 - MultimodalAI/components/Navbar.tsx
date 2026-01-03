
import React from 'react';
import { Home, Cpu, Layers } from 'lucide-react';

interface NavbarProps {
  currentView: 'welcome' | 'app';
  setView: (view: 'welcome' | 'app') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  // Caminho para o seu arquivo de imagem local. 
  // Certifique-se de que o arquivo dentro da pasta 'img' se chama 'logo.png'.
  const logoSrc = "./img/logo.png"; 

  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setView('welcome')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-500/20 blur-lg rounded-full group-hover:bg-brand-500/40 transition-all"></div>
            <img 
              src={logoSrc} 
              alt="Logo" 
              className="relative w-10 h-10 rounded-full border border-white/10 shadow-2xl object-cover"
              onError={(e) => {
                // Se a imagem não for encontrada no caminho local, ele remove a borda e mostra iniciais
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                    parent.style.backgroundColor = '#0ea5e9';
                    parent.className = "relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center";
                    parent.innerHTML = '<span class="text-white font-black text-[10px]">AI</span>';
                }
              }}
            />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Multimodal<span className="text-brand-500">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <button 
            onClick={() => setView('welcome')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              currentView === 'welcome' 
                ? 'bg-white/10 text-white font-medium' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home size={18} />
            <span className="hidden md:inline">Início</span>
          </button>
          <button 
            onClick={() => setView('app')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              currentView === 'app' 
                ? 'bg-white/10 text-white font-medium' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu size={18} />
            <span className="hidden md:inline">Orquestrador</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
