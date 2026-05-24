import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../config/env';

// Instância única do axios usada por todos os serviços (specsApi, etc).
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Injeta (ou remove) o token JWT no header Authorization após o login/logout.
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};
