
import { GoogleGenAI } from "@google/genai";
import { FAQ } from '../types';

const getBotResponse = async (userQuery: string, faqs: FAQ[]): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("A chave da API do Gemini não foi configurada.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const knowledgeBase = faqs.map(faq => `Pergunta: ${faq.question}\nResposta: ${faq.answer}`).join('\n\n---\n\n');

  const systemInstruction = `
    Você é um assistente de chatbot de uma universidade. Sua única função é responder às perguntas dos usuários com base estritamente na lista de Perguntas e Respostas Frequentes (FAQ) fornecida.

    **Regras:**
    1.  Responda exclusivamente em português do Brasil.
    2.  Analise a pergunta do usuário e encontre a correspondência mais próxima na lista de FAQs.
    3.  Forneça a resposta exata da FAQ correspondente. Não adicione informações extras, opiniões ou saudações.
    4.  Se a pergunta do usuário não estiver relacionada a nenhuma das FAQs na sua base de conhecimento, você DEVE responder com: "Desculpe, não tenho informações sobre isso. Só posso responder a perguntas sobre os tópicos listados em nossa FAQ."
    5.  Não tente responder a perguntas que estão fora do escopo das FAQs fornecidas.

    **Base de Conhecimento (FAQs):**
    ${knowledgeBase}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Com base nas suas regras e na base de conhecimento, responda à seguinte pergunta do usuário: "${userQuery}"`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Lower temperature for more deterministic, fact-based answers
      }
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "Ocorreu um erro ao tentar processar sua solicitação. Por favor, tente novamente mais tarde.";
  }
};

export default getBotResponse;
