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

const generateSpecs = (vehicle: Vehicle): TechnicalSheet['specs'] => {
  const isFord = vehicle.brand === 'Ford';
  const isRam = vehicle.brand === 'Ram';
  
  return [
    { id: 'm1', category: 'motor', label: 'Motor', value: isFord ? '3.0 V6 Biturbo GTDi' : isRam ? '3.0 Hurricane High Output' : '6.2L V8 EcoTec3' },
    { id: 'm2', category: 'motor', label: 'Potência', value: isFord ? '397 cv' : isRam ? '548 cv' : '420 cv', unit: 'cv' },
    { id: 'm3', category: 'motor', label: 'Torque', value: isFord ? '583 Nm' : isRam ? '719 Nm' : '624 Nm', unit: 'Nm' },
    { id: 'm4', category: 'motor', label: 'Transmissão', value: 'Automática 10 velocidades' },
    { id: 'o1', category: 'offroad', label: 'Amortecedores', value: isFord ? 'FOX Racing Shox 2.5" Live Valve' : isRam ? 'Bilstein Black Hawk e2' : 'Multimatic DSSV' },
    { id: 'o2', category: 'offroad', label: 'Pneus', value: isFord ? '33" All-Terrain' : '35" All-Terrain' },
    { id: 'o3', category: 'offroad', label: 'Diferencial', value: 'Bloqueio dianteiro e traseiro' },
    { id: 'p1', category: 'performance', label: '0-100 km/h', value: isFord ? '5.8s' : isRam ? '4.6s' : '5.4s', unit: 's' },
  ];
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
    const vehicle = MOCK_VEHICLES.find(v => v.id === vehicleId) || MOCK_VEHICLES[0];
    return {
      vehicleId: vehicle.id,
      vehicle,
      generatedAt: new Date().toISOString(),
      completeness: 100,
      specs: generateSpecs(vehicle)
    };
  },

  compareVehicles: async (ids: string[]): Promise<ComparisonMatrix> => {
    await delay(1200);
    const vehicles = MOCK_VEHICLES.filter(v => ids.includes(v.id));
    
    // Ensure we have at least 2 vehicles for a meaningful mock comparison
    const v1 = vehicles[0] || MOCK_VEHICLES[0];
    const v2 = vehicles[1] || MOCK_VEHICLES[1];
    
    const specs1 = generateSpecs(v1);
    const specs2 = generateSpecs(v2);

    return {
      vehicles: [v1, v2],
      rows: [
        { 
          specId: 'm2', 
          label: 'Potência', 
          category: 'motor', 
          values: [specs1.find(s => s.id === 'm2')?.value || '', specs2.find(s => s.id === 'm2')?.value || ''], 
          winnerId: parseInt(specs1.find(s => s.id === 'm2')?.value || '0') > parseInt(specs2.find(s => s.id === 'm2')?.value || '0') ? v1.id : v2.id 
        },
        { 
          specId: 'm3', 
          label: 'Torque', 
          category: 'motor', 
          values: [specs1.find(s => s.id === 'm3')?.value || '', specs2.find(s => s.id === 'm3')?.value || ''], 
          winnerId: parseInt(specs1.find(s => s.id === 'm3')?.value || '0') > parseInt(specs2.find(s => s.id === 'm3')?.value || '0') ? v1.id : v2.id 
        },
        { 
          specId: 'p1', 
          label: '0-100 km/h', 
          category: 'performance', 
          values: [specs1.find(s => s.id === 'p1')?.value || '', specs2.find(s => s.id === 'p1')?.value || ''], 
          winnerId: parseFloat(specs1.find(s => s.id === 'p1')?.value || '99') < parseFloat(specs2.find(s => s.id === 'p1')?.value || '99') ? v1.id : v2.id 
        },
      ],
      scores: [v1.id, v2.id].map(id => ({
        vehicleId: id,
        axes: id.includes('ford') 
          ? { motor: 8, offroad: 10, tech: 9, price: 8, comfort: 8 }
          : { motor: 10, offroad: 8, tech: 8, price: 6, comfort: 9 }
      }))
    };
  },

  detectProfile: async (params: SearchParams, vehicleId: string): Promise<CustomerProfile> => {
    await delay(800);
    const attrs = params.attributes || [];
    
    if (attrs.includes('offroad') || attrs.includes('performance')) {
      return {
        type: 'enthusiast',
        label: 'Entusiasta de Performance',
        description: 'Cliente busca o máximo de capacidade técnica e adrenalina, priorizando suspensão e potência.',
        detectedSignals: [`Atributo ${attrs.join(', ')} selecionado`, 'Comparação com modelos High-Performance'],
        salesArguments: [
          { id: 'arg1', title: 'Domínio Tecnológico', description: 'O sistema de suspensão Fox Racing 2.5 é imbatível no segmento.', urgency: 'high' },
          { id: 'arg2', title: 'Exclusividade Ford', description: 'A engenharia Ford Performance garante um conjunto que a concorrência não replica.', urgency: 'medium' },
        ]
      };
    }

    return {
      type: 'tech',
      label: 'Focado em Tecnologia',
      description: 'Valoriza conectividade, segurança ativa e auxílios de condução.',
      detectedSignals: ['Filtros de Segurança/Tecnologia ativos'],
      salesArguments: [
        { id: 'arg1', title: 'Segurança 360', description: 'Conjunto completo de assistentes ativos de série.', urgency: 'high' },
      ]
    };
  }
};
