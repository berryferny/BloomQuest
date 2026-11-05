
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function BackButton() {
  const regresar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  return (
    <TouchableOpacity
      onPress={regresar}
      accessibilityRole="button"
      accessibilityLabel="Regresar"
      style={{
        padding: 10,
        alignSelf: 'flex-start',
      }}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color="#705849"
      />
    </TouchableOpacity>
  );
}
