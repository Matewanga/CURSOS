
import { GoogleGenAI } from "@google/genai";
import { Scenario, Option } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeDecision = async (
  scenario: Scenario,
  choice: Option,
  justification: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Erro: Chave de API não configurada. Não é possível gerar análise.";
  }

  try {
    const prompt = `
      Você é um especialista renomado em Ética de Inteligência Artificial e Filosofia Moral.
      O usuário participou de um desafio ético e tomou uma decisão sobre o seguinte cenário:

      CENÁRIO: ${scenario.title}
      DESCRIÇÃO: ${scenario.description}
      
      A ESCOLHA DO USUÁRIO: ${choice.label} (${choice.shortDescription})
      JUSTIFICATIVA DO USUÁRIO: "${justification}"

      Sua tarefa é fornecer uma análise crítica, educativa e construtiva (máximo de 200 palavras).
      Estruture sua resposta da seguinte forma:
      1. **Feedback Imediato**: Comente sobre a validade da justificativa do usuário.
      2. **Lente Filosófica**: Identifique qual estrutura ética a escolha reflete (ex: Utilitarismo, Deontologia, Ética das Virtudes, Contratualismo). Explique brevemente o porquê.
      3. **O Contraponto**: Apresente um ponto cego ou consequência não intencional dessa escolha que o usuário pode não ter considerado.
      
      Use formatação Markdown (negrito, bullet points) para facilitar a leitura. Seja imparcial, mas provoque reflexão.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Ocorreu um erro ao tentar conectar com a IA para análise. Por favor, tente novamente.";
  }
};
