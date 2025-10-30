import React, { useEffect, useState } from 'react';

interface LogoDetailModalProps {
    description: string;
    onClose: () => void;
    onUpdate: (feedback: string) => void;
    isUpdating: boolean;
}

export const LogoDetailModal: React.FC<LogoDetailModalProps> = ({ description, onClose, onUpdate, isUpdating }) => {
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleUpdateClick = () => {
        onUpdate(feedback);
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 animate-fadeIn"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logo-modal-title"
        >
            <div 
                className="bg-gray-800 rounded-lg shadow-2xl p-4 md:p-6 relative max-w-3xl w-full animate-scaleUp space-y-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <div className="flex justify-between items-center">
                    <h2 id="logo-modal-title" className="text-xl font-bold text-white">Conceito do Logo</h2>
                     <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Fechar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg max-h-[40vh] overflow-y-auto border border-gray-700">
                   <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{description}</p>
                </div>
               
                {/* Update Section */}
                <div className="border-t border-gray-700 pt-4 space-y-3">
                     <h3 className="font-semibold text-lg text-gray-200">Refinar conceito</h3>
                     <p className="text-sm text-gray-400">Descreva o que você quer alterar e a IA irá refinar a descrição.</p>
                     <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Ex: Gostei do conceito, mas troque a cor para verde e adicione um brilho..."
                        className="w-full h-24 p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-sm"
                        disabled={isUpdating}
                     />
                     <div className="flex justify-end">
                        <button 
                            onClick={handleUpdateClick}
                            disabled={isUpdating || !feedback.trim()}
                            className="flex items-center justify-center w-48 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Atualizando...
                                </>
                            ) : (
                                'Atualizar Conceito'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
