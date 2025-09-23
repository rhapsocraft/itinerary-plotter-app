import { APIProvider } from '@vis.gl/react-google-maps';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <APIProvider apiKey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
      <Stack>
        <Stack.Screen name="home/index" options={{ title: 'Welcome!' }}></Stack.Screen>
        <Stack.Screen name="trips/index" options={{ title: 'Trips' }}></Stack.Screen>
      </Stack>
    </APIProvider>
  );
}
