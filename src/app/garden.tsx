
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNav from '../components/BottomNav';
import { homeStyles as styles } from '../styles/home.styles';

export default function GardenScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mi jardín 🌱</Text>

        <Text style={styles.subtitle}>
          Cada hábito que cultivas hace florecer tu jardín.
        </Text>
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}
