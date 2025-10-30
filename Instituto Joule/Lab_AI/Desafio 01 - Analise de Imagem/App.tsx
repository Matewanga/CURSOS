import React, { useState, useCallback, useEffect } from 'react';
import { analyzeImage } from './services/geminiService';
import Header from './components/Header';
import Spinner from './components/Spinner';
import { 
  ImageIcon, 
  UploadIcon, 
  SparklesIcon, 
  XCircleIcon, 
  GithubIcon, 
  LinkedinIcon, 
  ArrowUpIcon // 👈 adicionado aqui
} from './components/Icons';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 👇 Estado para o botão "Voltar ao Topo"
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  // 👇 Efeito para monitorar rolagem
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 300) setShowScrollToTop(true);
      else setShowScrollToTop(false);
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  // 👇 Função para rolar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
          setError('O arquivo é muito grande. O limite é 4MB.');
          return;
      }

      setError('');
      setAnalysis('');
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClear = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysis('');
    setError('');
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }, []);

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError('Por favor, selecione uma imagem primeiro.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const result = await analyzeImage(imageFile);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      const errorMessage = (e instanceof Error) ? e.message : 'Um erro desconhecido ocorreu.';
      setError(`Falha ao analisar a imagem. Verifique o console para mais detalhes. Erro: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Upload and Preview */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <label
                htmlFor="file-upload"
                className={`relative w-full h-64 md:h-full min-h-[256px] border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
                  imagePreview ? 'border-indigo-500' : 'border-slate-600 hover:border-indigo-500 hover:bg-slate-700/50'
                }`}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    <button
                      onClick={(e) => { e.preventDefault(); handleClear(); }}
                      className="absolute top-2 right-2 bg-slate-900/70 rounded-full p-1.5 text-slate-300 hover:text-white hover:bg-red-500/80 transition-all"
                      aria-label="Limpar imagem"
                    >
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <div className="text-center text-slate-400">
                    <UploadIcon className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Clique para fazer upload</p>
                    <p className="text-xs">ou arraste e solte</p>
                    <p className="text-xs mt-2">PNG, JPG, WEBP (máx. 4MB)</p>
                  </div>
                )}
              </label>
              <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
              
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

            {/* Analysis Result */}
            <div className="flex flex-col bg-slate-900/70 rounded-lg p-6 min-h-[256px] border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                <ImageIcon className="w-6 h-6"/>
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
                  <ImageIcon className="w-12 h-12 mx-auto mb-2"/>
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

      <footer className="text-center p-4 text-slate-500 text-sm">
        <div className="flex justify-center items-center gap-4 mb-2">
            <a href="https://github.com/matewanga" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-slate-300 transition-colors">
                <GithubIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/matewanga" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="hover:text-slate-300 transition-colors">
                <LinkedinIcon className="w-6 h-6" />
            </a>
        </div>
        <p>Desenvolvido com React, Tailwind CSS, e Gemini API.</p>
      </footer>

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
