import React from "react";

export const HeroSection: React.FC = () => {
  const handleScrollToChallenge = () => {
    const challengeSection = document.getElementById("challenge-section");
    if (challengeSection) {
      challengeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-slate-200 font-sans">
      {/* Grid sutil no fundo */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "2rem 2rem",
        }}
      ></div>

      {/* Círculo de luz suave no fundo */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl top-1/2 -translate-y-1/2"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Bem-vindo
          </span>{" "}
          ao Desafio de Visão de IA
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Este projeto faz parte do{" "}
          <span className="text-indigo-400 font-semibold">Desafio 06</span> do curso{" "}
          <span className="text-indigo-400 font-semibold">Lab_AI</span> do Instituto Joule.  
          Aqui você pode explorar o poder da{" "}
          <span className="text-purple-400 font-semibold">Inteligência Artificial</span> na análise de imagens.
        </p>

        <button
          onClick={handleScrollToChallenge}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Iniciar o Desafio
        </button>
      </div>
    </section>
  );
};
