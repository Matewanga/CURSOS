
export interface TrainingSample {
  inputs: [number, number];
  target: number;
  description: string;
}

export type WeightKeys = 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | 'w6';
export type BiasKeys = 'b1' | 'b2' | 'b3';

export type Weights = Record<WeightKeys, number>;
export type Biases = Record<BiasKeys, number>;

export interface Activations {
  h1: number;
  h2: number;
  output: number;
}
