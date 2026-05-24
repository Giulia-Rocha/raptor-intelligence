import { Vehicle, SearchParams } from '../types/vehicle';

/**
 * Localiza um veículo na lista a partir dos parâmetros de busca
 * (marca, modelo e versão), de forma case-insensitive.
 *
 * Usado para obter o ID determinístico do veículo selecionado na busca.
 * Retorna undefined caso nenhum veículo corresponda.
 */
export const findVehicleByParams = (
  vehicles: Vehicle[],
  params: Pick<SearchParams, 'brand' | 'model' | 'version'>
): Vehicle | undefined => {
  const norm = (value?: string) => (value ?? '').trim().toLowerCase();

  return vehicles.find(
    (v) =>
      norm(v.brand) === norm(params.brand) &&
      norm(v.model) === norm(params.model) &&
      norm(v.version) === norm(params.version)
  );
};
