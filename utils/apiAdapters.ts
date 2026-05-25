import { Vehicle } from '../types/vehicle';
import { TechnicalSheet, ComparisonMatrix, SpecField, SpecCategory } from '../types/specs';
import { RadarAxes } from '../types/radar';

/**
 * Converte o resumo de veículo da API para o modelo interno do Mobile
 */
export const adaptVehicleSummary = (dto: any): Vehicle => ({
  id: String(dto.id),
  brand: dto.brandName || 'Ford',
  model: dto.model,
  version: dto.version,
  year: dto.modelYear,
});

/**
 * Converte o detalhe do veículo (DTO complexo) para a Ficha Técnica (TechnicalSheet)
 * A API retorna objetos separados (engineSpecs, etc), o Mobile espera um array flat de specs.
 */
export const adaptVehicleDetail = (dto: any): TechnicalSheet => {
  const specs: SpecField[] = [];

  // Mapeamento de Engine Specs
  if (dto.engineSpecs) {
    const engine = dto.engineSpecs;
    if (engine.engineType) specs.push({ id: 'e1', category: 'motor', label: 'Tipo de Motor', value: engine.engineType });
    if (engine.displacement) specs.push({ id: 'e2', category: 'motor', label: 'Cilindrada', value: engine.displacement });
    if (engine.horsepower) specs.push({ id: 'e3', category: 'motor', label: 'Potência', value: engine.horsepower, unit: 'cv' });
    if (engine.torque) specs.push({ id: 'e4', category: 'motor', label: 'Torque', value: engine.torque, unit: 'Nm' });
  }

  // Mapeamento de Suspension/Off-road
  if (dto.suspensionSpecs) {
    const susp = dto.suspensionSpecs;
    if (susp.groundClearance) specs.push({ id: 's1', category: 'offroad', label: 'Altura Livre', value: susp.groundClearance, unit: 'mm' });
    if (susp.waterWading) specs.push({ id: 's2', category: 'offroad', label: 'Imersão', value: susp.waterWading, unit: 'mm' });
    if (susp.approachAngle) specs.push({ id: 's3', category: 'offroad', label: 'Ângulo Entrada', value: susp.approachAngle, unit: '°' });
  }

  return {
    vehicleId: String(dto.id),
    vehicle: adaptVehicleSummary(dto),
    specs,
    generatedAt: new Date().toISOString(),
    completeness: 100,
  };
};

/**
 * Converte o mapa de categorias da API para a matriz de comparação do Mobile
 */
export const adaptCompareResponse = (dto: any): ComparisonMatrix => {
  const vehicles = dto.vehicles.map(adaptVehicleSummary);
  const rows: any[] = [];
  const scores: any[] = [];

  // O Java retorna categories como um mapa. Vamos iterar e transformar em linhas.
  Object.keys(dto.categories || {}).forEach((catKey) => {
    const categoryData = dto.categories[catKey];
    const categoryName = (catKey.charAt(0).toUpperCase() + catKey.slice(1)) as SpecCategory;

    categoryData.specs.forEach((spec: any, index: number) => {
      // Extraímos os valores para cada veículo e garantimos formatação amigável
      const values = vehicles.map((v: Vehicle) => {
        const val = spec.values[v.id];
        if (Array.isArray(val)) {
          return val.join(', ');
        }
        return val || null;
      });
      
      rows.push({
        specId: `${catKey}-${index}`,
        label: spec.label,
        category: categoryName.toLowerCase() as SpecCategory,
        values,
        winnerId: null, // Lógica de vencedor pode ser refinada aqui ou vir do backend
      });
    });

    // Processar Radar Scores
    vehicles.forEach((v: Vehicle) => {
      let vehicleScore = scores.find(s => s.vehicleId === v.id);
      if (!vehicleScore) {
        vehicleScore = { vehicleId: v.id, axes: { motor: 0, offRoad: 0, tecnologia: 0, preco: 0, conforto: 0 } };
        scores.push(vehicleScore);
      }
      
      const scoreValue = categoryData.radarScore[v.id] ? categoryData.radarScore[v.id] / 10 : 0;
      
      // Mapeamento de categorias da API para eixos do Radar
      if (catKey === 'motor') vehicleScore.axes.motor = scoreValue;
      else if (catKey === 'offroad') vehicleScore.axes.offRoad = scoreValue;
      else if (catKey === 'tecnologia') vehicleScore.axes.tecnologia = scoreValue;
      else if (catKey === 'preco') vehicleScore.axes.preco = scoreValue;
      else if (catKey === 'conforto') vehicleScore.axes.conforto = scoreValue;
    });
  });

  return {
    vehicles,
    rows,
    scores,
  };
};
