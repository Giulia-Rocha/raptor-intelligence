import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { NDPill } from '../atoms/NDPill';
import { Divider } from '../atoms/Divider';

interface CompareRowProps {
  label: string;
  value1?: string | number | null;
  value2?: string | number | null;
  winner?: 1 | 2;
  showDivider?: boolean;
  style?: ViewStyle;
}

export const CompareRow: React.FC<CompareRowProps> = ({
  label,
  value1,
  value2,
  winner,
  showDivider = true,
  style,
}) => {
  const { colors, spacing, typography } = useTheme();

  const renderValue = (val: any, isWinner: boolean) => {
    if (val === undefined || val === null || val === '') {
      return <NDPill />;
    }

    // Garantir que arrays sejam formatados apenas com vírgulas e sem colchetes
    const displayValue = Array.isArray(val) ? val.join(', ') : val;

    return (
      <Text
        style={[
          typography.bodySm,
          {
            color: isWinner ? colors.accentTeal : colors.textPrimary,
            fontWeight: isWinner ? '700' : '400',
            textAlign: 'center',
          },
        ]}
      >
        {displayValue}
      </Text>
    );
  };

  return (
    <View style={style}>
      <Text style={[typography.labelSm, { color: colors.textMuted, marginBottom: spacing.xs, textAlign: 'center' }]}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', paddingBottom: spacing.md }}>
        <View style={[
          styles.column,
          winner === 1 && { backgroundColor: `${colors.accentTeal}1A`, borderRadius: 4 }
        ]}>
          {renderValue(value1, winner === 1)}
        </View>
        <View style={[
          styles.column,
          { borderLeftWidth: 1, borderLeftColor: colors.borderSubtle },
          winner === 2 && { backgroundColor: `${colors.accentTeal}1A`, borderRadius: 4 }
        ]}>
          {renderValue(value2, winner === 2)}
        </View>
      </View>
      {showDivider && <Divider />}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
