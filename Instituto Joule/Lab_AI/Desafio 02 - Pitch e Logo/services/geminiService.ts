import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generatePitchAndLogo = async (idea: string, logoPrompts: string[]): Promise<{ pitch: string; logoDescriptions: string[] }> => {
    try {
        const pitchPromise = generatePitchScript(idea);
        const logoPromise = generateLogoDescriptions(idea, logoPrompts);

        const [pitch, logoDescriptions] = await Promise.all([pitchPromise, logoPromise]);
        
        return { pitch, logoDescriptions };

    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content from API.");
    }
};

const generatePitchScript = async (idea: string): Promise<string> => {
    const prompt = `
        Você é um mentor especialista em startups e capital de risco.
        Com base na seguinte ideia de negócio, gere um roteiro de pitch convincente e estruturado.
        O roteiro deve ser adequado para uma apresentação de 3 minutos para investidores.
        Estruture o pitch com as seguintes seções, usando markdown para formatação (títulos, negrito, listas):

        ## O Gancho (Introdução)
        ## O Problema
        ## A Solução
        ## Oportunidade de Mercado
        ## Modelo de Negócios
        ## A Equipe
        ## O Pedido (The Ask)

        A ideia de negócio é: "${idea}"
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });

    return response.text;
};

const generateLogoDescriptions = async (idea: string, prompts: string[]): Promise<string[]> => {
    const defaultPrompts = [
        'Um conceito de logo minimalista, usando formas geométricas básicas ou uma única linha contínua.',
        'Um conceito de logo equilibrado, com um nível médio de detalhes, talvez combinando um símbolo reconhecível com um toque de complexidade.',
        'Um conceito de logo mais ilustrativo ou emblemático, com mais elementos, mas ainda profissional.'
    ];

    const generationPromises = prompts.map((prompt, index) => {
        const finalPrompt = `
            Você é um designer de marcas especialista.
            Descreva em um parágrafo conciso (3 a 4 frases) um conceito visual para um logo de uma startup com a seguinte ideia de negócio: "${idea}".
            A direção criativa específica para este logo é: "${prompt || defaultPrompts[index]}".
            A descrição deve ser puramente visual, focando em formas, cores, tipografia e o sentimento geral que o logo deve evocar.
            Seja criativo e inspirador, descrevendo algo que um designer gráfico possa usar como briefing.
        `;
        return ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: finalPrompt,
        });
    });

    const responses = await Promise.all(generationPromises);
    const descriptions = responses.map(response => response.text);
    return descriptions;
};


export const editLogoDescription = async (currentDescription: string, feedback: string): Promise<string> => {
    const prompt = `
        Você é um designer de marcas especialista. A descrição de um conceito de logo é a seguinte:
        --- DESCRIÇÃO ATUAL ---
        ${currentDescription}
        --- FIM DA DESCRIÇÃO ATUAL ---

        Agora, por favor, revise e melhore esta descrição com base no seguinte feedback, mantendo o formato de um parágrafo conciso.
        
        Feedback do usuário: "${feedback}"
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
};

export const updatePitchScript = async (currentScript: string, feedback: string): Promise<string> => {
    const prompt = `
        Você é um mentor de startups. O roteiro de pitch a seguir foi gerado:
        --- SCRIPT ATUAL ---
        ${currentScript}
        --- FIM DO SCRIPT ATUAL ---

        Agora, por favor, revise e melhore este roteiro com base no seguinte feedback. Mantenha a mesma estrutura de markdown (títulos, etc.).
        
        Feedback do usuário: "${feedback}"
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });

    return response.text;
};
