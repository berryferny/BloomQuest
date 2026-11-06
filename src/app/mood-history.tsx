import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';

export default function MoodHistoryScreen() {
  const { moodHistory = [] } = useSelector((state: any) => state.habits);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Mi historial emocional</Text>
        <Text style={styles.subtitle}>Observa cómo cambian tus días.</Text>

        <View style={styles.historyBox}>
          {moodHistory.length === 0 ? (
            <Text style={styles.emptyText}>Aún no has registrado emociones.</Text>
          ) : (
            moodHistory.map((entry: any, index: number) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyDate}>{entry.date}</Text>
                <Text style={styles.historyEmoji}>{entry.emoji}</Text>
                <Text style={styles.historyMood}>{entry.mood}</Text>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/mood')}>
          <Text style={styles.buttonText}>Registrar otra emoción</Text>
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
  
  historyBox: {
    backgroundColor: '#EBE5DA',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },
  emptyText: { color: '#705849', fontStyle: 'italic', textAlign: 'center', padding: 20 },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyDate: { flex: 1, fontSize: 14, color: '#705849', textTransform: 'capitalize' },
  historyEmoji: { fontSize: 24, marginRight: 10 },
  historyMood: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },

  button: {
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});