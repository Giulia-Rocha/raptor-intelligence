import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen() {
  const { colors, typography, spacing } = useTheme();
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (!isLoading) {
        if (token) {
          router.replace('/(tabs)');
        } else {
          router.replace('/login');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, token]);

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Ionicons name="car-sport-outline" size={120} color={colors.accentBlue} />
        <View style={{ marginTop: spacing.xl, alignItems: 'center' }}>
          <Text style={[typography.displayLg, { color: colors.textPrimary, letterSpacing: 2 }]}>
            RAPTOR INTELLIGENCE
          </Text>
          <Text style={[typography.bodyMd, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Inteligência competitiva automotiva
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
