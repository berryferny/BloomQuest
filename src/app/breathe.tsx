import BQLogo from '@/components/BQLogo';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function BreatheScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [text, setText] = useState('Inhala');

  useEffect(() => {
    // Animación de respiración infinita
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 2.5, // Se expande
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Se contrae
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    // Cambiar el texto
    const interval = setInterval(() => {
      setText((prev) => (prev === 'Inhala' ? 'Exhala' : 'Inhala'));
    }, 4000);

    return () => {
      animation.stop();
      clearInterval(interval);
    };
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <View style={styles.content}>
        <BQLogo />
        <Text style={styles.title}>Tu momento de calma</Text>
        <Text style={styles.subtitle}>Inhala 4s · Exhala 4s</Text>

        <View style={styles.animationContainer}>
          <Animated.View 
            style={[
              styles.circle, 
              { transform: [{ scale: scaleAnim }] }
            ]} 
          />
        </View>

        <Text style={styles.instructionText}>{text} suavemente</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Terminar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10, alignSelf: 'flex-start' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29', alignSelf: 'flex-start' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 50, alignSelf: 'flex-start' },
  
  animationContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBE5DA', // Color arena
    borderWidth: 4,
    borderColor: '#9BAA91', // Verde salvia
  },
  
  instructionText: { fontSize: 20, fontWeight: 'bold', color: '#342F29', marginBottom: 60 },
  
  button: {
    backgroundColor: '#705849',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
});