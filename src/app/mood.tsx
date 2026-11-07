import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import BQLogo from '../components/BQLogo';
import { addMood } from '../store/habitsSlice';

const EMOTIONS = [
  { id: '1', label: 'Feliz', emoji: '😊' },
  { id: '2', label: 'En calma', emoji: '😌' },
  { id: '3', label: 'Triste', emoji: '😢' },
  { id: '4', label: 'Estresada', emoji: '😫' },
  { id: '5', label: 'Cansada', emoji: '🥱' },
];

export default function MoodScreen() {
  const dispatch = useDispatch();

  const handleSave = (mood: string, emoji: string) => {
    dispatch(addMood({ mood, emoji }));
    router.push('/mood-history'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo size={40} />
        <Text style={styles.title}>¿Cómo me siento hoy?</Text>
        <Text style={styles.subtitle}>No hay respuestas incorrectas.</Text>

        {EMOTIONS.map((emotion) => (
          <TouchableOpacity key={emotion.id} style={styles.card} onPress={() => handleSave(emotion.label, emotion.emoji)}>
            <Text style={styles.emoji}>{emotion.emoji}</Text>
            <Text style={styles.cardText}>{emotion.label}</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#EBE5DA' },
  emoji: { fontSize: 24, marginRight: 15 },
  cardText: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
});