
import { GoogleGenAI } from "@google/genai";
import { extractBase64Data } from "../utils/fileUtils";

const apiKey = process.env.API_KEY;

export const analyzeMultimodalInput = async (
  imageDataUrl: string | null,
  audioDataUrl: string | null,
  promptText: string,
  refinementPrompt?: string // Adicionado suporte para "editar" a análise
): Promise<string> => {
  if (!apiKey) throw new Error("API Key não configurada.");
  
  const ai = new GoogleGenAI({ apiKey });

  try {
    const parts: any[] = [];

    if (imageDataUrl) {
      const { mimeType, data } = extractBase64Data(imageDataUrl);
      parts.push({ inlineData: { mimeType, data } });
    }

    if (audioDataUrl) {
      const { mimeType, data } = extractBase64Data(audioDataUrl);
      parts.push({ inlineData: { mimeType, data } });
    }

    // Se houver um refinamento, enviamos ele junto com o contexto anterior
    const fullPrompt = refinementPrompt 
      ? `A análise anterior foi feita. Agora, aplique esta alteração/edição solicitada pelo usuário: "${refinementPrompt}". Mantenha a estrutura original mas ajuste o conteúdo conforme solicitado.`
      : promptText;

    parts.push({ text: fullPrompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: parts },
      config: {
        temperature: 0.5,
        systemInstruction: `
Você é o Orquestrador Multimodal do Lab AI 2025 (Instituto Joule). 
Sua missão é analisar as entradas de imagem e áudio fornecidas pelo usuário para gerar insights profundos.

DIRETRIZES:
1. Seja estritamente profissional e objetivo.
2. NUNCA mencione nomes de desenvolvedores ou pessoas específicas, trate quem interage apenas como "usuário".
3. Analise a correlação entre o que é visto e o que é ouvido.

ESTRUTURA OBRIGATÓRIA DA RESPOSTA:

# 📊 Resumo Executivo
Uma síntese de impacto sobre o que foi detectado.

# 🔍 Descobertas Visuais
Descrição detalhada do conteúdo da imagem.

# 🎙️ Análise de Áudio
Transcrição e interpretação do tom e sons captados.

# 💡 Síntese Multimodal
Como a visão e a audição se complementam neste contexto específico.
        `.trim(),
      }
    });

    return response.text || "Sem resposta da IA.";
  } catch (error: any) {
    console.error("Erro na análise:", error);
    throw new Error(error.message || "Erro desconhecido na análise.");
  }
};
