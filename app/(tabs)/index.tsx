import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useSpecs } from '../../hooks/useSpecs';
import { SearchForm } from '../../components/organisms/SearchForm';
import { BottomSheet } from '../../components/organisms/BottomSheet';
import { VehicleCard } from '../../components/molecules/VehicleCard';
import { storageService } from '../../services/storageService';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ATTRIBUTE_CHIPS = [
  { id: 'motor', label: 'Motor' },
  { id: 'offroad', label: 'Off-road' },
  { id: 'performance', label: 'Desempenho' },
  { id: 'safety', label: 'Segurança' },
  { id: 'tech', label: 'Tecnologia' },
  { id: 'price', label: 'Preço' },
  { id: 'consumption', label: 'Consumo' },
];

export default function HomeScreen() {
  const { colors, typography, spacing, radius } = useTheme();
  const { user } = useAuth();
  const { brands, models, versions, loadModels, loadVersions } = useSpecs();
  const router = useRouter();

  const [history, setHistory] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  
  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetType, setSheetType] = useState<'brand' | 'model' | 'version' | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await storageService.getHistory();
    setHistory(data);
  };

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedVersion('');
    loadModels(brand);
    setSheetVisible(false);
  };

  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
    setSelectedVersion('');
    loadVersions(selectedBrand, model);
    setSheetVisible(false);
  };

  const handleSelectVersion = (version: string) => {
    setSelectedVersion(version);
    setSheetVisible(false);
  };

  const toggleAttribute = (id: string) => {
    setSelectedAttributes(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    // In a real app, we'd find the vehicle ID based on selections
    // For this prototype, we'll use our mock ID if Ford Ranger Raptor is selected
    const vehicleId = (selectedBrand === 'Ford' && selectedModel === 'Ranger' && selectedVersion === 'Raptor')
      ? 'ford-ranger-raptor-2024'
      : 'ford-ranger-raptor-2024'; // Fallback for prototype
    
    storageService.saveSearch({ 
      id: vehicleId, 
      brand: selectedBrand, 
      model: selectedModel, 
      version: selectedVersion, 
      year: 2024 
    });
    
    router.push(`/screens/specs/${vehicleId}`);
  };

  const renderSheetContent = () => {
    let data: string[] = [];
    let onSelect: (val: string) => void = () => {};
    let title = '';

    if (sheetType === 'brand') {
      data = brands;
      onSelect = handleSelectBrand;
      title = 'Selecionar Marca';
    } else if (sheetType === 'model') {
      data = models;
      onSelect = handleSelectModel;
      title = 'Selecionar Modelo';
    } else if (sheetType === 'version') {
      data = versions;
      onSelect = handleSelectVersion;
      title = 'Selecionar Versão';
    }

    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.sheetItem, { borderBottomColor: colors.borderSubtle }]}
              onPress={() => onSelect(item)}
            >
              <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[typography.bodyMd, { color: colors.textSecondary }]}>Olá, {user?.name.split(' ')[0]}</Text>
            <Text style={[typography.bodySm, { color: colors.textMuted }]}>{user?.dealership}</Text>
          </View>
          <View style={[styles.avatar, { backgroundColor: colors.accentBlue, borderRadius: radius.full }]}>
            <Text style={[typography.labelSm, { color: 'white' }]}>
              {user?.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        </View>

        <View style={styles.searchSection}>
          <SearchForm 
            selectedBrand={selectedBrand || 'Selecionar marca'}
            selectedModel={selectedModel || 'Selecionar modelo'}
            selectedVersion={selectedVersion || 'Selecionar versão'}
            attributes={ATTRIBUTE_CHIPS}
            selectedAttributes={selectedAttributes}
            onSelectBrand={() => { setSheetType('brand'); setSheetVisible(true); }}
            onSelectModel={() => { if (selectedBrand) { setSheetType('model'); setSheetVisible(true); } }}
            onSelectVersion={() => { if (selectedModel) { setSheetType('version'); setSheetVisible(true); } }}
            onToggleAttribute={toggleAttribute}
            onSearch={handleSearch}
            isSearchDisabled={!selectedBrand || !selectedModel || !selectedVersion || selectedAttributes.length === 0}
          />
        </View>

        {history.length > 0 && (
          <View style={styles.historySection}>
            <Text style={[typography.labelSm, { color: colors.textSecondary, marginBottom: spacing.md, marginLeft: spacing.lg }]}>
              Buscas Recentes
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={history}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              contentContainerStyle={{ paddingHorizontal: spacing.lg }}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => router.push(`/screens/specs/${item.id}`)}
                  style={{ marginRight: spacing.md }}
                >
                  <VehicleCard 
                    brand={item.brand}
                    model={item.model}
                    version={item.version}
                    year={item.year}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>

      <BottomSheet 
        visible={sheetVisible} 
        onClose={() => setSheetVisible(false)}
        title={sheetType === 'brand' ? 'Marca' : sheetType === 'model' ? 'Modelo' : 'Versão'}
      >
        {renderSheetContent()}
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  historySection: {
    marginTop: 32,
  },
  sheetItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  }
});
