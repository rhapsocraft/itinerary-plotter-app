import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="home/index" options={{ title: 'Welcome!' }}></Stack.Screen>
    </Stack>
  );
}
