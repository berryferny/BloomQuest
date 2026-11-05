
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import BottomNav from '../components/BottomNav';
import type { AppDispatch, RootState } from '../store';
import { cambiarEstadoHabito } from '../store/habitsSlice';
import { homeStyles as styles } from '../styles/home.styles';

export default function HomeScreen() {
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

  const habitosPrincipales = habitos.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeTitle}>
              ¡Hola de nuevo! 🌱
            </Text>

            <Text style={styles.subtitle}>
              Pequeños hábitos, grandes cambios.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons
              name="person-outline"
              size={23}
              color="#705849"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.coinsCard}>
          <Text style={styles.coinsLabel}>
            Tus monedas acumuladas
          </Text>

          <Text style={styles.coinsValue}>
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

          <Text style={styles.summaryText}>
            {Math.round(porcentaje)}% completado
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Tus hábitos 🌿
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/habits')}
          >
            <Text style={styles.seeAll}>
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        {habitosPrincipales.length === 0 ? (
          <Text style={styles.emptyText}>
            Aún no tienes hábitos. ¡Comienza agregando uno!
          </Text>
        ) : (
          habitosPrincipales.map(habito => (
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
                <Text style={styles.habitName}>
                  {habito.nombre}
                </Text>

                <Text style={styles.habitReward}>
                  {habito.completado
                    ? '¡Hábito completado! ✨'
                    : 'Completa esta actividad · +10 monedas'}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color="#9BAA91"
              />
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/habits')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="leaf-outline"
            size={21}
            color="#FFFFFF"
          />

          <Text style={styles.primaryButtonText}>
            Ir a mis hábitos
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNav />

    </SafeAreaView>
  );
}
