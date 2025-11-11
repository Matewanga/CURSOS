import React from 'react';

const Logo = () => (
    <svg className="h-8 w-8 rounded-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" fill="#272F8B"/>
        <text
            fontFamily="Georgia, 'Times New Roman', Times, serif"
            fontSize="120"
            fontWeight="normal"
            fill="black"
            textAnchor="middle"
            x="100"
            y="145"
        >
            <tspan>R</tspan>
            <tspan dx="-48">M</tspan>
        </text>
    </svg>
);

export const Navbar: React.FC = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={(e) => handleScrollToTop(e as any)}>
                        <Logo />
                        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                            Desafio de Visão de IA
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" onClick={handleScrollToTop} className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Início</a>
                        <a href="#challenge-section" onClick={(e) => handleScroll(e, 'challenge-section')} className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Desafio</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
