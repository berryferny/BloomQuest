import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import { setUserName } from '../store/habitsSlice';

export default function PersonalDataScreen() {
  const { userName = 'Persona Bloom' } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();
  
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('ejemplo@correo.com'); // Simulado

  const handleSave = () => {
    if (name.trim() === '') {
      Alert.alert("Error", "El nombre no puede estar vacío.");
      return;
    }
    dispatch(setUserName(name));
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.logoText}>BQ</Text>
          <Text style={styles.title}>Datos personales</Text>
          <Text style={styles.subtitle}>Tu información en BloomQuest.</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              placeholderTextColor="#9BAA91"
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#EBE5DA', color: '#705849' }]}
              value={email}
              editable={false} // Bloqueado por ahora
            />
            <Text style={styles.helperText}>El correo no se puede cambiar por ahora.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  content: { flex: 1, padding: 20 },
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
    color: '#342F29',
    marginBottom: 15,
  },
  helperText: { fontSize: 12, color: '#9BAA91', fontStyle: 'italic' },

  button: {
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});