
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700/50">
            <div className="container mx-auto px-4 py-4 md:px-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-7.07 7.07a1 1 0 00-1.414-1.414l7.07-7.07M12 21a9 9 0 110-18 9 9 0 010 18z" />
                       </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Pitch Perfect AI</h1>
                </div>
                 <p className="text-gray-400 mt-1 ml-11">Transforme sua ideia em um pitch de sucesso e uma identidade visual.</p>
            </div>
        </header>
    );
};
