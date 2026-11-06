import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import { addCoins } from '../store/habitsSlice';

const FLOWERS = ['🌸', '🌻', '🌷', '🌺']; // Flores disponibles

export default function GardenGameScreen() {
  const dispatch = useDispatch();
  
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'won' | 'lost'>('idle');
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);

  const startGame = () => {
    // Generar una secuencia aleatoria de 3 flores
    const newSequence = [
      FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
    ];
    setSequence(newSequence);
    setUserSequence([]);
    setGameState('showing');

    // Ocultar la secuencia después de 2.5 segundos y empezar a jugar
    setTimeout(() => {
      setGameState('playing');
    }, 2500);
  };

  const handleFlowerPress = (flower: string) => {
    if (gameState !== 'playing') return;

    const newUserSequence = [...userSequence, flower];
    setUserSequence(newUserSequence);

    // Verificar si va bien
    const currentIndex = newUserSequence.length - 1;
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      setGameState('lost');
      return;
    }

    // Si completó la secuencia
    if (newUserSequence.length === sequence.length) {
      setGameState('won');
      dispatch(addCoins(15)); // 15 monedas por ganar
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Ordena el Jardín</Text>
        
        {gameState === 'idle' && (
          <View style={styles.centerBox}>
            <Text style={styles.instructions}>
              Memoriza el orden de las flores y luego tócalas en la misma secuencia. ¡Gana 15 monedas!
            </Text>
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Empezar a jugar</Text>
            </TouchableOpacity>
          </View>
        )}

        {gameState === 'showing' && (
          <View style={styles.centerBox}>
            <Text style={styles.subtitle}>Memoriza la secuencia...</Text>
            <View style={styles.sequenceRow}>
              {sequence.map((flower, index) => (
                <Text key={index} style={styles.bigEmoji}>{flower}</Text>
              ))}
            </View>
          </View>
        )}

        {gameState === 'playing' && (
          <View style={styles.centerBox}>
            <Text style={styles.subtitle}>Repite la secuencia:</Text>
            <View style={styles.sequenceRow}>
              {userSequence.map((flower, index) => (
                <Text key={index} style={styles.bigEmoji}>{flower}</Text>
              ))}
              {Array(sequence.length - userSequence.length).fill('❓').map((_, index) => (
                <Text key={`empty-${index}`} style={styles.bigEmoji}>⬜</Text>
              ))}
            </View>

            <View style={styles.grid}>
              {FLOWERS.map((flower) => (
                <TouchableOpacity key={flower} style={styles.flowerButton} onPress={() => handleFlowerPress(flower)}>
                  <Text style={styles.gridEmoji}>{flower}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {gameState === 'won' && (
          <View style={styles.centerBox}>
            <Text style={styles.gameOverText}>¡Excelente memoria!</Text>
            <Text style={styles.rewardText}>Ganaste 🪙 15 monedas</Text>
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Jugar otra vez</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exitButton} onPress={() => router.back()}>
              <Text style={styles.exitText}>Volver a los juegos</Text>
            </TouchableOpacity>
          </View>
        )}

        {gameState === 'lost' && (
          <View style={styles.centerBox}>
            <Text style={styles.gameOverText}>¡Oh no! Te equivocaste</Text>
            <Text style={styles.subtitle}>La secuencia era:</Text>
            <View style={styles.sequenceRow}>
              {sequence.map((flower, index) => (
                <Text key={index} style={styles.bigEmoji}>{flower}</Text>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Intentar de nuevo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exitButton} onPress={() => router.back()}>
              <Text style={styles.exitText}>Volver a los juegos</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29', marginBottom: 20 },
  
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  instructions: { fontSize: 16, color: '#705849', textAlign: 'center', marginBottom: 30, lineHeight: 24 },
  subtitle: { fontSize: 18, color: '#342F29', marginBottom: 20, fontWeight: 'bold' },

  sequenceRow: { flexDirection: 'row', gap: 15, marginBottom: 40 },
  bigEmoji: { fontSize: 40 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  flowerButton: { 
    width: 80, 
    height: 80, 
    backgroundColor: '#EBE5DA', 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D3C9BD'
  },
  gridEmoji: { fontSize: 40 },

  button: { backgroundColor: '#705849', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  
  gameOverText: { fontSize: 24, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  rewardText: { fontSize: 22, fontWeight: 'bold', color: '#9BAA91', marginBottom: 20 },
  
  exitButton: { marginTop: 15, padding: 10 },
  exitText: { color: '#705849', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' },
});