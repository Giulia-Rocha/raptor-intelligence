import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export type ProfileType = 'enthusiast' | 'lifestyle' | 'rational';

interface ProfileBadgeProps {
  type: ProfileType;
  style?: ViewStyle;
}

export const ProfileBadge: React.FC<ProfileBadgeProps> = ({ type, style }) => {
  const { colors, spacing, radius, typography } = useTheme();

  const getProfileConfig = () => {
    switch (type) {
      case 'enthusiast':
        return { color: colors.accentRed, label: 'Entusiasta' };
      case 'lifestyle':
        return { color: colors.accentBlue, label: 'Lifestyle' };
      case 'rational':
        return { color: colors.accentTeal, label: 'Racional' };
      default:
        return { color: colors.accentBlue, label: type };
    }
  };

  const config = getProfileConfig();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgElevated,
          borderColor: config.color,
          borderWidth: 1,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
        style,
      ]}
    >
      <Text style={[typography.displayMd, { color: config.color, fontSize: 16 }]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
