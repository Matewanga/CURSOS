import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { IdeaInput } from './components/IdeaInput';
import { PitchDisplay } from './components/PitchDisplay';
import { LogoDisplay } from './components/LogoDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generatePitchAndLogo, editLogoDescription, updatePitchScript } from './services/geminiService';
import { LogoDetailModal } from './components/ImageModal';
import { ArrowUpIcon } from './components/Icons'; // 👈 adicionado

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

    // 👇 Estado para botão "Voltar ao Topo"
    const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

    // 👇 Efeito que mostra/esconde botão baseado na rolagem
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) setShowScrollToTop(true);
            else setShowScrollToTop(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 👇 Função para rolar ao topo
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

            // 👇 rola para o topo após gerar conteúdo
            window.scrollTo({ top: 0, behavior: 'smooth' });

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
            setSelectedLogoDescription(newDescription); 
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
                        {/* GitHub SVG */}
                    </a>
                    <a href="https://linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-400 hover:text-white transition-colors">
                        {/* LinkedIn SVG */}
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

            {/* 👇 Botão "Voltar ao Topo" */}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
                    aria-label="Voltar ao topo"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default App;
