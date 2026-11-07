=========================================================
1. COPIA ESTO EN TU ARCHIVO README.md
=========================================================

# 🌱 BloomQuest - Pequeños hábitos, grandes cambios.

BloomQuest es una aplicación móvil diseñada para ayudar a los usuarios a construir hábitos saludables, mantener una racha diaria de constancia y relajarse mediante minijuegos y un jardín virtual interactivo.

## 🚀 Tecnologías Utilizadas

*   **React Native & Expo:** Para el desarrollo multiplataforma (iOS, Android y Web).
*   **Expo Router:** Para la navegación entre pantallas.
*   **TypeScript:** Para un código robusto y libre de errores.
*   **Redux Toolkit:** Para el manejo del estado global (hábitos, monedas, jardín).
*   **Redux Persist:** Para guardar el progreso localmente.
*   **Supabase:** Base de datos PostgreSQL en la nube y autenticación de usuarios (Login/Registro).
*   **React Native Chart Kit:** Para visualización de datos (gráficas de emociones).

## ✨ Características Principales

*   **Autenticación Segura:** Registro e inicio de sesión con Supabase Auth.
*   **Gestión de Hábitos:** Crea, edita, elimina y completa hábitos diarios. Selección de días de la semana y recordatorios.
*   **Jardín Virtual:** Compra semillas, riégalas una vez al día y observa cómo crecen hasta florecer.
*   **Sistema de Recompensas:** Gana monedas completando hábitos, misiones y minijuegos.
*   **Registro Emocional:** Anota cómo te sientes y visualiza tu progreso en una gráfica personalizada.
*   **Zona de Juegos:** Minijuegos interactivos (Memoria Floral, Trivia, Atrapa Estrellas, etc.).

## 🛠️ Instalación y Ejecución Local

1. Clona este repositorio:
   git clone https://github.com/berryferny/BloomQuest.git

2. Entra al directorio del proyecto:
   cd BloomQuest

3. Instala las dependencias:
   npm install

4. Configura las variables de entorno:
   Crea un archivo .env en la raíz del proyecto y agrega tus credenciales de Supabase:
   EXPO_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_llave_publica

5. Inicia el servidor de desarrollo:
   npx expo start -c

6. Escanea el código QR con la app Expo Go en tu celular o presiona w para abrirlo en el navegador.

---
*Desarrollado con 💚 para florecer a tu propio ritmo.*


=========================================================
2. COPIA ESTO EN TU ARCHIVO src/app/register.tsx
=========================================================

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import BackButton from '../components/BackButton';
import { supabase } from '../lib/supabase';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validaciones
    if (!name || !email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    // Validación básica de correo
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { data: { full_name: name } }
    });

    if (error) {
      Alert.alert('Error al registrar', error.message);
    } else {
      Alert.alert('¡Éxito!', 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.');
      router.replace('/login');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
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
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Mínimo 6 caracteres" placeholderTextColor="#9BAA91" secureTextEntry />
            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="••••••••" placeholderTextColor="#9BAA91" secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Creando cuenta...' : 'Crear mi cuenta'}</Text>
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


=========================================================
3. COMANDOS PARA SUBIR A GIT (Pégalos en la terminal)
=========================================================

git add .
git commit -m "README, validaciones de registro y mejoras visuales"
git push