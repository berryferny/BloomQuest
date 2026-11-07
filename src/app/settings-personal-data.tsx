import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import BQLogo from '../components/BQLogo';
import { supabase } from '../lib/supabase';
import { setAvatarUrl, setUserName } from '../store/habitsSlice';

const DEFAULT_AVATARS = [
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_boy.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_fox.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_girl.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_man.jpg",
  "https://lzlkajsrqjevbmnvdnro.supabase.co/storage/v1/object/public/avatars/avatar_woman.jpg"
];

export default function PersonalDataScreen() {
  const { userName = 'Persona Bloom', avatarUrl = null } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();
  
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) setEmail(user.email);
    };
    getUserData();
  }, []);

  const handleSave = async () => {
    if (name.trim() === '') {
      Alert.alert("Error", "El nombre no puede estar vacío.");
      return;
    }
    setLoading(true);
    
    // 1. Actualizamos el nombre y correo en Auth
    const { error } = await supabase.auth.updateUser({
      email: email, 
      data: { full_name: name }
    });
    
    if (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
      return;
    }

    // 2. ACTUALIZAMOS LA FOTO EN LA TABLA PROFILES
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').update({ 
        avatar_url: avatarUrl 
      }).eq('id', user.id);
    }

    setLoading(false);
    dispatch(setUserName(name));
    Alert.alert("¡Éxito!", "Tus datos se han actualizado.");
    
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/profile');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, arrayBuffer, { contentType: `image/${fileExt}` });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      dispatch(setAvatarUrl(data.publicUrl));
      Alert.alert("¡Listo!", "Foto subida. No olvides darle a 'Guardar cambios'.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BQLogo size={40} />
          <Text style={styles.title}>Datos personales</Text>
          <Text style={styles.subtitle}>Tu información en BloomQuest.</Text>

          <View style={styles.avatarSection}>
            <Text style={styles.label}>Tu avatar actual</Text>
            <View style={styles.currentAvatarContainer}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.mainAvatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color="#9BAA91" />
                </View>
              )}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage} disabled={uploading}>
                <Ionicons name="camera" size={20} color="#FFF" />
                <Text style={styles.uploadText}>{uploading ? 'Subiendo...' : 'Subir de galería'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.label, { marginTop: 20 }]}>O elige uno de nuestros avatares</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarList}>
              {DEFAULT_AVATARS.map((url, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.avatarOption, avatarUrl === url && styles.avatarOptionSelected]} 
                  onPress={() => dispatch(setAvatarUrl(url))}
                >
                  <Image source={{ uri: url }} style={styles.avatarThumb} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tu nombre" placeholderTextColor="#9BAA91" />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="ejemplo@correo.com" placeholderTextColor="#9BAA91" keyboardType="email-address" autoCapitalize="none" />
            <Text style={styles.helperText}>Si cambias el correo, recibirás un enlace de confirmación.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar cambios'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  
  avatarSection: { marginBottom: 20 },
  currentAvatarContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  mainAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#9BAA91' },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EBE5DA', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#9BAA91' },
  uploadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#705849', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginLeft: 20 },
  uploadText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  
  avatarList: { flexDirection: 'row', marginTop: 10 },
  avatarOption: { marginRight: 15, borderWidth: 3, borderColor: 'transparent', borderRadius: 35, padding: 2 },
  avatarOptionSelected: { borderColor: '#9BAA91' },
  avatarThumb: { width: 60, height: 60, borderRadius: 30 },

  formContainer: { marginBottom: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBE5DA', borderRadius: 10, padding: 15, fontSize: 16, color: '#342F29', marginBottom: 15 },
  helperText: { fontSize: 12, color: '#9BAA91', fontStyle: 'italic', marginTop: -5, marginBottom: 15 },
  button: { backgroundColor: '#705849', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});