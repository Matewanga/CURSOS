export interface MediaFile {
  data: string; // Base64 string without prefix for API, or data URL for preview depending on usage context, usually we store Data URL in state
  mimeType: string;
}

export enum InputMode {
  UPLOAD = 'UPLOAD',
  CAPTURE = 'CAPTURE'
}

export interface AnalysisResult {
  text: string;
}

export interface ProcessingState {
  isLoading: boolean;
  error: string | null;
}