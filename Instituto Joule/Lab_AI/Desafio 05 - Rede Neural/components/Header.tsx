
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Treinando uma Rede Neural na Mão
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Ajuste os pesos e biases para ensinar a IA a recomendar o café perfeito!
      </p>
    </header>
  );
};

export default Header;
