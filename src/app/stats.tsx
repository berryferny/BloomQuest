import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';

export default function StatsScreen() {
  const { habits = [], completedMissions = [] } = useSelector((state: any) => state.habits);
  const completedHabits = habits.filter((h: any) => h.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Estadísticas</Text>
        <Text style={styles.subtitle}>Conoce tu evolución.</Text>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Hábitos completados</Text>
            <Text style={styles.statValue}>{completedHabits}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Misiones realizadas</Text>
            <Text style={styles.statValue}>{completedMissions.length}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Hábitos creados</Text>
            <Text style={styles.statValue}>{habits.length}</Text>
          </View>
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
  statsCard: { backgroundColor: '#EBE5DA', padding: 20, borderRadius: 15 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  statLabel: { fontSize: 16, color: '#705849' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#342F29' },
  divider: { height: 1, backgroundColor: '#D3C9BD' },
});