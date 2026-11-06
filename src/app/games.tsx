import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function GamesScreen() {
  const showComingSoon = () => {
    Alert.alert("Próximamente", "Este juego estará disponible pronto.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Zona de juegos</Text>
        <Text style={styles.subtitle}>Aprende, juega y consigue monedas.</Text>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/memory-game')}>
          <Text style={styles.emoji}>🌸</Text>
          <Text style={styles.cardText}>Memoria Floral</Text>
          <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/trivia')}>
          <Text style={styles.emoji}>🧠</Text>
          <Text style={styles.cardText}>Preguntas que Florecen</Text>
          <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={showComingSoon}>
          <Text style={styles.emoji}>🪴</Text>
          <Text style={styles.cardText}>Ordena el Jardín</Text>
          <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
        </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => router.push('/stars-game')}>
          <Text style={styles.emoji}>⭐</Text>
          <Text style={styles.cardText}>Atrapa Estrellas</Text>
          <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
        </TouchableOpacity>
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
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  emoji: { fontSize: 24, marginRight: 15 },
  cardText: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#342F29' },
});