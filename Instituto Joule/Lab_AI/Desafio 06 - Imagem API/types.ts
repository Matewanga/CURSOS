
export type AppState = 'initial' | 'image_uploaded' | 'analyzing' | 'analyzed' | 'describing' | 'described' | 'error';

export interface IdentifiedObject {
  objectName: string;
}