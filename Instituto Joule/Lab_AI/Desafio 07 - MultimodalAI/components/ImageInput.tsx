import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { InputMode } from '../types';
import { fileToBase64 } from '../utils/fileUtils';

interface ImageInputProps {
  onImageSelected: (dataUrl: string | null) => void;
  selectedImage: string | null;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onImageSelected, selectedImage }) => {
  const [mode, setMode] = useState<InputMode>(InputMode.UPLOAD);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setMode(InputMode.CAPTURE);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Não foi possível acessar a câmera.");
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onImageSelected(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await fileToBase64(file);
        onImageSelected(base64);
      } catch (err) {
        console.error("Error reading file", err);
      }
    }
  };

  const clearImage = () => {
    onImageSelected(null);
    if (isCameraActive) stopCamera();
    setMode(InputMode.UPLOAD);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand-500" />
          Entrada Visual
        </h3>
        {selectedImage && (
          <button onClick={clearImage} className="text-slate-400 hover:text-red-400 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] bg-slate-900 rounded-lg overflow-hidden relative border-2 border-dashed border-slate-700 hover:border-slate-600 transition-colors">
        
        {/* Preview State */}
        {selectedImage ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-[300px] object-contain" />
          </div>
        ) : isCameraActive ? (
          // Camera Active State
          <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="max-h-[300px] w-auto" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-4 flex gap-4">
              <button 
                onClick={takePhoto}
                className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition"
              >
                <Camera size={24} />
              </button>
              <button 
                onClick={stopCamera}
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center gap-4 p-8">
            <p className="text-slate-400 text-center mb-2">Carregue uma imagem ou use a câmera</p>
            <div className="flex gap-3">
              <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Upload size={18} />
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
              <button 
                onClick={startCamera}
                className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <Camera size={18} />
                Câmera
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};