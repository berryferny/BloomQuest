import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';
import { supabase } from '../lib/supabase'; // <-- IMPORTANTE

export default function RecoverPasswordScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu correo.');
      return;
    }
    
    setLoading(true);
    // Llamamos a Supabase para que envíe el correo
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.logoText}>BQ</Text>
          <Text style={styles.title}>Recuperar acceso</Text>
          <Text style={styles.subtitle}>Te ayudamos a volver a BloomQuest.</Text>

          {sent ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>¡Instrucciones enviadas!</Text>
              <Text style={styles.successText}>Revisa tu bandeja de entrada en {email}.</Text>
              <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Volver al inicio</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.label}>Ingresa tu correo electrónico</Text>
              <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={setEmail} 
                placeholder="ejemplo@correo.com" 
                placeholderTextColor="#9BAA91" 
                keyboardType="email-address" 
                autoCapitalize="none" 
              />
              <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar instrucciones'}</Text>
              </TouchableOpacity>
            </View>
          )}
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
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20, color: '#342F29' },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  successBox: { backgroundColor: '#EBE5DA', padding: 20, borderRadius: 15, alignItems: 'center' },
  successTitle: { fontSize: 20, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  successText: { fontSize: 14, color: '#705849', textAlign: 'center', marginBottom: 20 },
});