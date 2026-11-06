import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNav from '../components/BottomNav';
import { exploreStyles as styles } from '../styles/explore.styles';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Explora BloomQuest ✨</Text>

        <Text style={styles.subtitle}>
          Encuentra nuevas formas de crecer, aprender y cuidarte.
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/habits')}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-done" size={25} color="#705849" />
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Mis hábitos</Text>
            <Text style={styles.cardText}>
              Organiza tus actividades y gana monedas.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color="#9BAA91" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/garden')}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="leaf" size={25} color="#705849" />
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Mi jardín</Text>
            <Text style={styles.cardText}>
              Visita el espacio que crecerá contigo.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color="#9BAA91" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/profile')}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="person" size={25} color="#705849" />
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Mi perfil</Text>
            <Text style={styles.cardText}>
              Consulta tu espacio personal.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color="#9BAA91" />
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/breathe')}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="leaf-outline" size={25} color="#705849" />
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Respira conmigo</Text>
            <Text style={styles.cardText}>
              Tómate un momento de calma y respira.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color="#9BAA91" />
        </TouchableOpacity>

                {/* NUEVA TARJETA: MISIONES RÁPIDAS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/missions')}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="star" size={25} color="#705849" />
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Misiones rápidas</Text>
            <Text style={styles.cardText}>
              Completa retos pequeños y gana monedas.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color="#9BAA91" />
        </TouchableOpacity>
                {/* NUEVA TARJETA: CONSEJOS PARA TI */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/tips')}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="bulb" size={25} color="#705849" />
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Consejos para ti</Text>
            <Text style={styles.cardText}>
              Ideas sencillas para florecer.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color="#9BAA91" />
        </TouchableOpacity>

        <View style={styles.comingSoon}>
          <Ionicons name="sparkles-outline" size={24} color="#705849" />
          <Text style={styles.comingSoonTitle}>
            Más experiencias florecerán pronto
          </Text>
          <Text style={styles.comingSoonText}>
            Estamos preparando nuevas actividades y herramientas
            para acompañarte en tu crecimiento.
          </Text>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}