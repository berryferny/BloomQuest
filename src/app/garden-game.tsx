import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import BQLogo from '../components/BQLogo';
import { plantSeed, waterPlant } from '../store/habitsSlice';

const SEED_DATA: any = {
  'Semilla de Tulipán': { maxStage: 3, img: require('../../assets/images/plants/tulip.png') },
  'Semilla de Girasol': { maxStage: 4, img: require('../../assets/images/plants/sunflower.png') },
  'Semilla de Rosa': { maxStage: 5, img: require('../../assets/images/plants/rose.png') },
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
      dispatch(plantSeed({ index: selectedSlot, type: seedType, maxStage: data.maxStage, emoji: '🌸' })); 
      setModalVisible(false);
    }
  };

  const handleWater = (index: number) => {
    const plant = safeGarden[index];
    const today = new Date().toDateString();
    if (plant && plant.lastWateredDate === today) return; 
    dispatch(waterPlant(index)); 
  };

  return (
    <ImageBackground source={require('../../assets/images/plants/grass_bg.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.topHud}>
            <BQLogo size={45} />
            <View style={styles.coinsBadge}>
              <Text style={styles.coinsText}>🪙 {coins}</Text>
            </View>
          </View>

          <View style={styles.gardenGrid}>
            {safeGarden.map((plant: any, index: number) => {
              const plantScale = plant && !plant.isBloomed ? 0.7 + (plant.stage * 0.15) : 1;
              const today = new Date().toDateString();
              const isWateredToday = plant?.lastWateredDate === today;

              return (
                <View key={index} style={styles.plotContainer}>
                  <TouchableOpacity style={styles.plot} onPress={() => plant ? handleWater(index) : openPlantModal(index)} activeOpacity={0.9}>
                    <Image source={require('../../assets/images/plants/soil.png')} style={styles.soilImage} resizeMode="contain" />
                    {plant && (
                      <View style={[styles.plantOverlay, { transform: [{ scale: plantScale }] }]}>
                        <Image 
                          source={plant.isBloomed ? SEED_DATA[plant.type]?.img : require('../../assets/images/plants/sprout.png')} 
                          style={styles.plantImage} resizeMode="contain"
                        />
                      </View>
                    )}
                    {plant && !plant.isBloomed && (
                      isWateredToday ? (
                        <View style={styles.wateredIndicator}><Text style={styles.wateredText}>Regada hoy</Text></View>
                      ) : (
                        <View style={styles.waterIndicator}><Text style={styles.waterText}>💧</Text></View>
                      )
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>

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

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Mochila de Semillas</Text>
              {seedInventory.length === 0 ? (
                <Text style={styles.emptyText}>No tienes semillas. ¡Ve a la tienda!</Text>
              ) : (
                [...new Set(seedInventory)].map((seedType: any) => (
                  <TouchableOpacity key={seedType} style={styles.seedItem} onPress={() => handlePlant(seedType)}>
                    <Image source={SEED_DATA[seedType]?.img} style={{ width: 30, height: 30, marginRight: 15 }} resizeMode="contain" />
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
  coinsBadge: { backgroundColor: '#F8F5EF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 2, borderColor: '#705849', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4 },
  coinsText: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  gardenGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  plotContainer: { width: '48%', aspectRatio: 1, marginBottom: 15 },
  plot: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  soilImage: { width: '100%', height: '100%', position: 'absolute' },
  plantOverlay: { position: 'absolute', bottom: '15%', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  plantImage: { width: '85%', height: '85%' },
  waterIndicator: { position: 'absolute', top: '10%', right: '10%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 3 },
  waterText: { fontSize: 16 },
  wateredIndicator: { position: 'absolute', top: '5%', right: '5%', backgroundColor: '#EBE5DA', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: '#D3C9BD' },
  wateredText: { fontSize: 10, fontWeight: 'bold', color: '#705849' },
  toolbar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#F8F5EF', paddingVertical: 12, borderRadius: 30, borderWidth: 3, borderColor: '#D3C9BD', position: 'absolute', bottom: 85, width: '80%', alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, elevation: 8 },
  toolButton: { alignItems: 'center', justifyContent: 'center' },
  toolIcon: { fontSize: 30 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(52, 47, 41, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F8F5EF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: 350 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#342F29', marginBottom: 20, textAlign: 'center' },
  emptyText: { fontSize: 16, color: '#705849', textAlign: 'center', marginBottom: 20 },
  seedItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 2, borderColor: '#EBE5DA' },
  seedText: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  closeButton: { marginTop: 10, padding: 15, backgroundColor: '#EBE5DA', borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#705849', fontSize: 16, fontWeight: 'bold' },
});