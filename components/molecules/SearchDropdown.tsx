import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SearchDropdownProps {
  label: string;
  placeholder?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  label,
  placeholder,
  onPress,
  style,
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.bgSurface,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderColor: colors.borderSubtle,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[typography.labelSm, { color: colors.textMuted, marginBottom: 2 }]}>
          {label}
        </Text>
        <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>
          {placeholder || 'Selecionar...'}
        </Text>
      </View>
      <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
