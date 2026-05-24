import axios from 'axios';
import { Vehicle, SearchParams } from '../types/vehicle';
import { TechnicalSheet, ComparisonMatrix } from '../types/specs';
import { CustomerProfile } from '../types/profile';
import { USE_MOCKS } from '../config/env';
import { apiClient } from './apiClient';
import { 
  adaptVehicleSummary, 
  adaptVehicleDetail, 
  adaptCompareResponse 
} from '../utils/apiAdapters';

// Mock Data (mantido para fallback ou modo offline/mock)
const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', brand: 'Ford', model: 'Ranger', version: 'Raptor', year: 2024 },
  { id: '2', brand: 'Ram', model: '1500', version: 'RHO', year: 2024 },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const specsApi = {
  login: async (email: string, password: string): Promise<any> => {
    if (USE_MOCKS) {
      await delay(800);
      return { token: 'mock-jwt', name: 'Consultor Mock', dealership: 'Ford Matriz' };
    }
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  getVehicles: async (): Promise<Vehicle[]> => {
    if (USE_MOCKS) {
      await delay(300);
      return MOCK_VEHICLES;
    }
    const response = await apiClient.get('/vehicles');
    return response.data.map(adaptVehicleSummary);
  },

  getBrands: async (): Promise<string[]> => {
    if (USE_MOCKS) {
      await delay(500);
      return ['Ford', 'Ram', 'Chevrolet', 'Toyota'];
    }
    try {
      const response = await apiClient.get('/brands');
      console.log('API /brands response:', response.data);
      
      if (Array.isArray(response.data)) {
        return response.data.map((b: any) => b.name);
      }
      
      console.error('API /brands did not return an array:', response.data);
      return [];
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },

  getModels: async (brand: string): Promise<string[]> => {
    if (USE_MOCKS) {
      await delay(500);
      return brand === 'Ford' ? ['Ranger', 'F-150'] : ['1500'];
    }
    // A API Java não tem /models isolado, vamos filtrar do /vehicles
    const response = await apiClient.get('/vehicles');
    const vehicles = response.data as any[];
    const models = vehicles
      .filter(v => v.brandName === brand)
      .map(v => v.model);
    return Array.from(new Set(models));
  },

  getVersions: async (brand: string, model: string): Promise<string[]> => {
    if (USE_MOCKS) {
      await delay(500);
      return ['Raptor', 'Lariat'];
    }
    const response = await apiClient.get('/vehicles');
    const vehicles = response.data as any[];
    return vehicles
      .filter(v => v.brandName === brand && v.model === model)
      .map(v => v.version);
  },

  getVehicleSpecs: async (vehicleId: string): Promise<TechnicalSheet> => {
    if (USE_MOCKS) {
      await delay(1000);
      return {
        vehicleId: '1',
        vehicle: MOCK_VEHICLES[0],
        generatedAt: new Date().toISOString(),
        completeness: 100,
        specs: []
      };
    }
    const response = await apiClient.get(`/vehicles/${vehicleId}`);
    return adaptVehicleDetail(response.data);
  },

  compareVehicles: async (ids: string[]): Promise<ComparisonMatrix> => {
    if (USE_MOCKS) {
      await delay(1200);
      return { vehicles: [], rows: [], scores: [] };
    }
    const response = await apiClient.get('/compare', {
      params: { ids: ids.join(',') }
    });
    return adaptCompareResponse(response.data);
  },

  getSavedComparisons: async (): Promise<any[]> => {
    if (USE_MOCKS) return [];
    const response = await apiClient.get('/comparisons');
    return response.data;
  },

  saveComparison: async (vehicleAId: number, vehicleBId: number, notes: string): Promise<any> => {
    if (USE_MOCKS) return { id: Date.now() };
    const response = await apiClient.post('/comparisons', {
      vehicleAId,
      vehicleBId,
      notes
    });
    return response.data;
  },

  deleteComparison: async (id: number): Promise<void> => {
    if (USE_MOCKS) return;
    await apiClient.delete(`/comparisons/${id}`);
  },

  detectProfile: async (params: SearchParams, vehicleId: string): Promise<CustomerProfile> => {
    await delay(800);
    // Lógica local mantida pois o backend não possui detecção de perfil por enquanto
    const attrs = params.attributes || [];
    
    return {
      type: attrs.includes('offroad') ? 'enthusiast' : 'tech',
      label: attrs.includes('offroad') ? 'Entusiasta' : 'Tecnológico',
      description: 'Perfil detectado com base na busca.',
      detectedSignals: [`Atributos: ${attrs.join(', ')}`],
      salesArguments: [
        { id: '1', title: 'Argumento Ford', description: 'Vantagem competitiva Raptor.', urgency: 'high' }
      ]
    };
  }
};
