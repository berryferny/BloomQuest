
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { colors } from '../styles/colors';

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
      accessibilityLabel="Regresar"
      style={{
        padding: 10,
        alignSelf: 'flex-start',
      }}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color={colors.cafe}
      />
    </TouchableOpacity>
  );
}
