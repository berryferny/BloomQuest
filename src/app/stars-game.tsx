import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import { addCoins } from '../store/habitsSlice';

const { width, height } = Dimensions.get('window');

export default function StarsGameScreen() {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [starPosition, setStarPosition] = useState({ top: '50%', left: '50%' });

  // Lógica del temporizador
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(15);
    setScore(0);
    moveStar();
  };

  const endGame = () => {
    setIsPlaying(false);
    const earnedCoins = score * 2; 
    if (earnedCoins > 0) {
      dispatch(addCoins(earnedCoins));
    }
  };

  const moveStar = () => {
    // Genera posiciones aleatorias dentro del área de juego
    const randomTop = Math.floor(Math.random() * 70) + 15; // Entre 15% y 85%
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    setStarPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const catchStar = () => {
    if (!isPlaying) return;
    setScore((prev) => prev + 1);
    moveStar();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Atrapa Estrellas</Text>
        
        {!isPlaying && timeLeft === 15 ? (
          // Pantalla de Inicio
          <View style={styles.centerBox}>
            <Text style={styles.instructions}>
              Toca la estrella ⭐ lo más rápido que puedas. 
              Tienes 15 segundos. ¡Cada estrella vale 2 monedas!
            </Text>
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Empezar a jugar</Text>
            </TouchableOpacity>
          </View>
        ) : !isPlaying && timeLeft === 0 ? (
          // Pantalla de Fin de Juego
          <View style={styles.centerBox}>
            <Text style={styles.gameOverText}>¡Tiempo agotado!</Text>
            <Text style={styles.scoreText}>Atrapaste {score} estrellas</Text>
            <Text style={styles.rewardText}>Ganaste 🪙 {score * 2} monedas</Text>
            
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Jugar otra vez</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exitButton} onPress={() => router.back()}>
              <Text style={styles.exitText}>Volver a los juegos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Área de Juego
          <View style={styles.gameArea}>
            <View style={styles.hud}>
              <Text style={styles.hudText}>⏱️ {timeLeft}s</Text>
              <Text style={styles.hudText}>⭐ {score}</Text>
            </View>

            {/* La estrella que se mueve */}
            <TouchableOpacity 
              style={[styles.star, { top: starPosition.top as any, left: starPosition.left as any }]}
              onPress={catchStar}
              activeOpacity={0.5}
            >
              <Text style={styles.starEmoji}>⭐</Text>
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
  
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  instructions: { fontSize: 16, color: '#705849', textAlign: 'center', marginBottom: 30, lineHeight: 24 },
  
  gameArea: {
    flex: 1,
    backgroundColor: '#EBE5DA',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D3C9BD',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 10,
  },
  hudText: { fontSize: 20, fontWeight: 'bold', color: '#705849' },
  
  star: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starEmoji: { fontSize: 45 },

  button: { backgroundColor: '#705849', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  
  gameOverText: { fontSize: 28, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  scoreText: { fontSize: 18, color: '#705849', marginBottom: 10 },
  rewardText: { fontSize: 22, fontWeight: 'bold', color: '#9BAA91', marginBottom: 30 },
  
  exitButton: { marginTop: 15, padding: 10 },
  exitText: { color: '#705849', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' },
});