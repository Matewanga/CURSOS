
import React, { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { ScenarioView } from './components/ScenarioView';
import { AnalysisView } from './components/AnalysisView';
import { Results } from './components/Results';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SCENARIOS } from './constants';
import { AppState, UserChoice } from './types';
import { analyzeDecision } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentStep: 0,
    choices: {},
    completed: false,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.currentStep, state.completed]);

  const getScenarioIndex = () => Math.floor((state.currentStep - 1) / 2);
  const isAnalysisStep = () => (state.currentStep - 1) % 2 !== 0;

  const handleStart = () => {
    setState(prev => ({ ...prev, currentStep: 1 }));
  };

  const handleDecision = async (optionId: string, justification: string) => {
    const scenarioIndex = getScenarioIndex();
    const scenario = SCENARIOS[scenarioIndex];
    const option = scenario.options.find(o => o.id === optionId);

    if (!option) return;

    const newChoice: UserChoice = {
      scenarioId: scenario.id,
      optionId,
      justification,
      loading: true
    };

    setState(prev => ({
      ...prev,
      choices: { ...prev.choices, [scenario.id]: newChoice }
    }));

    setIsAnalyzing(true);
    const analysis = await analyzeDecision(scenario, option, justification);
    setIsAnalyzing(false);
    
    setState(prev => ({
      ...prev,
      choices: {
        ...prev.choices,
        [scenario.id]: { ...newChoice, analysis, loading: false }
      },
      currentStep: prev.currentStep + 1
    }));
  };

  const handleNext = () => {
    const nextStep = state.currentStep + 1;
    const totalSteps = (SCENARIOS.length * 2) + 1;

    if (nextStep >= totalSteps) {
      setState(prev => ({ ...prev, completed: true }));
    } else {
      setState(prev => ({ ...prev, currentStep: nextStep }));
    }
  };

  const handleRestart = () => {
    setState({
      currentStep: 0,
      choices: {},
      completed: false,
    });
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-emerald-500/30 flex flex-col relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full"></div>
      </div>

      <Navbar onGoHome={handleRestart} />

      <main className="flex-grow pt-24 z-10">
        {state.completed ? (
          <div className="p-4 md:p-12">
            <Results choices={state.choices} onRestart={handleRestart} />
          </div>
        ) : state.currentStep === 0 ? (
          <Welcome onStart={handleStart} />
        ) : (
          <div className="p-4 md:p-12">
            <div className="max-w-4xl mx-auto mb-12 flex items-center justify-between border-b border-slate-800 pb-6">
              <div>
                <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Dilema Ativo</span>
                <h3 className="text-xl font-bold text-white">Cenário {Math.ceil(state.currentStep / 2)} de {SCENARIOS.length}</h3>
              </div>
              <div className="flex gap-1">
                {SCENARIOS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                      i < Math.ceil(state.currentStep / 2) ? 'bg-emerald-500' : 'bg-slate-800'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {!isAnalysisStep() ? (
              <ScenarioView 
                scenario={SCENARIOS[getScenarioIndex()]} 
                onDecision={handleDecision}
                isSubmitting={isAnalyzing}
              />
            ) : (
              <AnalysisView 
                analysis={state.choices[SCENARIOS[getScenarioIndex()].id]?.analysis || "Análise indisponível."}
                userChoice={SCENARIOS[getScenarioIndex()].options.find(o => o.id === state.choices[SCENARIOS[getScenarioIndex()].id]?.optionId)!}
                onNext={handleNext}
                isLast={getScenarioIndex() === SCENARIOS.length - 1}
              />
            )}
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
