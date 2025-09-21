import Collapsible from '@/components/collapsible';
import { useApi } from '@/hooks/use-api';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function TripView() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  const { result: trip } = useApi<{ id: string; displayName: string }>(`/api/v1/trips/${tripId}`);
  const { result: activities } = useApi<{ id: string; displayName: string }[]>(`/api/v1/trips/${tripId}/activities`);
  const { result: documents } = useApi<{ id: string; displayName: string }[]>(`/api/v1/trips/${tripId}/documents`);

  return (
    <View style={{ flexDirection: 'row', height: '100%' }}>
      <View
        style={{
          flex: 1,
          flexBasis: 393,
          height: '100%',
          backgroundColor: useThemeColor({}, 'background'),
          paddingBlock: 8,
          paddingLeft: 24,
        }}
      >
        {trip && (
          <>
            <h1>{trip?.displayName}</h1>
            <div style={{ width: '100%' }}>
              {documents?.map((document) => (
                <div key={document.id}>{document.displayName}</div>
              ))}
            </div>
            <div style={{ flexDirection: 'column' }}>
              {activities?.map((activity) => (
                <Collapsible key={activity.id} header={activity.displayName} style={{ minHeight: 30 }}>
                  <Text>Activity Contents</Text>
                </Collapsible>
              ))}
            </div>
          </>
        )}
      </View>
      <View style={{ flex: 3, height: '100%' }}></View>
    </View>
  );
}
