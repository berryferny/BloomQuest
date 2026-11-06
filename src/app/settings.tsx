import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function SettingsScreen() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showComingSoon = () => {
    setToastMessage(`La sección de Accesibilidad estará disponible pronto.`);
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
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings-notifications')}>
            <Text style={styles.menuText}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings-privacy')}>
            <Text style={styles.menuText}>Privacidad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={showComingSoon}>
            <Text style={styles.menuText}>Accesibilidad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings-help')}>
            <Text style={styles.menuText}>Ayuda</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver al perfil</Text>
        </TouchableOpacity>
      </ScrollView>

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
  toastContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#342F29',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  toastText: { color: '#F8F5EF', fontSize: 14, fontWeight: '500' },
});