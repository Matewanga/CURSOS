
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { TrainingSample, Weights, Biases, Activations, WeightKeys, BiasKeys } from './types';
import Header from './components/Header';
import Explanation from './components/Explanation';
import NetworkDiagram from './components/NetworkDiagram';
import ControlPanel from './components/ControlPanel';
import ResultsTable from './components/ResultsTable';

const TRAINING_DATA: TrainingSample[] = [
  { inputs: [0, 0], target: 0, description: "Sem açúcar, Fraco" },
  { inputs: [0, 1], target: 1, description: "Sem açúcar, Forte" },
  { inputs: [1, 0], target: 1, description: "Com açúcar, Fraco" },
  { inputs: [1, 1], target: 1, description: "Com açúcar, Forte" },
];

const INITIAL_WEIGHTS: Weights = { w1: 0.2, w2: -0.5, w3: 0.8, w4: 0.1, w5: 0.3, w6: 0.6 };
const INITIAL_BIASES: Biases = { b1: 0, b2: 0, b3: 0 };

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

const App: React.FC = () => {
  const [weights, setWeights] = useState<Weights>(INITIAL_WEIGHTS);
  const [biases, setBiases] = useState<Biases>(INITIAL_BIASES);
  const [selectedInputIndex, setSelectedInputIndex] = useState(0);
  const [isTrained, setIsTrained] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      // Mostra o botão depois de rolar 400px
      if (!showScrollButton && window.scrollY > 400) {
        setShowScrollButton(true);
      } else if (showScrollButton && window.scrollY <= 400) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const calculateForwardPass = useCallback((inputs: [number, number], w: Weights, b: Biases): Activations => {
    const h1_pre = inputs[0] * w.w1 + inputs[1] * w.w3 + b.b1;
    const h1 = sigmoid(h1_pre);

    const h2_pre = inputs[0] * w.w2 + inputs[1] * w.w4 + b.b2;
    const h2 = sigmoid(h2_pre);

    const output_pre = h1 * w.w5 + h2 * w.w6 + b.b3;
    const output = sigmoid(output_pre);

    return { h1, h2, output };
  }, []);

  const handleWeightChange = (key: WeightKeys, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const handleBiasChange = (key: BiasKeys, value: number) => {
    setBiases(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setWeights(INITIAL_WEIGHTS);
    setBiases(INITIAL_BIASES);
    setSelectedInputIndex(0);
  }

  const currentActivations = useMemo(() => 
    calculateForwardPass(TRAINING_DATA[selectedInputIndex].inputs, weights, biases),
    [selectedInputIndex, weights, biases, calculateForwardPass]
  );
  
  const allPredictions = useMemo(() => {
    return TRAINING_DATA.map(sample => {
      const activations = calculateForwardPass(sample.inputs, weights, biases);
      const error = sample.target - activations.output;
      return { ...activations, error };
    });
  }, [weights, biases, calculateForwardPass]);

  useEffect(() => {
    const isCorrect = allPredictions.every(p => Math.abs(p.error) < 0.2);
    setIsTrained(isCorrect);
  }, [allPredictions]);

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <Header />
      <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Explanation />
          <ResultsTable trainingData={TRAINING_DATA} predictions={allPredictions} isTrained={isTrained} />
        </div>
        <div className="space-y-8">
          <NetworkDiagram 
            inputs={TRAINING_DATA[selectedInputIndex].inputs} 
            activations={currentActivations}
            weights={weights}
          />
          <ControlPanel
            weights={weights}
            biases={biases}
            trainingData={TRAINING_DATA}
            selectedInputIndex={selectedInputIndex}
            onWeightChange={handleWeightChange}
            onBiasChange={handleBiasChange}
            onSelectedInputChange={setSelectedInputIndex}
            onReset={handleReset}
          />
        </div>
      </main>
      <footer className="text-center mt-12 py-6 text-slate-500 text-sm border-t border-slate-800">
        <p className="mb-4">Um projeto para desmistificar a retropropagação e o treinamento de redes neurais.</p>
        <div className="flex justify-center items-center space-x-6">
            <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-200 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                <span>matewanga</span>
            </a>
            <a href="https://www.linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-200 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>matewanga</span>
            </a>
        </div>
      </footer>
      
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          className="fixed bottom-8 right-8 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 opacity-0 animate-fade-in"
          style={{opacity: 1}} // Inline style to ensure visibility after animation
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
