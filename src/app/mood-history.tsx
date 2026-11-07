import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import BQLogo from '../components/BQLogo';
import { deleteMood } from '../store/habitsSlice';

export default function MoodHistoryScreen() {
  const { moodHistory = [] } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();
  const [moodToDelete, setMoodToDelete] = useState<any>(null);

  const confirmDelete = () => {
    if (moodToDelete !== null) {
      dispatch(deleteMood(moodToDelete));
      setMoodToDelete(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo size={40} />
        <Text style={styles.title}>Mi historial emocional</Text>
        <Text style={styles.subtitle}>Observa cómo cambian tus días.</Text>

        <View style={styles.historyBox}>
          {moodHistory.length === 0 ? (
            <Text style={styles.emptyText}>Aún no has registrado emociones.</Text>
          ) : (
            moodHistory.map((entry: any, index: number) => (
              <View key={entry.id || index} style={styles.historyItem}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyDate}>{entry.date}</Text>
                  <Text style={styles.historyEmoji}>{entry.emoji}</Text>
                  <Text style={styles.historyMood}>{entry.mood}</Text>
                </View>
                <TouchableOpacity onPress={() => setMoodToDelete(entry.id || index)} style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={20} color="#C0392B" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/mood')}>
          <Text style={styles.buttonText}>Registrar otra emoción</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={moodToDelete !== null} transparent={true} animationType="fade" onRequestClose={() => setMoodToDelete(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="warning-outline" size={40} color="#C0392B" style={{ marginBottom: 10 }} />
            <Text style={styles.modalTitle}>Eliminar registro</Text>
            <Text style={styles.modalText}>¿Estás seguro que quieres borrar esta emoción de tu historial?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setMoodToDelete(null)}>
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
  header: { paddingHorizontal: 10, paddingTop: 10 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  historyBox: { backgroundColor: '#EBE5DA', borderRadius: 15, padding: 15, marginBottom: 25 },
  emptyText: { color: '#705849', fontStyle: 'italic', textAlign: 'center', padding: 20 },
  historyItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 10 },
  historyInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  historyDate: { flex: 1, fontSize: 14, color: '#705849', textTransform: 'capitalize' },
  historyEmoji: { fontSize: 24, marginRight: 10 },
  historyMood: { fontSize: 16, fontWeight: 'bold', color: '#342F29', width: 90 },
  deleteButton: { padding: 5 },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
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