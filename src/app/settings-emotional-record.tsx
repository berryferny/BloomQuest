import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function EmotionalRecordSettingsScreen() {
  const [saveHistory, setSaveHistory] = useState(true);
  const [shareAnonymously, setShareAnonymously] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logoText}>BQ</Text>
        <Text style={styles.title}>Registro emocional</Text>
        <Text style={styles.subtitle}>Controla tu información privada.</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Guardar historial</Text>
              <Text style={styles.rowSubtitle}>Permite que la app guarde tus emociones</Text>
            </View>
            <Switch 
              value={saveHistory} 
              onValueChange={setSaveHistory}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Compartir anónimamente</Text>
              <Text style={styles.rowSubtitle}>Ayúdanos a mejorar con datos anónimos</Text>
            </View>
            <Switch 
              value={shareAnonymously} 
              onValueChange={setShareAnonymously}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
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
  card: { backgroundColor: '#FFFFFF', borderRadius: 15, paddingHorizontal: 20, borderWidth: 1, borderColor: '#EBE5DA' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 },
  textContainer: { flex: 1, paddingRight: 10 },
  rowTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  rowSubtitle: { fontSize: 12, color: '#705849', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#EBE5DA' },
});