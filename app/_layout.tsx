import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { VehicleProvider } from '../context/VehicleContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VehicleProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </VehicleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
