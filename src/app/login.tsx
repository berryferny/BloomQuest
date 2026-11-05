import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { loginUser } from '../store/authSlice';
import { loginStyles as styles } from '../styles/login.styles';



export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, token } = useSelector(
  (state: RootState) => state.auth
);



const iniciarSesion = async () => {
  if (loading) return;

  if (!correo.trim() || !contrasena.trim()) {
    Alert.alert(
      'Campos incompletos',
      'Por favor, escribe tu correo y contraseña.'
    );
    return;
  }

  try {
    await dispatch(
      loginUser({
        email: correo.trim(),
        password: contrasena,
      })
    ).unwrap();

    router.replace('/home');
  } catch (error) {
    Alert.alert(
      'Error al iniciar sesión',
      String(error)
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
            source={require('../../assets/images/logo-bloomquest.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          </View>

          <Text style={styles.title}>
            ¡Hola de nuevo!
          </Text>

          <Text style={styles.label}>
            Correo electrónico
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#92877F"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={correo}
            onChangeText={setCorreo}
          />

          <Text style={styles.label}>
            Contraseña
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Escribe tu contraseña"
            placeholderTextColor="#92877F"
            secureTextEntry
            autoComplete="current-password"
            value={contrasena}
            onChangeText={setContrasena}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={iniciarSesion}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() =>
              Alert.alert(
                'Próximamente',
                'Aquí agregaremos la pantalla de registro.'
              )
            }
          >
            <Text style={styles.registerText}>
              ¿No tienes cuenta? Regístrate
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Próximamente',
                'Aquí agregaremos la recuperación de contraseña.'
              )
            }
          >
            <Text style={styles.forgotText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
