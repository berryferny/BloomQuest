import BQLogo from '@/components/BQLogo';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function CoinsHelpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo />
        <Text style={styles.title}>Cómo funcionan las monedas</Text>
        <Text style={styles.subtitle}>Hábitos, juegos y recompensas.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🪙 Gana monedas</Text>
          <Text style={styles.cardText}>
            • Completa tus hábitos diarios (+10 monedas).{"\n"}
            • Termina misiones rápidas (+5 a +10 monedas).{"\n"}
            • Juega en la Zona de Juegos (hasta +20 monedas).{"\n"}
            • Mantén tu racha diaria (+20 monedas).
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🛒 Usa tus monedas</Text>
          <Text style={styles.cardText}>
            • Compra semillas en la Tienda del Jardín.{"\n"}
            • Cultiva tus plantas y decora tu espacio.{"\n"}
            • ¡Pronto habrá más recompensas disponibles!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EBE5DA' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  cardText: { fontSize: 15, color: '#705849', lineHeight: 24 },
});