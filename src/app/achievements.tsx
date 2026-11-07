import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import BQLogo from '../components/BQLogo';

export default function AchievementsScreen() {
  const { 
    habits = [], completedMissions = [], garden = [], coins = 0, 
    streak = 0, moodHistory = [], seedInventory = [] 
  } = useSelector((state: any) => state.habits);

  const plantsInGarden = garden.filter((p: any) => p !== null).length;
  const bloomedPlants = garden.filter((p: any) => p !== null && p.isBloomed).length;

  const badges = [
    { id: 'b1', title: 'Primer paso', desc: 'Crea tu primer hábito', icon: 'leaf', current: habits.length, target: 1, isSecret: false },
    { id: 'b2', title: 'Jardín vivo', desc: 'Planta tu primera semilla', icon: 'flower', current: plantsInGarden, target: 1, isSecret: false },
    { id: 'b3', title: 'Misión cumplida', desc: 'Completa una misión diaria', icon: 'star', current: completedMissions.length, target: 1, isSecret: false },
    { id: 'b4', title: 'Autoconocimiento', desc: 'Registra tu primera emoción', icon: 'happy', current: moodHistory.length, target: 1, isSecret: false },
    { id: 'b5', title: 'En racha', desc: 'Mantén una racha de 3 días', icon: 'flame', current: streak, target: 3, isSecret: false },
    { id: 'b6', title: 'Ahorrador', desc: 'Acumula 150 monedas', icon: 'cash', current: coins, target: 150, isSecret: false },
    { id: 'b7', title: 'Creador de rutinas', desc: 'Crea 5 hábitos', icon: 'list', current: habits.length, target: 5, isSecret: false },
    { id: 'b8', title: 'Primera floración', desc: 'Haz florecer una planta', icon: 'rose', current: bloomedPlants, target: 1, isSecret: false },
    { id: 'b9', title: 'Semana perfecta', desc: 'Mantén una racha de 7 días', icon: 'calendar', current: streak, target: 7, isSecret: false },
    { id: 'b10', title: 'Diario emocional', desc: 'Registra 5 emociones', icon: 'book', current: moodHistory.length, target: 5, isSecret: false },
    { id: 's1', title: 'Pulgar verde', desc: 'Llena tu jardín con 6 plantas', icon: 'flower', current: plantsInGarden, target: 6, isSecret: true },
    { id: 's2', title: 'Magnate', desc: 'Acumula 500 monedas', icon: 'diamond', current: coins, target: 500, isSecret: true },
    { id: 's3', title: 'El coleccionista', desc: 'Compra 5 semillas', icon: 'bag', current: seedInventory.length, target: 5, isSecret: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><BackButton /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo size={40} />
        <Text style={styles.title}>Mis logros</Text>
        <Text style={styles.subtitle}>Celebra cada avance en tu camino.</Text>

        {badges.map((badge) => {
          const isUnlocked = badge.current >= badge.target;
          const progressPercent = Math.min((badge.current / badge.target) * 100, 100);
          const showRealInfo = !badge.isSecret || isUnlocked;
          const displayTitle = showRealInfo ? badge.title : '???';
          const displayDesc = showRealInfo ? badge.desc : 'Sigue jugando para descubrirlo...';

          return (
            <View key={badge.id} style={[styles.card, isUnlocked ? styles.cardUnlocked : styles.cardLocked]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, isUnlocked && styles.iconContainerUnlocked]}>
                  <Ionicons name={showRealInfo ? (badge.icon as any) : 'lock-closed'} size={24} color={isUnlocked ? '#FFFFFF' : '#9BAA91'} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.cardTitle, isUnlocked && styles.textUnlocked]}>{displayTitle}</Text>
                  <Text style={styles.cardDesc}>{displayDesc}</Text>
                </View>
                {isUnlocked && <Ionicons name="checkmark-circle" size={28} color="#9BAA91" />}
              </View>
              {(!badge.isSecret || isUnlocked) && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: isUnlocked ? '#9BAA91' : '#705849' }]} />
                  </View>
                  <Text style={styles.progressText}>{badge.current > badge.target ? badge.target : badge.current} / {badge.target}</Text>
                </View>
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  card: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EBE5DA' },
  cardUnlocked: { backgroundColor: '#F8F5EF', borderColor: '#9BAA91', borderWidth: 2 },
  cardLocked: { opacity: 0.8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#EBE5DA', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  iconContainerUnlocked: { backgroundColor: '#9BAA91' },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#705849', marginBottom: 4 },
  textUnlocked: { color: '#342F29' },
  cardDesc: { fontSize: 12, color: '#9BAA91' },
  progressContainer: { flexDirection: 'row', alignItems: 'center' },
  progressBarBackground: { flex: 1, height: 8, backgroundColor: '#EBE5DA', borderRadius: 4, marginRight: 10 },
  progressBarFill: { height: 8, borderRadius: 4 },
  progressText: { fontSize: 12, fontWeight: 'bold', color: '#705849', width: 50, textAlign: 'right' },
});