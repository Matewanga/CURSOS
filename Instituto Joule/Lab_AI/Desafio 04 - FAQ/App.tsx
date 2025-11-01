import React, { useState, useCallback } from 'react';
import { AppMode, ChatMessage, FAQ } from './types';
import FaqBuilder from './components/FaqBuilder';
import ChatSimulator from './components/ChatSimulator';
import logo from './img/logo.png'; // ajuste o caminho relativo ao seu arquivo
import getBotResponse from './services/geminiService';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('build');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Olá! Sou o assistente da universidade. Como posso ajudar com base em nossa FAQ?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleAddFaq = useCallback((question: string, answer: string) => {
    const newFaq: FAQ = { id: new Date().toISOString(), question, answer };
    setFaqs(prev => [...prev, newFaq]);
  }, []);

  const handleDeleteFaq = useCallback((id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  }, []);

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponseText = await getBotResponse(message, faqs);
      const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Desculpe, ocorreu um erro. Tente novamente.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  React.useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black font-sans flex flex-col">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
<img
  src={logo}
  alt="Logo"
  className="w-10 h-10 rounded-full"
/>            <h1 className="text-2xl font-bold text-indigo-400">Construtor FAQ Bot</h1>
          </div>
          <div className="hidden md:flex gap-6 text-gray-300">
            <button onClick={() => setShowHero(true)} className="hover:text-indigo-400 transition">Início</button>
            <button onClick={() => { setShowHero(false); setMode('build'); }} className="hover:text-indigo-400 transition">Criar</button>
            <button onClick={() => { setShowHero(false); setMode('chat'); }} className="hover:text-indigo-400 transition">Chat</button>
            <a href="#footer" className="hover:text-indigo-400 transition">Contato</a>
          </div>
        </div>
      </nav>

      {/* Hero Inicial */}
      {showHero && (
        <section className="h-screen flex flex-col justify-center items-center text-center px-6 mt-16 bg-gradient-to-b from-black via-gray-900 to-black">
          <h2 className="text-5xl md:text-6xl font-extrabold text-indigo-400 mb-4 drop-shadow-lg">
            Bem-vindo ao Construtor de Chatbot de FAQ
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg md:text-xl mb-8">
            Nesta <span className="text-indigo-400 font-semibold">Lição 4</span> do Lab_AI, você poderá criar um chatbot interativo baseado em FAQs da universidade.
          </p>
          <button
            onClick={() => setShowHero(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Começar
          </button>
        </section>
      )}

      {/* Main */}
      {!showHero && (
        <main className="flex-grow p-6 container mx-auto mt-16">
          {mode === 'build' ? (
            <FaqBuilder faqs={faqs} onAddFaq={handleAddFaq} onDeleteFaq={handleDeleteFaq} />
          ) : (
            <ChatSimulator chatHistory={chatHistory} onSendMessage={handleSendMessage} isLoading={isLoading} faqs={faqs} />
          )}
        </main>
      )}

      {/* Footer */}
      <footer id="footer" className="text-center p-8 border-t border-gray-800 bg-black/80 mt-8">
        <div className="flex justify-center items-center gap-8 mb-4">
          <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.46-1.11-1.46-.908-.621.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.942 0-1.09.39-1.982 1.029-2.678-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.908-1.296 2.746-1.025 2.746-1.025.546 1.378.203 2.396.1 2.65.64.696 1.028 1.588 1.028 2.678 0 3.841-2.337 4.686-4.565 4.934.359.31.678.923.678 1.86 0 1.342-.012 2.423-.012 2.75 0 .269.18.58.688.481A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.785-1.75-1.751s.784-1.751 1.75-1.751 1.75.784 1.75 1.751-.784 1.751-1.75 1.751zm13.5 10.268h-3v-4.801c0-1.145-.021-2.618-1.594-2.618-1.596 0-1.84 1.25-1.84 2.544v4.875h-3v-9h2.881v1.231h.041c.401-.76 1.379-1.562 2.837-1.562 3.034 0 3.592 1.997 3.592 4.59v4.741z"/>
            </svg>
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Desenvolvido por Rebeca | Lição 4 - Lab_AI | Instituto Joule
        </p>
      </footer>

      {/* Botão Voltar ao Topo */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
          aria-label="Voltar ao topo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
          </svg>
        </button>
      )}

    </div>
  );
};

export default App;
