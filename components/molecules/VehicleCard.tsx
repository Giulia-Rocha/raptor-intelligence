import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../atoms/Badge';

interface VehicleCardProps {
  brand: string;
  model: string;
  version: string;
  year: number | string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  brand,
  model,
  version,
  year,
  onPress,
  style,
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.bgSurface,
          borderRadius: radius.lg,
          padding: spacing.lg,
          borderColor: colors.borderSubtle,
          borderWidth: 1,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <Text style={[typography.labelSm, { color: colors.accentBlue }]}>
          {brand}
        </Text>
        <Badge text={String(year)} color={colors.bgElevated} />
      </View>

      <Text style={[typography.displayMd, { color: colors.textPrimary, marginTop: spacing.xs }]}>
        {model}
      </Text>
      
      <Text style={[typography.bodySm, { color: colors.textSecondary, marginTop: 2 }]}>
        {version}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
