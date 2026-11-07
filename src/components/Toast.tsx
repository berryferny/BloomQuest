import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../store/habitsSlice';

export default function Toast() {
  const dispatch = useDispatch();
  const { toastVisible, toastMessage } = useSelector((state: any) => state.habits);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toastVisible) {
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      const timer = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
          dispatch(hideToast());
        });
      }, 3000); // Desaparece después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [toastVisible, opacity, dispatch]);

  if (!toastVisible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>{toastMessage}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#342F29', // Espresso
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999, // Para que siempre esté encima
  },
  text: { color: '#F8F5EF', fontSize: 14, fontWeight: 'bold' },
});