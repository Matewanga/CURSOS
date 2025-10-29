
import React from 'react';
import { SparklesIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 md:p-8 border-b border-slate-800">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8"/>
        Analisador de Imagens
      </h1>
      <p className="text-slate-400 mt-2">
        Descubra o que a IA vê em suas fotos.
      </p>
    </header>
  );
};

export default Header;
