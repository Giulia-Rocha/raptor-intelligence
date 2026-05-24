// Os 5 eixos do gráfico radar de comparação (escala 0–10).
export interface RadarAxes {
  motor: number;
  offRoad: number;
  tecnologia: number;
  preco: number;
  conforto: number;
}

// Dataset consumido pelo componente RadarChart: os eixos + o rótulo
// exibido na legenda (ex.: "Ranger Raptor").
export interface RadarData extends RadarAxes {
  label: string;
}
