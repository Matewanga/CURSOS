import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IdeaInput } from './components/IdeaInput';
import { PitchDisplay } from './components/PitchDisplay';
import { LogoDisplay } from './components/LogoDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generatePitchAndLogo, editLogoDescription, updatePitchScript } from './services/geminiService';
import { LogoDetailModal } from './components/ImageModal';

const App: React.FC = () => {
    const [businessIdea, setBusinessIdea] = useState<string>('');
    const [logoPrompts, setLogoPrompts] = useState<string[]>(['', '', '']);
    const [pitchScript, setPitchScript] = useState<string>('');
    const [logoDescriptions, setLogoDescriptions] = useState<string[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdatingLogo, setIsUpdatingLogo] = useState<boolean>(false);
    const [isUpdatingPitch, setIsUpdatingPitch] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);
    
    const [selectedLogoDescription, setSelectedLogoDescription] = useState<string | null>(null);
    const [logoToUpdateIndex, setLogoToUpdateIndex] = useState<number | null>(null);

    const handleLogoPromptChange = (index: number, value: string) => {
        const newPrompts = [...logoPrompts];
        newPrompts[index] = value;
        setLogoPrompts(newPrompts);
    };

    const handleSubmit = useCallback(async () => {
        if (!businessIdea.trim()) {
            setError('Por favor, insira sua ideia de negócio.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setPitchScript('');
        setLogoDescriptions([]);

        try {
            const { pitch, logoDescriptions } = await generatePitchAndLogo(businessIdea, logoPrompts);
            setPitchScript(pitch);
            setLogoDescriptions(logoDescriptions);
        } catch (err) {
            setError('Ocorreu um erro ao gerar o conteúdo. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [businessIdea, logoPrompts]);

    const handleUpdateLogoDescription = async (feedback: string) => {
        if (!selectedLogoDescription || logoToUpdateIndex === null || !feedback.trim()) return;

        setIsUpdatingLogo(true);
        setError(null);

        try {
            const newDescription = await editLogoDescription(selectedLogoDescription, feedback);
            const updatedDescriptions = [...logoDescriptions];
            updatedDescriptions[logoToUpdateIndex] = newDescription;
            
            setLogoDescriptions(updatedDescriptions);
            setSelectedLogoDescription(newDescription); // Show the new description in the modal
        } catch (err) {
            setError('Falha ao atualizar o conceito do logo. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setIsUpdatingLogo(false);
        }
    };

    const handleUpdatePitch = async (currentScript: string, feedback: string) => {
        if (!feedback.trim()) return;

        setIsUpdatingPitch(true);
        setError(null);

        try {
            const newPitch = await updatePitchScript(currentScript, feedback);
            setPitchScript(newPitch);
        } catch (err) {
            setError('Falha ao atualizar o pitch. Por favor, tente novamente.');
             console.error(err);
        } finally {
            setIsUpdatingPitch(false);
        }
    };

    const openModal = (description: string, index: number) => {
        setSelectedLogoDescription(description);
        setLogoToUpdateIndex(index);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
            <Header />
            <main className="container mx-auto p-4 md:p-8 flex-grow">
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10">
                    <IdeaInput
                        value={businessIdea}
                        onChange={(e) => setBusinessIdea(e.target.value)}
                        logoPrompts={logoPrompts}
                        onLogoPromptChange={handleLogoPromptChange}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />

                    {error && <ErrorMessage message={error} />}

                    {isLoading && <LoadingSpinner />}
                    
                    {!isLoading && (pitchScript || logoDescriptions.length > 0) && (
                         <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {pitchScript && <PitchDisplay script={pitchScript} onUpdate={handleUpdatePitch} isUpdating={isUpdatingPitch} />}
                            {logoDescriptions.length > 0 && <LogoDisplay descriptions={logoDescriptions} onDescriptionClick={openModal} />}
                        </div>
                    )}

                    {!isLoading && !pitchScript && logoDescriptions.length === 0 && (
                        <div className="text-center mt-16 text-gray-500">
                             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 21v-1m-4.636-2.636l.707-.707" />
                            </svg>
                            <h3 className="mt-4 text-xl font-semibold">Seu pitch e logo aparecerão aqui</h3>
                            <p className="mt-1 text-gray-400">Conte-nos sua ideia para começar.</p>
                        </div>
                    )}
                </div>
            </main>
             <footer className="text-center p-6 text-gray-500 text-sm space-y-3">
                <div className="flex justify-center items-center space-x-6">
                    <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-400 hover:text-white transition-colors">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="https://linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-400 hover:text-white transition-colors">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                           <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>
                <p>Powered by Gemini AI</p>
            </footer>

            {selectedLogoDescription && (
                <LogoDetailModal 
                    description={selectedLogoDescription} 
                    onClose={() => setSelectedLogoDescription(null)}
                    onUpdate={handleUpdateLogoDescription}
                    isUpdating={isUpdatingLogo}
                />
            )}
        </div>
    );
};

export default App;
