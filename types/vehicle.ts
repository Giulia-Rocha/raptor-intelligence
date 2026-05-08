export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
}

export interface SearchParams {
  brand: string;
  model: string;
  version: string;
  attributes: string[]; // List of selected SpecCategory ids
}
