
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#F8F5EF',
          },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
        <Stack.Screen name="habits" />
        <Stack.Screen name="create-habit" />
        <Stack.Screen name="garden" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="garden" />
        <Stack.Screen name="profile" />
      </Stack>

      <StatusBar style="dark" />
    </Provider>
  );
}
