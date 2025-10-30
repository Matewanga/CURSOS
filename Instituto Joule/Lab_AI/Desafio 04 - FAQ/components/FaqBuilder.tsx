
import React, { useState } from 'react';
import { FAQ } from '../types';
import TrashIcon from './icons/TrashIcon';

interface FaqBuilderProps {
  faqs: FAQ[];
  onAddFaq: (question: string, answer: string) => void;
  onDeleteFaq: (id: string) => void;
}

const FaqBuilder: React.FC<FaqBuilderProps> = ({ faqs, onAddFaq, onDeleteFaq }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onAddFaq(question, answer);
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Formulário de Adição */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">Adicionar Nova FAQ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-slate-300 mb-1">Pergunta</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Quais são os horários da biblioteca?"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
          </div>
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-slate-300 mb-1">Resposta</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ex: A biblioteca funciona de segunda a sexta, das 8h às 22h."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors duration-200"
          >
            Adicionar FAQ
          </button>
        </form>
      </div>

      {/* Lista de FAQs */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">Base de Conhecimento</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {faqs.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Nenhuma FAQ adicionada ainda. Comece a construir sua base de conhecimento!</p>
          ) : (
            faqs.map((faq) => (
              <div key={faq.id} className="bg-slate-700 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-indigo-300">{faq.question}</p>
                    <p className="text-slate-300 mt-1">{faq.answer}</p>
                  </div>
                  <button
                    onClick={() => onDeleteFaq(faq.id)}
                    className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-slate-600 transition-colors"
                    aria-label="Deletar FAQ"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqBuilder;
