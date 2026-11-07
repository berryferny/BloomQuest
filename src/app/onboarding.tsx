import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BQLogo from '../components/BQLogo';
import { addHabit } from '../store/habitsSlice';

const GOALS = [
  { id: 'health', title: 'Salud y Vitalidad', icon: 'water', desc: 'Hidratación, sueño y ejercicio' },
  { id: 'mind', title: 'Calma y Mindfulness', icon: 'leaf', desc: 'Meditación y respiración' },
  { id: 'productivity', title: 'Productividad', icon: 'book', desc: 'Lectura, estudio y enfoque' },
];

// Los hábitos predeterminados según lo que elija
const DEFAULT_HABITS: any = {
  health: [
    { name: 'Beber 2 litros de agua', time: '08:00 AM' },
    { name: 'Caminar 15 minutos', time: '06:00 PM' },
  ],
  mind: [
    { name: 'Meditar 5 minutos', time: '07:00 AM' },
    { name: 'Respirar profundo', time: '09:00 PM' },
  ],
  productivity: [
    { name: 'Leer 10 páginas', time: '08:00 PM' },
    { name: 'Planificar mi día', time: '07:00 AM' },
  ],
};

export default function OnboardingScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleStart = () => {
    if (!selectedGoal) return;

    // Tomamos los hábitos del objetivo seleccionado
    const habitsToAdd = DEFAULT_HABITS[selectedGoal];

    // Los agregamos a Redux (que ya se encarga de mandarlos a Supabase)
    habitsToAdd.forEach((h: any, index: number) => {
      dispatch(addHabit({
        id: (Date.now() + index).toString(), // ID único
        name: h.name,
        completed: false,
        days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        time: h.time
      }));
    });

    // Lo mandamos al Home
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo size={50} />
        <Text style={styles.title}>¡Bienvenido a BloomQuest!</Text>
        <Text style={styles.subtitle}>Para empezar, ¿cuál es tu objetivo principal?</Text>

        <View style={styles.cardsContainer}>
          {GOALS.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <TouchableOpacity 
                key={goal.id} 
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <View style={[styles.iconContainer, isSelected && styles.iconSelected]}>
                  <Ionicons name={goal.icon as any} size={28} color={isSelected ? '#FFFFFF' : '#705849'} />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardTitle, isSelected && styles.textSelected]}>{goal.title}</Text>
                  <Text style={styles.cardDesc}>{goal.desc}</Text>
                </View>
                {isSelected && <Ionicons name="checkmark-circle" size={24} color="#9BAA91" />}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={[styles.button, !selectedGoal && styles.buttonDisabled]} 
          onPress={handleStart}
          disabled={!selectedGoal}
        >
          <Text style={styles.buttonText}>Comenzar mi viaje</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  scrollContent: { padding: 20, paddingTop: 50, paddingBottom: 40, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#342F29', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#705849', textAlign: 'center', marginBottom: 30 },
  
  cardsContainer: { marginBottom: 30 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#EBE5DA',
  },
  cardSelected: { borderColor: '#9BAA91', backgroundColor: '#F8F5EF' },
  iconContainer: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#EBE5DA',
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
  },
  iconSelected: { backgroundColor: '#9BAA91' },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#705849', marginBottom: 4 },
  textSelected: { color: '#342F29' },
  cardDesc: { fontSize: 12, color: '#9BAA91' },
  
  button: { backgroundColor: '#705849', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#D3C9BD' },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});