import React, { useState, useRef } from 'react';
import { Mic, Upload, X, StopCircle, PlayCircle, Radio } from 'lucide-react';
import { blobToBase64, fileToBase64 } from '../utils/fileUtils';

interface AudioInputProps {
  onAudioSelected: (dataUrl: string | null) => void;
  selectedAudio: string | null;
}

export const AudioInput: React.FC<AudioInputProps> = ({ onAudioSelected, selectedAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const base64 = await blobToBase64(blob);
        onAudioSelected(base64);
        
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Não foi possível acessar o microfone. Verifique as permissões.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await fileToBase64(file);
        onAudioSelected(base64);
      } catch (err) {
        console.error("Error reading file", err);
      }
    }
  };

  const clearAudio = () => {
    onAudioSelected(null);
    setIsRecording(false);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-brand-500" />
          Entrada de Áudio
        </h3>
        {selectedAudio && (
          <button onClick={clearAudio} className="text-slate-400 hover:text-red-400 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 hover:border-slate-600 transition-colors relative overflow-hidden">
        
        {selectedAudio ? (
           <div className="flex flex-col items-center gap-4 w-full px-6">
             <div className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center text-brand-400 mb-2">
                <PlayCircle size={32} />
             </div>
             <audio controls src={selectedAudio} className="w-full" />
             <p className="text-xs text-slate-500">Áudio pronto para análise</p>
           </div>
        ) : isRecording ? (
          <div className="flex flex-col items-center gap-6 animate-pulse">
             <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500">
                <Mic size={32} className="text-red-500" />
             </div>
             <p className="text-red-400 font-medium">Gravando...</p>
             <button 
               onClick={stopRecording}
               className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 transition shadow-lg"
             >
               <StopCircle size={20} />
               Parar Gravação
             </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-8">
            <p className="text-slate-400 text-center mb-2">Grave um áudio ou faça upload</p>
            <div className="flex gap-3">
              <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Upload size={18} />
                Upload
                <input type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
              </label>
              <button 
                onClick={startRecording}
                className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <Mic size={18} />
                Gravar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};