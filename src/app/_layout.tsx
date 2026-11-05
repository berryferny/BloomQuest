import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../store'; // Asegúrate de que esta ruta sea correcta

export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}