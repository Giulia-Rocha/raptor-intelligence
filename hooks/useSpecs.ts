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
    try {
      const data = await specsApi.getBrands();
      setBrands(data);
    } catch (e) {
      setError('Erro ao carregar marcas');
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

  return {
    brands,
    models,
    versions,
    loadModels,
    loadVersions,
    getSpecs,
    isLoading,
    error
  };
};
