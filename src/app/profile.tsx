import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import { supabase } from '../lib/supabase';
import { logout } from '../store/authSlice';

export default function ProfileScreen() {
  const { habits = [], coins = 0 } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();

  const completedHabits = habits.filter((h: any) => h.completed).length;

  const handleLogout = async () => {
    // Función que cierra la sesión de verdad
    const performLogout = async () => {
      await supabase.auth.signOut(); // Cierra sesión en Supabase
      dispatch(logout()); // Limpia Redux
      router.replace('/login'); // Te manda al login
    };

    // Si estamos en la PC (Web), usamos una confirmación del navegador
    if (Platform.OS === 'web') {
      const confirm = window.confirm("¿Estás seguro que quieres salir de BloomQuest?");
      if (confirm) {
        await performLogout();
      }
    } else {
      // Si estamos en el celular, usamos la alerta normal
      Alert.alert(
        "Cerrar sesión",
        "¿Estás seguro que quieres salir de BloomQuest?",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Salir", 
            style: "destructive", 
            onPress: performLogout 
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.subtitle}>Tu recorrido y tus logros.</Text>

        <View style={styles.adventureCard}>
          <Text style={styles.adventureTitle}>🌸 Mi aventura</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>🪙 {coins}</Text>
              <Text style={styles.statLabel}>Monedas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>✅ {completedHabits}</Text>
              <Text style={styles.statLabel}>Completados</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/achievements')}>
            <Text style={styles.menuText}>Mis logros</Text>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/stats')}>
            <Text style={styles.menuText}>Estadísticas</Text>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
            <Text style={styles.menuText}>Configuración</Text>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  adventureCard: { backgroundColor: '#EBE5DA', padding: 20, borderRadius: 15, marginBottom: 30 },
  adventureTitle: { fontSize: 18, fontWeight: 'bold', color: '#342F29', marginBottom: 15 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#342F29', marginBottom: 5 },
  statLabel: { fontSize: 12, color: '#705849' },
  statDivider: { width: 1, height: 40, backgroundColor: '#D3C9BD' },
  menuContainer: { marginBottom: 30 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 18, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EBE5DA' },
  menuText: { fontSize: 16, color: '#342F29', fontWeight: '500' },
  logoutButton: { padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#D3C9BD' },
  logoutText: { color: '#705849', fontSize: 16, fontWeight: 'bold' },
});