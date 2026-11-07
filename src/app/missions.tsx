import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import { completeMission, showToast } from '../store/habitsSlice'; // <-- Importamos showToast

const MISSIONS = [
  { id: 'm1', title: 'Tomar un vaso de agua', reward: 5 },
  { id: 'm2', title: 'Hacer una pausa consciente', reward: 5 },
  { id: 'm3', title: 'Ordenar mi espacio', reward: 10 },
  { id: 'm4', title: 'Estirarme 3 minutos', reward: 5 },
];

export default function MissionsScreen() {
  const { completedMissions = [], coins = 0 } = useSelector((state: any) => state.habits);
  const dispatch = useDispatch();

  const handleComplete = (id: string, reward: number, title: string) => {
    // Verificamos si es la primera misión ANTES de completarla
    const isFirstMission = completedMissions.length === 0;

    // Completamos la misión en Redux
    dispatch(completeMission({ missionId: id, reward }));
    
    // Mostramos la notificación flotante de la misión
    dispatch(showToast(`¡Misión cumplida! +${reward} monedas`));

    // Si era la primera, mostramos el logro un ratito después (para que no se encimen)
    if (isFirstMission) {
      setTimeout(() => {
        dispatch(showToast('🏆 ¡Logro desbloqueado: Misión cumplida!'));
      }, 3200);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Misiones rápidas</Text>
          <Text style={styles.coinsText}>🪙 {coins}</Text>
        </View>
        <Text style={styles.subtitle}>Pequeños retos para hoy.</Text>

        {MISSIONS.map((mission) => {
          const isCompleted = completedMissions.includes(mission.id);

          return (
            <View key={mission.id} style={[styles.card, isCompleted && styles.cardCompleted]}>
              <View style={styles.cardInfo}>
                <Ionicons 
                  name={isCompleted ? "star" : "star-outline"} 
                  size={24} 
                  color={isCompleted ? "#F5B041" : "#705849"} 
                />
                <View style={styles.textContainer}>
                  <Text style={[styles.missionTitle, isCompleted && styles.textCompleted]}>
                    {mission.title}
                  </Text>
                  <Text style={styles.missionReward}>+{mission.reward} monedas</Text>
                </View>
              </View>

              {!isCompleted && (
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => handleComplete(mission.id, mission.reward, mission.title)}
                >
                  <Text style={styles.buttonText}>Completar</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  coinsText: { fontSize: 18, fontWeight: 'bold', color: '#705849' },
  subtitle: { fontSize: 14, color: '#705849', marginBottom: 25 },
  
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  cardCompleted: { backgroundColor: '#EBE5DA', opacity: 0.7 },
  cardInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  textContainer: { marginLeft: 15, flex: 1 },
  missionTitle: { fontSize: 16, fontWeight: 'bold', color: '#342F29' },
  textCompleted: { textDecorationLine: 'line-through', color: '#9BAA91' },
  missionReward: { fontSize: 12, color: '#705849', marginTop: 4 },
  
  button: { backgroundColor: '#9BAA91', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
});