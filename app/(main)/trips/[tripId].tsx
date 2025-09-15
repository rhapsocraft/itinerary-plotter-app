import { useApi } from '@/hooks/use-api';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function TripView() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  const { result: trip } = useApi<{ id: string; displayName: string }>(`/api/v1/trips/${tripId}`);
  const { result: activities } = useApi<{ id: string; displayName: string }[]>(`/api/v1/trips/${tripId}/activities`);

  return (
    <View style={{ flexDirection: 'row', height: '100%' }}>
      <View style={{ flexBasis: 450, height: '100%', backgroundColor: useThemeColor({}, 'background'), paddingBlock: 8, paddingLeft: 24 }}>
        {trip && (
          <>
            <h1>{trip?.displayName}</h1>
            <div style={{ flexDirection: 'column' }}>
              {activities?.map((activity) => (
                <div key={activity.id}>
                  <Text>{activity.displayName}</Text>
                </div>
              ))}
            </div>
          </>
        )}
      </View>
      <View style={{ flex: 1, height: '100%' }}></View>
    </View>
  );
}
