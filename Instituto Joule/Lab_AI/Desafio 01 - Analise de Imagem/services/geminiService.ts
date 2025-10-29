
import { GoogleGenAI } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('Failed to read file as data URL.'));
      }
      resolve(reader.result.split(',')[1]);
    }
    reader.onerror = (error) => reject(error);
  });
};

export const analyzeImage = async (imageFile: File): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const base64Data = await fileToBase64(imageFile);

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: imageFile.type,
    },
  };

  const textPart = {
    text: "Você é um especialista em análise de imagens. Identifique tudo que está nesta imagem em detalhes. Descreva os objetos, o cenário, as pessoas (se houver, com atenção à privacidade e sem tentar identificá-las), as cores predominantes e quaisquer ações ou emoções que você perceba. Forneça uma análise completa, estruturada e perceptiva do que a imagem representa, como se estivesse descrevendo para alguém que não pode vê-la. Organize sua resposta em parágrafos claros."
  };
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] }
    });

    return response.text;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("A comunicação com o serviço de IA falhou.");
  }
};
