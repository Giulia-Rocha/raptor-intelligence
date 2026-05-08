import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SearchDropdown } from '../molecules/SearchDropdown';
import { FilterChip } from '../atoms/FilterChip';

interface SearchFormProps {
  onSelectBrand: () => void;
  selectedBrand?: string;
  onSelectModel: () => void;
  selectedModel?: string;
  onSelectVersion: () => void;
  selectedVersion?: string;
  attributes: { id: string; label: string }[];
  selectedAttributes: string[];
  onToggleAttribute: (id: string) => void;
  onSearch: () => void;
  isSearchDisabled?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSelectBrand,
  selectedBrand,
  onSelectModel,
  selectedModel,
  onSelectVersion,
  selectedVersion,
  attributes,
  selectedAttributes,
  onToggleAttribute,
  onSearch,
  isSearchDisabled,
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgSurface,
          borderRadius: radius.lg,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <SearchDropdown
        label="Marca"
        placeholder={selectedBrand}
        onPress={onSelectBrand}
        style={{ marginBottom: spacing.md }}
      />
      <SearchDropdown
        label="Modelo"
        placeholder={selectedModel}
        onPress={onSelectModel}
        style={{ marginBottom: spacing.md }}
      />
      <SearchDropdown
        label="Versão"
        placeholder={selectedVersion}
        onPress={onSelectVersion}
        style={{ marginBottom: spacing.lg }}
      />

      <Text style={[typography.labelSm, { color: colors.textMuted, marginBottom: spacing.sm }]}>
        ATRIBUTOS EM DESTAQUE
      </Text>
      
      <View style={styles.chipContainer}>
        {attributes.map((attr) => (
          <FilterChip
            key={attr.id}
            label={attr.label}
            selected={selectedAttributes.includes(attr.id)}
            onPress={() => onToggleAttribute(attr.id)}
            style={{ marginRight: spacing.sm, marginBottom: spacing.sm }}
          />
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSearch}
        disabled={isSearchDisabled}
        style={[
          styles.button,
          {
            backgroundColor: isSearchDisabled ? colors.bgElevated : colors.accentBlue,
            borderRadius: radius.md,
            marginTop: spacing.lg,
          },
        ]}
      >
        <Text
          style={[
            typography.bodyMd,
            { color: isSearchDisabled ? colors.textMuted : colors.textPrimary, fontWeight: '700' },
          ]}
        >
          Gerar ficha técnica
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
