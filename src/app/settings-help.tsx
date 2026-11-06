import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function HelpSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Ayuda</Text>
        <Text style={styles.subtitle}>Estamos aquí para orientarte.</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuTitle}>Preguntas frecuentes</Text>
              <Text style={styles.menuSubtitle}>Respuestas sobre BloomQuest</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuTitle}>Cómo funcionan las monedas</Text>
              <Text style={styles.menuSubtitle}>Hábitos, juegos y recompensas</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuTitle}>Consejos de uso</Text>
              <Text style={styles.menuSubtitle}>Cómo aprovechar tu jardín</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuTitle}>Contacto y soporte</Text>
              <Text style={styles.menuSubtitle}>Formulario de ayuda simulado</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  menuTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  menuSubtitle: { fontSize: 12, color: '#705849', marginTop: 4 },
});