import React from 'react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedinIcon from './icons/LinkedinIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-400 p-4">
      <div className="container mx-auto flex justify-center items-center space-x-6">
        <a
          href="https://github.com/matewanga"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-indigo-400 transition-colors"
          aria-label="Perfil do GitHub de matewanga"
        >
          <GitHubIcon className="w-6 h-6" />
          <span>matewanga</span>
        </a>
        <a
          href="https://www.linkedin.com/in/matewanga"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-indigo-400 transition-colors"
          aria-label="Perfil do LinkedIn de matewanga"
        >
          <LinkedinIcon className="w-6 h-6" />
          <span>matewanga</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
