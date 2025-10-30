import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TUTORIAL_STEPS, BrainCircuitIcon, FileTextIcon, SparklesIcon, TrophyIcon, ArrowUpIcon } from './constants';
import { generateContent } from './services/geminiService';
import { TutorialStep } from './types';

const Panel = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl flex flex-col h-full">
    <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
      {icon}
      <h2 className="text-lg font-semibold text-cyan-300">{title}</h2>
    </div>
    <div className="p-6 flex-grow overflow-y-auto">{children}</div>
  </div>
);

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTutorialComplete, setIsTutorialComplete] = useState<boolean>(false);
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  const activeStep: TutorialStep = useMemo(() => TUTORIAL_STEPS[currentStepIndex], [currentStepIndex]);

  const runGeneration = useCallback(async (promptToRun: string) => {
    setIsLoading(true);
    setError(null);
    setApiResponse('');
    try {
      const result = await generateContent(promptToRun);
      setApiResponse(result);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialStep = TUTORIAL_STEPS[0];
    setCurrentPrompt(initialStep.prompt);
    runGeneration(initialStep.prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);


  const handleStepChange = (newStepIndex: number) => {
    if (newStepIndex >= 0 && newStepIndex < TUTORIAL_STEPS.length) {
      setCurrentStepIndex(newStepIndex);
      const newStep = TUTORIAL_STEPS[newStepIndex];
      setCurrentPrompt(newStep.prompt);
      runGeneration(newStep.prompt);
    }
  };
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentPrompt(e.target.value);
  }

  const handleManualGenerate = () => {
      runGeneration(currentPrompt);
  }

  const handleRestart = () => {
    setIsTutorialComplete(false);
    handleStepChange(0);
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <header className="py-4 px-6 text-center border-b border-gray-800">
        <h1 className="text-3xl font-bold text-cyan-400">Otimizador de Prompt Interativo</h1>
        <p className="text-gray-400 mt-1">Aprenda a criar prompts eficazes para IA passo a passo</p>
      </header>

      <main className="flex-grow p-4 md:p-6 flex flex-col">
        {isTutorialComplete ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <TrophyIcon className="w-24 h-24 text-amber-400 mb-6" />
                <h2 className="text-4xl font-bold text-cyan-400 mb-4">Parabéns!</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Você completou o tutorial e agora entende os pilares da criação de prompts eficazes.
                    Continue praticando e experimentando para extrair o máximo das IAs!
                </p>
                <button 
                    onClick={handleRestart}
                    className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                >
                    Reiniciar Tutorial
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Coluna 1: Guia do Passo */}
                <Panel icon={<BrainCircuitIcon className="text-cyan-400" />} title={activeStep.title}>
                    <div className="prose prose-invert prose-p:text-gray-300 prose-strong:text-cyan-400" dangerouslySetInnerHTML={{ __html: activeStep.explanation }} />
                </Panel>

                {/* Coluna 2: Editor de Prompt */}
                <Panel icon={<FileTextIcon className="text-cyan-400" />} title="Seu Prompt">
                    <div className="flex flex-col h-full">
                        <textarea
                            className="w-full flex-grow bg-gray-900 border border-gray-600 rounded-lg p-3 text-base text-amber-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none font-mono"
                            value={currentPrompt}
                            onChange={handlePromptChange}
                            rows={15}
                        />
                        <button 
                            onClick={handleManualGenerate}
                            disabled={isLoading}
                            className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Gerar Resposta'}
                        </button>
                    </div>
                </Panel>

                {/* Coluna 3: Resposta da IA */}
                <Panel icon={<SparklesIcon className="text-cyan-400" />} title="Resposta da IA">
                    {isLoading ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">
                            <p><strong>Erro:</strong> {error}</p>
                        </div>
                    ) : (
                        <div className="prose prose-invert prose-p:text-gray-300 whitespace-pre-wrap text-gray-300">{apiResponse}</div>
                    )}
                </Panel>
            </div>
        )}
      </main>

      <footer className="py-4 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
            {!isTutorialComplete && (
                <div className="w-full flex justify-between items-center">
                    <button
                        onClick={() => handleStepChange(currentStepIndex - 1)}
                        disabled={currentStepIndex === 0 || isLoading}
                        className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        Anterior
                    </button>
                    <div className="text-sm font-medium text-gray-400">
                        Passo {currentStepIndex + 1} de {TUTORIAL_STEPS.length}
                    </div>
                    <button
                        onClick={() => {
                            if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
                                handleStepChange(currentStepIndex + 1);
                            } else {
                                setIsTutorialComplete(true);
                            }
                        }}
                        disabled={isLoading}
                        className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        {currentStepIndex === TUTORIAL_STEPS.length - 1 ? 'Finalizar' : 'Próximo'}
                    </button>
                </div>
            )}
            <div className="text-center text-gray-500 text-sm">
                Desenvolvido por matewanga |{' '}
                <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                    GitHub
                </a>{' '}
                &bull;{' '}
                <a href="https://www.linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                    LinkedIn
                </a>
            </div>
        </div>
      </footer>

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
          aria-label="Voltar ao topo"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;
