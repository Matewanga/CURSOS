
import React from 'react';
import { IdentifiedObject } from '../types';

interface AnalysisResultsProps {
    objects: IdentifiedObject[];
    onDescribe: (objectName: string) => void;
    objectDescription: string;
    selectedObject: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ objects, onDescribe, objectDescription, selectedObject }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full">
                <h2 className="text-2xl font-semibold text-gray-300 text-center mb-4">
                  { objectDescription ? "Descrição do Objeto" : "Objetos Identificados" }
                </h2>
                
                { !objectDescription && (
                  <>
                    <p className="text-center text-gray-400 mb-4">
                        A IA encontrou esses objetos. Clique em um para obter uma descrição.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {objects.map((obj) => (
                            <button
                                key={obj.objectName}
                                onClick={() => onDescribe(obj.objectName)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedObject === obj.objectName ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                            >
                                {obj.objectName}
                            </button>
                        ))}
                    </div>
                  </>
                )}
            </div>

            {objectDescription && (
                <div className="w-full flex flex-col items-center animate-fade-in">
                    <p className="text-center text-gray-400 mb-4">
                        Aqui está a descrição do(a) "{selectedObject}" que a IA gerou:
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg text-gray-300 w-full">
                        <p className="whitespace-pre-wrap">{objectDescription}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add fade-in animation to tailwind config if possible, or use a style tag for simplicity here.
// Since we can't add CSS files, we can add a style tag in index.html or define it here.
// As per rules, we must avoid style tags, so we'll use a simple CSS class and assume tailwind config has it.
// For this example, we'll create the keyframes and animation in tailwind.config.js conceptually.
// In the CDN version, we can rely on a basic effect or just let it appear.
// The `animate-fade-in` class is a conceptual placeholder. A simple fade-in can be achieved with transition properties on opacity if state is managed differently, but this is cleaner.
// For the purpose of this file, this is fine. The user of this file would add this to their tailwind config:
/*
keyframes: {
    fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
    },
},
animation: {
    'fade-in': 'fadeIn 0.5s ease-in-out',
},
*/
