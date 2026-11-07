import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import { addCoins } from '../store/habitsSlice';

const FLOWERS = ['🌸', '🌻', '🌷', '🌺', '🌼', '🪷'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGameScreen() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // Iniciar el juego al cargar la pantalla
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Duplicamos las flores para crear los pares y las revolvemos
    const deck = [...FLOWERS, ...FLOWERS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setDisabled(false);
  };

  const handleCardPress = (index: number) => {
    if (disabled) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [firstIndex, secondIndex] = newFlipped;

      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Es un par
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatchedPairs((prev) => prev + 1);
          setDisabled(false);
        }, 500);
      } else {
        // No es un par, voltearlas de nuevo
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  // Verificar si ganó
  useEffect(() => {
    if (matchedPairs === FLOWERS.length) {
      dispatch(addCoins(20)); // Recompensa de 20 monedas
      Alert.alert(
        "¡Felicidades!", 
        "Has completado Memoria Floral y ganaste 20 monedas.",
        [{ text: "Volver a jugar", onPress: initializeGame }, { text: "Salir", onPress: () => router.back() }]
      );
    }
  }, [matchedPairs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Memoria Floral</Text>
        <Text style={styles.subtitle}>Encuentra todos los pares.</Text>

        <View style={styles.grid}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                card.isFlipped || card.isMatched ? styles.cardFlipped : styles.cardHidden,
                card.isMatched && styles.cardMatched
              ]}
              onPress={() => handleCardPress(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardEmoji}>
                {card.isFlipped || card.isMatched ? card.emoji : '🌿'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  content: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29', alignSelf: 'flex-start' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 30, alignSelf: 'flex-start' },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  card: {
    width: '30%', // 3 columnas
    aspectRatio: 1, // Cuadrado
    marginBottom: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHidden: { backgroundColor: '#9BAA91' }, // Verde salvia
  cardFlipped: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#EBE5DA' },
  cardMatched: { backgroundColor: '#EBE5DA', opacity: 0.6 },
  cardEmoji: { fontSize: 40 },
});