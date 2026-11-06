import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import { buySeed } from '../store/habitsSlice';

const SHOP_ITEMS = [
  { id: '1', name: 'Semilla de Tulipán', price: 20, emoji: '🌷', maxStage: 3 },
  { id: '2', name: 'Semilla de Girasol', price: 35, emoji: '🌻', maxStage: 4 },
  { id: '3', name: 'Semilla de Rosa', price: 50, emoji: '🌹', maxStage: 5 },
];

export default function ShopScreen() {
  const { coins = 0, seedInventory = [] } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();

  const handleBuy = (type: string, price: number) => {
    dispatch(buySeed({ type, price }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Tienda del jardín</Text>
        <Text style={styles.subtitle}>Compra semillas y haz crecer tu espacio.</Text>

        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>Tus monedas: 🪙 {coins}</Text>
          <Text style={styles.invText}>Semillas en mochila: {seedInventory.length}</Text>
        </View>

        {SHOP_ITEMS.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} monedas</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.buyButton, coins < item.price && styles.disabledButton]} 
              onPress={() => handleBuy(item.name, item.price)}
              disabled={coins < item.price}
            >
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 20 },
  coinsContainer: { backgroundColor: '#EBE5DA', padding: 15, borderRadius: 10, marginBottom: 20 },
  coinsText: { fontSize: 18, fontWeight: 'bold', color: '#342F29', textAlign: 'center' },
  invText: { fontSize: 14, color: '#705849', textAlign: 'center', marginTop: 5 },
  itemCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EBE5DA' },
  itemInfo: { flexDirection: 'row', alignItems: 'center' },
  itemEmoji: { fontSize: 30, marginRight: 15 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  itemPrice: { fontSize: 14, color: '#705849' },
  buyButton: { backgroundColor: '#9BAA91', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  disabledButton: { backgroundColor: '#D3C9BD' },
  buyButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
});