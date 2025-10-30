
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, FAQ } from '../types';
import SendIcon from './icons/SendIcon';

interface ChatSimulatorProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  faqs: FAQ[];
}

const ChatSimulator: React.FC<ChatSimulatorProps> = ({ chatHistory, onSendMessage, isLoading, faqs }) => {
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  if (faqs.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center p-4">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">A simulação está pronta!</h2>
            <p className="text-slate-400 max-w-md">Para começar, volte para o modo 'Criar' e adicione pelo menos uma Pergunta e Resposta Frequente (FAQ) à base de conhecimento do bot.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800 rounded-t-xl">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-lg p-3 rounded-xl shadow-md ${
                chat.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-200 rounded-bl-none'
              }`}
            >
              <p style={{ whiteSpace: 'pre-wrap' }}>{chat.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-lg p-3 rounded-xl bg-slate-700 text-slate-200 rounded-bl-none animate-pulse">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-slate-800 rounded-b-xl border-t border-slate-700">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-full py-3 px-5 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Enviar mensagem"
          >
            <SendIcon className="w-6 h-6"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSimulator;
