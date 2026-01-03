export enum ScenarioId {
  HIRING = 'hiring',
  DEEPFAKE = 'deepfake',
  AUTONOMOUS = 'autonomous'
}

export interface Option {
  id: string;
  label: string;
  shortDescription: string;
  risk: string;
}

export interface Scenario {
  id: ScenarioId;
  title: string;
  category: string;
  description: string;
  context: string;
  options: Option[];
}

export interface UserChoice {
  scenarioId: ScenarioId;
  optionId: string;
  justification: string;
  analysis?: string;
  loading: boolean;
}

export interface AppState {
  currentStep: number; // 0 = intro, 1 = scenario 1, 2 = analysis 1, etc.
  choices: Record<string, UserChoice>;
  completed: boolean;
}