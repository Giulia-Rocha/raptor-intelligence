import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { colors, typography, spacing, radius } = useTheme();
  const { signOut, user } = useAuth();
  const router = useRouter();

  const [settings, setSettings] = useState({
    motor: true,
    offroad: true,
    performance: true,
    tech: true,
    notifications: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/login');
  };

  const renderToggle = (label: string, key: keyof typeof settings) => (
    <View style={[styles.row, { borderBottomColor: colors.borderSubtle }]}>
      <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>{label}</Text>
      <Switch 
        value={settings[key]} 
        onValueChange={() => toggleSetting(key)}
        trackColor={{ false: colors.bgElevated, true: colors.accentBlue }}
        thumbColor="white"
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <View style={[styles.header, { borderBottomColor: colors.borderSubtle }]}>
        <Text style={[typography.displayMd, { color: colors.textPrimary }]}>Configurações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[typography.labelSm, { color: colors.textSecondary, marginBottom: spacing.md }]}>
            ATRIBUTOS MONITORADOS
          </Text>
          <View style={[styles.card, { backgroundColor: colors.bgSurface, borderRadius: radius.md }]}>
            {renderToggle('Motor e Transmissão', 'motor')}
            {renderToggle('Capacidade Off-road', 'offroad')}
            {renderToggle('Desempenho (0-100)', 'performance')}
            {renderToggle('Tecnologia e Segurança', 'tech')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[typography.labelSm, { color: colors.textSecondary, marginBottom: spacing.md }]}>
            NOTIFICAÇÕES
          </Text>
          <View style={[styles.card, { backgroundColor: colors.bgSurface, borderRadius: radius.md }]}>
            {renderToggle('Alertar quando spec for atualizada', 'notifications')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[typography.labelSm, { color: colors.textSecondary, marginBottom: spacing.md }]}>
            SOBRE
          </Text>
          <View style={[styles.card, { backgroundColor: colors.bgSurface, borderRadius: radius.md }]}>
            <View style={[styles.row, { borderBottomColor: colors.borderSubtle }]}>
              <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>Versão</Text>
              <Text style={[typography.bodySm, { color: colors.textSecondary }]}>1.0.0 (Build 2026)</Text>
            </View>
            <View style={[styles.row, { borderBottomColor: colors.borderSubtle }]}>
              <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>Status da API</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accentTeal, marginRight: 8 }} />
                <Text style={[typography.bodySm, { color: colors.accentTeal }]}>Operacional</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: colors.accentRed, borderWidth: 1, borderRadius: radius.md }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.accentRed} style={{ marginRight: spacing.sm }} />
          <Text style={[typography.bodyMd, { color: colors.accentRed }]}>Sair da conta</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[typography.bodySm, { color: colors.textMuted }]}>Equipe Raptor Intelligence • FIAP 2026</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  card: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  }
});
