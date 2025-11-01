import React from 'react';

interface LogoDisplayProps {
    descriptions: string[];
    onDescriptionClick: (description: string, index: number) => void;
}

export const LogoDisplay: React.FC<LogoDisplayProps> = ({ descriptions, onDescriptionClick }) => {
    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center lg:text-left">
                Conceitos de Logo
            </h3>
            <div className="flex flex-col gap-6">
                {descriptions.map((desc, index) => (
                    <div 
                        key={index}
                        className="bg-gray-900/80 rounded-lg shadow-inner flex flex-col p-5 transition-all duration-300 border border-transparent hover:border-blue-500/50"
                    >
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {desc.length > 100 ? desc.substring(0, 100) + "..." : desc}
                        </p>
                        <button
                            onClick={() => onDescriptionClick(desc, index)}
                            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                            aria-label={`Visualizar detalhes do conceito de logo ${index + 1}`}
                        >
                            Visualizar Detalhes
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
