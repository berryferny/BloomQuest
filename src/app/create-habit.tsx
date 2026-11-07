import BQLogo from '@/components/BQLogo';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import { addHabit, updateHabit } from '../store/habitsSlice';

const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const HOURS = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const MINUTES = ['00','15','30','45'];

export default function CreateHabitScreen() {
  // 1. Detectamos si venimos a editar
  const { id } = useLocalSearchParams();
  const { habits } = useSelector((state: any) => state.habits);
  const existingHabit = habits.find((h: any) => h.id === id);

  const [habitName, setHabitName] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [loading, setLoading] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [tempHour, setTempHour] = useState('08');
  const [tempMinute, setTempMinute] = useState('00');
  const [tempAmPm, setTempAmPm] = useState('AM');

  const dispatch = useDispatch();

  // 2. Si venimos a editar, llenamos los campos automáticamente
  useEffect(() => {
    if (existingHabit) {
      setHabitName(existingHabit.name);
      setSelectedDays(existingHabit.days || []);
      setSelectedTime(existingHabit.time || '08:00 AM');
    }
  }, [existingHabit]);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const saveTime = () => {
    setSelectedTime(`${tempHour}:${tempMinute} ${tempAmPm}`);
    setModalVisible(false);
  };

  const handleSave = () => {
    if (habitName.trim() === '') {
      Alert.alert('Error', 'Por favor escribe un nombre para el hábito.');
      return;
    }
    if (selectedDays.length === 0) {
      Alert.alert('Error', 'Por favor selecciona al menos un día.');
      return;
    }

    setLoading(true);

    if (existingHabit) {
      // Si estamos editando, actualizamos
      dispatch(updateHabit({ 
        id: existingHabit.id, 
        name: habitName, 
        days: selectedDays, 
        time: selectedTime 
      }));
    } else {
      // Si es nuevo, lo agregamos
      dispatch(addHabit({
        id: Date.now().toString(),
        name: habitName,
        completed: false,
        days: selectedDays,
        time: selectedTime
      }));
    }

    setLoading(false);
    router.replace('/habits'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo />
        {/* 3. Título dinámico */}
        <Text style={styles.title}>{existingHabit ? 'Editar hábito' : 'Nuevo hábito'}</Text>
        <Text style={styles.subtitle}>{existingHabit ? 'Ajusta tus detalles' : 'Construye una rutina a tu ritmo'}</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre del hábito</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Leer 10 minutos" 
            placeholderTextColor="#9BAA91"
            value={habitName}
            onChangeText={setHabitName}
          />

          <Text style={styles.label}>Días de la semana</Text>
          <View style={styles.daysRow}>
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <TouchableOpacity 
                  key={day} 
                  style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                    {day.charAt(0)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Hora del recordatorio</Text>
          <TouchableOpacity style={styles.inputFake} onPress={() => setModalVisible(true)}>
            <Text style={styles.inputText}>{selectedTime}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar hábito'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona la hora</Text>
            
            <View style={styles.timeSelectorRow}>
              <View style={styles.timeColumn}>
                {HOURS.map(h => (
                  <TouchableOpacity key={h} onPress={() => setTempHour(h)} style={[styles.timeOption, tempHour === h && styles.timeOptionActive]}>
                    <Text style={[styles.timeOptionText, tempHour === h && styles.timeOptionTextActive]}>{h}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.timeColumn}>
                {MINUTES.map(m => (
                  <TouchableOpacity key={m} onPress={() => setTempMinute(m)} style={[styles.timeOption, tempMinute === m && styles.timeOptionActive]}>
                    <Text style={[styles.timeOptionText, tempMinute === m && styles.timeOptionTextActive]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.timeColumn}>
                {['AM', 'PM'].map(ap => (
                  <TouchableOpacity key={ap} onPress={() => setTempAmPm(ap)} style={[styles.timeOption, tempAmPm === ap && styles.timeOptionActive]}>
                    <Text style={[styles.timeOptionText, tempAmPm === ap && styles.timeOptionTextActive]}>{ap}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={saveTime}>
              <Text style={styles.closeButtonText}>Listo</Text>
            </TouchableOpacity>
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
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 30 },
  formContainer: { marginBottom: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20, color: '#342F29' },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  dayButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', justifyContent: 'center', alignItems: 'center' },
  dayButtonSelected: { backgroundColor: '#9BAA91', borderColor: '#9BAA91' },
  dayText: { fontSize: 16, fontWeight: 'bold', color: '#705849' },
  dayTextSelected: { color: '#FFFFFF' },
  inputFake: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, marginBottom: 20 },
  inputText: { fontSize: 16, color: '#342F29' },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(52, 47, 41, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F8F5EF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: 350 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#342F29', marginBottom: 20, textAlign: 'center' },
  timeSelectorRow: { flexDirection: 'row', justifyContent: 'space-around', height: 150 },
  timeColumn: { alignItems: 'center', overflow: 'hidden' },
  timeOption: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, marginBottom: 2 },
  timeOptionActive: { backgroundColor: '#EBE5DA' },
  timeOptionText: { fontSize: 16, color: '#705849' },
  timeOptionTextActive: { color: '#342F29', fontWeight: 'bold' },
  closeButton: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  closeButtonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});