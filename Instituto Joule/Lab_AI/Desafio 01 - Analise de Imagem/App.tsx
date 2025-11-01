import React, { useState, useCallback, useEffect } from "react";
import { analyzeImage } from "./services/geminiService";
import Spinner from "./components/Spinner";
import {
  ImageIcon,
  UploadIcon,
  SparklesIcon,
  XCircleIcon,
  GithubIcon,
  LinkedinIcon,
  ArrowUpIcon,
} from "./components/Icons";

const App: React.FC = () => {
  // Estados principais
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Controle do botão "voltar ao topo"
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  useEffect(() => {
    const checkScrollTop = () => setShowScrollToTop(window.scrollY > 300);
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Atualiza a prévia da imagem
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("O arquivo é muito grande. O limite é 4MB.");
        return;
      }
      setError("");
      setAnalysis("");
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Limpa a imagem atual
  const handleClear = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysis("");
    setError("");
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }, []);

  // Faz a análise da imagem com IA
  const handleAnalyze = async () => {
    if (!imageFile) {
      setError("Por favor, selecione uma imagem primeiro.");
      return;
    }
    setIsLoading(true);
    setError("");
    setAnalysis("");

    try {
      const result = await analyzeImage(imageFile);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Erro desconhecido.";
      setError(`Falha ao analisar a imagem: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col font-sans">
      {/* 🌐 NAVBAR */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO + NOME */}
          <div className="flex items-center space-x-3">
            <img
              src="/img/logo.png" // 🖼️ coloque sua imagem de logo na pasta public e nomeie como "logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-indigo-400 tracking-wide">
              IA Analisadora
            </h1>
          </div>

          {/* LINKS */}
          <div className="hidden md:flex space-x-6">
            <a href="#inicio" className="hover:text-indigo-400 transition-colors">
              Início
            </a>
            <a href="#analisador" className="hover:text-indigo-400 transition-colors">
              Analisador
            </a>
            <a href="#contato" className="hover:text-indigo-400 transition-colors">
              Contato
            </a>
          </div>
        </div>
      </nav>

      {/* 🌟 SEÇÃO INICIAL */}
      <section
        id="inicio"
        className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-indigo-400 mb-4">
          Bem-vindo ao Analisador de Imagens com IA
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Este projeto faz parte do <span className="text-indigo-400 font-semibold">Desafio 01</span> do curso <span className="text-indigo-400 font-semibold">Lab_AI</span> do Instituto Joule.  
          Aqui você pode analisar imagens com o poder da Inteligência Artificial.
        </p>
        <a
          href="#analisador"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
          Iniciar
        </a>
      </section>

      {/* 🔍 SEÇÃO DO ANALISADOR */}
      <main
  id="analisador"
  className="min-h-[90vh] flex flex-col items-center justify-center container mx-auto px-4 md:px-8 py-20"

      >
        <div className="w-full max-w-5xl bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Upload e Preview da Imagem */}
            <div className="flex flex-col items-center justify-start space-y-4">
              <label
                htmlFor="file-upload"
                className={`relative w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center cursor-pointer transition-all duration-300 overflow-hidden ${
                  imagePreview
                    ? "border-indigo-500"
                    : "border-slate-600 hover:border-indigo-500 hover:bg-slate-700/50"
                }`}
              >
                {imagePreview ? (
                  <>
                    {/* Imagem agora fica no TOPO */}
                    <div className="w-full h-full flex flex-col items-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-contain rounded-t-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleClear();
                        }}
                        className="absolute top-2 right-2 bg-slate-900/70 rounded-full p-1.5 text-slate-300 hover:text-white hover:bg-red-500/80 transition-all"
                        aria-label="Limpar imagem"
                      >
                        <XCircleIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center text-slate-400 h-full">
                    <UploadIcon className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Clique para fazer upload</p>
                    <p className="text-xs">ou arraste e solte</p>
                    <p className="text-xs mt-2">PNG, JPG, WEBP (máx. 4MB)</p>
                  </div>
                )}
              </label>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
              />

              <button
                onClick={handleAnalyze}
                disabled={!imageFile || isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Analisando...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Analisar Imagem
                  </>
                )}
              </button>
            </div>

            {/* Resultado da Análise */}
            <div className="flex flex-col bg-slate-900/70 rounded-lg p-6 min-h-[256px] border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                <ImageIcon className="w-6 h-6" />
                Análise da IA
              </h2>

              {error && (
                <div className="flex-grow flex flex-col items-center justify-center text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                  <XCircleIcon className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Erro</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {!error && isLoading && (
                <div className="flex-grow flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Spinner className="w-10 h-10" />
                    <p className="mt-2">Processando a imagem...</p>
                  </div>
                </div>
              )}

              {!error && !isLoading && !analysis && (
                <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-500">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                  <p>A análise da sua imagem aparecerá aqui.</p>
                </div>
              )}

              {!error && !isLoading && analysis && (
                <div className="flex-grow overflow-y-auto pr-2">
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {analysis}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 📩 FOOTER MELHORADO */}
      <footer
        id="contato"
        className="text-center p-6 border-t border-gray-800 bg-gradient-to-t from-black via-slate-900 to-black"
      >
        <div className="flex justify-center items-center gap-5 mb-3">
          <a
            href="https://github.com/matewanga"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            <GithubIcon className="w-9 h-9" />
          </a>
          <a
            href="https://www.linkedin.com/in/matewanga"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            <LinkedinIcon className="w-9 h-9" />
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Desenvolvido por Rebeca no Desafio 01 - Lab_AI | Instituto Joule
        </p>
      </footer>

      {/* 🔝 Botão Voltar ao Topo */}
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
