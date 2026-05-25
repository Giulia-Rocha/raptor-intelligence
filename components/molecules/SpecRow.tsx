import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { NDPill } from '../atoms/NDPill';
import { Divider } from '../atoms/Divider';
import { Ionicons } from '@expo/vector-icons';

interface SpecRowProps {
  label: string;
  value?: string | number | null;
  iconName?: keyof typeof Ionicons.glyphMap;
  showDivider?: boolean;
  style?: ViewStyle;
}

export const SpecRow: React.FC<SpecRowProps> = ({
  label,
  value,
  iconName,
  showDivider = true,
  style,
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.md }}>
        <View style={styles.leftContent}>
          {iconName && (
            <Ionicons
              name={iconName}
              size={18}
              color={colors.accentBlue}
              style={{ marginRight: spacing.sm }}
            />
          )}
          <Text style={[typography.bodyMd, { color: colors.textSecondary }]}>
            {label}
          </Text>
        </View>

        <View style={styles.rightContent}>
          {value ? (
            <Text style={[typography.bodyMd, { color: colors.textPrimary, fontWeight: '600', textAlign: 'right' }]}>
              {Array.isArray(value) ? value.join(', ') : value}
            </Text>
          ) : (
            <NDPill />
          )}
        </View>
      </View>
      {showDivider && <Divider />}
    </View>
  );
};

const styles = StyleSheet.create({
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
});
