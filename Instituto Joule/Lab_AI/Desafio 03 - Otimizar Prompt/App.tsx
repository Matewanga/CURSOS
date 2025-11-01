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
  <div className="bg-gray-800/60 border border-indigo-700/40 rounded-3xl flex flex-col h-full shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300">
    <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
      {icon}
      <h2 className="text-lg font-semibold text-cyan-400">{title}</h2>
    </div>
    <div className="p-6 flex-grow overflow-y-auto">{children}</div>
  </div>
);

const App: React.FC = () => {
  const [showHero, setShowHero] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTutorialComplete, setIsTutorialComplete] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const activeStep: TutorialStep = useMemo(() => TUTORIAL_STEPS[currentStepIndex], [currentStepIndex]);

  const runGeneration = useCallback(async (promptToRun: string) => {
    setIsLoading(true);
    setError(null);
    setApiResponse('');
    try {
      const result = await generateContent(promptToRun);
      setApiResponse(result);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!showHero) {
      const initialStep = TUTORIAL_STEPS[0];
      setCurrentPrompt(initialStep.prompt);
      runGeneration(initialStep.prompt);
    }
  }, [showHero, runGeneration]);

  useEffect(() => {
    const checkScrollTop = () => setShowScrollToTop(window.scrollY > 300);
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

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentPrompt(e.target.value);
  const handleManualGenerate = () => runGeneration(currentPrompt);
  const handleRestart = () => {
    setIsTutorialComplete(false);
    handleStepChange(0);
    setShowHero(true);
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 font-sans flex flex-col">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center flex-wrap">
          <div className="flex items-center gap-3">
            <img src="./img/logo.png" alt="Logo" className="w-9 h-9 rounded-full" />
            <h1 className="text-2xl font-bold text-indigo-400">Otimizador de Prompt</h1>
          </div>
          <div className="hidden md:flex gap-6 text-gray-300">
            <button onClick={() => setShowHero(true)} className="hover:text-indigo-400 transition cursor-pointer">Início</button>
            <button onClick={() => setShowHero(false)} className="hover:text-indigo-400 transition cursor-pointer">Tutorial</button>
            <a href="#footer" className="hover:text-indigo-400 transition cursor-pointer">Contato</a>
          </div>
        </div>
      </nav>

      {/* Página Inicial Hero */}
      {showHero && (
        <section
          id="inicio"
          className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black via-slate-900 to-black mt-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-indigo-400 mb-4">
            Bem-vindo ao Otimizador de Prompt
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Este projeto faz parte do <span className="text-indigo-400 font-semibold">Desafio 03</span> do curso <span className="text-indigo-400 font-semibold">Lab_AI</span> do Instituto Joule.  
          Aqui você pode analisar imagens com o poder da Inteligência Artificial.
        </p>
          <button
            onClick={() => setShowHero(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Começar Tutorial
          </button>
        </section>
      )}

      {/* Tutorial */}
      {!showHero && (
        <main className="flex-grow flex flex-col p-6 mt-16 container mx-auto">
          {isTutorialComplete ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center bg-gray-800/60 border border-indigo-700/40 rounded-3xl p-8">
              <TrophyIcon className="w-24 h-24 text-amber-400 mb-6" />
              <h2 className="text-4xl font-bold text-indigo-400 mb-4">Parabéns!</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Você completou o tutorial e agora entende os pilares da criação de prompts eficazes.
              </p>
              <button
                onClick={handleRestart}
                className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
              >
                Reiniciar Tutorial
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              <Panel icon={<BrainCircuitIcon className="text-indigo-400" />} title={activeStep.title}>
                <div className="prose prose-invert prose-p:text-gray-300 prose-strong:text-indigo-400" dangerouslySetInnerHTML={{ __html: activeStep.explanation }} />
              </Panel>
              <Panel icon={<FileTextIcon className="text-indigo-400" />} title="Seu Prompt">
                <div className="flex flex-col h-full">
                  <textarea
                    className="w-full flex-grow bg-gray-900 border border-gray-600 rounded-lg p-3 text-base text-amber-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none font-mono"
                    value={currentPrompt}
                    onChange={handlePromptChange}
                    rows={15}
                  />
                  <button
                    onClick={handleManualGenerate}
                    disabled={isLoading}
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    {isLoading ? 'Gerando...' : 'Gerar Resposta'}
                  </button>
                </div>
              </Panel>
              <Panel icon={<SparklesIcon className="text-indigo-400" />} title="Resposta da IA">
                {isLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">
                    <strong>Erro:</strong> {error}
                  </div>
                ) : (
                  <div className="prose prose-invert prose-p:text-gray-300 whitespace-pre-wrap text-gray-300">{apiResponse}</div>
                )}
              </Panel>
            </div>
          )}

          {/* Navegação passos */}
          {!isTutorialComplete && (
            <div className="w-full flex justify-between items-center mt-6">
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
                  if (currentStepIndex < TUTORIAL_STEPS.length - 1) handleStepChange(currentStepIndex + 1);
                  else setIsTutorialComplete(true);
                }}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                {currentStepIndex === TUTORIAL_STEPS.length - 1 ? 'Finalizar' : 'Próximo'}
              </button>
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer id="footer" className="text-center p-8 border-t border-gray-800 bg-black/80">
        <div className="flex justify-center items-center gap-8 mb-4">
          {/* GitHub */}
          <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.46-1.11-1.46-.908-.621.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.942 0-1.09.39-1.982 1.029-2.678-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.908-1.296 2.746-1.025 2.746-1.025.546 1.378.203 2.396.1 2.65.64.696 1.028 1.588 1.028 2.678 0 3.841-2.337 4.686-4.565 4.934.359.31.678.923.678 1.86 0 1.342-.012 2.423-.012 2.75 0 .269.18.58.688.481A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9 fill-current">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.785-1.75-1.751s.784-1.751 1.75-1.751 1.75.784 1.75 1.751-.784 1.751-1.75 1.751zm13.5 10.268h-3v-4.801c0-1.145-.021-2.618-1.594-2.618-1.596 0-1.84 1.25-1.84 2.544v4.875h-3v-9h2.881v1.231h.041c.401-.76 1.379-1.562 2.837-1.562 3.034 0 3.592 1.997 3.592 4.59v4.741z"/>
            </svg>
          </a>
        </div>
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Desenvolvido por Rebeca no Desafio 03 - Lab_AI | Instituto Joule</p>
      </footer>

      {/* Scroll to top */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
          aria-label="Voltar ao topo"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;
