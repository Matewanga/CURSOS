
import React from 'react';

const Explanation: React.FC = () => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400">O Desafio: O Recomendador de Café</h2>
      <p className="text-slate-300">
        Imagine uma IA simples que precisa aprender suas preferências de café. O objetivo dela é prever se você vai gostar de um café baseado em duas características:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4 text-slate-300">
        <li><strong>Tem Açúcar?</strong> (Sim = 1, Não = 0)</li>
        <li><strong>É Forte?</strong> (Sim = 1, Não = 0)</li>
      </ul>
      <p className="text-slate-300">
        Sua preferência é simples: você gosta de café se ele <strong>tem açúcar OU é forte</strong>. Esta é uma função lógica "OU" (OR).
      </p>
      <h3 className="text-xl font-semibold text-cyan-400 pt-2">Sua Missão</h3>
      <p className="text-slate-300">
        A rede neural abaixo não sabe sua preferência. Sua tarefa é atuar como o "algoritmo de treinamento". Ajuste os <strong>"Pesos"</strong> (a força das conexões) e os <strong>"Biases"</strong> (a "vontade" de um neurônio ativar) usando os controles.
      </p>
      <p className="text-slate-300">
        Observe a tabela de "Resultados" e tente minimizar o "Erro" para todas as combinações. Quando a rede prever corretamente todos os casos, você terá a treinado com sucesso!
      </p>
    </div>
  );
};

export default Explanation;
