import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SpecSectionProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SpecSection: React.FC<SpecSectionProps> = ({
  title,
  children,
  style,
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.xl }, style]}>
      <Text style={[typography.labelSm, { color: colors.textMuted, marginBottom: spacing.sm }]}>
        {title}
      </Text>
      <View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
