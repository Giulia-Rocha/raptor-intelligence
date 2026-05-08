import axios from 'axios';
import { Vehicle, SearchParams } from '../types/vehicle';
import { TechnicalSheet, ComparisonMatrix } from '../types/specs';
import { CustomerProfile } from '../types/profile';

const API_BASE_URL = 'https://api.raptor-intelligence.com/api'; // Future Java API URL

// Mock Data
const MOCK_BRANDS = ['Ford', 'Ram', 'Chevrolet', 'Toyota'];
const MOCK_MODELS: Record<string, string[]> = {
  'Ford': ['Ranger', 'F-150', 'Maverick'],
  'Ram': ['1500', '2500', 'Rampage'],
  'Chevrolet': ['S10', 'Silverado'],
  'Toyota': ['Hilux'],
};

const MOCK_VEHICLES: Vehicle[] = [
  { id: 'ford-ranger-raptor-2024', brand: 'Ford', model: 'Ranger', version: 'Raptor', year: 2024 },
  { id: 'ram-1500-rho-2024', brand: 'Ram', model: '1500', version: 'RHO', year: 2024 },
  { id: 'chevy-silverado-zr2-2024', brand: 'Chevrolet', model: 'Silverado', version: 'ZR2', year: 2024 },
];

const RANGER_RAPTOR_SHEET: TechnicalSheet = {
  vehicleId: 'ford-ranger-raptor-2024',
  vehicle: MOCK_VEHICLES[0],
  generatedAt: new Date().toISOString(),
  completeness: 100,
  specs: [
    { id: 'm1', category: 'motor', label: 'Motor', value: '3.0 V6 Biturbo GTDi' },
    { id: 'm2', category: 'motor', label: 'Potência', value: '397 cv', unit: 'cv' },
    { id: 'm3', category: 'motor', label: 'Torque', value: '583 Nm', unit: 'Nm' },
    { id: 'm4', category: 'motor', label: 'Transmissão', value: 'Automática 10 velocidades' },
    { id: 'o1', category: 'offroad', label: 'Amortecedores', value: 'FOX Racing Shox 2.5" Live Valve' },
    { id: 'o2', category: 'offroad', label: 'Pneus', value: '33" All-Terrain' },
    { id: 'o3', category: 'offroad', label: 'Diferencial', value: 'Bloqueio dianteiro e traseiro' },
    { id: 'p1', category: 'performance', label: '0-100 km/h', value: '5.8s', unit: 's' },
  ]
};

// Simulation helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const specsApi = {
  getBrands: async (): Promise<string[]> => {
    await delay(500);
    return MOCK_BRANDS;
  },

  getModels: async (brand: string): Promise<string[]> => {
    await delay(500);
    return MOCK_MODELS[brand] || [];
  },

  getVersions: async (brand: string, model: string): Promise<string[]> => {
    await delay(500);
    return MOCK_VEHICLES
      .filter(v => v.brand === brand && v.model === model)
      .map(v => v.version);
  },

  getVehicleSpecs: async (vehicleId: string): Promise<TechnicalSheet> => {
    await delay(1000);
    if (vehicleId === 'ford-ranger-raptor-2024') {
      return RANGER_RAPTOR_SHEET;
    }
    // Generic fallback for other mocks
    return {
      ...RANGER_RAPTOR_SHEET,
      vehicleId,
      vehicle: MOCK_VEHICLES.find(v => v.id === vehicleId) || MOCK_VEHICLES[0]
    };
  },

  compareVehicles: async (ids: string[]): Promise<ComparisonMatrix> => {
    await delay(1200);
    return {
      vehicles: MOCK_VEHICLES.filter(v => ids.includes(v.id)),
      rows: [
        { specId: 'm2', label: 'Potência', category: 'motor', values: ['397 cv', '548 cv'], winnerId: 'ram-1500-rho-2024' },
        { specId: 'm3', label: 'Torque', category: 'motor', values: ['583 Nm', '719 Nm'], winnerId: 'ram-1500-rho-2024' },
      ],
      scores: ids.map(id => ({
        vehicleId: id,
        axes: { motor: 8, offroad: 9, tech: 8, price: 7, comfort: 8 }
      }))
    };
  },

  detectProfile: async (params: SearchParams, vehicleId: string): Promise<CustomerProfile> => {
    await delay(800);
    return {
      type: 'enthusiast',
      label: 'Entusiasta Off-Road',
      description: 'Valoriza performance extrema e capacidade fora de estrada acima de tudo.',
      detectedSignals: ['Chip Off-road selecionado', 'Chip Desempenho selecionado'],
      salesArguments: [
        { id: 'arg1', title: 'Suspensão Fox Racing Shox 2.5', description: 'Amortecedor de corrida de série', urgency: 'high' },
        { id: 'arg2', title: 'Modo Baja certificado', description: 'Único do segmento com homologação oficial', urgency: 'medium' },
      ]
    };
  }
};
