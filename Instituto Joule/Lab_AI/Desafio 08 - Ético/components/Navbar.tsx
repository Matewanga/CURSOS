import React from 'react';
import { Github, Linkedin, Menu, Trophy } from 'lucide-react';
import logo from "../img/logo.png";   // <-- IMPORTA AQUI

interface NavbarProps {
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGoHome }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={onGoHome}
          >
            <div className="group-hover:scale-110 transition-transform">
              <img
                src={logo}              // <-- AGORA FUNCIONA
                alt="Ethos AI Logo"
                className="h-8 w-auto object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 ml-1 leading-none">
                Ethos AI
              </span>
              <span className="text-[10px] font-bold text-emerald-500 ml-1 uppercase tracking-tighter flex items-center gap-0.5">
                <Trophy size={8} /> Desafio Final 08
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={onGoHome} className="hover:text-emerald-400 transition-colors">Início</button>
            <a href="#about" className="hover:text-emerald-400 transition-colors">Sobre</a>

            <div className="h-4 w-px bg-slate-700"></div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/matewanga_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="md:hidden text-slate-300">
            <Menu size={24} />
          </div>

        </div>
      </div>
    </nav>
  );
};
