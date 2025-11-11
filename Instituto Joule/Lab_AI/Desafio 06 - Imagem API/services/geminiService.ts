import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";
import { IdentifiedObject } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

export const analyzeImageForObjects = async (imageFile: File): Promise<IdentifiedObject[]> => {
    const imagePart = await fileToGenerativePart(imageFile);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { text: "Identifique os 5 objetos distintos mais proeminentes nesta imagem. Não identifique pessoas. Descreva cada objeto com uma frase nominal curta." },
                imagePart
            ],
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    objects: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                objectName: {
                                    type: Type.STRING,
                                    description: "Uma frase nominal curta descrevendo o objeto, por exemplo, 'carro esportivo vermelho' ou 'gato branco fofo'."
                                }
                            },
                            required: ["objectName"]
                        }
                    }
                },
                required: ["objects"]
            }
        }
    });

    const parsed = JSON.parse(response.text);
    return parsed.objects || [];
};

export const describeObjectInImage = async (imageFile: File, objectName: string): Promise<string> => {
    const imagePart = await fileToGenerativePart(imageFile);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { text: `A partir da imagem a seguir, descreva o objeto "${objectName}" em detalhes em um único parágrafo. Concentre-se em sua aparência, condição e contexto dentro da imagem.` },
                imagePart,
            ],
        },
    });

    return response.text;
};