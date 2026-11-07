import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function BackButton() {
  const handleGoBack = () => {
    // Si la app sabe que hay una pantalla atrás, regresa
    if (router.canGoBack()) {
      router.back();
    } else {
      // Si no hay historial (recargaste la página), te manda al Home
      router.replace('/home');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoBack}
      style={{ padding: 10, alignSelf: 'flex-start' }}
    >
      <Ionicons name="arrow-back" size={28} color="#342F29" />
    </TouchableOpacity>
  );
}