
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import BackButton from '../components/BackButton';
import type { AppDispatch } from '../store';
import { agregarHabito } from '../store/habitsSlice';
import { createHabitStyles as styles } from '../styles/create-habit.styles';

export default function CreateHabitScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const [nombre, setNombre] = useState('');
  const [frecuencia, setFrecuencia] = useState('Todos los días');

  const guardarHabito = () => {
    if (!nombre.trim()) {
      Alert.alert(
        'Falta un detalle 🌱',
        'Escribe el nombre de tu hábito.'
      );
      return;
    }

    dispatch(
      agregarHabito({
        id: `${Date.now()}`,
        nombre: nombre.trim(),
        frecuencia,
        completado: false,
      })
    );

    router.replace('/habits');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackButton />

        <Text style={styles.title}>Crear hábito</Text>

        <Text style={styles.subtitle}>
          Cada pequeño cambio es una semilla de crecimiento.
        </Text>

        <Text style={styles.label}>Nombre del hábito</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej. Leer 20 minutos"
          placeholderTextColor="#9B9188"
          value={nombre}
          onChangeText={setNombre}
          maxLength={50}
        />

        <Text style={styles.label}>Frecuencia</Text>

        <View style={styles.optionsContainer}>
          {[
            'Todos los días',
            'Entre semana',
            'Fines de semana',
          ].map((opcion) => (
            <TouchableOpacity
              key={opcion}
              style={[
                styles.option,
                frecuencia === opcion && styles.optionSelected,
              ]}
              onPress={() => setFrecuencia(opcion)}
            >
              <Ionicons
                name={
                  frecuencia === opcion
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={21}
                color="#705849"
              />
              <Text style={styles.optionText}>{opcion}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.rewardCard}>
          <Ionicons
            name="sparkles-outline"
            size={25}
            color="#705849"
          />

          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>
              ¡Tu esfuerzo vale!
            </Text>
            <Text style={styles.rewardDescription}>
              Completa este hábito y gana 10 monedas.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={guardarHabito}
        >
          <Text style={styles.saveButtonText}>
            Guardar hábito
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
