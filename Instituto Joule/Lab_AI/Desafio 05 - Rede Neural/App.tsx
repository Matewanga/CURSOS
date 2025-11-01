import React, { useState, useCallback, useMemo, useEffect } from "react";
import { TrainingSample, Weights, Biases, Activations, WeightKeys, BiasKeys } from "./types";
import Header from "./components/Header";
import Explanation from "./components/Explanation";
import NetworkDiagram from "./components/NetworkDiagram";
import ControlPanel from "./components/ControlPanel";
import ResultsTable from "./components/ResultsTable";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";

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
  const [showHero, setShowHero] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollButton && window.scrollY > 400) setShowScrollButton(true);
      else if (showScrollButton && window.scrollY <= 400) setShowScrollButton(false);
    };
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScrollButton]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const calculateForwardPass = useCallback(
    (inputs: [number, number], w: Weights, b: Biases): Activations => {
      const h1 = sigmoid(inputs[0] * w.w1 + inputs[1] * w.w3 + b.b1);
      const h2 = sigmoid(inputs[0] * w.w2 + inputs[1] * w.w4 + b.b2);
      const output = sigmoid(h1 * w.w5 + h2 * w.w6 + b.b3);
      return { h1, h2, output };
    },
    []
  );

  const handleWeightChange = (key: WeightKeys, value: number) =>
    setWeights(prev => ({ ...prev, [key]: value }));
  const handleBiasChange = (key: BiasKeys, value: number) =>
    setBiases(prev => ({ ...prev, [key]: value }));
  const handleReset = () => {
    setWeights(INITIAL_WEIGHTS);
    setBiases(INITIAL_BIASES);
    setSelectedInputIndex(0);
  };

  const currentActivations = useMemo(
    () => calculateForwardPass(TRAINING_DATA[selectedInputIndex].inputs, weights, biases),
    [selectedInputIndex, weights, biases, calculateForwardPass]
  );

  const allPredictions = useMemo(
    () =>
      TRAINING_DATA.map(sample => {
        const activations = calculateForwardPass(sample.inputs, weights, biases);
        const error = sample.target - activations.output;
        return { ...activations, error };
      }),
    [weights, biases, calculateForwardPass]
  );

  useEffect(() => {
    setIsTrained(allPredictions.every(p => Math.abs(p.error) < 0.2));
  }, [allPredictions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-slate-200 font-sans">
      
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="./img/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold text-indigo-400 tracking-wide">
              Rede Neural Interativa
            </h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setShowHero(true); }}
              className="hover:text-indigo-400 transition-colors"
            >
              Início
            </a>
            <a
              href="#main"
              onClick={e => {
                e.preventDefault();
                setShowHero(false);
                setTimeout(() => {
                  const el = document.getElementById("main");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
              className="hover:text-indigo-400 transition-colors"
            >
              Treinamento
            </a>
            <a
              href="#contato"
              onClick={e => { e.preventDefault(); const el = document.getElementById("contato"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="hover:text-indigo-400 transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      {showHero && (
        <section id="inicio" className="h-screen flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-400 mb-4 drop-shadow-lg">
            Treinador Manual de Rede Neural
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
            Este projeto faz parte do <span className="text-indigo-400 font-semibold">Desafio 05</span> do curso <span className="text-indigo-400 font-semibold">Lab_AI</span> do Instituto Joule.  
            Aqui você pode analisar imagens com o poder da Inteligência Artificial.
          </p>
          <button
            onClick={() => setShowHero(false)}
            className="bg-indigo-400 hover:bg-indigo-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Começar
          </button>
        </section>
      )}

      {/* Main */}
      {!showHero && (
        <main id="main" className="container mx-auto px-4 py-20">
          <Header />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          </div>
        </main>
      )}

      {/* Footer */}
      <footer
        id="contato"
        className="text-center p-6 border-t border-gray-800 bg-gradient-to-t from-black via-gray-900 to-black"
      >
        <div className="flex justify-center items-center gap-5 mb-3">
          <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
            <FaGithub className="w-9 h-9" />
          </a>
          <a href="https://www.linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
            <FaLinkedin className="w-9 h-9" />
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Desenvolvido por Rebeca no Desafio 05 - Lab_AI | Instituto Joule
        </p>
      </footer>

      {/* Botão Voltar ao Topo */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-400 hover:bg-indigo-500 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          aria-label="Voltar ao topo"
        >
          <HiArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;
