import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function BackButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/home');
        }
      }}
      style={{ padding: 10, alignSelf: 'flex-start' }}
    >
      <Ionicons name="arrow-back" size={28} color="#342F29" />
    </TouchableOpacity>
  );
}