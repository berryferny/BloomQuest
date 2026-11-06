import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import { buyItem } from '../store/habitsSlice';

const SHOP_ITEMS = [
  { id: '1', name: 'Tulipán', price: 30, emoji: '🌷' },
  { id: '2', name: 'Maceta Lila', price: 50, emoji: '🪴' },
  { id: '3', name: 'Girasol', price: 60, emoji: '🌻' },
];

export default function ShopScreen() {
  const { coins = 0 } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();

  const handleBuy = (item: string, price: number) => {
    if (coins >= price) {
      dispatch(buyItem({ item, price }));
      Alert.alert("¡Compra exitosa!", `Has añadido un ${item} a tu jardín.`);
    } else {
      Alert.alert("Monedas insuficientes", "Sigue completando hábitos para ganar más monedas.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Tienda del jardín</Text>
        <Text style={styles.subtitle}>Canjea tus monedas por decoraciones.</Text>

        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>Tus monedas: 🪙 {coins}</Text>
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
            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(item.name, item.price)}>
              <Text style={styles.buyButtonText}>Canjear</Text>
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
  coinsContainer: { backgroundColor: '#EBE5DA', padding: 15, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  coinsText: { fontSize: 18, fontWeight: 'bold', color: '#342F29' },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  itemInfo: { flexDirection: 'row', alignItems: 'center' },
  itemEmoji: { fontSize: 30, marginRight: 15 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  itemPrice: { fontSize: 14, color: '#705849' },
  buyButton: { backgroundColor: '#9BAA91', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  buyButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
});