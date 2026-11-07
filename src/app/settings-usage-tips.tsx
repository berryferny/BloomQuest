import BQLogo from '@/components/BQLogo';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

export default function UsageTipsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo />
        <Text style={styles.title}>Consejos de uso</Text>
        <Text style={styles.subtitle}>Cómo aprovechar tu jardín.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌱 Riega todos los días</Text>
          <Text style={styles.cardText}>
            Las plantas crecen cada vez que las riegas. Tócalas en tu Jardín para darles agua y ver cómo evolucionan.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌸 Flores únicas</Text>
          <Text style={styles.cardText}>
            Cada semilla tiene un tiempo de crecimiento distinto. Las más caras tardan más, pero son las más hermosas.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Mantén tu racha</Text>
          <Text style={styles.cardText}>
            Entra todos los días para aumentar tu racha. Si la mantienes, recibirás bonos de monedas extra.
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