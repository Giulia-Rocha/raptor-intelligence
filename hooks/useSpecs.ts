import { useState, useEffect } from 'react';
import { specsApi } from '../services/specsApi';
import { TechnicalSheet } from '../types/specs';

export const useSpecs = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    setIsLoading(true);
    try {
      const data = await specsApi.getBrands();
      setBrands(data);
    } catch (e) {
      setError('Erro ao carregar marcas');
    } finally {
      setIsLoading(false);
    }
  };

  const loadModels = async (brand: string) => {
    try {
      const data = await specsApi.getModels(brand);
      setModels(data);
    } catch (e) {
      setError('Erro ao carregar modelos');
    }
  };

  const loadVersions = async (brand: string, model: string) => {
    try {
      const data = await specsApi.getVersions(brand, model);
      setVersions(data);
    } catch (e) {
      setError('Erro ao carregar versões');
    }
  };

  const getSpecs = async (id: string): Promise<TechnicalSheet | null> => {
    setIsLoading(true);
    try {
      const data = await specsApi.getVehicleSpecs(id);
      return data;
    } catch (e) {
      setError('Erro ao carregar especificações');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getVehicles = async () => {
    try {
      return await specsApi.getVehicles();
    } catch (e) {
      setError('Erro ao carregar veículos');
      return [];
    }
  };

  return {
    brands,
    models,
    versions,
    loadBrands,
    loadModels,
    loadVersions,
    getSpecs,
    getVehicles,
    isLoading,
    error
  };
};
