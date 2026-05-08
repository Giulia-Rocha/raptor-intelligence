import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText, G, Circle } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';

interface RadarData {
  label: string;
  motor: number;
  offRoad: number;
  tecnologia: number;
  preco: number;
  conforto: number;
}

interface RadarChartProps {
  data: RadarData[]; // Up to 2 datasets
}

const SIZE = Dimensions.get('window').width - 64;
const CENTER = SIZE / 2;
const RADIUS = (SIZE / 2) - 40;

const AXES = ['Motor', 'Off-road', 'Tecnologia', 'Preço', 'Conforto'];

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const { colors, spacing, typography } = useTheme();

  const getPoint = (index: number, value: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = (value / 10) * radius;
    return {
      x: CENTER + r * Math.cos(angle),
      y: CENTER + r * Math.sin(angle),
    };
  };

  const getAxisPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    return {
      x: CENTER + radius * Math.cos(angle),
      y: CENTER + radius * Math.sin(angle),
    };
  };

  const renderDataset = (dataset: RadarData, index: number) => {
    const color = index === 0 ? colors.accentBlue : colors.accentAmber;
    const values = [
      dataset.motor,
      dataset.offRoad,
      dataset.tecnologia,
      dataset.preco,
      dataset.conforto,
    ];

    const points = values
      .map((val, i) => {
        const p = getPoint(i, val, RADIUS);
        return `${p.x},${p.y}`;
      })
      .join(' ');

    return (
      <G key={`dataset-${index}`}>
        <Polygon
          points={points}
          fill={color}
          fillOpacity={0.3}
          stroke={color}
          strokeWidth={2}
        />
        {values.map((val, i) => {
          const p = getPoint(i, val, RADIUS);
          return (
            <Circle
              key={`point-${index}-${i}`}
              cx={p.x}
              cy={p.y}
              r={3}
              fill={color}
            />
          );
        })}
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        {/* Background webs */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((step) => {
          const points = AXES.map((_, i) => {
            const p = getAxisPoint(i, RADIUS * step);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <Polygon
              key={`web-${step}`}
              points={points}
              fill="none"
              stroke={colors.borderSubtle}
              strokeWidth={1}
            />
          );
        })}

        {/* Axes */}
        {AXES.map((label, i) => {
          const p = getAxisPoint(i, RADIUS);
          const labelP = getAxisPoint(i, RADIUS + 20);
          return (
            <G key={`axis-${i}`}>
              <Line
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke={colors.borderSubtle}
                strokeWidth={1}
              />
              <SvgText
                x={labelP.x}
                y={labelP.y}
                fill={colors.textSecondary}
                fontSize={10}
                fontWeight="500"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {label.toUpperCase()}
              </SvgText>
            </G>
          );
        })}

        {/* Datasets */}
        {data.map((d, i) => renderDataset(d, i))}
      </Svg>

      <View style={[styles.legend, { marginTop: spacing.md }]}>
        {data.map((d, i) => (
          <View key={`legend-${i}`} style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: i === 0 ? colors.accentBlue : colors.accentAmber },
              ]}
            />
            <Text style={[typography.bodySm, { color: colors.textPrimary, marginLeft: spacing.xs }]}>
              {d.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});
