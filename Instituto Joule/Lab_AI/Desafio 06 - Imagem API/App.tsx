import React, { useState, useCallback } from 'react';
import { AppState, IdentifiedObject } from './types';
import { analyzeImageForObjects, describeObjectInImage } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResults } from './components/AnalysisResults';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';
import { Navbar } from './components/Navbar';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { HeroSection } from './components/HeroSection';


const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('initial');
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
    const [identifiedObjects, setIdentifiedObjects] = useState<IdentifiedObject[]>([]);
    const [selectedObject, setSelectedObject] = useState<string>('');
    const [objectDescription, setObjectDescription] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleImageUpload = (file: File) => {
        setOriginalImage(file);
        setOriginalImageUrl(URL.createObjectURL(file));
        setAppState('image_uploaded');
        setError('');
        setIdentifiedObjects([]);
        setObjectDescription('');
        setSelectedObject('');
    };

    const handleAnalyze = useCallback(async () => {
        if (!originalImage) return;

        setAppState('analyzing');
        setError('');

        try {
            const objects = await analyzeImageForObjects(originalImage);
            if (objects.length === 0) {
              setError("A IA não conseguiu identificar objetos distintos. Tente uma imagem diferente.");
              setAppState('error');
            } else {
              setIdentifiedObjects(objects);
              setAppState('analyzed');
            }
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao analisar a imagem. Por favor, tente novamente.');
            setAppState('error');
        }
    }, [originalImage]);

    const handleDescribe = useCallback(async (objectName: string) => {
        if (!originalImage) return;
        
        setSelectedObject(objectName);
        setAppState('describing');
        setError('');

        try {
            const description = await describeObjectInImage(originalImage, objectName);
            setObjectDescription(description);
            setAppState('described');
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao descrever o objeto. Por favor, tente novamente.');
            setAppState('error');
        }
    }, [originalImage]);
    
    const handleReset = () => {
        setAppState('initial');
        setOriginalImage(null);
        setOriginalImageUrl('');
        setIdentifiedObjects([]);
        setObjectDescription('');
        setSelectedObject('');
        setError('');
    };

    const handleBackToAnalysis = () => {
        setAppState('analyzed');
        setObjectDescription('');
        setSelectedObject('');
        setError('');
    };

    return (
        <div className="min-h-screen text-gray-100 flex flex-col font-sans relative">
            <div className="absolute top-0 inset-x-0 h-[700px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent -z-10" />
            <Navbar />
            <main className="flex-grow">
                <HeroSection />

                <section id="challenge-section" className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Teste a IA</h2>
                        <p className="text-gray-400 text-center mt-2 mb-8 max-w-2xl mx-auto">
                            Suba uma imagem para ver como a Inteligência Artificial "enxerga", identificando e descrevendo objetos.
                        </p>

                        {appState === 'initial' && <ImageUploader onImageUpload={handleImageUpload} />}

                        {(appState !== 'initial' || error) && (
                            <div className="w-full max-w-7xl mt-12">
                                {error && (
                                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
                                        <strong className="font-bold">Erro: </strong>
                                        <span className="block sm:inline">{error}</span>
                                    </div>
                                )}
                                
                                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        <div className="flex flex-col items-center md:sticky md:top-24">
                                            <h2 className="text-2xl font-semibold mb-4 text-gray-300">Sua Imagem</h2>
                                            {originalImageUrl && (
                                                <img src={originalImageUrl} alt="Enviado pelo usuário" className="rounded-lg shadow-lg max-h-96 w-auto" />
                                            )}
                                            {(appState === 'image_uploaded' || (appState === 'error' && originalImage)) && (
                                                <button 
                                                    onClick={handleAnalyze} 
                                                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 transform hover:scale-105 shadow-lg">
                                                    Analisar Imagem
                                                </button>
                                            )}
                                        </div>
                                    
                                        <div className="flex flex-col items-center min-h-[32rem]">
                                            {appState === 'analyzing' && <div className="flex flex-col items-center justify-center h-full"><Spinner /><p className="mt-4 text-lg">Analisando objetos...</p></div>}
                                            {appState === 'describing' && <div className="flex flex-col items-center justify-center h-full"><Spinner /><p className="mt-4 text-lg">Descrevendo "{selectedObject}"...</p></div>}
                                            
                                            {(appState === 'analyzed' || appState === 'described' || (appState === 'error' && identifiedObjects.length > 0)) && (
                                                <AnalysisResults 
                                                    objects={identifiedObjects}
                                                    onDescribe={handleDescribe}
                                                    objectDescription={objectDescription}
                                                    selectedObject={selectedObject}
                                                />
                                            )}
                                            {(appState === 'image_uploaded' || (appState === 'error' && !identifiedObjects.length)) && (
                                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                                    <p>Clique em "Analisar Imagem" para que a IA identifique os objetos.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {(appState !== 'initial' && appState !== 'analyzing' && appState !== 'describing') && (
                                        <div className="text-center mt-8 flex justify-center items-center flex-wrap gap-4">
                                            {appState === 'described' && (
                                                <button
                                                    onClick={handleBackToAnalysis}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 transform hover:scale-105 shadow-lg"
                                                >
                                                    Analisar Outro Objeto
                                                </button>
                                            )}
                                            <button
                                                onClick={handleReset}
                                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                                            >
                                                Começar de Novo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default App;