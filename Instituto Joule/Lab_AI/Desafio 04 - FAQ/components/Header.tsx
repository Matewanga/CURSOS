
import React from 'react';
import { AppMode } from '../types';

interface HeaderProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Header: React.FC<HeaderProps> = ({ mode, setMode }) => {
  const activeClass = 'bg-indigo-600 text-white';
  const inactiveClass = 'bg-slate-700 text-slate-300 hover:bg-slate-600';

  return (
    <header className="bg-slate-800 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-indigo-400">
          Construtor de Chatbot de FAQ
        </h1>
        <div className="flex space-x-2 rounded-lg bg-slate-900 p-1">
          <button
            onClick={() => setMode('build')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              mode === 'build' ? activeClass : inactiveClass
            }`}
          >
            Criar
          </button>
          <button
            onClick={() => setMode('simulate')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              mode === 'simulate' ? activeClass : inactiveClass
            }`}
          >
            Simular
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
