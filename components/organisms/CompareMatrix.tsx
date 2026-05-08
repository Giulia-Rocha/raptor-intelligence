import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CompareRow } from '../molecules/CompareRow';

interface CompareSection {
  title: string;
  rows: {
    label: string;
    value1?: string | number | null;
    value2?: string | number | null;
    winner?: 1 | 2;
  }[];
}

interface CompareMatrixProps {
  sections: CompareSection[];
}

export const CompareMatrix: React.FC<CompareMatrixProps> = ({ sections }) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={styles.container}>
      {sections.map((section, sectionIndex) => (
        <View key={`section-${sectionIndex}`} style={{ marginBottom: spacing.xl }}>
          <View
            style={[
              styles.header,
              {
                backgroundColor: colors.bgElevated,
                paddingVertical: spacing.xs,
                paddingHorizontal: spacing.md,
                marginBottom: spacing.sm,
              },
            ]}
          >
            <Text style={[typography.labelSm, { color: colors.textPrimary }]}>
              {section.title}
            </Text>
          </View>
          {section.rows.map((row, rowIndex) => (
            <CompareRow
              key={`row-${sectionIndex}-${rowIndex}`}
              label={row.label}
              value1={row.value1}
              value2={row.value2}
              winner={row.winner}
              showDivider={rowIndex < section.rows.length - 1}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
});
