import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BQLogo from '../components/BQLogo';
import { supabase } from '../lib/supabase';
import { setUserName } from '../store/habitsSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    setLoading(true);
    
    // 1. Intentamos iniciar sesión
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      // 2. Si falla (porque el usuario no existe), lo registramos automáticamente
      console.log("Usuario no encontrado, registrando automáticamente...");
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { data: { full_name: 'Usuario de Prueba' } }
      });

      if (signUpError) {
        Alert.alert('Error de acceso', signUpError.message);
      } else {
        // Si el registro fue exitoso, entramos directo
        dispatch(setUserName('Usuario de Prueba'));
        router.replace('/onboarding');
      }
    } else {
      // 3. Si el login fue exitoso, entramos normal
      const userName = data.user?.user_metadata?.full_name || 'Persona Bloom';
      dispatch(setUserName(userName));
      router.replace('/home');
    }
    
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          
          <BQLogo size={50} />
          <Text style={styles.slogan}>Pequeños hábitos, grandes cambios.</Text>
          <Text style={styles.title}>¡Hola de nuevo!</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput style={styles.input} placeholder="ejemplo@correo.com" placeholderTextColor="#9BAA91" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9BAA91" secureTextEntry value={password} onChangeText={setPassword} />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Iniciar sesión'}</Text>
            </TouchableOpacity>
            
            <Text style={styles.hintText}>
              (Si el correo no existe, se creará automáticamente)
            </Text>

            <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/recover-password')}>
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  keyboardView: { flex: 1 },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  slogan: { fontSize: 14, color: '#705849', textAlign: 'center', marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29', marginBottom: 20 },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20, color: '#342F29' },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  hintText: { fontSize: 12, color: '#9BAA91', textAlign: 'center', marginTop: 10, fontStyle: 'italic' },
  linkButton: { marginTop: 25, alignItems: 'center' },
  linkText: { color: '#705849', fontSize: 14, textDecorationLine: 'underline' },
});