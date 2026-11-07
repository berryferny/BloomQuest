import BQLogo from '@/components/BQLogo';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

export default function AccessibilitySettingsScreen() {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [gameSounds, setGameSounds] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo />
        <Text style={styles.title}>Accesibilidad</Text>
        <Text style={styles.subtitle}>Configura una experiencia cómoda.</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Tamaño del texto</Text>
              <Text style={styles.rowSubtitle}>Normal · Grande</Text>
            </View>
            <Switch 
              value={largeText} 
              onValueChange={setLargeText}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Contraste visual</Text>
              <Text style={styles.rowSubtitle}>Colores con mayor contraste</Text>
            </View>
            <Switch 
              value={highContrast} 
              onValueChange={setHighContrast}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Reducir animaciones</Text>
              <Text style={styles.rowSubtitle}>Movimientos más suaves</Text>
            </View>
            <Switch 
              value={reduceMotion} 
              onValueChange={setReduceMotion}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Sonidos de los juegos</Text>
              <Text style={styles.rowSubtitle}>Activar o silenciar</Text>
            </View>
            <Switch 
              value={gameSounds} 
              onValueChange={setGameSounds}
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
  
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  textContainer: { flex: 1, paddingRight: 10 },
  rowTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  rowSubtitle: { fontSize: 12, color: '#705849', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#EBE5DA' },
});