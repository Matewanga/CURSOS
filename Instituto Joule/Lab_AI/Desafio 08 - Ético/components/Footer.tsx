
import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-slate-900 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Linha de Autoria e Instituição */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p className="text-slate-400 text-sm flex items-center gap-1.5 whitespace-nowrap">
            Feito com <Heart size={14} className="text-emerald-500 fill-emerald-500" /> por 
            <span className="text-white font-bold">Rebeca Matewanga</span> — 2025
          </p>
          <span className="hidden md:inline text-slate-800">|</span>
          <p className="text-slate-600 text-xs uppercase tracking-widest font-semibold">
            Lab AI Instituto Joule
          </p>
        </div>

        {/* Linha de Links Sociais Centralizada */}
        <div className="flex items-center gap-8">
          <a 
            href="https://github.com/matewanga" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group"
          >
            <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all">
              <Github size={18} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium">GitHub</span>
          </a>
          
          <a 
            href="https://linkedin.com/in/matewanga_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group"
          >
            <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all">
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
