import { Vehicle } from './vehicle';

export interface SearchHistoryItem extends Vehicle {
  createdAt: string;
}

export interface StorageSchemaV1 {
  version: 1;
  searches: SearchHistoryItem[];
}
