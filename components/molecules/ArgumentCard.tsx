import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export type UrgencyLevel = 'high' | 'medium' | 'low';

interface ArgumentCardProps {
  title: string;
  description: string;
  urgency: UrgencyLevel;
  style?: ViewStyle;
}

export const ArgumentCard: React.FC<ArgumentCardProps> = ({
  title,
  description,
  urgency,
  style,
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  const getUrgencyColor = () => {
    switch (urgency) {
      case 'high':
        return colors.accentRed;
      case 'medium':
        return colors.accentAmber;
      case 'low':
        return colors.accentBlue;
      default:
        return colors.accentBlue;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgSurface,
          borderRadius: radius.md,
          padding: spacing.md,
          borderLeftWidth: 4,
          borderLeftColor: getUrgencyColor(),
        },
        style,
      ]}
    >
      <Text style={[typography.displayMd, { color: colors.textPrimary, fontSize: 16 }]}>
        {title}
      </Text>
      <Text style={[typography.bodySm, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
