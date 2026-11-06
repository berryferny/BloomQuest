import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
// IMPORTANTE: Asegúrate de importar tu acción. Cambia 'addHabit' por el nombre real de tu acción en habitsSlice.ts
import { addHabit } from '../store/habitsSlice';

export default function CreateHabitScreen() {
  const [habitName, setHabitName] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (habitName.trim() === '') {
      Alert.alert('Error', 'Por favor escribe un nombre para el hábito.');
      return;
    }

    // Aquí enviamos el hábito a Redux
    // Ajusta los campos según lo que pida tu Slice (ej. si pide un ID, un completed: false, etc.)
    dispatch(addHabit({
      id: Date.now().toString(), // Genera un ID rápido
      name: habitName,
      completed: false
    }));

    // Regresamos a la pantalla anterior
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Nuevo hábito</Text>
        <Text style={styles.subtitle}>Construye una rutina a tu ritmo</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre del hábito</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Leer 10 minutos" 
            placeholderTextColor="#9BAA91"
            value={habitName}
            onChangeText={setHabitName}
          />

          <Text style={styles.label}>Frecuencia</Text>
          <TouchableOpacity style={styles.inputFake}>
            <Text style={styles.inputText}>Todos los días</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Hora del recordatorio</Text>
          <TouchableOpacity style={styles.inputFake}>
            <Text style={styles.inputText}>8:00 a. m.</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar hábito</Text>
        </TouchableOpacity>
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
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 30 },
  
  formContainer: { marginBottom: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBE5DA',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#342F29',
  },
  inputFake: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBE5DA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  inputText: { fontSize: 16, color: '#342F29' },

  button: {
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});