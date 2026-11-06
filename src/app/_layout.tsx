import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';

// Truco para que TypeScript no se queje con redux-persist
const PersistGateComponent = PersistGate as any;

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGateComponent loading={null} persistor={persistor}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="home" />
          <Stack.Screen name="habits" />
          <Stack.Screen name="create-habit" />
          <Stack.Screen name="explore" />
          <Stack.Screen name="garden" />
          <Stack.Screen name="profile" />
        </Stack>
      </PersistGateComponent>
    </Provider>
  );
}