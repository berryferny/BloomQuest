import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';

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
          <Stack.Screen name="breathe" />
          <Stack.Screen name="garden" />
          <Stack.Screen name="missions" />
          <Stack.Screen name="tips" />
          <Stack.Screen name="tip-detail" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="achievements" />
          <Stack.Screen name="stats" />
          <Stack.Screen name="mood" />
          <Stack.Screen name="mood-history" />
          <Stack.Screen name="games" />        
          <Stack.Screen name="memory-game" /> 
          <Stack.Screen name="trivia" />
           <Stack.Screen name="stars-game" />   
          <Stack.Screen name="shop" />
        </Stack>
      </PersistGateComponent>
    </Provider>
  );
}