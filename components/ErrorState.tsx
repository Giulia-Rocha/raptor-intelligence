import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  icon?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message, 
  onRetry, 
  icon = 'alert-circle-outline' 
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={64} color={colors.accentRed} />
      <Text style={[typography.displayMd, { color: colors.textPrimary, marginTop: spacing.md, textAlign: 'center' }]}>
        Ops! Algo deu errado
      </Text>
      <Text style={[typography.bodyMd, { color: colors.textSecondary, marginTop: spacing.xs, textAlign: 'center' }]}>
        {message}
      </Text>
      
      {onRetry && (
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.accentBlue, borderRadius: radius.md, marginTop: spacing.xl }]}
          onPress={onRetry}
        >
          <Text style={[typography.bodyMd, { color: 'white' }]}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  button: {
    paddingHorizontal: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
