import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function DeleteAccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.content}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Eliminar cuenta</Text>
        <Text style={styles.subtitle}>Pantalla demostrativa · no elimina datos</Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>¿Seguro que deseas eliminar tu cuenta?</Text>
          <Text style={styles.warningText}>
            Esta acción sería permanente en una aplicación real. Aquí solo se simula el proceso.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancelar y volver</Text>
        </TouchableOpacity>
      </View>
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
  warningBox: { marginBottom: 30 },
  warningTitle: { fontSize: 18, fontWeight: 'bold', color: '#C0392B', marginBottom: 10 },
  warningText: { fontSize: 15, color: '#705849', lineHeight: 24 },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});