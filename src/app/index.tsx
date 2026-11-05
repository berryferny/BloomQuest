import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { welcomeStyles as styles } from '../styles/welcome.styles';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
          source={require('../../assets/images/logo-bq.png')}
          style={styles.logo}
          resizeMode="contain"
        />
</View>

        <Text style={styles.title}>BloomQuest</Text>

        <Text style={styles.subtitle}>
          Pequeños hábitos, grandes cambios.
        </Text>

        <Text style={styles.description}>
          Florece a tu ritmo. Cultiva hábitos, juega y
          descubre todo lo que puedes lograr.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Tu aventura empieza hoy
        </Text>
      </View>
    </SafeAreaView>
  );
}
