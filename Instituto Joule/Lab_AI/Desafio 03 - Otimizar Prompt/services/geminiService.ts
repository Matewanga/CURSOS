
import { GoogleGenAI } from "@google/genai";

export async function generateContent(prompt: string): Promise<string> {
  // Assume process.env.API_KEY is available
  if (!process.env.API_KEY) {
    // In a real scenario, the key would be set in the environment.
    // For this interactive demo, we return a helpful message.
    return "API_KEY não configurada. Por favor, configure a variável de ambiente API_KEY para usar a API Gemini.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Erro na chamada da API Gemini:", error);
    if (error instanceof Error) {
        return `Ocorreu um erro ao chamar a API: ${error.message}`;
    }
    return "Ocorreu um erro desconhecido ao chamar a API.";
  }
}
