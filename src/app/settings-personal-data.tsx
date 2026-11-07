import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import BQLogo from '../components/BQLogo';
import { supabase } from '../lib/supabase';
import { setUserName } from '../store/habitsSlice';

export default function PersonalDataScreen() {
  const { userName = 'Persona Bloom' } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();
  
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) setEmail(user.email);
    };
    getUserData();
  }, []);

  const handleSave = async () => {
    if (name.trim() === '') {
      Alert.alert("Error", "El nombre no puede estar vacío.");
      return;
    }
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      email: email, 
      data: { full_name: name }
    });
    
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      dispatch(setUserName(name));
      Alert.alert("¡Éxito!", "Tus datos se han actualizado.");
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/profile');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <BQLogo size={40} />
          <Text style={styles.title}>Datos personales</Text>
          <Text style={styles.subtitle}>Edita tu nombre y correo electrónico.</Text>

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
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#9BAA91"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>Si cambias el correo, recibirás un enlace de confirmación.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar cambios'}</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 30 },
  formContainer: { marginBottom: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, fontSize: 16, color: '#342F29', marginBottom: 15 },
  helperText: { fontSize: 12, color: '#9BAA91', fontStyle: 'italic', marginTop: -5, marginBottom: 15 },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});