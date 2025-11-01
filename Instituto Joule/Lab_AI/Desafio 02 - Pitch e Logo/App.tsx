import React, { useState, useCallback } from "react";
import { Header } from "./components/Header";
import { IdeaInput } from "./components/IdeaInput";
import { PitchDisplay } from "./components/PitchDisplay";
import { LogoDisplay } from "./components/LogoDisplay";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import logo from './img/logo.png'; // ajuste o caminho relativo ao seu arquivo
import {
  generatePitchAndLogo,
  editLogoDescription,
  updatePitchScript,
} from "./services/geminiService";
import { LogoDetailModal } from "./components/ImageModal";
import { ScrollToTopButton } from "./components/ScrollToTopButton";

const App: React.FC = () => {
  const [businessIdea, setBusinessIdea] = useState<string>("");
  const [logoPrompts, setLogoPrompts] = useState<string[]>(["", "", ""]);
  const [pitchScript, setPitchScript] = useState<string>("");
  const [logoDescriptions, setLogoDescriptions] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdatingLogo, setIsUpdatingLogo] = useState<boolean>(false);
  const [isUpdatingPitch, setIsUpdatingPitch] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [selectedLogoDescription, setSelectedLogoDescription] =
    useState<string | null>(null);
  const [logoToUpdateIndex, setLogoToUpdateIndex] = useState<number | null>(
    null
  );

  const handleLogoPromptChange = (index: number, value: string) => {
    const newPrompts = [...logoPrompts];
    newPrompts[index] = value;
    setLogoPrompts(newPrompts);
  };

  const handleSubmit = useCallback(async () => {
    if (!businessIdea.trim()) {
      setError("Por favor, insira sua ideia de negócio.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPitchScript("");
    setLogoDescriptions([]);

    try {
      const { pitch, logoDescriptions } = await generatePitchAndLogo(
        businessIdea,
        logoPrompts
      );
      setPitchScript(pitch);
      setLogoDescriptions(logoDescriptions);
    } catch (err) {
      setError("Ocorreu um erro ao gerar o conteúdo. Por favor, tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [businessIdea, logoPrompts]);

  const handleUpdateLogoDescription = async (feedback: string) => {
    if (!selectedLogoDescription || logoToUpdateIndex === null || !feedback.trim())
      return;

    setIsUpdatingLogo(true);
    setError(null);

    try {
      const newDescription = await editLogoDescription(
        selectedLogoDescription,
        feedback
      );
      const updatedDescriptions = [...logoDescriptions];
      updatedDescriptions[logoToUpdateIndex] = newDescription;

      setLogoDescriptions(updatedDescriptions);
      setSelectedLogoDescription(newDescription);
    } catch (err) {
      setError("Falha ao atualizar o conceito do logo. Por favor, tente novamente.");
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
      setError("Falha ao atualizar o pitch. Por favor, tente novamente.");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col font-sans">
      {/* 🌐 Navbar */}
<nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
          <img
  src={logo}
  alt="Logo"
  className="w-10 h-10 rounded-full"
/>
            <h1 className="text-2xl font-bold text-indigo-400">Pitch Perfect AI</h1>
          </div>

          <div className="hidden md:flex gap-6 text-gray-300">
            <a href="#inicio" className="hover:text-indigo-400 transition">Início</a>
            <a href="#gerador" className="hover:text-indigo-400 transition">Gerador</a>
            <a href="#contato" className="hover:text-indigo-400 transition">Contato</a>
          </div>
        </div>
      </nav>

      {/* 🧠 Hero */}
      <section
        id="inicio"
        className="h-screen flex flex-col justify-center items-center text-center px-6 mt-16 bg-gradient-to-b from-gray-900/90 to-black"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-indigo-400 mb-6">
          Bem-vindo ao Pitch Perfect AI
        </h2>
        <p className="text-gray-300 max-w-2xl text-lg md:text-xl mb-8">
          Este site foi desenvolvido como o <strong>Desafio 02</strong> do curso{" "}
          <strong>Lab_AI</strong> do Instituto Joule.
          Gere um <span className="text-indigo-400 font-semibold">pitch e logotipo inteligentes</span> com ajuda da IA.
        </p>
        <a
          href="#gerador"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105"
        >
          Começar agora
        </a>
      </section>

      {/* ⚙️ Analisador / Gerador */}
      <main
        id="gerador"
        className="flex-grow flex flex-col justify-center items-center container mx-auto px-4 md:px-8 py-24"
      >
        <div className="w-full max-w-6xl bg-gray-800/60 border border-indigo-700/40 shadow-[0_0_30px_rgba(79,70,229,0.3)] rounded-3xl p-10 md:p-14 transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]">
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
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {pitchScript && (
                <PitchDisplay
                  script={pitchScript}
                  onUpdate={handleUpdatePitch}
                  isUpdating={isUpdatingPitch}
                />
              )}
              {logoDescriptions.length > 0 && (
                <LogoDisplay
                  descriptions={logoDescriptions}
                  onDescriptionClick={openModal}
                />
              )}
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

      {/* ⚓ Footer */}
<footer
  id="contato"
  className="text-center p-8 border-t border-gray-800 bg-black/80 text-gray-400 text-sm"
>
  <div className="flex justify-center items-center gap-8 mb-4">
    <a
      href="https://github.com/matewanga"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub Profile"
      className="transition-transform hover:scale-125"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-9 h-9 text-gray-200 hover:text-white transition-colors duration-300"
      >
        <path
          fill="currentColor"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483
          0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.46-1.11-1.46-.908-.621.069-.608.069-.608
          1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338
          -2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.272.098-2.65
          0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.5.337c1.91-1.295 2.75-1.026 2.75-1.026
          .545 1.378.201 2.397.098 2.65.64.698 1.03 1.591 1.03 2.682
          0 3.842-2.337 4.687-4.565 4.935.36.309.68.919.68 1.852
          0 1.337-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.013 10.013 0 0022 12
          c0-5.523-4.477-10-10-10z"
        />
      </svg>
    </a>
    <a
      href="https://linkedin.com/in/matewanga"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn Profile"
      className="transition-transform hover:scale-125"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8 text-gray-200 hover:text-white transition-colors duration-300"
      >
        <path
          fill="currentColor"
          d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761
          2.239 5 5 5h14c2.761 0 5-2.239 5-5V5
          c0-2.761-2.239-5-5-5zM7.119 20.452H3.56V9h3.559v11.452zM5.34
          7.433a2.062 2.062 0 110-4.125 2.062 2.062 0 010 4.125zM20.452
          20.452h-3.559v-5.604c0-1.337-.026-3.059-1.865-3.059-1.868
          0-2.154 1.46-2.154 2.967v5.696h-3.559V9h3.418v1.561h.049c.477-.9
          1.637-1.85 3.368-1.85 3.6 0 4.268 2.369 4.268 5.448v6.293z"
        />
      </svg>
    </a>
  </div>
  <p className="text-gray-500">
    © 2025 Desenvolvido por Rebeca no <strong>Desafio 02</strong> - Lab_AI | Instituto Joule
  </p>
</footer>


      {selectedLogoDescription && (
        <LogoDetailModal
          description={selectedLogoDescription}
          onClose={() => setSelectedLogoDescription(null)}
          onUpdate={handleUpdateLogoDescription}
          isUpdating={isUpdatingLogo}
        />
      )}

      <ScrollToTopButton />
    </div>
  );
};

export default App;
