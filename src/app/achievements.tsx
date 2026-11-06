import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';

export default function AchievementsScreen() {
  const { habits = [], completedMissions = [] } = useSelector((state: any) => state.habits);
  const completedHabits = habits.filter((h: any) => h.completed).length;

  const badges = [
    { id: 1, title: 'Primer hábito completado', req: completedHabits >= 1 },
    { id: 2, title: 'Primera misión terminada', req: completedMissions.length >= 1 },
    { id: 3, title: 'Primera flor desbloqueada', req: habits.length >= 3 },
    { id: 4, title: 'Maestro de la constancia', req: completedHabits >= 5 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Mis logros</Text>
        <Text style={styles.subtitle}>Celebra cada avance.</Text>

        {badges.map((badge) => (
          <View key={badge.id} style={[styles.card, !badge.req && styles.cardLocked]}>
            <Ionicons name={badge.req ? "medal" : "lock-closed"} size={28} color={badge.req ? "#F5B041" : "#9BAA91"} />
            <Text style={[styles.cardText, !badge.req && styles.textLocked]}>{badge.title}</Text>
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
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#EBE5DA' },
  cardLocked: { backgroundColor: '#EBE5DA', opacity: 0.7 },
  cardText: { fontSize: 16, fontWeight: 'bold', color: '#342F29', marginLeft: 15 },
  textLocked: { color: '#9BAA91' },
});