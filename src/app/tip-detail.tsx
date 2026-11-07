import BQLogo from '@/components/BQLogo';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function TipDetailScreen() {
  // Recibimos los datos que enviamos desde la lista
  const { title, icon } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo />
        
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.contentTitle}>La regla de los 2 minutos</Text>
          <Text style={styles.contentText}>
            Comienza con una versión muy pequeña de tu hábito. Por ejemplo, 
            lee una página en lugar de intentar terminar un libro.
            {"\n\n"}
            La constancia importa más que la perfección. Si un día fallas, 
            no te castigues, simplemente retoma al día siguiente.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  emoji: { fontSize: 28, marginRight: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29', flex: 1 },
  
  contentCard: {
    backgroundColor: '#EBE5DA',
    padding: 20,
    borderRadius: 15,
  },
  contentTitle: { fontSize: 18, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  contentText: { fontSize: 15, color: '#705849', lineHeight: 24 },
});