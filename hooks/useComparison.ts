import { useVehicle } from '../context/VehicleContext';
import { Vehicle } from '../types/vehicle';
import { useRouter } from 'expo-router';

export const useComparison = () => {
  const { comparisonList, addToComparison, removeFromComparison, clearComparison } = useVehicle();
  const router = useRouter();

  const handleCompare = (vehicle: Vehicle) => {
    addToComparison(vehicle);
    router.push('/(tabs)/compare');
  };

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    handleCompare,
    isFull: comparisonList.length >= 2,
    isInComparison: (id: string) => comparisonList.some(v => v.id === id)
  };
};
