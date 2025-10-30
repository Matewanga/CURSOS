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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {descriptions.map((desc, index) => (
                    <div 
                        key={index}
                        className="bg-gray-900 rounded-lg shadow-inner flex flex-col p-5 transition-all duration-300 border border-transparent hover:border-blue-500/50"
                    >
                         <div className="relative flex-grow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute -top-1 -left-1 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <p className="text-gray-400 text-sm leading-relaxed pt-6">
                                {desc}
                            </p>
                        </div>
                        <div className="mt-auto pt-4">
                             <button
                                onClick={() => onDescriptionClick(desc, index)}
                                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                                aria-label={`Visualizar detalhes do conceito de logo ${index + 1}`}
                            >
                                Visualizar Detalhes
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};