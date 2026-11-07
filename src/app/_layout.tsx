import { Session } from '@supabase/supabase-js';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'; // <-- Importamos para la carga
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AchievementWatcher from '../components/AchievementWatcher';
import SyncWatcher from '../components/SyncWatcher';
import Toast from '../components/Toast';
import { supabase } from '../lib/supabase';
import { persistor, store } from '../store';

const PersistGateComponent = PersistGate as any;

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const currentRoute = segments[0]; 
    const publicRoutes = ['index', 'login', 'register', 'recover-password', 'reset-password'];
    const inPublicRoute = publicRoutes.includes(currentRoute);

    if (!session && !inPublicRoute) {
      router.replace('/login');
    } else if (session && inPublicRoute) {
      router.replace('/home');
    }
  }, [session, segments, isLoading, router]);

  // --- PANTALLA DE CARGA CON EL LOGO GRANDE ---
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={require('../../assets/images/logo-bloomquest.png')} 
          style={styles.loadingLogo} 
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#705849" style={{ marginTop: 20 }} />
      </View>
    );
  }
  // --------------------------------------------

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGateComponent loading={null} persistor={persistor}>
          <StatusBar style="auto" />
          
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="recover-password" />
            <Stack.Screen name="reset-password" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="home" />
            <Stack.Screen name="habits" />
            <Stack.Screen name="create-habit" />
            <Stack.Screen name="explore" />
            <Stack.Screen name="breathe" />
            <Stack.Screen name="garden" />
            <Stack.Screen name="shop" />
            <Stack.Screen name="missions" />
            <Stack.Screen name="tips" />
            <Stack.Screen name="tip-detail" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="achievements" />
            <Stack.Screen name="stats" />
            <Stack.Screen name="mood" />
            <Stack.Screen name="mood-history" />
            <Stack.Screen name="games" />
            <Stack.Screen name="memory-game" />
            <Stack.Screen name="trivia" />
            <Stack.Screen name="stars-game" />
            <Stack.Screen name="garden-game" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="settings-notifications" />
            <Stack.Screen name="settings-privacy" />
            <Stack.Screen name="settings-help" />
            <Stack.Screen name="settings-personal-data" />
            <Stack.Screen name="settings-accessibility" />
            <Stack.Screen name="settings-faq" />
            <Stack.Screen name="settings-contact" />
            <Stack.Screen name="settings-delete-account" />
            <Stack.Screen name="settings-emotional-record" />
            <Stack.Screen name="settings-app-permissions" />
            <Stack.Screen name="settings-coins-help" />
            <Stack.Screen name="settings-usage-tips" />
          </Stack>
          
          <Toast />
          <AchievementWatcher />
          <SyncWatcher />
          
        </PersistGateComponent>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8F5EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 280,
    height: 140,
  }
});