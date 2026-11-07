import { Session } from '@supabase/supabase-js';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { supabase } from '../lib/supabase';
import { persistor, store } from '../store';

const PersistGateComponent = PersistGate as any;

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // 1. Revisar si ya hay una sesión guardada al abrir la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // 2. Escuchar cambios (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 3. Proteger las rutas
  useEffect(() => {
    if (isLoading) return;

    // ¿En qué pantalla estamos?
    const currentRoute = segments[0]; 
    
    // Rutas públicas a las que se puede entrar sin sesión
    const publicRoutes = ['index', 'login', 'register', 'recover-password'];
    const inPublicRoute = publicRoutes.includes(currentRoute);

    if (!session && !inPublicRoute) {
      // Si NO hay sesión y quiere ir a una ruta privada -> al login
      router.replace('/login');
    } else if (session && inPublicRoute) {
      // Si SÍ hay sesión y está en el login -> al home
      router.replace('/home');
    }
  }, [session, segments, isLoading]);

  // Mientras Supabase revisa la sesión, no mostramos nada para evitar parpadeos
  if (isLoading) return null;

  return (
    <Provider store={store}>
      <PersistGateComponent loading={null} persistor={persistor}>
        <StatusBar style="auto" />
        
        {/* Dejamos todas las pantallas declaradas, sin condicionales, para que no explote */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="recover-password" />
          
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
          <Stack.Screen name="settings" />
          <Stack.Screen name="settings-notifications" />
          <Stack.Screen name="settings-privacy" />
          <Stack.Screen name="settings-help" />
          <Stack.Screen name="settings-personal-data" />
          <Stack.Screen name="settings-accessibility" />
          <Stack.Screen name="settings-faq" />
          <Stack.Screen name="settings-contact" />
          <Stack.Screen name="settings-delete-account" />
          <Stack.Screen name="achievements" />
          <Stack.Screen name="stats" />
          <Stack.Screen name="mood" />
          <Stack.Screen name="mood-history" />
          <Stack.Screen name="games" />
          <Stack.Screen name="memory-game" />
          <Stack.Screen name="trivia" />
          <Stack.Screen name="stars-game" />
          <Stack.Screen name="garden-game" />
        </Stack>
      </PersistGateComponent>
    </Provider>
  );
}