import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import { addCoins } from '../store/habitsSlice';

const QUESTIONS = [
  {
    question: '¿Qué ayuda a formar un hábito?',
    options: ['Empezar con pasos pequeños', 'Buscar la perfección'],
    correctAnswer: 0,
  },
  {
    question: '¿Qué es mejor si fallas un día en tu rutina?',
    options: ['Rendirte por completo', 'Retomar al día siguiente'],
    correctAnswer: 1,
  },
  {
    question: '¿Cuánto tiempo se dice que toma crear un hábito?',
    options: ['21 días', 'Depende de la persona y el hábito'],
    correctAnswer: 1,
  },
  {
    question: '¿Cuál es un buen hábito para la salud mental?',
    options: ['Tomar pausas conscientes', 'Revisar el celular al despertar'],
    correctAnswer: 0,
  },
];

export default function TriviaScreen() {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return; // Evitar doble clic

    setSelectedOption(index);
    const isCorrect = index === QUESTIONS[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      dispatch(addCoins(5)); // 5 monedas por acierto
    }

    // Esperar 1.5 segundos antes de pasar a la siguiente
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setGameOver(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Preguntas que Florecen</Text>
        
        {!gameOver ? (
          <>
            <Text style={styles.subtitle}>Pregunta {currentQuestion + 1} de {QUESTIONS.length}</Text>
            
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{QUESTIONS[currentQuestion].question}</Text>
            </View>

            {QUESTIONS[currentQuestion].options.map((option, index) => {
              // Lógica de colores para saber si acertó o falló
              let buttonStyle = styles.optionButton;
              if (selectedOption !== null) {
                if (index === QUESTIONS[currentQuestion].correctAnswer) {
                  buttonStyle = { ...styles.optionButton, ...styles.correctButton };
                } else if (selectedOption === index) {
                  buttonStyle = { ...styles.optionButton, ...styles.wrongButton };
                }
              }

              return (
                <TouchableOpacity 
                  key={index} 
                  style={buttonStyle} 
                  onPress={() => handleAnswer(index)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>¡Juego terminado!</Text>
            <Text style={styles.scoreText}>Acertaste {score} de {QUESTIONS.length}</Text>
            <Text style={styles.rewardText}>Ganaste 🪙 {score * 5} monedas</Text>
            
            <TouchableOpacity style={styles.playAgainButton} onPress={restartGame}>
              <Text style={styles.playAgainText}>Volver a jugar</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  
  questionCard: {
    backgroundColor: '#EBE5DA',
    padding: 30,
    borderRadius: 15,
    marginBottom: 30,
    minHeight: 150,
    justifyContent: 'center',
  },
  questionText: { fontSize: 18, fontWeight: 'bold', color: '#342F29', textAlign: 'center' },

  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#EBE5DA',
  },
  correctButton: { backgroundColor: '#9BAA91', borderColor: '#9BAA91' }, // Verde salvia
  wrongButton: { backgroundColor: '#D3C9BD', borderColor: '#D3C9BD' }, // Café claro
  optionText: { fontSize: 16, color: '#342F29', fontWeight: '500', textAlign: 'center' },

  gameOverContainer: { alignItems: 'center', marginTop: 50 },
  gameOverText: { fontSize: 26, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  scoreText: { fontSize: 18, color: '#705849', marginBottom: 20 },
  rewardText: { fontSize: 22, fontWeight: 'bold', color: '#9BAA91', marginBottom: 40 },
  playAgainButton: { backgroundColor: '#705849', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 15 },
  playAgainText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },
  exitButton: { padding: 15, width: '100%', alignItems: 'center' },
  exitText: { color: '#705849', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' },
});