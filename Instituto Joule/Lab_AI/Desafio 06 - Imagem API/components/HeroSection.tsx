import React from 'react';

export const HeroSection: React.FC = () => {
    
    const handleScrollToChallenge = () => {
        const challengeSection = document.getElementById('challenge-section');
        if (challengeSection) {
            challengeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative -mt-16">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">Bem-vindo</span> ao Desafio de Visão de IA
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    Descubra o poder da inteligência artificial. Carregue uma imagem e veja como a IA pode identificar e descrever objetos com detalhes impressionantes. Uma janela para o futuro da tecnologia visual.
                </p>
                <button
                    onClick={handleScrollToChallenge}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform duration-200 transform hover:scale-105 shadow-lg"
                >
                    Iniciar o Desafio
                </button>
            </div>
        </section>
    );
};

// A simple grid pattern can be added via a style tag or assumed to be in the global CSS.
// For demonstration, we can conceptualize it here.
// In index.html, one might add:
/*
<style>
  .bg-grid-pattern {
    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 2rem 2rem;
  }
</style>
*/