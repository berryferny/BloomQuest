import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BQLogo from '../../components/BQLogo';
import { supabase } from '../../lib/supabase';
import { logout, setAvatarUrl } from '../../store/habitsSlice';

const DEFAULT_AVATARS = [
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_boy.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_fox.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_girl.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_man.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_woman.jpg"
];

export default function ProfileScreen() {
  const { habits = [], coins = 0, avatarUrl = null, userName = 'Persona Bloom' } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();
  
  const [modalVisible, setModalVisible] = useState(false);
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

  const saveAvatarToDb = async (url: string) => {
    dispatch(setAvatarUrl(url));
    setModalVisible(false);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('profiles').upsert({ id: user.id, avatar_url: url });
      if (error) console.error("Error al guardar avatar:", error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled && result.assets[0].uri) uploadImage(result.assets[0].uri);
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
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, arrayBuffer, { contentType: `image/${fileExt}` });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      await saveAvatarToDb(data.publicUrl);
      Alert.alert("¡Listo!", "Foto de perfil actualizada.");
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
          <BQLogo size={45} />
          <TouchableOpacity style={styles.avatarContainer} onPress={() => setModalVisible(true)} disabled={uploading}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}><Ionicons name="person" size={40} color="#9BAA91" /></View>
            )}
            <View style={styles.editIcon}><Ionicons name="camera" size={16} color="#FFF" /></View>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Hola, {userName}. Tu recorrido y tus logros.</Text>

        <View style={styles.adventureCard}>
          <Text style={styles.adventureTitle}>🌸 Mi aventura</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}><Text style={styles.statValue}>🪙 {coins}</Text><Text style={styles.statLabel}>Monedas</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}><Text style={styles.statValue}>✅ {completedHabits}</Text><Text style={styles.statLabel}>Completados</Text></View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings-personal-data')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="person-outline" size={20} color="#705849" style={{ marginRight: 10 }} /><Text style={styles.menuText}>Editar nombre y correo</Text></View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/achievements')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="trophy-outline" size={20} color="#705849" style={{ marginRight: 10 }} /><Text style={styles.menuText}>Mis logros</Text></View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/stats')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="bar-chart-outline" size={20} color="#705849" style={{ marginRight: 10 }} /><Text style={styles.menuText}>Estadísticas</Text></View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="settings-outline" size={20} color="#705849" style={{ marginRight: 10 }} /><Text style={styles.menuText}>Configuración</Text></View>
            <Ionicons name="chevron-forward" size={20} color="#9BAA91" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar foto de perfil</Text>
            <TouchableOpacity style={styles.uploadGalleryBtn} onPress={pickImage} disabled={uploading}>
              <Ionicons name="image-outline" size={20} color="#FFF" />
              <Text style={styles.uploadGalleryText}>{uploading ? 'Subiendo...' : 'Subir de mi galería'}</Text>
            </TouchableOpacity>
            <Text style={styles.label}>O elige uno de nuestros avatares</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarList}>
              {DEFAULT_AVATARS.map((url, index) => (
                <TouchableOpacity key={index} style={[styles.avatarOption, avatarUrl === url && styles.avatarOptionSelected]} onPress={() => saveAvatarToDb(url)}>
                  <Image source={{ uri: url }} style={styles.avatarThumb} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  scrollContent: { padding: 20, paddingBottom: 40, paddingTop: 10 }, 
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#705849', marginBottom: 25 },
  avatarContainer: { position: 'relative' },
  avatarImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#9BAA91' },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EBE5DA', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#9BAA91' },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#705849', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F8F5EF' },
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(52, 47, 41, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F8F5EF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: 350 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#342F29', marginBottom: 20, textAlign: 'center' },
  uploadGalleryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#705849', padding: 15, borderRadius: 10, marginBottom: 10 },
  uploadGalleryText: { color: '#FFF', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8, textAlign: 'center' },
  avatarList: { flexDirection: 'row', marginTop: 10, marginBottom: 20 },
  avatarOption: { marginRight: 15, borderWidth: 3, borderColor: 'transparent', borderRadius: 35, padding: 2 },
  avatarOptionSelected: { borderColor: '#9BAA91' },
  avatarThumb: { width: 60, height: 60, borderRadius: 30 },
  closeButton: { padding: 15, backgroundColor: '#EBE5DA', borderRadius: 10, alignItems: 'center', marginTop: 10 },
  closeButtonText: { color: '#705849', fontSize: 16, fontWeight: 'bold' },
});