
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import BottomNav from '../components/BottomNav';
import type { AppDispatch, RootState } from '../store';
import { cambiarEstadoHabito } from '../store/habitsSlice';
import { habitStyles as styles } from '../styles/habits.styles';

export default function HabitsScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const habitos = useSelector(
    (state: RootState) => state.habits.habitos
  );

  const monedas = useSelector(
    (state: RootState) => state.habits.monedas
  );

  const completados = habitos.filter(
    habito => habito.completado
  ).length;

  const porcentaje = habitos.length
    ? (completados / habitos.length) * 100
    : 0;

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.title}>Mis hábitos 🌱</Text>

        <Text style={styles.subtitle}>
          Pequeños pasos que hacen la diferencia.
        </Text>

        <View
          style={{
            backgroundColor: '#EBE5DA',
            padding: 16,
            borderRadius: 18,
            marginBottom: 18,
          }}
        >
          <Text style={{ color: '#705849', fontSize: 14 }}>
            Tus monedas acumuladas
          </Text>

          <Text
            style={{
              color: '#342F29',
              fontSize: 26,
              fontWeight: 'bold',
              marginTop: 4,
            }}
          >
            🪙 {monedas}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Tu progreso de hoy
          </Text>

          <Text style={styles.summaryText}>
            {completados} de {habitos.length} hábitos completados
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${porcentaje}%` },
              ]}
            />
          </View>
        </View>

        {habitos.length === 0 ? (
          <Text style={{ color: '#705849', marginVertical: 20 }}>
            Todavía no tienes hábitos. ¡Agrega el primero!
          </Text>
        ) : (
          habitos.map(habito => (
            <TouchableOpacity
              key={habito.id}
              style={styles.habitCard}
              onPress={() =>
                dispatch(cambiarEstadoHabito(habito.id))
              }
              activeOpacity={0.8}
            >
              <Ionicons
                name={
                  habito.completado
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={26}
                color={
                  habito.completado ? '#9BAA91' : '#705849'
                }
              />

              <View style={styles.habitInfo}>
                <Text
                  style={[
                    styles.habitName,
                    habito.completado && styles.completedText,
                  ]}
                >
                  {habito.nombre}
                </Text>

                <Text style={styles.habitReward}>
                  {habito.frecuencia} · +10 monedas
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/create-habit')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add-circle-outline"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.addButtonText}>
            Agregar un hábito
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNav />

    </SafeAreaView>
  );
}
