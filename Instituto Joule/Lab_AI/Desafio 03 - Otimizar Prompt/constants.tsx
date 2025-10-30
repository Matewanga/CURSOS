// FIX: Import React to bring SVGProps into scope for typing the icon components.
import React from 'react';
import { TutorialStep } from './types';

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "Passo 1: O Prompt Genérico",
    explanation: `
      <p class="mb-4">Começamos com um prompt vago e ineficaz. "Fale sobre cachorros" é muito amplo.</p>
      <p class="mb-2"><strong class="text-red-400">Problemas:</strong></p>
      <ul class="list-disc list-inside space-y-1 text-gray-400">
        <li>Falta de especificidade.</li>
        <li>Nenhum público-alvo definido.</li>
        <li>Nenhum formato de saída solicitado.</li>
      </ul>
      <p class="mt-4">O resultado é uma informação genérica, que pode não ser o que você realmente precisa.</p>
    `,
    prompt: "Fale sobre cachorros.",
  },
  {
    title: "Passo 2: Adicionando uma Persona",
    explanation: `
      <p class="mb-4">Instruir a IA a adotar uma "persona" específica define o tom e a perspectiva da resposta. Isso melhora drasticamente a relevância.</p>
      <p class="mb-2"><strong class="text-green-400">Melhoria:</strong></p>
      <p class="text-gray-400">Adicionamos <code class="bg-gray-700 rounded px-1 text-amber-400">"Aja como um veterinário..."</code>. Agora, a IA responderá com a autoridade e o conhecimento de um profissional.</p>
      <p class="mt-4">Compare como a qualidade da resposta já aumentou, focando em aspectos de saúde e cuidado.</p>
    `,
    prompt: "Aja como um veterinário e fale sobre cachorros.",
  },
  {
    title: "Passo 3: Fornecendo Contexto e Especificidade",
    explanation: `
      <p class="mb-4">Mesmo com uma persona, o tópico ainda é muito amplo. Precisamos adicionar contexto para afunilar o pedido.</p>
      <p class="mb-2"><strong class="text-green-400">Melhoria:</strong></p>
      <p class="text-gray-400">Adicionamos o contexto: <code class="bg-gray-700 rounded px-1 text-amber-400">"...para um novo dono de cachorro"</code>. Isso direciona a IA a focar nas informações mais cruciais para iniciantes.</p>
      <p class="mt-4">A resposta agora é muito mais útil e direcionada para um público específico.</p>
    `,
    prompt: "Aja como um veterinário e explique os cuidados básicos para um novo dono de cachorro.",
  },
  {
    title: "Passo 4: Definindo o Formato da Saída",
    explanation: `
      <p class="mb-4">Para tornar a informação fácil de consumir, devemos pedir um formato específico.</p>
      <p class="mb-2"><strong class="text-green-400">Melhoria:</strong></p>
      <p class="text-gray-400">Adicionamos a instrução de formato: <code class="bg-gray-700 rounded px-1 text-amber-400">"Formate a resposta como uma lista com os pontos principais..."</code>.</p>
      <p class="mt-4">A IA agora estrutura a saída de forma clara e organizada, facilitando a leitura e a aplicação das informações.</p>
    `,
    prompt: "Aja como um veterinário e explique os cuidados básicos para um novo dono de cachorro. Formate a resposta como uma lista com os pontos principais, cobrindo dieta, exercícios e saúde.",
  },
  {
    title: "Passo 5: Refinando com Tom e Restrições",
    explanation: `
      <p class="mb-4">O passo final é polir o prompt com detalhes sobre o tom desejado e quaisquer restrições.</p>
      <p class="mb-2"><strong class="text-green-400">Melhoria:</strong></p>
      <p class="text-gray-400">Adicionamos: <code class="bg-gray-700 rounded px-1 text-amber-400">"Use um tom amigável e encorajador"</code> e <code class="bg-gray-700 rounded px-1 text-amber-400">"Seja conciso"</code>.</p>
      <p class="mt-4">Agora temos um prompt otimizado! Ele informa à IA exatamente: <strong class="text-cyan-400">QUEM</strong> ela é, <strong class="text-cyan-400">O QUE</strong> deve fazer, <strong class="text-cyan-400">PARA QUEM</strong>, <strong class="text-cyan-400">COMO</strong> deve formatar, e em que <strong class="text-cyan-400">TOM</strong>.</p>
    `,
    prompt: "Aja como um veterinário e forneça um guia conciso sobre os cuidados básicos para um novo dono de cachorro. Use um tom amigável e encorajador. Formate a resposta como uma lista com os pontos principais, cobrindo dieta, exercícios e saúde.",
  },
];

export const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.993.129M12 5a3 3 0 1 0 5.993.129M12 5a3 3 0 1 1 .129 5.993M12 5a3 3 0 1 1 .129-5.993M17 12a3 3 0 1 0-5.993.129M7 12a3 3 0 1 0 5.993.129M12 19a3 3 0 1 0-5.993.129M12 19a3 3 0 1 0 5.993.129M12 19a3 3 0 1 1 .129-5.993"/><path d="M12 19a3 3 0 1 1 .129 5.993"/><path d="M12 5V2m0 10v-3m0 10v-3m-5 3H4m16 0h-3m-5-7H4m16 0h-3"/></svg>
);

export const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6-11A2 2 0 0 0 3.937 1.5L1.5 2.563a2 2 0 0 0 1.437 1.437l11 6A2 2 0 0 0 15.5 8.063l1.5-2.563a2 2 0 0 0-1.437-1.437l-6-11A2 2 0 0 0 8.063 1.5z"/><path d="M22.5 14.5a2 2 0 0 0-1.437-1.437l-6-11a2 2 0 0 0-1.437 1.437L12.063 6.5A2 2 0 0 0 14.5 8.063l6 11A2 2 0 0 0 22.063 21.5l1.5-2.563a2 2 0 0 0-1.063-2.5z"/></svg>
);

export const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A3.48 3.48 0 0 1 9 19.5a3.5 3.5 0 0 1-1-6.93V4h8v8.57A3.5 3.5 0 0 1 17 19.5a3.52 3.52 0 0 1-.99-2.29c-.02-1.05-.5-1.8-1.01-2.21V14.66"/>
      <path d="M12 12.01V4h0"/>
    </svg>
);
  
export const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 12 7-7 7 7"/>
      <path d="M12 19V5"/>
    </svg>
);