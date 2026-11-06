import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import { plantSeed, waterPlant } from '../store/habitsSlice';

// Configuración de las semillas y las imágenes
const SEED_DATA: any = {
  'Semilla de Tulipán': { maxStage: 3, img: require('../../assets/images/plants/tulip.png') },
  // Aquí agregarás las demás flores cuando tengas sus imágenes
};

export default function GardenScreen() {
  const { coins = 0, seedInventory = [], garden } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();

  const safeGarden = (garden && garden.length > 0) ? garden : [null, null, null, null, null, null];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const openPlantModal = (index: number) => {
    setSelectedSlot(index);
    setModalVisible(true);
  };

  const handlePlant = (seedType: string) => {
    if (selectedSlot !== null) {
      const data = SEED_DATA[seedType];
      // Enviamos 'emoji' como respaldo por si la imagen falla
      dispatch(plantSeed({ index: selectedSlot, type: seedType, maxStage: data.maxStage, emoji: '🌸' })); 
      setModalVisible(false);
    }
  };

  const handleWater = (index: number) => {
    dispatch(waterPlant(index)); 
  };

  return (
    <ImageBackground source={require('../../assets/images/plants/grass_bg.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* HUD Superior (Monedas y Título) */}
          <View style={styles.topHud}>
            <Text style={styles.title}>Mi Jardín</Text>
            <View style={styles.coinsBadge}>
              <Text style={styles.coinsText}>🪙 {coins}</Text>
            </View>
          </View>

          {/* El Huerto */}
          <View style={styles.gardenGrid}>
            {safeGarden.map((plant: any, index: number) => {
              // Escala de la planta (crece un poco en cada etapa)
              const plantScale = plant && !plant.isBloomed ? 0.6 + (plant.stage * 0.2) : 1.1;

              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.plot} 
                  onPress={() => plant ? handleWater(index) : openPlantModal(index)}
                  activeOpacity={plant?.isBloomed ? 1 : 0.8}
                >
                  {/* 1. La base de tierra (siempre visible) */}
                  <Image 
                    source={require('../../assets/images/plants/soil.png')} 
                    style={styles.soilImage} 
                    resizeMode="contain"
                  />

                  {/* 2. La planta encima de la tierra */}
                  {plant && (
                    <View style={[styles.plantOverlay, { transform: [{ scale: plantScale }] }]}>
                      <Image 
                        source={
                          plant.isBloomed 
                            ? SEED_DATA[plant.type].img 
                            : require('../../assets/images/plants/sprout.png')
                        } 
                        style={styles.plantImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}

                  {/* Indicador de agua (burbuja con emoji) */}
                  {plant && !plant.isBloomed && (
                    <View style={styles.waterIndicator}>
                      <Text style={styles.waterText}>💧</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

        </ScrollView>

        {/* Barra de Herramientas Flotante */}
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolButton} onPress={() => router.push('/shop')}>
            <Text style={styles.toolIcon}>🛒</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.toolButton}>
            <Text style={styles.toolIcon}>💧</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.toolButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.toolIcon}>🌱</Text>
          </TouchableOpacity>
        </View>

        <BottomNav />

        {/* MODAL PARA ELEGIR SEMILLA */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Mochila de Semillas</Text>
              {seedInventory.length === 0 ? (
                <Text style={styles.emptyText}>No tienes semillas. ¡Ve a la tienda!</Text>
              ) : (
                [...new Set(seedInventory)].map((seedType: any) => (
                  <TouchableOpacity key={seedType} style={styles.seedItem} onPress={() => handlePlant(seedType)}>
                    <Text style={styles.seedEmoji}>🌷</Text>
                    <Text style={styles.seedText}>{seedType}</Text>
                  </TouchableOpacity>
                ))
              )}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 120 },
  
  topHud: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  title: { fontSize: 32, fontWeight: '900', color: '#2E4A1E', textShadowColor: '#FFFFFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },
  coinsBadge: { backgroundColor: '#F8F5EF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 2, borderColor: '#705849', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4 },
  coinsText: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },

  gardenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  plot: {
    width: '48%', 
    aspectRatio: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soilImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },
  
  plantOverlay: {
    position: 'absolute',
    bottom: '25%', 
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImage: {
    width: '80%',
    height: '80%',
  },

  waterIndicator: {
    position: 'absolute',
    top: '20%',
    right: '10%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  waterText: { fontSize: 16 },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F5EF',
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#D3C9BD',
    position: 'absolute',
    bottom: 85, 
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    elevation: 8,
  },
  toolButton: { alignItems: 'center', justifyContent: 'center' },
  toolIcon: { fontSize: 30 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(52, 47, 41, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F8F5EF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: 350 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#342F29', marginBottom: 20, textAlign: 'center' },
  emptyText: { fontSize: 16, color: '#705849', textAlign: 'center', marginBottom: 20 },
  seedItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 2, borderColor: '#EBE5DA' },
  seedEmoji: { fontSize: 28, marginRight: 15 },
  seedText: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  closeButton: { marginTop: 10, padding: 15, backgroundColor: '#EBE5DA', borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#705849', fontSize: 16, fontWeight: 'bold' },
});