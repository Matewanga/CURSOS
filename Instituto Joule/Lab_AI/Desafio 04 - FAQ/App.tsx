
import React, { useState, useCallback } from 'react';
import { AppMode, ChatMessage, FAQ } from './types';
import Header from './components/Header';
import FaqBuilder from './components/FaqBuilder';
import ChatSimulator from './components/ChatSimulator';
import getBotResponse from './services/geminiService';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('build');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Olá! Sou o assistente da universidade. Como posso ajudar com base em nossa FAQ?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFaq = useCallback((question: string, answer: string) => {
    const newFaq: FAQ = {
      id: new Date().toISOString(),
      question,
      answer,
    };
    setFaqs(prevFaqs => [...prevFaqs, newFaq]);
  }, []);

  const handleDeleteFaq = useCallback((id: string) => {
    setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== id));
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
      console.error("Falha ao obter resposta do bot:", error);
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Desculpe, ocorreu um erro. Tente novamente.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      <Header mode={mode} setMode={setMode} />
      <main className="flex-grow">
        {mode === 'build' ? (
          <FaqBuilder faqs={faqs} onAddFaq={handleAddFaq} onDeleteFaq={handleDeleteFaq} />
        ) : (
          <ChatSimulator chatHistory={chatHistory} onSendMessage={handleSendMessage} isLoading={isLoading} faqs={faqs} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
