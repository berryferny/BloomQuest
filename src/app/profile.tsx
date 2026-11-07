import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
import { supabase } from '../lib/supabase';
import { logout, setAvatarUrl } from '../store/habitsSlice';

export default function ProfileScreen() {
  const { habits = [], coins = 0, avatarUrl = null, userName = 'Persona Bloom' } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  const completedHabits = habits.filter((h: any) => h.completed).length;

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: async () => {
          await supabase.auth.signOut();
          dispatch(logout());
          router.replace('/login');
      }}
    ]);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para cambiar el avatar.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0].uri) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const response = await fetch(uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();
      
      const fileExt = uri.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, arrayBuffer, { contentType: `image/${fileExt}` });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      dispatch(setAvatarUrl(data.publicUrl));
      Alert.alert("¡Listo!", "Tu foto de perfil ha sido actualizada.");

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.logoText}>BQ</Text>
            <Text style={styles.title}>Mi perfil</Text>
          </View>
          
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} disabled={uploading}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="#9BAA91" />
              </View>
            )}
            <View style={styles.editIcon}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Hola, {userName}. Tu recorrido y tus logros.</Text>

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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginBottom: 25 },
  
  avatarContainer: { position: 'relative' },
  avatarImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: '#9BAA91' },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#EBE5DA', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#9BAA91' },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#705849', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F8F5EF' },

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