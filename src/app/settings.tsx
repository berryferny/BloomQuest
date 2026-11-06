import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function SettingsScreen() {
  // Estado para mostrar el mensaje flotante
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showComingSoon = (feature: string) => {
    setToastMessage(`La sección de ${feature} estará disponible pronto.`);
    // Ocultar el mensaje después de 2.5 segundos
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>Personaliza tu experiencia</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon('Notificaciones')}>
            <Text style={styles.menuText}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon('Privacidad')}>
            <Text style={styles.menuText}>Privacidad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon('Accesibilidad')}>
            <Text style={styles.menuText}>Accesibilidad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon('Ayuda')}>
            <Text style={styles.menuText}>Ayuda</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver al perfil</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Aquí se muestra el mensaje flotante si es que hay uno activo */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
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
  
  menuContainer: { marginBottom: 30 },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  menuText: { fontSize: 16, color: '#342F29', fontWeight: '500' },

  backButton: {
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },

  // Estilos del mensajito flotante
  toastContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#342F29',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: { color: '#F8F5EF', fontSize: 14, fontWeight: '500' },
});