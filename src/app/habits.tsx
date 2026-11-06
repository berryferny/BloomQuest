import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import { toggleHabit } from '../store/habitsSlice'; // Importamos la acción

export default function HabitsScreen() {
  const { habits = [] } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Mis hábitos</Text>
        <Text style={styles.subtitle}>Pequeños pasos que hacen la diferencia.</Text>

        <View style={styles.listContainer}>
          {habits.length === 0 ? (
            <Text style={styles.emptyText}>Aún no tienes hábitos.</Text>
          ) : (
            habits.map((habit: any) => (
              // Al tocar la tarjeta, disparamos toggleHabit
              <TouchableOpacity 
                key={habit.id} 
                style={styles.habitCard} 
                onPress={() => dispatch(toggleHabit(habit.id))}
              >
                <Ionicons 
                  name={habit.completed ? "checkmark-circle" : "ellipse-outline"} 
                  size={24} 
                  color={habit.completed ? "#9BAA91" : "#342F29"} 
                />
                <View style={styles.habitInfo}>
                  <Text style={[styles.habitName, habit.completed && styles.habitCompleted]}>
                    {habit.name}
                  </Text>
                  <Text style={styles.habitFreq}>Todos los días · +10 monedas</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create-habit')}>
          <Text style={styles.addButtonText}>Agregar un hábito</Text>
        </TouchableOpacity>

      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 20 },
  listContainer: { marginBottom: 20 },
  emptyText: { color: '#705849', fontStyle: 'italic' },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  habitInfo: { marginLeft: 15, flex: 1 },
  habitName: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  habitCompleted: { textDecorationLine: 'line-through', color: '#9BAA91' }, // Tachado cuando se completa
  habitFreq: { fontSize: 12, color: '#9BAA91', marginTop: 4 },
  addButton: {
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});