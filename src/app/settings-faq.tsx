import BQLogo from '@/components/BQLogo';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

const FAQS = [
  { q: '¿Cómo se ganan monedas?', a: 'Completando hábitos y desafíos diarios.' },
  { q: '¿Qué pasa si pierdo mi racha?', a: 'Puedes volver a comenzar sin castigos. Lo importante es retomar.' },
  { q: '¿Los juegos cuentan como hábitos?', a: 'Son actividades complementarias para ganar monedas extra.' },
];

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BQLogo />
        <Text style={styles.title}>Preguntas frecuentes</Text>
        <Text style={styles.subtitle}>Resolvemos las dudas más comunes.</Text>

        <View style={styles.menuContainer}>
          {FAQS.map((faq, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.faqCard} 
              onPress={() => toggleExpand(index)}
              activeOpacity={0.8}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.q}</Text>
                <Ionicons 
                  name={expandedIndex === index ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#9BAA91" 
                />
              </View>
              {expandedIndex === index && (
                <Text style={styles.faqAnswer}>{faq.a}</Text>
              )}
            </TouchableOpacity>
          ))}
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  
  menuContainer: { marginBottom: 30 },
  faqCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { fontSize: 16, fontWeight: 'bold', color: '#342F29', flex: 1, paddingRight: 10 },
  faqAnswer: { fontSize: 14, color: '#705849', marginTop: 15, lineHeight: 22 },
});