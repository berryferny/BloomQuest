import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function BackButton() {
  const handleGoBack = () => {
    // Si la app sabe a dónde volver, que regrese
    if (router.canGoBack()) {
      router.back();
    } else {
      // Si recargaste la página y no hay historial, que te mande al Home
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