// Configuração de ambiente do app.
//
// USE_MOCKS = true faz o app funcionar offline, usando os dados de exemplo
// definidos em services/specsApi.ts (sem depender do backend Java).
// Para apontar para a API real, defina EXPO_PUBLIC_USE_MOCKS=false e
// EXPO_PUBLIC_API_URL com a URL do backend.

export const USE_MOCKS =
  (process.env.EXPO_PUBLIC_USE_MOCKS ?? 'true').toLowerCase() !== 'false';

// URL base da API (usada apenas quando USE_MOCKS = false).
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080';

// Timeout padrão das requisições HTTP, em milissegundos.
export const API_TIMEOUT = 15000;
