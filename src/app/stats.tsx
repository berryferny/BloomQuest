import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import BQLogo from '../components/BQLogo';

export default function StatsScreen() {
  const { habits = [], completedMissions = [], moodHistory = [] } = useSelector((state: any) => state.habits);
  const completedHabits = habits.filter((h: any) => h.completed).length;

  const moodCounts = { 'Triste': 0, 'Estresada': 0, 'Cansada': 0, 'En calma': 0, 'Feliz': 0 };
  moodHistory.forEach((entry: any) => {
    if (moodCounts[entry.mood as keyof typeof moodCounts] !== undefined) moodCounts[entry.mood as keyof typeof moodCounts]++;
  });

  const maxCount = Math.max(...Object.values(moodCounts), 1);
  const totalMoods = moodHistory.length;

  const moodData = [
    { label: 'Triste', emoji: '😢', count: moodCounts['Triste'], color: '#A8B5C4' },
    { label: 'Estresada', emoji: '😫', count: moodCounts['Estresada'], color: '#D3B8B0' },
    { label: 'Cansada', emoji: '🥱', count: moodCounts['Cansada'], color: '#C8C3A9' },
    { label: 'En calma', emoji: '😌', count: moodCounts['En calma'], color: '#9BAA91' },
    { label: 'Feliz', emoji: '😊', count: moodCounts['Feliz'], color: '#705849' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo size={40} />
        <Text style={styles.title}>Estadísticas</Text>
        <Text style={styles.subtitle}>Conoce tu evolución.</Text>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tu historial emocional</Text>
          <Text style={styles.chartSubtitle}>Has registrado {totalMoods} emociones en total.</Text>
          {totalMoods === 0 ? (
            <Text style={styles.emptyText}>Registra emociones para ver tu gráfica.</Text>
          ) : (
            <View style={styles.chartArea}>
              {moodData.map((mood, index) => {
                const barHeight = mood.count > 0 ? Math.max((mood.count / maxCount) * 120, 15) : 0;
                return (
                  <View key={index} style={styles.barWrapper}>
                    <Text style={styles.barCount}>{mood.count > 0 ? mood.count : ''}</Text>
                    <View style={[styles.bar, { height: barHeight, backgroundColor: mood.color }]} />
                    <Text style={styles.barEmoji}>{mood.emoji}</Text>
                    <Text style={styles.barLabel}>{mood.label}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}><Text style={styles.statLabel}>Hábitos completados hoy</Text><Text style={styles.statValue}>{completedHabits}</Text></View>
          <View style={styles.divider} />
          <View style={styles.statRow}><Text style={styles.statLabel}>Misiones completadas hoy</Text><Text style={styles.statValue}>{completedMissions.length}</Text></View>
          <View style={styles.divider} />
          <View style={styles.statRow}><Text style={styles.statLabel}>Hábitos creados</Text><Text style={styles.statValue}>{habits.length}</Text></View>
        </View>
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
  chartContainer: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#EBE5DA' },
  chartTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  chartSubtitle: { fontSize: 12, color: '#9BAA91', marginBottom: 20, marginTop: 5 },
  emptyText: { color: '#705849', fontStyle: 'italic', paddingVertical: 20, textAlign: 'center' },
  chartArea: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 180, paddingTop: 20 },
  barWrapper: { alignItems: 'center', width: '18%' },
  barCount: { fontSize: 12, fontWeight: 'bold', color: '#705849', marginBottom: 5, height: 15 },
  bar: { width: '50%', borderRadius: 6 },
  barEmoji: { fontSize: 18, marginTop: 8 },
  barLabel: { fontSize: 10, color: '#705849', marginTop: 2, textAlign: 'center' },
  statsCard: { backgroundColor: '#EBE5DA', padding: 20, borderRadius: 15 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  statLabel: { fontSize: 16, color: '#705849' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#342F29' },
  divider: { height: 1, backgroundColor: '#D3C9BD' },
});