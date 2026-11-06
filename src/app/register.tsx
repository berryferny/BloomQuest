import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Por ahora simulamos el registro exitoso y vamos al home
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.logoText}>BQ</Text>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>¡Comienza a florecer con nosotros!</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tu nombre" placeholderTextColor="#9BAA91" />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="ejemplo@correo.com" placeholderTextColor="#9BAA91" keyboardType="email-address" autoCapitalize="none" />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor="#9BAA91" secureTextEntry />

            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="••••••••" placeholderTextColor="#9BAA91" secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Crear mi cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => router.back()}>
              <Text style={styles.linkText}>Ya tengo cuenta - Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 15, color: '#342F29' },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  linkButton: { marginTop: 15, alignItems: 'center' },
  linkText: { color: '#705849', fontSize: 14, fontWeight: '500' },
});