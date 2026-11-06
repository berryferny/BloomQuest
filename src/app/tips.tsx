import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

const TIPS = [
  { id: '1', title: 'Hábitos que duran', icon: '🌱', short: 'Aprende a crear rutinas sólidas.' },
  { id: '2', title: 'Descanso y bienestar', icon: '🛌', short: 'La importancia de recuperar energía.' },
  { id: '3', title: 'Organización diaria', icon: '🗂️', short: 'Ordena tu día para evitar estrés.' },
  { id: '4', title: 'Motivación sin presión', icon: '✨', short: 'Avanza a tu propio ritmo.' },
];

export default function TipsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Consejos para ti</Text>
        <Text style={styles.subtitle}>Ideas sencillas para florecer.</Text>

        {TIPS.map((tip) => (
          <TouchableOpacity 
            key={tip.id} 
            style={styles.card}
            onPress={() => router.push({ pathname: '/tip-detail', params: { title: tip.title, icon: tip.icon } })}
          >
            <Text style={styles.emoji}>{tip.icon}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{tip.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>
        ))}
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
  
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  emoji: { fontSize: 24, marginRight: 15 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
});