import { useApi } from '@/hooks/use-api';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Trips() {
  const { result: trips } = useApi<{ id: string; displayName: string }[]>('/api/v1/trips');
  const color = useThemeColor({}, 'background');

  return (
    <View style={{ padding: 16, gap: 16, flexDirection: 'row', flexWrap: 'wrap' }}>
      {trips?.map((trip) => (
        <Link key={trip.id} href={{ pathname: '/trips/[tripId]', params: { tripId: trip.id } }} push asChild>
          <Text
            style={{
              flex: 1,
              padding: 12,
              marginBottom: 12,
              flexBasis: 250,
              height: 100,
              backgroundColor: color,
              fontWeight: 600,
              fontSize: 16,
              maxWidth: 250,
            }}
          >
            {trip.displayName}
          </Text>
        </Link>
      ))}
    </View>
  );
}
