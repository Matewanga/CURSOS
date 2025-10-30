
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export type AppMode = 'build' | 'simulate';
