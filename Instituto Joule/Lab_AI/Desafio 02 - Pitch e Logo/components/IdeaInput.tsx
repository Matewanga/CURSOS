import React from 'react';

interface IdeaInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    logoPrompts: string[];
    onLogoPromptChange: (index: number, value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const IdeaInput: React.FC<IdeaInputProps> = ({ value, onChange, logoPrompts, onLogoPromptChange, onSubmit, isLoading }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    1. Conte sua Ideia de Negócio
                </h2>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mt-2">
                    Seja detalhado. Descreva o problema, seus clientes e sua solução única. Quanto mais detalhes, melhor será o resultado.
                </p>
                <div className="relative mt-4">
                    <textarea
                        value={value}
                        onChange={onChange}
                        placeholder="Ex: Uma plataforma que conecta agricultores locais diretamente a restaurantes, usando IA para otimizar a logística e reduzir o desperdício de alimentos..."
                        className="w-full h-40 p-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    2. Descreva os Conceitos de Logo (Opcional)
                </h2>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mt-2">
                    Dê uma direção para a IA. Se deixar em branco, geraremos estilos variados para você.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {logoPrompts.map((prompt, index) => (
                        <div key={index}>
                             <label htmlFor={`logo-prompt-${index}`} className="block text-sm font-medium text-gray-400 mb-1">
                                Conceito {index + 1}
                            </label>
                            <textarea
                                id={`logo-prompt-${index}`}
                                value={prompt}
                                onChange={(e) => onLogoPromptChange(index, e.target.value)}
                                placeholder={
                                    index === 0 ? "Ex: Minimalista, com uma folha..." :
                                    index === 1 ? "Ex: Emblemático, com um leão..." :
                                    "Ex: Abstrato, com gradiente azul..."
                                }
                                className="w-full h-24 p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-sm"
                                disabled={isLoading}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-4">
                 <button
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Gerando...
                        </>
                    ) : (
                        'Gerar Pitch e Logos'
                    )}
                </button>
            </div>
        </div>
    );
};