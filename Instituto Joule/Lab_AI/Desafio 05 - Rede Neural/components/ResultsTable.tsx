
import React from 'react';
import { Activations, TrainingSample } from '../types';

interface ResultsTableProps {
  trainingData: TrainingSample[];
  predictions: (Activations & { error: number })[];
  isTrained: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ trainingData, predictions, isTrained }) => {

  const getHint = (error: number, target: number) => {
    if (Math.abs(error) < 0.2) return <span className="text-green-400">Correto!</span>;
    if (error > 0.2) { // output is too low
      return <span className="text-yellow-400">Saída muito baixa.</span>
    } else { // error is < -0.2, output is too high
      return <span className="text-orange-400">Saída muito alta.</span>
    }
  }
  
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Resultados</h2>
        {isTrained && (
           <div className="px-4 py-2 rounded-md bg-green-500/20 text-green-300 font-semibold text-sm animate-pulse">
             REDE TREINADA!
           </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="p-2">Açúcar</th>
              <th className="p-2">Forte</th>
              <th className="p-2">Deveria Gostar (Alvo)</th>
              <th className="p-2">Previsão da IA</th>
              <th className="p-2">Erro</th>
              <th className="p-2">Dica</th>
            </tr>
          </thead>
          <tbody>
            {trainingData.map((sample, index) => {
              const prediction = predictions[index];
              const error = prediction.error;
              const output = prediction.output;
              const isCorrect = Math.abs(error) < 0.2;

              return (
                <tr key={index} className={`border-b border-slate-800 ${isCorrect ? 'text-slate-300' : 'text-white font-medium'}`}>
                  <td className="p-2 font-mono">{sample.inputs[0]}</td>
                  <td className="p-2 font-mono">{sample.inputs[1]}</td>
                  <td className="p-2 font-mono text-cyan-300">{sample.target}</td>
                  <td className={`p-2 font-mono ${isCorrect ? 'text-green-400' : 'text-yellow-400'}`}>{output.toFixed(3)}</td>
                  <td className={`p-2 font-mono ${isCorrect ? 'text-slate-500' : 'text-red-400'}`}>{error.toFixed(3)}</td>
                  <td className="p-2 text-xs">{getHint(error, sample.target)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
