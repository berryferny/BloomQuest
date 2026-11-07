import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import BQLogo from '../components/BQLogo';
import { fetchHabitsFromDb } from '../lib/habitsDb';
import { checkDailyStreak, resetHabitsDaily, setHabitsFromDb, toggleHabit } from '../store/habitsSlice';

export default function HomeScreen() {
  const { 
    habits = [], coins = 0, streak = 0, userName = 'Persona Bloom' 
  } = useSelector((state: any) => state.habits);
  
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const dbHabits = await fetchHabitsFromDb();
      if (dbHabits.length > 0) dispatch(setHabitsFromDb(dbHabits));
      setIsFetching(false);
    };

    loadData();
    dispatch(checkDailyStreak());
    dispatch(resetHabitsDaily());
  }, [dispatch]);

  const handleToggle = (id: string, isCompleted: boolean) => {
    dispatch(toggleHabit(id));
    if (!isCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  if (isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F5EF' }}>
        <ActivityIndicator size="large" color="#705849" />
        <Text style={{ marginTop: 10, color: '#705849', fontWeight: 'bold' }}>Cargando tu jardín...</Text>
      </View>
    );
  }

  const totalHabits = habits.length;
  const completedHabits = habits.filter((h: any) => h.completed).length;
  const progressPercent = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BQLogo size={45} />
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 {streak} días</Text>
            </View>
          </View>
          <Text style={styles.greeting}>¡Buen día, {userName}!</Text>
          <Text style={styles.subtitle}>Hoy es un buen día para seguir creciendo.</Text>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Tu progreso de hoy</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressStats}>{completedHabits} de {totalHabits} hábitos</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tus hábitos</Text>
        
        {habits.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="leaf-outline" size={60} color="#9BAA91" />
            <Text style={styles.emptyStateTitle}>Tu jardín está esperando</Text>
            <Text style={styles.emptyStateText}>Crea tu primer hábito para empezar a florecer.</Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push('/create-habit')}>
              <Text style={styles.emptyStateButtonText}>+ Crear mi primer hábito</Text>
            </TouchableOpacity>
          </View>
        ) : (
          habits.slice(0, 4).map((habit: any) => (
            <TouchableOpacity 
              key={habit.id} 
              style={styles.habitItem}
              onPress={() => handleToggle(habit.id, habit.completed)}
            >
              <Ionicons 
                name={habit.completed ? "checkmark-circle" : "ellipse-outline"} 
                size={24} 
                color={habit.completed ? "#9BAA91" : "#342F29"} 
              />
              <Text style={[styles.habitText, habit.completed && styles.habitCompleted]}>
                {habit.name}
              </Text>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  streakBadge: { backgroundColor: '#EBE5DA', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#D3C9BD' },
  streakText: { fontSize: 16, fontWeight: 'bold', color: '#705849' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5 },
  progressCard: { backgroundColor: '#EBE5DA', padding: 20, borderRadius: 15, marginBottom: 20 },
  progressTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressStats: { fontSize: 14, color: '#705849' },
  progressPercent: { fontSize: 14, fontWeight: 'bold', color: '#705849' },
  progressBarBackground: { height: 8, backgroundColor: '#D3C9BD', borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: '#705849', borderRadius: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#342F29', marginBottom: 15 },
  habitItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EBE5DA' },
  habitText: { fontSize: 16, color: '#342F29', marginLeft: 15 },
  habitCompleted: { textDecorationLine: 'line-through', color: '#9BAA91' },
  emptyStateContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  emptyStateTitle: { fontSize: 20, fontWeight: 'bold', color: '#342F29', marginTop: 15, marginBottom: 5 },
  emptyStateText: { fontSize: 14, color: '#705849', textAlign: 'center', marginBottom: 20 },
  emptyStateButton: { backgroundColor: '#705849', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10 },
  emptyStateButtonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});