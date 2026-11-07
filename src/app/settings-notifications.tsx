import BQLogo from '@/components/BQLogo';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

export default function NotificationsSettingsScreen() {
  const [habitsReminders, setHabitsReminders] = useState(true);
  const [missionsReminders, setMissionsReminders] = useState(true);
  const [rewardsReminders, setRewardsReminders] = useState(false);
  const [sleepMode, setSleepMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo />
        <Text style={styles.title}>Notificaciones</Text>
        <Text style={styles.subtitle}>Elige qué recordatorios quieres recibir.</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Recordatorios de hábitos</Text>
              <Text style={styles.rowSubtitle}>Avisos de tus actividades programadas</Text>
            </View>
            <Switch 
              value={habitsReminders} 
              onValueChange={setHabitsReminders}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Misiones y desafíos</Text>
              <Text style={styles.rowSubtitle}>Nuevas misiones del día</Text>
            </View>
            <Switch 
              value={missionsReminders} 
              onValueChange={setMissionsReminders}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Recompensas y jardín</Text>
              <Text style={styles.rowSubtitle}>Avisos de monedas y plantas</Text>
            </View>
            <Switch 
              value={rewardsReminders} 
              onValueChange={setRewardsReminders}
              trackColor={{ false: '#D3C9BD', true: '#9BAA91' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Horario de descanso</Text>
              <Text style={styles.rowSubtitle}>Evita notificaciones por la noche</Text>
            </View>
            <Switch 
              value={sleepMode} 
              onValueChange={setSleepMode}
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