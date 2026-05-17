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

  const handleEditPhoto = () => {
    alert('Funcionalidade de alterar foto (ImagePicker) preparada.');
  };

  const handleChangePassword = () => {
    alert('Fluxo de alteração de senha solicitado.');
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
            PERFIL DO VENDEDOR
          </Text>
          <View style={[styles.card, { backgroundColor: colors.bgSurface, borderRadius: radius.md, padding: spacing.lg }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
              <TouchableOpacity onPress={handleEditPhoto} style={[styles.avatarLarge, { backgroundColor: colors.accentBlue }]}>
                <Text style={[typography.displayMd, { color: 'white' }]}>
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </Text>
                <View style={[styles.editBadge, { backgroundColor: colors.bgSurface }]}>
                  <Ionicons name="camera" size={12} color={colors.accentBlue} />
                </View>
              </TouchableOpacity>
              <View style={{ marginLeft: spacing.md }}>
                <Text style={[typography.displayMd, { color: colors.textPrimary }]}>{user?.name}</Text>
                <Text style={[typography.bodySm, { color: colors.textSecondary }]}>{user?.dealership}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.profileButton, { borderColor: colors.borderSubtle, borderWidth: 1, borderRadius: radius.md }]}
              onPress={handleChangePassword}
            >
              <Text style={[typography.bodySm, { color: colors.textPrimary }]}>Alterar Senha</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  profileButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  }
});
