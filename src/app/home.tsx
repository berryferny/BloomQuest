import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import { checkDailyStreak, toggleHabit } from '../store/habitsSlice';

export default function HomeScreen() {
  // Agregamos userName para leerlo de Redux
  const { habits = [], coins = 0, streak = 0, userName = 'Persona Bloom' } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();

  // Revisar racha al montar la pantalla
  useEffect(() => {
    dispatch(checkDailyStreak());
  }, [dispatch]);

  const totalHabits = habits.length;
  const completedHabits = habits.filter((h: any) => h.completed).length;
  const progressPercent = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Encabezado con Racha y Nombre */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logoText}>BQ</Text>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 {streak} días</Text>
            </View>
          </View>
          <Text style={styles.greeting}>¡Buen día, {userName}!</Text>
          <Text style={styles.subtitle}>Hoy es un buen día para seguir creciendo.</Text>
        </View>

        {/* Tarjeta de Progreso */}
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

        {/* Lista de Hábitos Rápida */}
        <Text style={styles.sectionTitle}>Tus hábitos</Text>
        {habits.length === 0 ? (
          <Text style={styles.emptyText}>No tienes hábitos aún.</Text>
        ) : (
          habits.slice(0, 3).map((habit: any) => (
            <TouchableOpacity 
              key={habit.id} 
              style={styles.habitItem}
              onPress={() => dispatch(toggleHabit(habit.id))}
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

        {/* Botón Crear Hábito */}
        <TouchableOpacity style={styles.createButton} onPress={() => router.push('/create-habit')}>
          <Text style={styles.createButtonText}>+ Crear hábito</Text>
        </TouchableOpacity>

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
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29' },
  streakBadge: {
    backgroundColor: '#EBE5DA',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D3C9BD',
  },
  streakText: { fontSize: 16, fontWeight: 'bold', color: '#705849' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5 },
  
  progressCard: {
    backgroundColor: '#EBE5DA',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  progressTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressStats: { fontSize: 14, color: '#705849' },
  progressPercent: { fontSize: 14, fontWeight: 'bold', color: '#705849' },
  progressBarBackground: { height: 8, backgroundColor: '#D3C9BD', borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: '#705849', borderRadius: 4 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#342F29', marginBottom: 15 },
  emptyText: { color: '#705849', fontStyle: 'italic', marginBottom: 15 },
  
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  habitText: { fontSize: 16, color: '#342F29', marginLeft: 15 },
  habitCompleted: { textDecorationLine: 'line-through', color: '#9BAA91' },

  createButton: {
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});