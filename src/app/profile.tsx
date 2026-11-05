
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNav from '../components/BottomNav';
import { homeStyles as styles } from '../styles/home.styles';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mi perfil</Text>

        <Text style={styles.subtitle}>
          Este es tu espacio personal en BloomQuest.
        </Text>
      </View>

      <BottomNav />
    </SafeAreaView>
    
  );
}
