import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import { deleteHabit, toggleHabit } from '../store/habitsSlice';

export default function HabitsScreen() {
  const { habits = [] } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();
  
  const [habitToDelete, setHabitToDelete] = useState<{ id: string, name: string } | null>(null);

  const confirmDelete = () => {
    if (habitToDelete) {
      dispatch(deleteHabit(habitToDelete.id));
      setHabitToDelete(null);
    }
  };

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
              <View key={habit.id} style={styles.habitCard}>
                <TouchableOpacity 
                  style={styles.habitClickableArea}
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
                    <Text style={styles.habitFreq}>
                      {habit.days && habit.days.length > 0 
                        ? habit.days.map((d: string) => d.charAt(0)).join(', ') 
                        : 'Sin días'} 
                      {' · '} 
                      {habit.time || 'Sin hora'}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* BOTÓN DE EDITAR (EL LÁPIZ) */}
                <TouchableOpacity 
                  onPress={() => router.push({ pathname: '/create-habit', params: { id: habit.id } })} 
                  style={styles.actionButton}
                >
                  <Ionicons name="pencil" size={20} color="#705849" />
                </TouchableOpacity>

                {/* BOTÓN DE ELIMINAR */}
                <TouchableOpacity 
                  onPress={() => setHabitToDelete({ id: habit.id, name: habit.name })} 
                  style={styles.actionButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#C0392B" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create-habit')}>
          <Text style={styles.addButtonText}>Agregar un hábito</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav />

      <Modal
        visible={!!habitToDelete}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setHabitToDelete(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="warning-outline" size={40} color="#C0392B" style={{ marginBottom: 10 }} />
            <Text style={styles.modalTitle}>Eliminar hábito</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro que quieres eliminar "{habitToDelete?.name}"?
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setHabitToDelete(null)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.deleteConfirmButton} onPress={confirmDelete}>
                <Text style={styles.deleteConfirmText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  habitCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EBE5DA', paddingRight: 10 },
  habitClickableArea: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 15 },
  habitInfo: { marginLeft: 15, flex: 1 },
  habitName: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  habitCompleted: { textDecorationLine: 'line-through', color: '#9BAA91' },
  habitFreq: { fontSize: 12, color: '#9BAA91', marginTop: 4 },
  actionButton: { padding: 10 },
  addButton: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center' },
  addButtonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(52, 47, 41, 0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#F8F5EF', borderRadius: 15, padding: 25, width: '100%', maxWidth: 400, alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  modalText: { fontSize: 16, color: '#705849', textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancelButton: { flex: 1, backgroundColor: '#EBE5DA', padding: 12, borderRadius: 8, alignItems: 'center', marginRight: 10 },
  cancelButtonText: { color: '#705849', fontWeight: 'bold', fontSize: 16 },
  deleteConfirmButton: { flex: 1, backgroundColor: '#C0392B', padding: 12, borderRadius: 8, alignItems: 'center', marginLeft: 10 },
  deleteConfirmText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});