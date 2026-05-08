import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SEARCH_HISTORY: '@raptor/search_history',
  FAVORITES: '@raptor/favorites',
  SETTINGS: '@raptor/settings',
};

export const storageService = {
  saveSearch: async (vehicle: any) => {
    try {
      const history = await storageService.getHistory();
      const updated = [vehicle, ...history.filter((v: any) => v.id !== vehicle.id)].slice(0, 10);
      await AsyncStorage.setItem(KEYS.SEARCH_HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving search history', e);
    }
  },

  getHistory: async () => {
    try {
      const data = await AsyncStorage.getItem(KEYS.SEARCH_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleFavorite: async (vehicleId: string) => {
    try {
      const favorites = await storageService.getFavorites();
      const isFavorite = favorites.includes(vehicleId);
      const updated = isFavorite 
        ? favorites.filter((id: string) => id !== vehicleId)
        : [...favorites, vehicleId];
      await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
      return !isFavorite;
    } catch (e) {
      return false;
    }
  },

  getFavorites: async () => {
    try {
      const data = await AsyncStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveSettings: async (settings: any) => {
    try {
      await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {}
  },

  getSettings: async () => {
    try {
      const data = await AsyncStorage.getItem(KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
};
