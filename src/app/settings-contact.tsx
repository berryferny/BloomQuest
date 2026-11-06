import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function ContactScreen() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (subject.trim() === '' || message.trim() === '') return;
    setSent(true);
    // Simulamos el envío reiniciando el formulario después de 3 segundos
    setTimeout(() => {
      setSent(false);
      setSubject('');
      setMessage('');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.logoText}>BQ</Text>
          <Text style={styles.title}>Contacto</Text>
          <Text style={styles.subtitle}>Cuéntanos cómo podemos ayudarte.</Text>

          {sent ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>¡Mensaje enviado!</Text>
              <Text style={styles.successSubtext}>Te responderemos lo antes posible.</Text>
            </View>
          ) : (
            <>
              <Text style={styles.label}>Asunto</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Ej. Problema con mi cuenta"
                placeholderTextColor="#9BAA91"
              />

              <Text style={styles.label}>Escribe tu mensaje</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder="Describe tu duda o problema..."
                placeholderTextColor="#9BAA91"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Enviar mensaje</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5EF' },
  header: { paddingHorizontal: 10, paddingTop: 10 },
  content: { flex: 1, padding: 20 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#342F29', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#342F29' },
  subtitle: { fontSize: 14, color: '#705849', marginTop: 5, marginBottom: 25 },
  
  label: { fontSize: 14, fontWeight: 'bold', color: '#705849', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBE5DA',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#342F29',
    marginBottom: 20,
  },
  textArea: { height: 120 },
  button: {
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#F8F5EF', fontSize: 16, fontWeight: 'bold' },

  successBox: {
    backgroundColor: '#9BAA91',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  successText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  successSubtext: { color: '#F8F5EF', fontSize: 14, textAlign: 'center' },
});