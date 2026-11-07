import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (password.trim() === '' || password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden o están vacías.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('¡Éxito!', 'Tu contraseña ha sido actualizada.');
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.logoText}>BQ</Text>
          <Text style={styles.title}>Nueva contraseña</Text>
          <Text style={styles.subtitle}>Ingresa tu nueva clave para BloomQuest.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nueva contraseña</Text>
            <TextInput 
              style={styles.input} 
              value={password} 
              onChangeText={setPassword} 
              placeholder="••••••••" 
              placeholderTextColor="#9BAA91" 
              secureTextEntry 
            />

            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput 
              style={styles.input} 
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
              placeholder="••••••••" 
              placeholderTextColor="#9BAA91" 
              secureTextEntry 
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdatePassword} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Actualizando...' : 'Actualizar contraseña'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  logoText: { fontSize: 40, fontWeight: 'bold', color: '#342F29', textAlign: 'center', marginBottom: 10, fontFamily: 'serif' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#705849', textAlign: 'center', marginBottom: 30 },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20, color: '#342F29' },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});