import React, { useState } from 'react';

interface PitchDisplayProps {
    script: string;
    onUpdate: (currentScript: string, feedback: string) => void;
    isUpdating: boolean;
}

const SimpleMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    // ... (renderer remains the same)
    const lines = text.split('\n');
    return (
        <>
            {lines.map((line, index) => {
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold mt-6 mb-2 text-blue-400">{line.substring(3)}</h2>;
                }
                if (line.match(/^\d+\.\s/)) { 
                    return <p key={index} className="ml-5 mb-2">{line}</p>;
                }
                if (line.startsWith('- ') || line.startsWith('* ')) { 
                    return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
                }
                if (line.trim() === '') {
                    return <div key={index} className="h-4"></div>;
                }

                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={index} className="mb-2 text-gray-300 leading-relaxed">
                        {parts.map((part, i) =>
                            part.startsWith('**') && part.endsWith('**') ? 
                            <strong key={i}>{part.slice(2, -2)}</strong> : 
                            part
                        )}
                    </p>
                );
            })}
        </>
    );
};

export const PitchDisplay: React.FC<PitchDisplayProps> = ({ script, onUpdate, isUpdating }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleUpdateClick = () => {
        onUpdate(script, feedback);
        setIsEditing(false);
        setFeedback('');
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Roteiro do seu Pitch
                </h3>
                {!isEditing && (
                     <button onClick={() => setIsEditing(true)} className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition">
                        Editar Pitch
                    </button>
                )}
            </div>
            
            <div className="space-y-4">
               <SimpleMarkdownRenderer text={script} />
            </div>

            {isEditing && (
                <div className="mt-6 border-t border-gray-700 pt-4 space-y-3">
                    <h4 className="font-semibold text-lg text-gray-200">Refinar o Roteiro</h4>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Ex: Torne a introdução mais curta e impactante. Adicione uma estatística no slide de mercado."
                        className="w-full h-28 p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-sm"
                        disabled={isUpdating}
                    />
                    <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => setIsEditing(false)} disabled={isUpdating} className="px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 transition">Cancelar</button>
                        <button 
                            onClick={handleUpdateClick} 
                            disabled={isUpdating || !feedback.trim()}
                            className="flex items-center justify-center w-32 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                             {isUpdating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Atualizando...
                                </>
                            ) : (
                                'Atualizar Pitch'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};