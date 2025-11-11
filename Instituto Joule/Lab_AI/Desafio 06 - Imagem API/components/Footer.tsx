
import React from 'react';

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" stroke="none" fill="currentColor"/>
    </svg>
);

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-gray-500">
               <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Desenvolvido por Rebeca no Desafio 06 - Lab_AI | Instituto Joule
        </p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="https://github.com/Matewanga" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <GithubIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/Matewanga" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <LinkedinIcon />
                    </a>
                </div>
            </div>
        </footer>
    );
};