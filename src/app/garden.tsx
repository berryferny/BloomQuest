import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';

export default function GardenScreen() {
  const { coins = 0, inventory = [] } = useSelector((state: any) => state.habits);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Mi jardín</Text>
        <Text style={styles.subtitle}>Cada hábito hace crecer algo bonito.</Text>

        <View style={styles.gardenCard}>
          <View style={styles.gardenContent}>
            {inventory.length === 0 ? (
              <Text style={styles.placeholderEmoji}>🌱</Text>
            ) : (
              <View style={styles.inventoryRow}>
                {inventory.map((item: string, index: number) => {
                  const emoji = item === 'Tulipán' ? '🌷' : item === 'Maceta Lila' ? '🪴' : '🌻';
                  return <Text key={index} style={styles.plantEmoji}>{emoji}</Text>;
                })}
              </View>
            )}
            <Text style={styles.gardenText}>Tu jardín está floreciendo</Text>
          </View>
        </View>

        <View style={styles.shopContainer}>
          <Text style={styles.coinsText}>🪙 {coins} monedas</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => router.push('/shop' as any)}>
            <Text style={styles.shopButtonText}>Visitar tienda</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  gardenCard: {
    backgroundColor: '#EBE5DA',
    minHeight: 250,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D3C9BD',
    borderStyle: 'dashed',
    padding: 20,
  },
  gardenContent: { alignItems: 'center' },
  inventoryRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 },
  plantEmoji: { fontSize: 40, margin: 5 },
  placeholderEmoji: { fontSize: 50, marginBottom: 10 },
  gardenText: { fontSize: 16, fontWeight: 'bold', color: '#342F29', marginTop: 10 },
  shopContainer: { alignItems: 'center', marginTop: 10 },
  coinsText: { fontSize: 18, fontWeight: 'bold', color: '#342F29', marginBottom: 15 },
  shopButton: {
    backgroundColor: '#705849',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  shopButtonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});